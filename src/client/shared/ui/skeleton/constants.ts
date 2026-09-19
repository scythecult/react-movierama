export const SkeletonVariant = {
  TEXT: 'text',
  RECT: 'rect',
  CIRCLE: 'circle',
} as const;

export type SkeletonVariantValue = (typeof SkeletonVariant)[keyof typeof SkeletonVariant];
