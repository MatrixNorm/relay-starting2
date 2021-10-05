import type { Denull } from "./typeUtils";
import type { GraphQLEnumType } from "graphql";

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

export const decodeStringAsEnumFactory =
  <T extends unknown>(enumType: GraphQLEnumType) =>
  (externalValue: string): T | undefined => {
    const validValues = enumType.getValues().map((v) => v.name);
    return validValues.includes(externalValue) ? (externalValue as T) : undefined;
  };

export const decodeStringAsInt = (externalValue: string): number | undefined => {
  return parseInt(externalValue) || undefined;
};
