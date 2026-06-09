import type { JSX } from 'react';
import { createStrictContext, useStrictContext } from '../react';

export type RenderModalProps = {
  renderHeader: () => JSX.Element;
  renderBody: () => JSX.Element;
  className?: string;
};

export type ModalContextProps = {
  renderModal: (props: RenderModalProps) => void;
  closeModal: () => void;
};

export const ModalContext = createStrictContext<ModalContextProps>();

export const useRenderModal = () => {
  const { renderModal } = useStrictContext(ModalContext);

  return renderModal;
};
