import CreateQuiz from 'pages/CreateQuiz';
import HomePage from 'pages/HomePage';
import NotFound from 'pages/NotFound';
import QuizDetails from 'pages/QuizDetails';
import QuizzesPage from 'pages/QuizzesPage';
import { Route, Routes } from 'react-router-dom';

import { Container } from './Container';

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
