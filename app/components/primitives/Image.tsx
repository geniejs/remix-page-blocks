//React image component using daisyUI
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import getScrollTrigger from "~/utils/helpers/imports.client";
import blockExtender from "~/utils/helpers/blockExtender";
import { ImageBlockDto } from "~/application/dtos/primitives/ImageBlockDto";

const Image = ({ item: { src, alt, className = "", rounded = false } }: { item: ImageBlockDto }) => {
  const image = useRef<HTMLImageElement>(null);
  // useEffect(() => {
  //   let tl: gsap.core.Timeline;
  //   if (image.current) {
  //     tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: image.current,
  //         start: "center bottom",
  //         end: "center top",
  //         scrub: true,
  //         markers: true,
  //       },
  //       id: "image",
  //     });
  //     tl.to(image.current, { scale: maxScale / 100 }, 1).to(image.current, { scale: 1 }, 2);
  //     const ScrollTrigger = getScrollTrigger && getScrollTrigger();

  // ScrollTrigger.observe({
  //   target: image.current, // can be any element (selector text is fine)
  //   type: "pointer", // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
  //   onHover: () => {
  //     gsap.set(image.current, { scale: maxScale / 100 });
  //   },
  //   onHoverEnd: () => {
  //     tl.scrollTrigger?.refresh();
  //   },
  // });
  //   }
  //   return () => {
  //     tl.kill();
  //   };
  // }, [maxScale]);

  return (
    <img
      ref={image}
      src={src}
      alt={alt}
      className={clsx(className, `object-cover object-center`, {
        rounded: rounded,
      })}
    />
  );
};
export default blockExtender(Image);
