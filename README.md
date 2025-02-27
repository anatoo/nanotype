# Nanotype

A tiny [zod](https://github.com/colinhacks/zod) alternative. TypeScript-first schema validation library.

 - Tiny bundle size
   - esm: 508bytes
   - cjs: 1kb
 - Zero dependencies
 - Type-safe
 - ESM and CJS compatible

## Usage

```ts
import * as n from 'nanotype';

// Define a schema
const ProfileSchema = n.object({
  name: n.string(),
  age: n.number(),
  isActive: n.boolean(),
});

// Infer the type from the schema
type Profile = n.Infer<typeof ProfileSchema>;

const john: unknown = {
  name: 'John',
  age: 30,
  isActive: true,
};

// Validate the value
if (ProfileSchema.is(john)) {
  // john is typed as Profile
  console.log("name: ", john.name);
  console.log("age: ", john.age);
  console.log("isActive: ", john.isActive);
}
```

## Main differences from zod or valibot

Nanotype just validates values and provides type safety.

- No `parse` method.
- No `pipe` method.
- No `transform` method.
- No error messages.


## API Reference

### `Nanotype<T>`

Nanotype is a type that represents a schema. This type has `is(value: unknown): value is T` method that returns a boolean value.

### `string(): Nanotype<string>`

Returns a schema that matches a string.

### `number(): Nanotype<number>`

Returns a schema that matches a number.

### `boolean(): Nanotype<boolean>`

Returns a schema that matches a boolean.

### `arrayOf<T>(type: Nanotype<T>): Nanotype<T[]>`

Returns a schema that matches an array of the given type.

### `custom<T>(is: (value: unknown) => value is T): Nanotype<T>`

Returns a schema that matches a value that satisfies the given predicate.

### `object<T extends Record<string, unknown>>(schema: { [K in keyof T]: Nanotype<T[K]> }): Nanotype<T>`

Returns a schema that matches an object that satisfies the given schema.

### `optional<T>(type: Nanotype<T>): Nanotype<T | undefined | null>`

Returns a schema that matches a value that is either the given type, undefined, or null.

### `nullable<T>(type: Nanotype<T>): Nanotype<T | null>`

Returns a schema that matches a value that is either the given type or null.

### `union<T, U>(type1: Nanotype<T>, type2: Nanotype<U>): Nanotype<T | U>`

Returns a schema that matches a value that is either the given type or the other type.

### `Infer<T extends Nanotype<unknown>>: T extends Nanotype<infer U> ? U : never`

Returns the type that is inferred from the given schema.

## Development

Prerequisites:
 - Node.js v20+
 - Bun v1.1.15+

Commands:
 - Install dependencies: `bun install`
 - Test: `bun run test`
 - Build: `bun run build`
 - Smoke test(run after build): `bun run test:smoke` 
 - Typecheck: `bun run typecheck`

## License

MIT
