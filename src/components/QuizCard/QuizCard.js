import { InfoWrapper, Container } from './QuizCard.styled';

export const QuizCard = ({
  quiz: { id, topic, level, time, questions },
  onDelete,
}) => {
  return (
    <Container level={level}>
      <h2>{topic}</h2>
      <InfoWrapper>
        <p>Level: {level}</p>
        <p>Time: {time} min</p>
        <p>Questions: {questions}</p>
      </InfoWrapper>
      <button onClick={() => onDelete(id)}>Delete</button>
    </Container>
  );
};
