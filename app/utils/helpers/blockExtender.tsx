import React, { useEffect, useRef } from "react";
import { BlockItem, ObserverCallback, TweensConfig } from "~/application/dtos/BlockDto";
import { gsap } from "gsap";
import getScrollTrigger from "~/utils/helpers/imports.client";
const setupTween = (block: HTMLDivElement, tl: gsap.core.Timeline | typeof gsap, tween: Partial<TweensConfig>) => {
  tween.from?.vars && tl.from(tween.from.targets || block, tween.from.vars, tween.from.position);
  tween.fromTo?.fromvars && tween.fromTo?.tovars && tl.fromTo(tween.fromTo.targets || block, tween.fromTo.fromvars, tween.fromTo.tovars, tween.fromTo.position);
  tween.set?.vars && tl.set(tween.set.targets || block, tween.set.vars, tween.set.position);
  tween.to?.vars && tl.to(tween.to.targets || block, tween.to.vars, tween.to.position);
  tween.tweenFromTo?.fromPosition &&
    tween.tweenFromTo?.toPosition &&
    (tl as gsap.core.Timeline).tweenFromTo &&
    (tl as gsap.core.Timeline).tweenFromTo(tween.tweenFromTo.fromPosition, tween.tweenFromTo.toPosition, tween.tweenFromTo.vars);
  tween.tweenTo?.position && (tl as gsap.core.Timeline).tweenTo && (tl as gsap.core.Timeline).tweenTo(tween.tweenTo.position, tween.tweenTo.vars);
};
const handleObserver = (observerCallback: ObserverCallback | undefined, block: HTMLDivElement, tls?: gsap.core.Timeline[]) => {
  return observerCallback
    ? () => {
        observerCallback!.forEach((tween) => {
          setupTween(block!, gsap, tween);
          tween.refresh &&
            tls?.forEach((tl) => {
              tl?.scrollTrigger?.refresh();
            });
        });
      }
    : undefined;
};
export default function blockExtender<T extends BlockItem>(WrappedComponent: React.FC<T>, additionalProps?: T): React.FC<T> {
  const Block = (props: T) => {
    const block = useRef<HTMLDivElement>(null);
    const allProps = { ...additionalProps, ...props };
    useEffect(() => {
      const tls: gsap.core.Timeline[] = [];
      const observes: Observer[] = [];
      if (allProps?.item?.timelines && block.current) {
        const { timelines } = allProps.item;
        timelines.forEach((timeline) => {
          const { tweens, ...timelineRest } = timeline;
          const scrollTrigger = timeline.scrollTrigger as ScrollTrigger.Vars;
          const tl = gsap.timeline({
            ...timelineRest,
            scrollTrigger: scrollTrigger && {
              trigger: block.current,
              start: "center bottom",
              end: "center top",
              scrub: true,
              ...scrollTrigger,
            },
          });
          tls.push(tl);
          tweens.forEach((tween) => {
            setupTween(block.current!, tl, tween);
          });
        });
      }
      if (allProps?.item?.observers && block) {
        const { observers } = allProps.item;
        const ScrollTrigger = getScrollTrigger && getScrollTrigger();
        observers.forEach((observer) => {
          observes.push(
            ScrollTrigger.observe({
              target: observer.target || block.current,
              type: observer.type || "pointer", // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
              onHover: handleObserver(observer.onHover, block.current!, tls),
              onHoverEnd: handleObserver(observer.onHoverEnd, block.current!, tls),
              onLockAxis: handleObserver(observer.onLockAxis, block.current!, tls),
              onDown: handleObserver(observer.onDown, block.current!, tls),
              onUp: handleObserver(observer.onUp, block.current!, tls),
              onLeft: handleObserver(observer.onLeft, block.current!, tls),
              onRight: handleObserver(observer.onRight, block.current!, tls),
              onDisable: handleObserver(observer.onDisable, block.current!, tls),
              onDrag: handleObserver(observer.onDrag, block.current!, tls),
              onDragStart: handleObserver(observer.onDragStart, block.current!, tls),
              onDragEnd: handleObserver(observer.onDragEnd, block.current!, tls),
              onEnable: handleObserver(observer.onEnable, block.current!, tls),
              onToggleY: handleObserver(observer.onToggleY, block.current!, tls),
              onToggleX: handleObserver(observer.onToggleX, block.current!, tls),
              onChangeX: handleObserver(observer.onChangeX, block.current!, tls),
              onChangeY: handleObserver(observer.onChangeY, block.current!, tls),
              onChange: handleObserver(observer.onChange, block.current!, tls),
              onClick: handleObserver(observer.onClick, block.current!, tls),
              onPress: handleObserver(observer.onPress, block.current!, tls),
              onRelease: handleObserver(observer.onRelease, block.current!, tls),
              onMove: handleObserver(observer.onMove, block.current!, tls),
              onWheel: handleObserver(observer.onWheel, block.current!, tls),
              onStop: handleObserver(observer.onStop, block.current!, tls),
            })
          );
        });
      }
      return () => {
        tls?.forEach((tl) => {
          tl.kill();
        });
        observes?.forEach((observes) => {
          observes.kill();
        });
      };
    }, [allProps.item, block]);
    return (
      <div className="block" ref={block}>
        <WrappedComponent {...allProps} />
      </div>
    );
  };
  return Block;
}
