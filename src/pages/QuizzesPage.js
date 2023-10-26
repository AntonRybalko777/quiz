import { useEffect, useState } from 'react';
import { QuizList } from 'components/QuizList/QuizList';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { fetchQuiz, deleteQuiz } from 'api';
import { ErrMessage } from 'components/ErrMessage';
import { ProgressBar } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

export default function QuizzesPage() {
  const [quizItems, setQuizItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [params] = useSearchParams();
  const topic = params.get('topic') ?? '';
  const level = params.get('level') ?? 'all';

  useEffect(() => {
    async function getQuizzes() {
      try {
        setLoading(true);
        setError(false);
        const quizzes = await fetchQuiz();
        setQuizItems(quizzes);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getQuizzes();
  }, []);

  const deleteQuizCard = async quizId => {
    try {
      setLoading(true);
      setError(false);
      const deleteQuizz = await deleteQuiz(quizId);
      setQuizItems(prevState =>
        prevState.filter(quiz => quiz.id !== deleteQuizz.id)
      );
      toast(`Quiz id#${quizId} deleted!`, {
        icon: '👏',
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // const changeFilter = (key, value) => {
  //   setFilters(prevState => ({
  //     ...prevState,
  //     [key]: value,
  //   }));
  // };

  // const resetFilters = () => {
  //   setFilters({ topic: '', level: 'all' });
  // };

  const visibleItems = quizItems.filter(quiz => {
    const topicFilter = topic.toLowerCase();
    const hasTopic = quiz.topic.toLowerCase().includes(topicFilter);

    if (level === 'all') {
      return hasTopic;
    }

    return hasTopic && quiz.level === level;
  });

  return (
    <main>
      <SearchBar />

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
      {visibleItems.length > 0 && (
        <QuizList items={visibleItems} onDelete={deleteQuizCard} />
      )}
    </main>
  );
}
