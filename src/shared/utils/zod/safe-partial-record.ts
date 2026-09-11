import { isPlainObject } from 'es-toolkit';
import * as z from 'zod';

/**
 * Works like `z.partialRecord()` but skips invalid entries instead of
 * invalidating the entire record.
 *
 * @param keySchema
 * @param valueSchema
 * @param parseKey
 */
export function safePartialRecord<
  K extends z.ZodType<PropertyKey>,
  V extends z.ZodType,
>(
  keySchema: K,
  valueSchema: V,
  parseKey: (key: string) => unknown = (key) => key,
) {
  return z.unknown().transform((data, ctx) => {
    if (!isPlainObject(data)) {
      ctx.addIssue('Invalid data');
      return z.NEVER;
    }

    const result: Partial<Record<z.infer<K>, z.infer<V>>> = {};

    for (const [key, value] of Object.entries(data)) {
      const parsedKey = keySchema.safeParse(parseKey(key));

      if (!parsedKey.success) continue;

      const parsedValue = valueSchema.safeParse(value);

      if (!parsedValue.success) continue;

      result[parsedKey.data] = parsedValue.data;
    }

    return result;
  });
}
