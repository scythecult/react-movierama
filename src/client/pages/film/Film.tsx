import { useParams } from 'react-router';

export const Film = () => {
  const params = useParams();

  return <div>Selected film page {params.id}</div>;
};
