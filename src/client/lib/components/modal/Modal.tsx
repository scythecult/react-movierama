import clsx from 'clsx';
import type { JSX } from 'react';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import { CustomIconName } from '../custom-icon/constants';
import { CustomIcon } from '../custom-icon/CustomIcon';
import styles from './styles.module.css';

export type ModalProps = PropsWithClassName<{
  renderHeader: () => JSX.Element;
  renderBody: () => JSX.Element;
  onClose: () => void;
  onClick?: () => void;
}>;

export const Modal = (props: ModalProps) => {
  const { className, renderHeader, renderBody, onClose } = props;
  const classNameFinal = clsx(styles.modal, className);

  return (
    <>
      <div onClick={onClose} className={styles.modalOverlay} data-test-id="modal-overlay"></div>
      <div className={classNameFinal} data-test-id="modal" data-modal>
        <div className={styles.modalHeader}>
          {renderHeader()}

          <button className={styles.modalClose} onClick={onClose} data-test-id="modal-close" aria-label="close-modal">
            <CustomIcon name={CustomIconName.CROSS} />
          </button>
        </div>
        <div className={styles.modalContent}>{renderBody()}</div>
      </div>
    </>
  );
};
