type TweenTarget = gsap.TweenTarget;
type Position = gsap.Position;
type TimelineVars = gsap.TimelineVars;
type TweenVars = gsap.TweenVars;
type Callback = gsap.Callback;
type TimelineChild = gsap.core.TimelineChild;
type Labels = gsap.core.Labels;

export interface TweensConfig {
  autoRemoveChildren: boolean;
  labels: Labels;
  smoothChildTiming: boolean;
  vars?: TimelineVars;
  [key: string]: any; // for gsap.registerEffect: {{... extendTimeline: true})

  /**
   * Adds a label, tween, timeline, or an array of those values to the timeline, optionally at the specified time.
   *
   * ```js
   * tl.add: {"myLabel");  // add a label at the end of the timeline
   * tl.add: {myTween, 1); // add a tween at the 1 second mark
   * tl.add: {myTimeline, "-=1"); // add a timeline 1 second before the end of the timeline
   * tl.add: {["myLabel", myTween, myTimeline], "<"); // add a label, tween, and timeline at the start of the previous tween
   * ```
   *
   * @param {TimelineChild} child
   * @param {Position} [position]
   * @returns {Timeline} The timeline
   * @memberof Timeline
   * @link https://greensock.com/docs/v3/GSAP/Timeline/add: {)
   */
  add: { child: TimelineChild; position?: Position };

  /**
   * Adds a label to the timeline, optionally at the specified time.
   *
   * ```js
   * tl.addLabel: {"myLabel", 1); // add a label at the 1 second mark
   * ```
   *
   * @param {string} label
   * @param {Position} [position]
   * @returns {Timeline} The timeline
   * @memberof Timeline
   * @link https://greensock.com/docs/v3/GSAP/Timeline/addLabel: {)
   */
  addLabel: { label: string; position?: Position };

  /**
   * Adds a pause to the timeline, optionally at the specified time.
   *
   * ```js
   * tl.addPause: {); // add a pause at the end of the timeline
   * tl.addPause: {1, myCallback); // add a pause at the 1 second mark with a callback
   * ```
   *
   * @param {Position} [position]
   * @param {Callback} [callback]
   * @param {any[]} [params]
   * @returns {Timeline} The timeline
   * @memberof Timeline
   * @link https://greensock.com/docs/v3/GSAP/Timeline/addPause: {)
   */
  addPause: { position?: Position; callback?: Callback; params?: any[] };

  /**
   * Empties the timeline of all tweens, timelines, callbacks, and optionally labels.
   *
   * ```js
   * tl.clear: {);     // empty the timeline not including labels
   * tl.clear: {true); // empy the timeline including labels
   * ```
   *
   * @param {boolean} labels
   * @returns {Timeline} The timeline
   * @memberof Timeline
   * @link https://greensock.com/docs/v3/GSAP/Timeline/clear: {)
   */
  clear: { labels?: boolean };

  /**
   * Creates a tween coming FROM the given values.
   *
   * ```js
   * tl.from: {".class", { x: 100 }, "+=1"); // adds the tween one second after the end of the timeline
   * ```
   *
   * @param {TweenTarget} targets
   * @param {TweenVars} vars
   * @param {Position} [position]
   * @returns {Timeline} The timeline
   * @memberof Timeline
   * @link https://greensock.com/docs/v3/GSAP/Timeline/from: {)
   */
  from: { targets?: TweenTarget; vars?: TweenVars; position?: Position };

  /**
   * Creates a tween coming FROM the first set of values going TO the second set of values.
   *
   * ```js
   * tl.fromTo: {".class", {x: 0}, { x: 100 }, "+=1"); // adds the tween one second after the end of the timeline
   * ```
   *
   * @param {TweenTarget} targets
   * @param {TweenVars} fromVars
   * @param {TweenVars} toVars
   * @param {Position} [position]
   * @returns {Timeline} The timeline
   * @memberof Timeline
   * @link https://greensock.com/docs/v3/GSAP/Timeline/fromTo: {)
   */
  fromTo: { targets?: TweenTarget; fromvars?: TweenVars; tovars?: TweenVars; position?: Position };

