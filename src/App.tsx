import {
  Button,
  Chip,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Top } from './pages/Top';
import { getAtCoderStatus } from './api/apiClient';
import { problemType } from './types/problem';
import { problems } from './data/constants';
import styled from 'styled-components';
import { COLOR } from './utils/ColorUtils';
import {
  getAtCoderDisplayStatus,
  getColorFromAtCoderStatus,
} from './utils/functions';

function App() {
  const [userName, setUserName] = React.useState<string>('');
  const [atcoderSolvedDatas, setAtcoderSolvedDatas] = React.useState<
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
    setAtcoderSolvedDatas(res);
    console.log({ res });
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
        <TableContainerWrapper>
          こんにちは{userName} さん
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGetUserInfo}
          >
            apiを叩く
          </Button>
          <br />
          <TableContainer>
            <Table size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Order</TableCell>
                  <TableCell>Problem Title</TableCell>
                  <TableCell align="right">domain</TableCell>
                  <TableCell align="right">status</TableCell>
                  <TableCell align="right">Problem Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {problems.map((problem) => {
                  const endPoint = problem.url.split('/').splice(-1)[0];
                  const isAtcoder = problem.url.includes('atcoder.jp');
                  const status = getAtCoderDisplayStatus(
                    atcoderSolvedDatas
                      .filter((data) => data.problem_id === endPoint)
                      .map((data) => data.result)
                  );
                  const atcoderLink = problem.url;
                  return (
                    <TableRow key={problem.title} hover={true}>
                      <TableCell align="right">{problem.problem_id}</TableCell>
                      <TableCell component="th" scope="row">
                        {problem.title}
                      </TableCell>
                      <TableCell align="right">
                        {isAtcoder ? 'AtCoder' : 'aizu'}
                      </TableCell>
                      <TableCell align="right">
                        {status !== null ? (
                          <Chip
                            variant="outlined"
                            color={getColorFromAtCoderStatus(status)}
                            label={status}
                          />
                        ) : (
                          'ー'
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {isAtcoder && status !== 'AC' ? (
                          <Link href={atcoderLink} color="secondary">
                            Solve It !!!
                          </Link>
                        ) : (
                          <Link href={atcoderLink}>link</Link>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </TableContainerWrapper>
      )}
    </div>
  );
}

const TableContainerWrapper = styled.div`
  background: ${COLOR.LIGHT_GREY};
  padding-top: 2%;
  padding-left: 10%;
  padding-right: 10%;
`;

export default App;
