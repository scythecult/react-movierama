import type { JSX } from 'react';
import styles from './styles.module.css';

type ModalContentProps = {
  header: JSX.Element | React.ReactNode;
  content: JSX.Element | React.ReactNode;
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
