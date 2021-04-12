import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { useUserNames, useUserNamesUpdate } from './context/UserNamesContext';
import { Problems } from './pages/Problems';
import { Setting } from './pages/Setting';

export const RootPage: React.VFC = () => {
  const userNames = useUserNames();
  const updateUserName = useUserNamesUpdate();

  return (
    <Router>
      <Header userNames={userNames} />
      <Route exact path="/" render={() => <Problems userNames={userNames} />} />
      <Route
        path="/setting"
        render={() => <Setting userNames={userNames} updateUserNames={updateUserName} />}
      />
    </Router>
  );
};
