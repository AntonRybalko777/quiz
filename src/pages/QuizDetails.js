import { fetchQuizById } from 'api';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function QuizDetails() {
  const params = useParams();
  const [quiz, setQuiz] = useState();

  const location = useLocation();

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
      <Link to={location?.state?.from ?? '/quizzes'}>Back to quizzes</Link>
      {quiz && (
        <>
          <p>Topic: {quiz.topic}</p>
          <p>Level: {quiz.level}</p>
        </>
      )}
    </div>
  );
}
