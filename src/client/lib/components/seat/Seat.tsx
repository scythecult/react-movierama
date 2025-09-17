import clsx from 'clsx';
import styles from './styles.module.css';

type SeatProps = {
  onClick?: () => void;
  isSelected?: boolean;
  isOccupied?: boolean;
  isDisabled?: boolean;
};

export const Seat = (props: SeatProps) => {
  const { onClick, isSelected, isOccupied, isDisabled = false } = props;
  const classNameFinal = clsx(styles.seat, {
    [styles.selected]: isSelected,
    [styles.occupied]: isOccupied,
    [styles.disabled]: isDisabled,
  });

  return <button className={classNameFinal} onClick={onClick} type="button" disabled={isOccupied}></button>;
};
