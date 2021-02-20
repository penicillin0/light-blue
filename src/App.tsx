import { Button } from '@material-ui/core';
import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Top } from './pages/Top';
import { getAtCoderStatus } from './api/apiClient';
import { problemType } from './types/problem';
import { problems } from './data/constants';

function App() {
  const [userName, setUserName] = React.useState<string>('');
  const [atcoderSolvedData, setAtcoderSolvedData] = React.useState<
    problemType[]
  >([]);
  const [solvedProblemIds, setSolvedProblemIds] = React.useState<Set<string>>(
    new Set()
  );

  console.log({ userName });

  const handleUserName = (userName: string) => {
    if (userName === '') return;
    setUserName(userName);
  };

  const handleGetUserInfo = async () => {
    const res: problemType[] = await getAtCoderStatus(userName);
    setAtcoderSolvedData(res);
    console.log(res);
    setSolvedProblemIds(
      new Set(res.filter((r) => r.result === 'AC').map((r) => r.problem_id))
    );
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
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGetUserInfo}
          >
            apiを叩く
          </Button>
          {problems.map((problem) => {
            const endPoint = problem.url.split('/').splice(-1)[0];
            const isAtcoder = problem.url.includes('atcoder.jp');
            if (!isAtcoder) {
              return <p>{problem.problem_id}-AtCoderの問題ではありません。</p>;
            }
            if (solvedProblemIds.has(endPoint)) {
              return (
                <p>
                  {problem.problem_id}-{problem.title}解いています
                </p>
              );
            } else {
              return (
                <p>
                  {problem.problem_id}-{problem.title}解いてません
                </p>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default App;
