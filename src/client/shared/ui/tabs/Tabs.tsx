import clsx from 'clsx';
import { type JSX, useState } from 'react';
import styles from './styles.module.css';

type Item = {
  label: string;
  content: JSX.Element | React.ReactNode | string;
};

type TabsProps = PropsWithClassName<{
  items: Item[];
}>;

export const Tabs = (props: TabsProps) => {
  const { className, items } = props;
  const labels = items.map((tab) => tab.label);
  const contentElements = items.map((tab) => tab.content);
  const [currentAction, setCurrentAction] = useState(labels[0]);
  const classNameFinal = clsx(styles.tabs, className);

  const headerContent = labels.map((label) => (
    <button
      key={label}
      className={clsx(styles.tabsButton, { [styles.tabsButtonActive]: label === currentAction })}
      onClick={() => setCurrentAction(label)}
    >
      {label}
    </button>
  ));

  const currentContent = contentElements[labels.indexOf(currentAction)];

  return (
    <div className={classNameFinal}>
      <div className={styles.tabsHeader}>{headerContent}</div>

      <div className={styles.tabsContent}>{currentContent}</div>
    </div>
  );
};
