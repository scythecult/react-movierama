import type { JSX } from 'react';
import { createStrictContext, useStrictContext } from './react';

export type CommonModalProps = {
  renderHeader: () => JSX.Element;
  renderBody: () => JSX.Element;
  className?: string;
};

export type CommonModalContext = {
  getCommonModal: (props: CommonModalProps) => void;
  closeModal: () => void;
};

export const CommonModalContext = createStrictContext<CommonModalContext>();

export const useGetCommonModal = () => {
  const { getCommonModal } = useStrictContext(CommonModalContext);

  return getCommonModal;
};
