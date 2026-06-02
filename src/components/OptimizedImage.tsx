"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  lazy?: boolean;
  showBlur?: boolean;
  containerClassName?: string;
  animateOnLoad?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  lazy = true,
  showBlur = true,
  containerClassName = "",
  animateOnLoad = true,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={animateOnLoad ? { opacity: 0 } : { opacity: 1 }}
      animate={animateOnLoad && isLoaded ? { opacity: 1 } : { opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={containerClassName}
    >
      <Image
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        onLoad={() => setIsLoaded(true)}
        placeholder={showBlur ? "blur" : "empty"}
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
        {...props}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </motion.div>
  );
}
