import { type PropsWithChildren, useState } from 'react';
import { CommonModalContext, type CommonModalProps } from '../../../shared/lib/common-modal';
import { Modal, type ModalProps } from '../../../shared/ui/modal/Modal';

type ModalsProps = PropsWithChildren;

export const Modals = (props: ModalsProps) => {
  const { children } = props;
  const [modalProps, setModalProps] = useState<ModalProps>();

  const closeModal = () => modalProps?.onClose();

  const getCommonModal = (props: CommonModalProps) => {
    setModalProps({
      ...props,
      onClose: () => setModalProps(undefined),
    });
  };

  return (
    <CommonModalContext value={{ getCommonModal, closeModal }}>
      {children}

      {/* modalProps is responsible for Modal visibility */}
      {modalProps && <Modal {...modalProps} />}
    </CommonModalContext>
  );
};
