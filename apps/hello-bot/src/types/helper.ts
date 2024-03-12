/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'test' | 'development' | 'production';
    }
  }

  interface ObjectConstructor {
    keys<T extends Record<string, unknown>>(o: T): UnionToTuple<keyof T>;
  }
}

export type Constructor<T extends new (...args: any) => any> = new (
  ...args: any[]
) => InstanceType<T>;

export type Valueof<T extends Record<keyof T, any>> = T[keyof T];

type UnionToIntersection<U> = (
  U extends never ? never : (arg: U) => never
) extends (arg: infer I) => void
  ? I
  : never;

export type UnionToTuple<T> =
  UnionToIntersection<T extends never ? never : (t: T) => T> extends (
    _: never,
  ) => infer W
    ? [...UnionToTuple<Exclude<T, W>>, W]
    : [];
