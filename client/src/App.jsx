/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import ChatPage from './components/pages/ChatPage';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import SignUpPage from './components/pages/SignUpPage';
import UserContext from './contexts/UserContext';
import useAuth from './hooks/useAuth';

function App() {
  const {
    user, loginHandler, signUpHandler, logoutHandler,
  } = useAuth();

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/chat',
          element: <ProtectedRoute isAllowed={!!user} redirect="/login"><ChatPage user={user} /></ProtectedRoute>,
        },
        {
          element: <ProtectedRoute isAllowed={!user} />,
          children: [
            {
              path: '/signup',
              element: <SignUpPage />,
            },
            {
              path: '/login',
              element: <LoginPage />,
            },
          ],
        },

      ],
    },
  ]);

  return (
    <UserContext.Provider value={{
      user, loginHandler, signUpHandler, logoutHandler,
    }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
