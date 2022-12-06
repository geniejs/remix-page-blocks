export const rAF = (function () {
  let running: boolean, waiting: boolean;
  const firstFns: Array<() => void> = [];
  const secondFns: Array<() => void> = [];
  let fns = firstFns;

  const run = function () {
    const runFns = fns;

    fns = firstFns.length ? secondFns : firstFns;

    running = true;
    waiting = false;

    while (runFns.length) {
      (runFns.shift() as () => void)();
    }

    running = false;
  };

  const rafBatch = function (this: any, fn: (...args: Array<Record<string, unknown>>) => any, queue: boolean = false) {
    if (running && !queue) {
      fn.apply(this, arguments as unknown as Array<any>);
    } else {
      fns.push(fn);

      if (!waiting) {
        waiting = true;
        (document.hidden ? setTimeout : requestAnimationFrame)(run);
      }
    }
  };

  (rafBatch as any)._lsFlush = run;

  return rafBatch;
})();

export const rAFIt = function (fn: (...args: any[]) => void, simple: boolean): (...args: any[]) => void {
  return simple
    ? function () {
        rAF(fn);
      }
    : function (this: any, ...args: any[]) {
        const that = this;
        rAF(function () {
          fn.apply(that, args);
        });
      };
};

export const throttle = function (fn: () => void): (isPriority?: boolean) => void {
  let running: boolean;
  let lastTime = 0;
  const gDelay = 125;
  const RIC_DEFAULT_TIMEOUT = 666;
  let rICTimeout = RIC_DEFAULT_TIMEOUT;
  const run = function () {
    running = false;
    lastTime = Date.now();
    fn();
  };
  const idleCallback = window.requestIdleCallback
    ? function () {
        window.requestIdleCallback(run, { timeout: rICTimeout });
        if (rICTimeout !== RIC_DEFAULT_TIMEOUT) {
          rICTimeout = RIC_DEFAULT_TIMEOUT;
        }
      }
    : rAFIt(function () {
        setTimeout(run);
      }, true);
  return function (isPriority?: boolean) {
    let delay: number;
    if ((isPriority = isPriority === true)) {
      rICTimeout = 44;
    }

    if (running) {
      return;
    }

    running = true;

    delay = gDelay - (Date.now() - lastTime);

    if (delay < 0) {
      delay = 0;
    }

    if (isPriority || (delay < 9 && window.requestIdleCallback)) {
      idleCallback();
    } else {
      setTimeout(idleCallback, delay);
    }
  };
};
