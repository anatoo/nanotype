
export interface Nanotype<T> {
  is: (value: unknown) => value is T;
}

export const custom = <T>(is: (value: unknown) => value is T): Nanotype<T> => ({
  is,
});

export type Infer<T extends Nanotype<unknown>> = T extends Nanotype<infer U> ? U : never;

export const string = (): Nanotype<string> => custom((value: unknown) => typeof value === 'string');

export const number = (): Nanotype<number> => custom((value: unknown) => typeof value === 'number');

export const boolean = (): Nanotype<boolean> => custom((value: unknown) => typeof value === 'boolean');

export const arrayOf = <T>(type: Nanotype<T>): Nanotype<T[]> => custom((value: unknown) => Array.isArray(value) && value.every(type.is));


export const object = <T extends Record<string, unknown>>(schema: { [K in keyof T]: Nanotype<T[K]> }): Nanotype<T> => custom((value: unknown): value is T => {
  if (value === null) {
    return false;
  }

    for (const [key, type] of Object.entries(schema)) {
      const target = (value as Record<string, unknown>)[key];
      if (!type.is(target)) {
        return false;
      }
    }
    return true;
});

export const optional = <T>(type: Nanotype<T>): Nanotype<T | undefined | null> => custom((value: unknown): value is T | undefined | null => value === undefined || value === null || type.is(value));

export const nullable = <T>(type: Nanotype<T>): Nanotype<T | null> => custom((value: unknown): value is T | null => value === null || type.is(value));

export const union = <T, U>(type1: Nanotype<T>, type2: Nanotype<U>): Nanotype<T | U> => custom((value: unknown): value is T | U => type1.is(value) || type2.is(value));

