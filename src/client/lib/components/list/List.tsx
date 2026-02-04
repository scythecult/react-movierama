import clsx from 'clsx';
import type { HTMLAttributes, JSX } from 'react';
import type { PropsWithClassName } from '../../types/PropsWithClassName';

export type ListProps<ItemType> = HTMLAttributes<HTMLDivElement> &
  PropsWithClassName<{
    items: ItemType[];
    renderItem: (item: ItemType) => JSX.Element;
  }>;

export const List = <ItemType,>(props: ListProps<ItemType>) => {
  const { renderItem, items, className, ...restProps } = props;
  const classNameFinal = clsx(className);

  return (
    <div className={classNameFinal} {...restProps}>
      {items.map((item) => renderItem(item))}
    </div>
  );
};
