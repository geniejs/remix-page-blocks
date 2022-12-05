//React image component using daisyUI
import clsx from "clsx";

export const Image = ({
  src,
  alt,
  className = "",
  rounded = true,
  ...props
}: { src: string; alt: string; rounded: boolean; className: string } & Record<string, unknown>) => {
  return (
    <img
      src={src}
      alt={alt}
      className={clsx(className, "h-12 w-12 flex-shrink-0 object-cover object-center hover:scale-110", {
        "rounded-full": rounded,
      })}
      {...props}
    />
  );
};
