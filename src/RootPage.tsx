import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { useUserNames, useUserNamesUpdate } from './context/UserNamesContext';
import { Problems } from './pages/Problems/Problems';
import { Setting } from './pages/Setting/Setting';
import { Overview } from './pages/Overview/Overview';
import styled from 'styled-components';
import { COLOR } from './utils/ColorUtils';

export const RootPage: React.VFC = () => {
  const userNames = useUserNames();
  const updateUserName = useUserNamesUpdate();

  return (
    <Router>
      <Header userNames={userNames} />
      <Main>
        <Route exact path="/" render={() => <Overview />} />
        <Route
          path="/setting"
          render={() => (
            <Setting userNames={userNames} updateUserNames={updateUserName} />
          )}
        />
        <Route path="/Overview" render={() => <Overview />} />
        <Route
          path="/problems/:id"
          render={() => <Problems userNames={userNames} />}
        />
      </Main>
    </Router>
  );
};

const Main = styled.div`
  background: ${COLOR.PRIMERY_HIGH_LIGHT_COLOR};
`;
