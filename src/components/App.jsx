import { useEffect, useState } from 'react';
import { QuizList } from './QuizList/QuizList';
import { SearchBar } from './SearchBar/SearchBar';
import { QuizForm } from './QuizForm/QuizForm';
import { fetchQuiz, createQuiz, deleteQuiz } from 'api';
import toast, { Toaster } from 'react-hot-toast';
import { ErrMessage } from './ErrMessage';
import { ProgressBar } from 'react-loader-spinner';

function getInitialFilters() {
  const savedFilters = localStorage.getItem('quiz-filters');
  if (savedFilters !== null) {
    return JSON.parse(savedFilters);
  }
  return {
    topic: '',
    level: 'all',
  };
}

export const App = () => {
  const [quizItems, setQuizItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(getInitialFilters);

  useEffect(
    () => localStorage.setItem('quiz-filters', JSON.stringify(filters)),
    [filters]
  );

  const addQuiz = async newQuiz => {
    try {
      setLoading(true);
      setError(false);
      const quiz = await createQuiz(newQuiz);
      setQuizItems(prevState => [...prevState, quiz]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuizCard = async quizId => {
    try {
      setLoading(true);
      setError(false);
      const deleteQuizz = await deleteQuiz(quizId);
      setQuizItems(prevState => ({
        quizItems: prevState.filter(item => item.id !== deleteQuizz.id),
      }));
      toast(`Quiz id#${quizId} deleted!`, {
        icon: '👏',
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const changeFilter = (key, value) => {
    setFilters(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({ topic: '', level: 'all' });
  };

  const filteredItems = quizItems.filter(quiz => {
    const topicFilter = filters.topic.toLowerCase();
    const hasTopic = quiz.topic.toLowerCase().includes(topicFilter);

    if (filters.level === 'all') {
      return hasTopic;
    }

    return hasTopic && quiz.level === filters.level;
  });

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

  return (
    <div>
      <QuizForm onAdd={addQuiz} />
      <SearchBar
        filters={filters}
        onChangeFilter={changeFilter}
        onReset={resetFilters}
      />

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
      {filteredItems.length > 0 && (
        <QuizList items={filteredItems} onDelete={deleteQuizCard} />
      )}
      <Toaster />
    </div>
  );
};
