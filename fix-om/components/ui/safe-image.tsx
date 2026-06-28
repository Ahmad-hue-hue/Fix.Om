"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackClassName?: string;
}

/** Encode local paths so filenames with spaces load correctly */
export function normalizeImageSrc(src: string | ImageProps["src"]): string | ImageProps["src"] {
  if (typeof src !== "string" || src.startsWith("http") || src.startsWith("data:")) {
    return src;
  }
  return src
    .split("/")
    .map((segment, index) => (index === 0 ? segment : encodeURIComponent(decodeURIComponent(segment))))
    .join("/");
}

export function SafeImage({
  className,
  fallbackClassName,
  alt,
  src,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const normalizedSrc = normalizeImageSrc(src);

  if (hasError) {
    return (
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-primary/25 via-cream/30 to-primary/15",
          fallbackClassName
        )}
        aria-label={alt}
        role="img"
      />
    );
  }

  return (
    <Image
      {...props}
      src={normalizedSrc}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
