import { useParams } from 'react-router';

export const FilmPage = () => {
  const params = useParams();

  return <div>Selected film page {params.id}</div>;
};
