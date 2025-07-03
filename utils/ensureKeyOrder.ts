export function ensureKeyOrder<T extends Record<string, unknown>>(
    obj: T,
    keys: (keyof T)[]
  ): T {
    const orderedObject: Partial<T> = {};
    keys.forEach((key) => {
      if (key in obj) {
        orderedObject[key] = obj[key];
      }
    });
    return orderedObject as T;
  }
  