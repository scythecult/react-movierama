import { fireEvent, render, screen } from '@testing-library/react';
import { MOCK_LOCATIONS } from '../../../../../../../mocks/data/locations';
import { LocationsItem } from './LocationsItem';
import styles from './styles.module.css';

const moscow = MOCK_LOCATIONS[0];

describe('LocationsItem', () => {
  test('should mark the current city and report its id', () => {
    const onClick = vi.fn();

    render(<LocationsItem location={moscow} currentLocationId={moscow.id} onClick={onClick} />);

    const button = screen.getByRole('button', { name: moscow.name });

    expect(button.classList.contains(styles.locationsButtonActive)).toBe(true);

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledWith(moscow.id);
  });

  test('should not mark a city that is not current', () => {
    render(<LocationsItem location={moscow} currentLocationId={moscow.id + 1} onClick={vi.fn()} />);

    expect(screen.getByRole('button', { name: moscow.name }).classList.contains(styles.locationsButtonActive)).toBe(
      false,
    );
  });
});
