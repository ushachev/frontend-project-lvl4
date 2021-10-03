import React, { useState } from 'react';

import authContext from '../contexts/authContext.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify({ ...userData }));
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
