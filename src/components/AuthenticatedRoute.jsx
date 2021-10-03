import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import useAuth from '../hooks/useAuth.js';

const AuthenticatedRoute = ({ children, exact = false }) => {
  const auth = useAuth();

  return (
    <Route
      exact={exact}
      render={({ location }) => (auth.loggedIn
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};

export default AuthenticatedRoute;
