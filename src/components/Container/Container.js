import { NavLink, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { Header } from './Container.styled';
import { Suspense } from 'react';

const Link = styled(NavLink)`
  margin-right: 5px;
  text-decoration: none;
  &.active {
    color: tomato;
  }
`;

export const Container = () => {
  return (
    <div>
      <Header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/quizzes">Quiz list</Link>
          <Link to="/create">Create quiz</Link>
        </nav>
      </Header>
      <Suspense fallback={'Loading...'}>
        <Outlet />
      </Suspense>

      <Toaster position="top-right" />
    </div>
  );
};
