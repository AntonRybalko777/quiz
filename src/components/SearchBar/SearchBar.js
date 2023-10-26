import { useSearchParams } from 'react-router-dom';
import { Container } from './SearchBar.styled';

export const SearchBar = () => {
  const [params, setParams] = useSearchParams();
  const topic = params.get('topic') ?? '';
  const level = params.get('level') ?? 'all';

  const changeFilters = (topic, value) => {
    params.set(topic, value);
    setParams(params);
  };

  const reset = () => {
    setParams({ topic: '', level: 'all' });
  };

  return (
    <Container>
      <input
        name="topic"
        type="text"
        value={topic}
        onChange={e => changeFilters(e.target.name, e.target.value)}
        placeholder="Search by topic"
      />
      <select
        name="level"
        value={level}
        onChange={e => changeFilters(e.target.name, e.target.value)}
      >
        <option value="all">All</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <button onClick={reset}>Reset</button>
    </Container>
  );
};
