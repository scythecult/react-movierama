import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { CustomIconName } from '../custom-icon/constants';
import { CustomIcon } from '../custom-icon/CustomIcon';
import styles from './styles.module.css';

export type ModalPortalProps = PropsWithChildren<
  PropsWithClassName<{
    onClose: () => void;
  }>
>;

// TODO Use 'react-focus-lock';
export const ModalPortal = (props: ModalPortalProps) => {
  const { children, className, onClose } = props;
  const classNameFinal = clsx(styles.modal, className);
  const modalRootNode = document.getElementById('modals');

  if (!modalRootNode) {
    return null;
  }

  const modalContent = (
    <>
      <div onClick={onClose} className={styles.modalOverlay} data-test-id="modal-overlay"></div>
      <div className={classNameFinal} data-test-id="modal" data-modal>
        <div className={styles.modalContent}>
          <button className={styles.modalClose} onClick={onClose} data-test-id="modal-close" aria-label="close-modal">
            <CustomIcon name={CustomIconName.CROSS} />
          </button>

          {children}
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, modalRootNode);
};
