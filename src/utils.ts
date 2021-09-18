import { Denull } from "./typeUtils";

export function isFunction(obj: any): boolean {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

export function isNil(x: any): boolean {
  return x === undefined || x === null;
}

export function sleepPromise(timeout: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export function removeNullAndUndefine<T>(obj: T): Denull<T> {
  // @ts-ignore
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)
  );
}
