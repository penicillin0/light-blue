import { Button } from '@material-ui/core';
import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Top } from './pages/Top';
import { getAtCoderStatus } from './api/apiClient';
import { problemType } from './types/problem';

function App() {
  const [userName, setUserName] = React.useState<string>('');
  const [atcoderSolvedData, setAtcoderSolvedData] = React.useState<problemType[]>([]);

  console.log({ userName });

  const handleUserName = (userName: string) => {
    if (userName === '') return;
    setUserName(userName);
  };

  const handleGetUserInfo = async () => {
    const res: problemType[] = await getAtCoderStatus(userName);
    setAtcoderSolvedData(res);
  };

  React.useEffect(() => {}, []);

  return (
    <div className="App">
      <Header userName={userName} />
      {userName === '' ? (
        <Top handleUserName={handleUserName} />
      ) : (
        <div>
          こんにちは{userName} さん
          <br />
          <Button variant="contained" color="secondary" onClick={handleGetUserInfo}>
            apiを叩く
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
