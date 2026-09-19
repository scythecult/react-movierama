export const SpinnerSize = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export type SpinnerSizeValue = (typeof SpinnerSize)[keyof typeof SpinnerSize];
