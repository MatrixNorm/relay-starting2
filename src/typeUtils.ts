export type Denull<T> = { [K in keyof T]: NonNullable<T[K]> };
