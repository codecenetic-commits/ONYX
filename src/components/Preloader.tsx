"use client";

import React, { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  progress: number;
  isLoading: boolean;
}

export default function Preloader({ progress, isLoading }: PreloaderProps) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Allow fade-out animation to complete before removing from DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div className={`${styles.overlay} ${!isLoading ? styles.fadeOut : ""}`}>
      <div className={styles.loaderContent}>
        <div className={styles.ringContainer}>
          <div className={styles.ring} />
          <div className={styles.activeRing} />
          <div className={styles.innerBrand}>Onyx</div>
        </div>
        
        <div className={styles.progressText}>{progress}%</div>
        
        <div className={styles.progressBarContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${progress}%` }} 
          />
        </div>
        
        <div className={styles.statusText}>
          {progress < 100 ? "Preloading Watch Components" : "Calibrating Movement"}
        </div>
      </div>
    </div>
  );
}
