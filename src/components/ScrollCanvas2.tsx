"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ScrollCanvas2.module.css";

interface ScrollCanvas2Props {
  onProgress: (progress: number) => void;
  onLoaded: () => void;
  isLoaded: boolean;
}

const totalFrames = 27;

export default function ScrollCanvas2({ onProgress, onLoaded, isLoaded }: ScrollCanvas2Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRangeRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [hasFrames, setHasFrames] = useState(false);
  const [opacity, setOpacity] = useState(0);
  
  // Calculate optimal scroll height based on viewport and frames
  const getOptimalScrollHeight = () => {
    if (typeof window === 'undefined') {
      return Math.max(250, Math.ceil(totalFrames * 4.5));
    }
    
    const isMobileXXSmall = window.innerWidth <= 320;
    const isMobileExtraSmall = window.innerWidth <= 375;
    const isMobileSmall = window.innerWidth <= 425;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    
    let vhPerFrame = 5;
    if (isMobileXXSmall) vhPerFrame = 3.5;
    else if (isMobileExtraSmall) vhPerFrame = 3.75;
    else if (isMobileSmall) vhPerFrame = 3.9;
    else if (isMobile) vhPerFrame = 4;
    else if (isTablet) vhPerFrame = 4.5;
    
    return Math.max(250, Math.ceil(totalFrames * vhPerFrame));
  };
  
  const optimalScrollHeight = getOptimalScrollHeight();
  
  const currentProgressRef = useRef(0);
  const lastRenderedFrameRef = useRef(-1);
  const animationFrameIdRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const forceRedrawRef = useRef(false);

  const currentOffsetXRef = useRef(0.5);
  const currentOffsetYRef = useRef(0.5);
  const currentScaleRef = useRef(1.0);

  // Preload Images
  useEffect(() => {
    const framePaths = Array.from({ length: totalFrames }, (_, i) => {
      const frameNum = String(i + 1).padStart(3, "0");
      return `/SecondScroll/ezgif-frame-${frameNum}.png`;
    });

    let loaded = 0;
    const loadImages = async () => {
      try {
        const promises = framePaths.map((path) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.src = path;
            img.setAttribute('loading', 'eager');
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
              loaded++;
              onProgress(Math.round((loaded / totalFrames) * 100));
              console.log(`✓ Frame loaded: ${path} (${loaded}/${totalFrames})`);
              resolve(img);
            };
            img.onerror = () => {
              loaded++;
              console.warn(`✗ Failed to load: ${path}`);
              onProgress(Math.round((loaded / totalFrames) * 100));
              const fallback = new Image();
              fallback.width = 1;
              fallback.height = 1;
              resolve(fallback);
            };
            
            // Timeout in case image never loads/errors
            setTimeout(() => {
              if (!img.complete) {
                loaded++;
                console.warn(`⏱ Timeout loading: ${path}`);
                onProgress(Math.round((loaded / totalFrames) * 100));
              }
            }, 5000);
          });
        });

        const loadedImages = await Promise.all(promises);
        imagesRef.current = loadedImages as HTMLImageElement[];
        
        // Check if at least some frames loaded successfully
        const successfulFrames = imagesRef.current.filter(img => img.naturalWidth > 0).length;
        const totalImagesArray = imagesRef.current.length;
        
        console.log(`✓ ScrollCanvas2 Complete: ${successfulFrames}/${totalFrames} frames loaded successfully, array length: ${totalImagesArray}`);
        
        // IMPORTANT: Always set hasFrames to true to show the animation area
        // Even if some frames fail, we still want to render and try
        setHasFrames(true);
        
        requestAnimationFrame(() => {
          onLoaded();
          forceRedrawRef.current = true;
        });
      } catch (err) {
        console.error("Failed to preload second scroll frames:", err);
        // Still set hasFrames to true to show the animation area
        setHasFrames(true);
        onLoaded();
      }
    };

    loadImages();
  }, [onProgress, onLoaded]);

  // Cover aspect ratio canvas rendering
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
      dHeight = h;
      dWidth = h * imgRatio;
    } else {
      dWidth = w;
      dHeight = w / imgRatio;
    }

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
      
      const viewportWidth = Math.min(window.innerWidth, document.documentElement.clientWidth) || window.visualViewport?.width || screen.width;
      const viewportHeight = window.innerHeight || window.visualViewport?.height || screen.height;
      
      canvas.width = viewportWidth * dpr;
      canvas.height = viewportHeight * dpr;
      
      canvas.style.width = viewportWidth + "px";
      canvas.style.height = viewportHeight + "px";
      
      canvas.style.display = 'block';
      canvas.style.touchAction = 'none';

      const newHeight = getOptimalScrollHeight();
      scrollRange.style.height = newHeight + "vh";

      forceRedrawRef.current = true;
    };

    if (hasFrames) {
      window.addEventListener("resize", handleResize);
      window.addEventListener("orientationchange", handleResize);
      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("orientationchange", handleResize);
      };
    }
  }, [hasFrames]);

  // Animation Loop
  useEffect(() => {
    if (!isLoaded || !hasFrames) return;

    runningRef.current = true;
    
    const canvas = canvasRef.current;
    if (canvas && imagesRef.current.length > 0) {
      const ctx = canvas.getContext("2d");
      const img = imagesRef.current[0];
      const dpr = window.devicePixelRatio || 1;
      
      if (ctx && img && img.complete && img.naturalWidth > 0) {
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
      }
    }

    const loop = () => {
      if (!runningRef.current) return;

      const container = scrollRangeRef.current;
      const canvas = canvasRef.current;

      if (container && canvas && imagesRef.current.length > 0) {
        const rect = container.getBoundingClientRect();
        const scrollTop = Math.max(0, -rect.top);
        const scrollHeight = rect.height - window.innerHeight;
        const viewportHeight = window.innerHeight;

        let targetPercent = 0;
        if (scrollHeight > 0 && scrollTop >= 0) {
          targetPercent = Math.min(Math.max(0, scrollTop / scrollHeight), 1);
        } else if (rect.top > viewportHeight) {
          targetPercent = 1;
        } else if (rect.bottom < 0) {
          targetPercent = 0;
        }

        // Calculate opacity based on container visibility in viewport
        let targetOpacity = 0;
        
        // If container top is below viewport bottom, it's off-screen below (not visible yet)
        if (rect.top >= viewportHeight) {
          targetOpacity = 0; // Off-screen below, invisible
        }
        // If container bottom is above viewport top, it's off-screen above (completely past)
        else if (rect.bottom <= 0) {
          targetOpacity = 0; // Off-screen above, invisible
        }
        // Container is fully inside viewport - make it visible
        else if (rect.top >= 0 && rect.bottom <= viewportHeight) {
          targetOpacity = 1; // Completely inside viewport, fully visible
        }
        // Container entering from bottom (top edge is below viewport top but not yet at top)
        else if (rect.top > 0 && rect.top < viewportHeight) {
          // Fade in based on how much is visible
          targetOpacity = 1 - (rect.top / viewportHeight);
        }
        // Container is partially above (top is above viewport, bottom is visible)
        else if (rect.top < 0 && rect.bottom > 0 && rect.bottom < viewportHeight) {
          // Fade out as top leaves viewport
          targetOpacity = rect.bottom / viewportHeight;
        }
        // Container spans entire viewport or is being scrolled through
        else if (rect.top < 0 && rect.bottom > viewportHeight) {
          // Fully visible - container is larger than viewport or we're in middle of it
          targetOpacity = 1;
        }
        // Fallback
        else {
          targetOpacity = 0;
        }
        
        // Smoothly transition opacity
        setOpacity(prev => {
          const opacityEasing = 0.12;
          return prev + (targetOpacity - prev) * opacityEasing;
        });

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
          targetScale = 0.80;
          targetOffsetY = 0.5;
          targetOffsetX = 0.5;
        } else if (isMobileExtraSmall) {
          targetScale = 0.85;
          targetOffsetY = 0.5;
          targetOffsetX = 0.5;
        } else if (isMobileSmall) {
          targetScale = 0.88;
          targetOffsetY = 0.5;
          targetOffsetX = 0.5;
        } else if (isMobile) {
          targetScale = 0.92;
          targetOffsetY = 0.5;
          targetOffsetX = 0.5;
        } else if (isTablet) {
          if (progress >= 0.0 && progress < 0.25) {
            targetOffsetX = 0.55;
            targetOffsetY = 0.5;
            targetScale = 1.05;
          } else if (progress >= 0.25 && progress < 0.5) {
            targetOffsetX = 0.6;
            targetOffsetY = 0.5;
            targetScale = 1.08;
          } else if (progress >= 0.5 && progress < 0.75) {
            targetOffsetX = 0.4;
            targetOffsetY = 0.5;
            targetScale = 1.08;
          } else {
            targetOffsetX = 0.5;
            targetOffsetY = 0.5;
            targetScale = 1.0;
          }
        } else {
          if (progress >= 0.0 && progress < 0.25) {
            targetOffsetX = 0.6;
            targetOffsetY = 0.5;
            targetScale = 1.06;
          } else if (progress >= 0.25 && progress < 0.5) {
            targetOffsetX = 0.65;
            targetOffsetY = 0.5;
            targetScale = 1.12;
          } else if (progress >= 0.5 && progress < 0.75) {
            targetOffsetX = 0.35;
            targetOffsetY = 0.5;
            targetScale = 1.12;
          } else {
            targetOffsetX = 0.5;
            targetOffsetY = 0.5;
            targetScale = 1.0;
          }
        }

        let positionEasing = 0.04;
        if (isMobileXXSmall || isMobileExtraSmall) {
          positionEasing = 0.08;
        } else if (isMobileSmall) {
          positionEasing = 0.07;
        } else if (isMobile) {
          positionEasing = 0.06;
        }
        currentOffsetXRef.current += (targetOffsetX - currentOffsetXRef.current) * positionEasing;
        currentOffsetYRef.current += (targetOffsetY - currentOffsetYRef.current) * positionEasing;
        currentScaleRef.current += (targetScale - currentScaleRef.current) * positionEasing;

        const isMoving = 
          Math.abs(currentOffsetXRef.current - targetOffsetX) > 0.0005 ||
          Math.abs(currentOffsetYRef.current - targetOffsetY) > 0.0005 ||
          Math.abs(currentScaleRef.current - targetScale) > 0.0005;

        const frameIndex = Math.min(
          imagesRef.current.length - 1,
          Math.max(0, Math.floor(progress * imagesRef.current.length))
        );

        if (frameIndex !== lastRenderedFrameRef.current || isMoving || forceRedrawRef.current) {
          const ctx = canvas.getContext("2d");
          const img = imagesRef.current[frameIndex];
          const dpr = window.devicePixelRatio || 1;

          if (ctx && img && img.complete && img.naturalWidth > 0) {
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
            lastRenderedFrameRef.current = frameIndex;
            forceRedrawRef.current = false;
          }
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
  }, [isLoaded, hasFrames]);

  // Don't render if frames haven't loaded - still show space with better feedback
  if (!hasFrames) {
    return (
      <div 
        ref={scrollRangeRef} 
        className={styles.scrollRange}
        style={{ height: `${optimalScrollHeight}vh`, backgroundColor: '#050505', position: 'relative' }}
        suppressHydrationWarning
      >
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
            backgroundColor: '#050505'
          }}
        >
          <div style={{ color: '#666', textAlign: 'center', fontSize: '12px' }}>
            Loading animation...
          </div>
        </div>
      </div>
    );
  }

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
          opacity: Math.max(0, Math.min(1, opacity)),
          transition: 'opacity 0.3s ease-out',
          pointerEvents: opacity > 0.05 ? 'auto' : 'none'
        }}
      >
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </div>
  );
}
