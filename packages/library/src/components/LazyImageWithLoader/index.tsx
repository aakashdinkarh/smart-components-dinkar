import React, { useEffect, useRef, useState, memo } from "react";

import { Loader } from "@components/Loader";
import { getCombinedClass } from "@utils/getCombinedClass";
import type { loaderVariant } from "@components/Loader";

import styles from "./lazyImageLoader.module.css";

interface LazyImageWithLoaderProps {
  imgSrc: string;
  alt?: string;
  imgWidth?: number;
  imgHeight?: number;
  imgContainerClass?: string;
  loaderVariant?: loaderVariant;
}

/**
 * A component that lazy loads an image with a loader while the image is loading.
 * @component
 * @param {LazyImageWithLoaderProps} props - The props of the component.
 * @param {string} props.imgSrc - The URL of the image to be loaded.
 * @param {string} [props.alt=''] - The alt text for the image.
 * @param {number} [props.imgWidth] - The width of the image.
 * @param {number} [props.imgHeight] - The height of the image.
 * @param {string} [props.imgContainerClass=''] - Additional class names to be applied to the image container.
 * @param {loaderVariant} [props.loaderVariant] - The variant of the loader to be displayed while the image is loading.
 * @returns {JSX.Element} The rendered LazyImageWithLoader component.
 * @example
 * // Usage example:
 * <LazyImageWithLoader
 *   imgSrc="https://example.com/image.jpg"
 *   alt="Example Image"
 *   imgWidth={300}
 *   imgHeight={200}
 *   imgContainerClass="image-container"
 *   loaderVariant="dots-bounce"
 * />
 */
export const LazyImageWithLoader = memo(function LazyImageWithLoader({
  imgSrc,
  alt = "",
  imgWidth,
  imgHeight,
  imgContainerClass = "",
}: LazyImageWithLoaderProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.onload = () => {
        setIsImgLoaded(true);
      };
    }
  }, []);

  return (
    <div
      className={getCombinedClass(
        styles.rel,
        styles["mobile-inline-block"],
        "__scd_loader_image_container",
        imgContainerClass
      )}
      style={{ flex: `0 0 ${imgWidth}px`, height: imgHeight }}
    >
      {!isImgLoaded && (
        <div className={styles["abs-center"]}>
          <Loader variant="dots-bounce" />
        </div>
      )}
      <img
        ref={imgRef}
        height={imgHeight}
        width={imgWidth}
        loading="lazy"
        src={imgSrc}
        alt={alt}
      />
    </div>
  );
});
