import { Denull } from "./typeUtils";

export function isFunction(obj: any): boolean {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

export function isObject(value: unknown): value is { [key: string]: any } {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
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

export function isEqualByValue(objX: any, objY: any) {
  return JSON.stringify(objX) === JSON.stringify(objY);
}
