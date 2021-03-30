import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Top } from './pages/Top';
import { Problems } from './pages/Problems';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  const [userName, setUserName] = React.useState<string>('');

  const handleUserName = (userName: string) => {
    if (userName === '') return;
    setUserName(userName);
  };

  return (
    <div className="App">
      <Header userName={userName} />
      <Router>
        <Route exact path="/" component={Problems} />
        <Route
          path="/setting"
          render={() => <Top handleUserName={handleUserName} />}
        />
      </Router>
    </div>
  );
}

export default App;
