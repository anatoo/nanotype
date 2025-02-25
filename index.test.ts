import { describe, it, expect } from 'bun:test';
import * as n from './index';

describe('string()', () => {
  it('should works normally', () => {
    expect(n.string().is('hoge')).toBe(true);
  });
});

describe('number()', () => {
  it('should works normally', () => {
    expect(n.number().is(1)).toBe(true);
  });
});

describe('boolean()', () => {
  it('should works normally', () => {
    expect(n.boolean().is(true)).toBe(true);
  });
});

describe('arrayOf()', () => {
  it('should works normally', () => {
    expect(n.arrayOf(n.string()).is(['hoge', 'fuga'])).toBe(true);
  });
});

describe('custom()', () => {
  it('should works normally', () => {
    expect(n.custom((value) => typeof value === 'string').is('hoge')).toBe(true);
  });
}); 

describe('object()', () => {
  it('should works normally', () => {
    expect(n.object({ name: n.string() }).is({ name: 'hoge' })).toBe(true);
  });

  it('should works without any type error', () => {
    const memberSchema = n.object({
      name: n.string(),
      age: n.number(),
    });

    type Member = n.Infer<typeof memberSchema>;

    const member: Member = {
      name: 'John',
      age: 30,
    };

    const member2: Member = {
      name: 'John',
      // @ts-expect-error
      age: '30',
    };

    const member3: Member = {
      name: 'John',
      age: 30,
      // @ts-expect-error
      email: 'hoge@example.com',
    };

    expect(memberSchema.is(member)).toBe(true);
    expect(memberSchema.is(member2)).toBe(false);
    expect(memberSchema.is(member3)).toBe(true);
  });
});
