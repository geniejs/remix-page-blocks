//React image component using daisyUI
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export const Image = ({
  src,
  alt,
  className = "",
  rounded = false,
  maxScale = 200,
  offset = 50,
  ...props
}: { src: string; alt: string; rounded?: boolean; className?: string; maxScale: number; offset: number } & Record<string, unknown>) => {
  const image = useRef<HTMLImageElement>(null);
  const calculateDistance = useCallback(
    (el: Element) => {
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
    },
    [maxScale, offset]
  );

  useEffect(() => {
    if (image.current) {
      gsap.to(image.current, {
        scrollTrigger: {
          trigger: image.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: true,
          onUpdate: (self) => {
            gsap.set(image.current, { scale: calculateDistance(self.scroller as Element) / 100 });
          },
        },
        // Other animation properties
      });
    }
  }, [calculateDistance, maxScale]);

  return (
    <img
      ref={image}
      src={src}
      alt={alt}
      className={clsx(className, `object-cover object-center transition-all`, ``, {
        rounded: rounded,
      })}
      {...props}
    />
  );
};
