import { Container } from '../container/Container';
import { Info } from '../info/Info';
import { Legend } from '../legend/Legend';
import { MoviePicker } from '../movie-picker/MoviePicker';
import { Screen } from '../screen/Screen';
import { Seats } from '../seats/Seats';
import styles from './styles.module.css';

export const App = () => {
  return (
    <div className={styles.layout}>
      <MoviePicker />
      <Legend />
      <Container>
        <Screen />
        <Seats />
      </Container>
      <Info />
    </div>
  );
};
