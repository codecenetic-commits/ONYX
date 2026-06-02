"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ScrollCanvas.module.css";

interface ScrollCanvasProps {
  onProgress: (progress: number) => void;
  onLoaded: () => void;
  isLoaded: boolean;
}

const totalFrames = 46;

export default function ScrollCanvas({ onProgress, onLoaded, isLoaded }: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRangeRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Calculate optimal scroll height based on viewport and frames
  // For smooth animation: smooth pacing without excessive scroll space
  const getOptimalScrollHeight = () => {
    // Only calculate on client with window available
    if (typeof window === 'undefined') {
      // Server: return default scroll height
      return Math.max(200, Math.ceil(totalFrames * 4.5));
    }
    
    // Client: Adaptive scroll height based on device
    const isMobileXXSmall = window.innerWidth <= 320;
    const isMobileExtraSmall = window.innerWidth <= 375;
    const isMobileSmall = window.innerWidth <= 425;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    
    // Adaptive scroll height:
    // 320px: 3.5vh per frame (faster on tiny screens)
    // 375px: 3.75vh per frame
    // 425px: 3.9vh per frame
    // 768px: 4vh per frame
    // 1024px: 4.5vh per frame
    // Desktop: 5vh per frame
    let vhPerFrame = 5;
    if (isMobileXXSmall) vhPerFrame = 3.5;
    else if (isMobileExtraSmall) vhPerFrame = 3.75;
    else if (isMobileSmall) vhPerFrame = 3.9;
    else if (isMobile) vhPerFrame = 4;
    else if (isTablet) vhPerFrame = 4.5;
    
    return Math.max(200, Math.ceil(totalFrames * vhPerFrame));
  };
  
  const optimalScrollHeight = getOptimalScrollHeight();
  
  const currentProgressRef = useRef(0);
  const lastRenderedFrameRef = useRef(-1);
  const animationFrameIdRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const forceRedrawRef = useRef(false);

  const currentOffsetXRef = useRef(0.65);
  const currentOffsetYRef = useRef(0.5);
  const currentScaleRef = useRef(1.0);
  
  const [activeSection, setActiveSection] = useState(-1);
  const activeSectionRef = useRef(-1);
  const [stickyOpacity, setStickyOpacity] = useState(1);
  const [headerOpacity, setHeaderOpacity] = useState(1);

  // Preload Images - Ensure all assets ready before animation starts
  useEffect(() => {
    const framePaths = Array.from({ length: totalFrames }, (_, i) => {
      const frameNum = String(i + 1).padStart(3, "0");
      return `/Hero/ezgif-frame-${frameNum}.png`;
    });

    let loaded = 0;
    const loadImages = async () => {
      try {
        const promises = framePaths.map((path) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.src = path;
            // Set explicit dimensions to help browser cache
            img.setAttribute('loading', 'eager');
            
            img.onload = () => {
              loaded++;
              onProgress(Math.round((loaded / totalFrames) * 100));
              resolve(img);
            };
            img.onerror = () => {
              loaded++;
              onProgress(Math.round((loaded / totalFrames) * 100));
              // Create fallback black image on error
              const fallback = new Image();
              fallback.width = 1;
              fallback.height = 1;
              resolve(fallback);
            };
          });
        });

        const loadedImages = await Promise.all(promises);
        imagesRef.current = loadedImages as HTMLImageElement[];
        // Wait a frame to ensure DOM is settled before animation starts
        requestAnimationFrame(() => {
          onLoaded();
          forceRedrawRef.current = true;
        });
      } catch (err) {
        console.error("Failed to preload watch frames:", err);
        onLoaded(); // Still load to prevent blocking
      }
    };

    loadImages();
  }, [onProgress, onLoaded]);

  // Cover aspect ratio canvas rendering to span full screen borderless
  const drawImageProp = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number,
    offsetX = 0.5,
    offsetY = 0.5,
    scale = 1.0
  ) => {
    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    let dWidth = w;
    let dHeight = h;
    let dx = x;
    let dy = y;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas -> crop sides, fill height
      dHeight = h;
      dWidth = h * imgRatio;
    } else {
      // Image is taller than canvas -> crop top/bottom, fill width
      dWidth = w;
      dHeight = w / imgRatio;
    }

    // Apply scale multiplier (zoom)
    dWidth *= scale;
    dHeight *= scale;

    dx = x + (w - dWidth) * offsetX;
    dy = y + (h - dHeight) * offsetY;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, dx, dy, dWidth, dHeight);
  };

  // Canvas resize and scale (DPR aware)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const scrollRange = scrollRangeRef.current;
      if (!canvas || !scrollRange) return;

      const dpr = window.devicePixelRatio || 1;
      
      // Get actual viewport dimensions accounting for mobile browser UI
      // Use clientWidth/clientHeight to exclude mobile browser address bars
      const viewportWidth = Math.min(window.innerWidth, document.documentElement.clientWidth) || window.visualViewport?.width || screen.width;
      const viewportHeight = window.innerHeight || window.visualViewport?.height || screen.height;
      
      // Set canvas resolution for sharp rendering
      canvas.width = viewportWidth * dpr;
      canvas.height = viewportHeight * dpr;
      
      // Set CSS size to actual viewport size - CRITICAL for mobile to prevent clipping
      canvas.style.width = viewportWidth + "px";
      canvas.style.height = viewportHeight + "px";
      
      // Ensure canvas fills entire viewport without overflow
      canvas.style.display = 'block';
      canvas.style.touchAction = 'none';

      // Recalculate scroll height on resize/orientation change
      const newHeight = getOptimalScrollHeight();
      scrollRange.style.height = newHeight + "vh";

      forceRedrawRef.current = true;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Animation Loop (requestAnimationFrame)
  useEffect(() => {
    if (!isLoaded) return;

    runningRef.current = true;
    
    // Render initial frame immediately
    const canvas = canvasRef.current;
    if (canvas && imagesRef.current.length === totalFrames) {
      const ctx = canvas.getContext("2d");
      const img = imagesRef.current[0];
      const dpr = window.devicePixelRatio || 1;
      
      if (ctx) {
        if (img && img.complete && img.naturalWidth > 0) {
          drawImageProp(
            ctx,
            img,
            0,
            0,
            canvas.width / dpr,
            canvas.height / dpr,
            currentOffsetXRef.current,
            currentOffsetYRef.current,
            currentScaleRef.current
          );
          lastRenderedFrameRef.current = 0;
        } else {
          ctx.fillStyle = "#050505";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    }

    const loop = () => {
      if (!runningRef.current) return;

      const container = scrollRangeRef.current;
      const canvas = canvasRef.current;

      if (container && canvas && imagesRef.current.length === totalFrames) {
        const rect = container.getBoundingClientRect();
        // Calculate scroll position relative to container start
        const scrollTop = Math.max(0, -rect.top);
        // Calculate total scrollable distance (container height minus viewport height)
        const scrollHeight = rect.height - window.innerHeight;

        let targetPercent = 0;
        // Only update progress while container is in view
        if (scrollHeight > 0 && scrollTop >= 0) {
          targetPercent = Math.min(Math.max(0, scrollTop / scrollHeight), 1);
        } else if (rect.top > window.innerHeight) {
          // Container is below viewport, animation complete
          targetPercent = 1;
        } else if (rect.bottom < 0) {
          // Container is above viewport, reset
          targetPercent = 0;
        }

        // Apply Lerp Easing for ultra-smooth scrolling inertia
        const easing = 0.08;
        currentProgressRef.current += (targetPercent - currentProgressRef.current) * easing;

        if (Math.abs(currentProgressRef.current - targetPercent) < 0.0001) {
          currentProgressRef.current = targetPercent;
        }

        const progress = currentProgressRef.current;
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024;
        const isMobileSmall = window.innerWidth <= 425;
        const isMobileExtraSmall = window.innerWidth <= 375;
        const isMobileXXSmall = window.innerWidth <= 320;

        let targetOffsetX = 0.5;
        let targetOffsetY = 0.5;
        let targetScale = 1.0;

        if (isMobileXXSmall) {
          // Extra small (320px): Minimal scale to fit completely
          targetScale = 0.80;
          targetOffsetY = 0.5;
          targetOffsetX = 0.5;
        } else if (isMobileExtraSmall) {
          // Small mobile (375px): Slightly reduced scale for full visibility
          targetScale = 0.85;
          targetOffsetY = 0.5;
          targetOffsetX = 0.5;
        } else if (isMobileSmall) {
          // Medium mobile (425px): Conservative scale to prevent clipping
          targetScale = 0.88;
          targetOffsetY = 0.5;
          targetOffsetX = 0.5;
        } else if (isMobile) {
          // Mobile (768px): Reduced scale with slight zoom only at key points
          targetScale = 0.92;
          targetOffsetY = 0.5;
          targetOffsetX = 0.5;
        } else if (isTablet) {
          // Tablet: Balanced animations with reduced complexity
          if (progress >= 0.0 && progress < 0.16) {
            targetOffsetX = 0.58;
            targetOffsetY = 0.5;
            targetScale = 1.05;
          } else if (progress >= 0.20 && progress < 0.40) {
            targetOffsetX = 0.62;
            targetOffsetY = 0.5;
            targetScale = 1.08;
          } else if (progress >= 0.44 && progress < 0.64) {
            targetOffsetX = 0.38;
            targetOffsetY = 0.5;
            targetScale = 1.08;
          } else if (progress >= 0.68 && progress < 0.86) {
            targetOffsetX = 0.58;
            targetOffsetY = 0.5;
            targetScale = 1.03;
          } else {
            targetOffsetX = 0.5;
            targetOffsetY = 0.5;
            targetScale = 1.0;
          }
        } else {
          // Desktop: Full cinematic experience with complex animations
          if (progress >= 0.0 && progress < 0.16) {
            // Intro: Watch on the right, text left
            targetOffsetX = 0.65;
            targetOffsetY = 0.5;
            targetScale = 1.05;
          } else if (progress >= 0.20 && progress < 0.40) {
            // Feature 1 (Left spec): Watch on the right
            targetOffsetX = 0.68;
            targetOffsetY = 0.5;
            targetScale = 1.1;
          } else if (progress >= 0.44 && progress < 0.64) {
            // Feature 2 (Right spec): Watch glides to the left
            targetOffsetX = 0.32;
            targetOffsetY = 0.5;
            targetScale = 1.1;
          } else if (progress >= 0.68 && progress < 0.86) {
            // Feature 3 (Reserve spec): Watch glides to the right
            targetOffsetX = 0.65;
            targetOffsetY = 0.5;
            targetScale = 1.05;
          } else {
            // CTA: Center watch
            targetOffsetX = 0.5;
            targetOffsetY = 0.5;
            targetScale = 1.0;
          }
        }

        // Lerp position offsets for smooth movement transitions
        // Adjust easing based on device for smoother mobile experience
        let positionEasing = 0.04; // Desktop default
        if (isMobileXXSmall || isMobileExtraSmall) {
          positionEasing = 0.08; // Fastest settling on very small screens
        } else if (isMobileSmall) {
          positionEasing = 0.07; // Fast settling on small mobile
        } else if (isMobile) {
          positionEasing = 0.06; // Faster settling on mobile
        }
        currentOffsetXRef.current += (targetOffsetX - currentOffsetXRef.current) * positionEasing;
        currentOffsetYRef.current += (targetOffsetY - currentOffsetYRef.current) * positionEasing;
        currentScaleRef.current += (targetScale - currentScaleRef.current) * positionEasing;

        const isMoving = 
          Math.abs(currentOffsetXRef.current - targetOffsetX) > 0.0005 ||
          Math.abs(currentOffsetYRef.current - targetOffsetY) > 0.0005 ||
          Math.abs(currentScaleRef.current - targetScale) > 0.0005;

        // Convert eased progress to frame index
        const frameIndex = Math.min(
          totalFrames - 1,
          Math.max(0, Math.floor(progress * totalFrames))
        );

        // Render if frame changed, watch is moving, or forced redraw
        if (frameIndex !== lastRenderedFrameRef.current || isMoving || forceRedrawRef.current) {
          const ctx = canvas.getContext("2d");
          const img = imagesRef.current[frameIndex];
          const dpr = window.devicePixelRatio || 1;

          if (ctx) {
            // Always render, even if image not ready - prevents black screen
            if (img && img.complete && img.naturalWidth > 0) {
              drawImageProp(
                ctx,
                img,
                0,
                0,
                canvas.width / dpr,
                canvas.height / dpr,
                currentOffsetXRef.current,
                currentOffsetYRef.current,
                currentScaleRef.current
              );
            } else {
              // Clear canvas with background color while loading
              ctx.fillStyle = "#050505";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            lastRenderedFrameRef.current = frameIndex;
            forceRedrawRef.current = false;
          }
        }

        // Update active overlay section index (avoiding high-frequency React renders)
        let activeSec = -1;

        // Fade out the header after scrolling 20%
        if (progress >= 0.2) {
          const headerFadeProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.1));
          setHeaderOpacity(1 - headerFadeProgress);
        } else {
          setHeaderOpacity(1);
        }

        // Fade out the sticky wrapper after animation completes
        // This allows the next section to become visible smoothly
        if (progress >= 0.92) {
          // Fade and hide in the last 8% of animation
          const fadeProgress = Math.max(0, Math.min(1, (progress - 0.92) / 0.08));
          setStickyOpacity(1 - fadeProgress);
        } else {
          setStickyOpacity(1);
        }

        if (activeSec !== activeSectionRef.current) {
          activeSectionRef.current = activeSec;
          setActiveSection(activeSec);
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      runningRef.current = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isLoaded]);

  // Render text section classes
  const getSectionClass = (secIndex: number, defaultPosClass: string) => {
    return `${styles.section} ${defaultPosClass} ${
      activeSection === secIndex ? styles.visible : ""
    }`;
  };

  return (
    <div 
      ref={scrollRangeRef} 
      className={styles.scrollRange}
      style={{ height: `${optimalScrollHeight}vh` }}
      suppressHydrationWarning
    >
      <div 
        className={styles.stickyWrapper}
        style={{ 
          opacity: stickyOpacity, 
          transition: 'opacity 0.4s ease-out',
          pointerEvents: stickyOpacity > 0.1 ? 'auto' : 'none'
        }}
      >
        <canvas ref={canvasRef} className={styles.canvas} />
        
        {isLoaded && (
          <>
            {/* Header with fade animation */}
            <div 
              className={styles.header}
              style={{
                opacity: headerOpacity,
                transition: 'opacity 0.3s ease-out',
                pointerEvents: headerOpacity > 0.1 ? 'auto' : 'none'
              }}
            >
              <h1 className={styles.headerTitle}>Smart Watch SM17</h1>
              <p className={styles.headerSubtitle}>GPS Navigation Heart Rate 2G/3G/4G Network</p>
            </div>

            {/* Content Overlays */}
            <div className={styles.overlays}>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
