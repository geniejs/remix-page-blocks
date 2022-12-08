import { BlockDto } from "../BlockDto";

export interface ImageBlockDto extends BlockDto {
  src: string;
  alt?: string;
  path?: string;
  rounded?: boolean;
  className?: string;
}
