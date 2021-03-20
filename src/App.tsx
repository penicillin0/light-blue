import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Top } from './pages/Top';
import { Problems } from './pages/Problems';

function App() {
  const [userName, setUserName] = React.useState<string>('');

  const handleUserName = (userName: string) => {
    if (userName === '') return;
    setUserName(userName);
  };

  return (
    <div className="App">
      <Header userName={userName} />
      {userName === '' ? (
        <Top handleUserName={handleUserName} />
      ) : (
        <Problems userName={userName} />
      )}
    </div>
  );
}

export default App;
