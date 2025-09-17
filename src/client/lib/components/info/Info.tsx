import styles from './styles.module.css';

const getTotalPrice = (price: number, seats: []) => {
  const selectedCount = getSelectedCount(seats);

  return Number(price) * selectedCount || 0;
};

const getSelectedCount = (seats = []) => {
  if (seats.length) {
    return seats.reduce((initial, rows = []) => {
      const selected = rows.filter((seat) => seat);

      return (initial += selected.length);
    }, 0);
  }

  return 0;
};

export const Info = () => {
  const selectedCount = getSelectedCount();
  const totalPrice = getTotalPrice(10, []);

  return (
    <p className={styles.info}>
      You have selected <span>{selectedCount}</span> seats for a&nbsp;price&nbsp;of
      <span> ${totalPrice}</span>
    </p>
  );
};
