import type { Verification } from '@/content/schema';

/**
 * Pending (unconfirmed) content is shown in development and on preview
 * deployments so reviewers can see it in place, and hidden in production.
 * Override with NEXT_PUBLIC_SHOW_PENDING_CONTENT=true|false.
 */
const flag = process.env.NEXT_PUBLIC_SHOW_PENDING_CONTENT;
export const SHOW_PENDING =
  flag === 'true' ? true : flag === 'false' ? false : process.env.NODE_ENV !== 'production';

export function isPublishable(item: { verification: Verification }): boolean {
  return item.verification === 'verified' || SHOW_PENDING;
}

export function publishable<T extends { verification: Verification }>(items: readonly T[]): T[] {
  return items.filter(isPublishable);
}
