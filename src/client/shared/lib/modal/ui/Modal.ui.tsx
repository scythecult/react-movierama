import clsx from 'clsx';
import type { JSX } from 'react';
import { CustomIconName } from '../../../ui/custom-icon/constants';
import { CustomIcon } from '../../../ui/custom-icon/CustomIcon';
import styles from './styles.module.css';

export type ModalUiProps = PropsWithClassName<{
  renderHeader: () => JSX.Element;
  renderBody: () => JSX.Element;
  onClose: () => void;
}>;

export const ModalUi = (props: ModalUiProps) => {
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
