import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Top } from './pages/Top';
import { Problems } from './pages/Problems';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserInfoType } from './types/user';

function App() {
  const [userNames, setAUserNames] = React.useState<UserInfoType | undefined>();

  const handleUserNames = (userNames: UserInfoType | undefined) => {
    setAUserNames(userNames);
  };

  return (
    <div className="App">
      <Router>
        <Header userNames={userNames} />
        <Route
          exact
          path="/"
          render={() => <Problems userNames={userNames} />}
        />
        <Route
          path="/setting"
          render={() => <Top handleUserNames={handleUserNames} />}
        />
      </Router>
    </div>
  );
}

export default App;
