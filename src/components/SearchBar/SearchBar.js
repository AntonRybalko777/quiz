import { Container } from './SearchBar.styled';

export const SearchBar = ({
  filters: { level, topic },
  onChangeFilter,
  onReset,
}) => {
  return (
    <Container>
      <input
        type="text"
        value={topic}
        onChange={evt => onChangeFilter('topic', evt.target.value)}
        placeholder="Search by topic"
      />
      <select
        value={level}
        onChange={evt => onChangeFilter('level', evt.target.value)}
      >
        <option value="all">All</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <button onClick={onReset}>Reset</button>
    </Container>
  );
};