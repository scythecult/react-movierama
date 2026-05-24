import { type PropsWithChildren, useState } from 'react';
import { ModalContext, type RenderModalProps } from './Modal.context';
import { ModalUi, type ModalUiProps } from './ui/Modal.ui';

type ModalProviderProps = PropsWithChildren;

export const ModalProvider = (props: ModalProviderProps) => {
  const { children } = props;
  const [modalProps, setModalProps] = useState<ModalUiProps>();

  const closeModal = () => modalProps?.onClose();

  const renderModal = (props: RenderModalProps) => {
    setModalProps({
      ...props,
      onClose: () => setModalProps(undefined),
    });
  };

  return (
    <ModalContext value={{ renderModal, closeModal }}>
      {children}

      {/* modalProps is responsible for Modal visibility */}
      {modalProps && <ModalUi {...modalProps} />}
    </ModalContext>
  );
};
