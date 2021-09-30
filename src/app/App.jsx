import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Root from '../pages/Root.jsx';
import Login from '../pages/Login.jsx';
import NotFound from '../pages/NotFound.jsx';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Root />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);

export default App;