  /**
   * Sets properties of the target: {s) to the properties specified at the time of the set call.
   *
   * ```js
   * tl.set: {".class", {x: 100, y: 50, opacity: 0}, 1);
   * ```
   *
   * @param {TweenTarget} targets
   * @param {TweenVars} vars
   * @param {Position} [position]
   * @returns {Timeline} The timeline
   * @memberof Timeline
   * @link https://greensock.com/docs/v3/GSAP/Timeline/set: {)
   */
  set: { targets?: TweenTarget; vars?: TweenVars; position?: Position };

  /**
   * Creates a tween going TO the given values.
   *
   * ```js
   * tl.to: {".class", {x: 100}, 1);
   * ```
   *
   * @param {TweenTarget} targets
   * @param {TweenVars} vars
   * @param {Position} position
   * @returns {Timeline} The timeline
   * @memberof Timeline
   * @link https://greensock.com/docs/v3/GSAP/Timeline/to: {)
   */
  to: { targets?: TweenTarget; vars?: TweenVars; position?: Position };

  /**
   * Tween linearly from a particular time or label to another time or label and then stops.
   *
   * ```js
   * tl.tweenFromTo: {"myLabel", 5}); // tween from myLabel to the 5 second mark
   * ```
   *
   * @param {Position} fromPosition
   * @param {Position} toPosition
   * @param {TweenVars} [vars]
   * @returns {Tween} The tweenFromTo tween
   * @memberof Timeline
   * @link https://greensock.com/docs/v3/GSAP/Timeline/tweenFromTo: {)
   */
  tweenFromTo: {
    fromPosition: Position;
    toPosition: Position;
    vars?: TweenVars;
  };

  /**
   * Tween linearly to a particular time and then stops.
   *
   * ```js
   * tl.tweenTo: {"myLabel"}); // tween to myLabel
   * ```
   *
   * @param {Position} position
   * @param {TweenVars} [vars]
   * @returns {Tween} The tweenTo tween
   * @memberof Timeline
   * @link https://greensock.com/docs/v3/GSAP/Timeline/tweenTo: {)
   */
  tweenTo: { position: Position; vars?: TweenVars };
}
export type ObserverCallback = ({ refresh?: boolean } & Partial<TweensConfig>)[];

export interface BlockDto {
  timelines?: (gsap.TimelineVars & { tweens: Partial<TweensConfig>[] })[];
  observers?: {
    allowClicks?: boolean;
    capture?: boolean;
    debounce?: boolean;
    dragMinimum?: number;
    id?: string;
    ignore?: gsap.DOMTarget;
    lineHeight?: number;
    lockAxis?: boolean;
    onLockAxis?: ObserverCallback;
    onDown?: ObserverCallback;
    onUp?: ObserverCallback;
    onLeft?: ObserverCallback;
    onRight?: ObserverCallback;
    onDisable?: ObserverCallback;
    onDrag?: ObserverCallback;
    onDragStart?: ObserverCallback;
    onDragEnd?: ObserverCallback;
    onEnable?: ObserverCallback;
    onHover?: ObserverCallback;
    onHoverEnd?: ObserverCallback;
    onToggleY?: ObserverCallback;
    onToggleX?: ObserverCallback;
    onChangeX?: ObserverCallback;
    onChangeY?: ObserverCallback;
    onChange?: ObserverCallback;
    onClick?: ObserverCallback;
    onPress?: ObserverCallback;
    onRelease?: ObserverCallback;
    onMove?: ObserverCallback;
    onWheel?: ObserverCallback;
    onStop?: ObserverCallback;
    onStopDelay?: number;
    preventDefault?: boolean;
    target?: gsap.DOMTarget | Window | Document;
    tolerance?: number;
    type?: string;
    wheelSpeed?: number;
  }[];
}

export type BlockItem = {
  item: BlockDto;
};
