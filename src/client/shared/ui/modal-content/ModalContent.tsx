import type { ReactNode } from 'react';
import styles from './styles.module.css';

type ModalContentProps = {
  header: ReactNode;
  content: ReactNode;
};

export const ModalContent = (props: ModalContentProps) => {
  const { header, content } = props;

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalContentHeader}>{header}</div>

      <div className={styles.modalContentContent}>{content}</div>
    </div>
  );
};
