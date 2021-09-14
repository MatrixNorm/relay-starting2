const util = require("util");

export function isPromisePending(p: Promise<any>) {
  return util.inspect(p).includes("<pending>");
}

export function isPromiseRejected(p: Promise<any>) {
  return util.inspect(p).includes("<rejected>");
}

export function isPromiseResolved(p: Promise<any>) {
  return !isPromiseRejected(p) && !isPromisePending(p);
}

export function eventLoopNextTick() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}
