import { useState } from 'react';
import { createQuiz } from 'api';
import { QuizForm } from 'components/QuizForm/QuizForm';
import { ErrMessage } from 'components/ErrMessage';
import { ProgressBar } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function CreateQuiz() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const addQuiz = async newQuiz => {
    try {
      setLoading(true);
      setError(false);
      await createQuiz(newQuiz);
      toast.success('Quiz added!');
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link to="/quizzes">Back to quizzes</Link>
      <QuizForm onAdd={addQuiz} />
      {error && (
        <ErrMessage>
          Whoops! Something went wrong... Please reload the page
        </ErrMessage>
      )}

      {loading && (
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      )}
    </div>
  );
}
