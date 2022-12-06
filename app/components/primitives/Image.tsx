//React image component using daisyUI
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { throttle } from "~/utils/shared/RICThrottle";

export const Image = ({
  src,
  alt,
  className = "",
  rounded = false,
  maxScale = 200,
  offset = 50,
  ...props
}: { src: string; alt: string; rounded?: boolean; className?: string; maxScale: number; offset: number } & Record<string, unknown>) => {
  const [scale, setScale] = useState(100);
  const image = useRef<HTMLImageElement>(null);
  const calculateDistance = useCallback(() => {
    let distanceFromCenter = maxScale;
    const center = window.innerHeight / 2;
    if (image.current) {
      // Get the bounding client rectangle of the image
      const rect = image.current.getBoundingClientRect();

      const imageCenter = rect.top + rect.height / 2;
      // Check if the element is above the fold
      if (rect.top + window.scrollY >= window.innerHeight) {
        // Calculate the distance of the image from the center of the screen

        distanceFromCenter = Math.abs(imageCenter - center - offset);
      } else {
        return 100;
      }
    }
    return Math.max(100, Math.min(maxScale, maxScale + offset - (distanceFromCenter / center) * maxScale));
  }, [maxScale, offset]);

  useEffect(() => {
    const throttledSetScale = throttle(() => {
      setScale(calculateDistance());
    });
    const setScaleByDistance = () => {
      throttledSetScale();
    };
    if (maxScale > 100) {
      setScaleByDistance();
      window.addEventListener("scroll", setScaleByDistance);
    }
    return () => {
      window.removeEventListener("scroll", setScaleByDistance);
    };
  }, [calculateDistance, maxScale]);

  return (
    <img
      ref={image}
      src={src}
      alt={alt}
      className={clsx(className, `object-cover object-center transition-all hover:!scale-[${maxScale / 100}]`, ``, {
        rounded: rounded,
      })}
      style={{ transform: `scale(${scale / 100})` }}
      {...props}
    />
  );
};
