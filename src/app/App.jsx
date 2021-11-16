import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import AuthProvider from '../components/AuthProvider.jsx';
import AuthenticatedRoute from '../components/AuthenticatedRoute.jsx';

import Root from '../pages/Root.jsx';
import Login from '../pages/Login.jsx';
import SignUp from '../pages/SignUp.jsx';
import NotFound from '../pages/NotFound.jsx';

const App = function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <AuthenticatedRoute exact path="/">
            <Root />
          </AuthenticatedRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
