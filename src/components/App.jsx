import { Route, Routes } from 'react-router-dom';
import { Container } from './Container/Container';
import { lazy } from 'react';

const HomePage = lazy(() => import('pages/HomePage'));
const NotFound = lazy(() => import('pages/NotFound'));
const QuizDetails = lazy(() => import('pages/QuizDetails'));
const QuizzesPage = lazy(() => import('pages/QuizzesPage'));
const CreateQuiz = lazy(() => import('pages/CreateQuiz'));

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<HomePage />} />
          <Route path="create" element={<CreateQuiz />} />
          <Route path="quizzes" element={<QuizzesPage />} />
          <Route path="quizzes/:quizId" element={<QuizDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};
