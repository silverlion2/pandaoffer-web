import { describe, it, expect } from 'vitest';
import { aiMatcherSchema, unlockSchema } from '@/lib/schema';

describe('aiMatcherSchema', () => {
  it('validates a correct submission', () => {
    const result = aiMatcherSchema.safeParse({
      nationality: 'Pakistan',
      major: 'Computer Science',
      gpa: { scale: 'percentage', value: '85' },
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty nationality', () => {
    const result = aiMatcherSchema.safeParse({
      nationality: '',
      major: 'Computer Science',
      gpa: { scale: 'four', value: '3.5' },
    });
    expect(result.success).toBe(false);
  });

  it('rejects GPA out of range for percentage scale', () => {
    const result = aiMatcherSchema.safeParse({
      nationality: 'Nigeria',
      major: 'Medicine',
      gpa: { scale: 'percentage', value: '150' },
    });
    expect(result.success).toBe(false);
  });

  it('rejects GPA out of range for 4.0 scale', () => {
    const result = aiMatcherSchema.safeParse({
      nationality: 'India',
      major: 'Engineering',
      gpa: { scale: 'four', value: '5.0' },
    });
    expect(result.success).toBe(false);
  });

  it('accepts valid 5.0 scale GPA', () => {
    const result = aiMatcherSchema.safeParse({
      nationality: 'Bangladesh',
      major: 'Business',
      gpa: { scale: 'five', value: '4.2' },
    });
    expect(result.success).toBe(true);
  });

  it('rejects non-numeric GPA value', () => {
    const result = aiMatcherSchema.safeParse({
      nationality: 'Kenya',
      major: 'Law',
      gpa: { scale: 'percentage', value: 'abc' },
    });
    expect(result.success).toBe(false);
  });
});

describe('unlockSchema', () => {
  it('validates correct email and terms agreement', () => {
    const result = unlockSchema.safeParse({
      email: 'student@example.com',
      agreeTerms: true,
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = unlockSchema.safeParse({
      email: 'not-an-email',
      agreeTerms: true,
    });
    expect(result.success).toBe(false);
  });

  it('rejects unagreed terms', () => {
    const result = unlockSchema.safeParse({
      email: 'student@example.com',
      agreeTerms: false,
    });
    expect(result.success).toBe(false);
  });
});
