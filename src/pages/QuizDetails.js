import { fetchQuizById } from 'api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function QuizDetails() {
  const params = useParams();
  const [quiz, setQuiz] = useState();

  useEffect(() => {
    async function getQuiz() {
      try {
        const fetchedQuiz = await fetchQuizById(params.quizId);
        setQuiz(fetchedQuiz);
      } catch (error) {}
    }

    getQuiz();
  }, [params.quizId]);

  return (
    <div>
      QuizDetails id: {params.quizId}
      {quiz && (
        <>
          <p>Topic: {quiz.topic}</p>
          <p>Level: {quiz.level}</p>
        </>
      )}
    </div>
  );
}
