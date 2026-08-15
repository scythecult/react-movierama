import clsx from 'clsx';
import { type JSX, useState } from 'react';
import styles from './styles.module.css';

type Item<T extends string> = {
  label: T;
  content: () => JSX.Element | React.ReactNode | string;
};

type TabsProps<T extends string> = PropsWithClassName<{
  items: Item<T>[];
  onChange?: (label: T) => void;
}>;

export const Tabs = <T extends string>(props: TabsProps<T>) => {
  const { className, items, onChange } = props;
  const labels = items.map((tab) => tab.label);
  const contentElements = items.map((tab) => tab.content);
  const [currentAction, setCurrentAction] = useState<T>(labels[0]);
  const classNameFinal = clsx(styles.tabs, className);

  const handleTabChange = (label: T) => {
    setCurrentAction(label);
    onChange?.(label);
  };

  const headerContent = labels.map((label) => (
    <button
      key={label}
      className={clsx(styles.tabsButton, { [styles.tabsButtonActive]: label === currentAction })}
      onClick={() => handleTabChange(label)}
      type="button"
    >
      {label}
    </button>
  ));

  const currentContent = contentElements[labels.indexOf(currentAction)]?.();

  return (
    <div className={classNameFinal}>
      <div className={styles.tabsHeader}>{headerContent}</div>

      <div className={styles.tabsContent}>{currentContent}</div>
    </div>
  );
};
