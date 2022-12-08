import { BlockDto } from "../BlockDto";
import { ImageBlockDto } from "../primitives/ImageBlockDto";
import { TextWithLinkDto } from "./TextWithLinkDto";

export interface HeroBlockDto extends BlockDto {
  style: HeroBlockStyle | string;
  headline: string;
  subheadline: string;
  image?: ImageBlockDto;
  topText?: TextWithLinkDto;
  cta: {
    text: string;
    href: string;
    isPrimary: boolean;
    target?: string;
  }[];
  bottomText?: TextWithLinkDto;
}

export enum HeroBlockStyle {
  simple = "simple",
  image = "image",
}
