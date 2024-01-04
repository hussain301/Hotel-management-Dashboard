/** @format */

import { useUser } from '../features/authentication/useUser';
import styled from 'styled-components';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProtectedRoute = ({ children }) => {
  // 1) laod authenticated user
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  // 2) if there is no authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading]);

  // 3) while loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4) if there is a user, render the app

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
