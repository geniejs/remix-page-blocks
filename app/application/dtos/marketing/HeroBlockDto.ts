import { BlockDto } from "../BlockDto";
import { TextWithLinkDto } from "./TextWithLinkDto";

export interface HeroBlockDto extends BlockDto {
  style: HeroBlockStyle | string;
  headline: string;
  subheadline: string;
  image?: string;
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
