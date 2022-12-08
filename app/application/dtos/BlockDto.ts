export interface BlockDto {
  gsap?: typeof gsap[];
  observer?: Observer.ObserverVars[];
}

export type BlockItem = {
  item: BlockDto;
};
