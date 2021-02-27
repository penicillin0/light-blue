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
import { getAtCoderStatus, getAizuStatus } from './api/apiClient';
import { AtCoderProblemType, AizuProblemType } from './types/problem';
import { problems } from './data/constants';
import styled from 'styled-components';
import { COLOR } from './utils/ColorUtils';
import {
  getAtCoderDisplayStatus,
  getAizuDisplayStatus,
  getColorFromAtCoderStatus,
  getColorFromAizuStatus,
} from './utils/functions';

function App() {
  const [userName, setUserName] = React.useState<string>('');
  const [atcoderSolvedDatas, setAtcoderSolvedDatas] = React.useState<
    AtCoderProblemType[]
  >([]);
  const [aizuSolvedDatas, setAizuSolvedDatas] = React.useState<
    AizuProblemType[]
  >([]);

  console.log({ userName });

  const handleUserName = (userName: string) => {
    if (userName === '') return;
    setUserName(userName);
  };

  const handleGetUserInfo = async () => {
    const resAtcoder: AtCoderProblemType[] = await getAtCoderStatus(userName);
    setAtcoderSolvedDatas(resAtcoder);
    console.log({ resAtcoder });

    const resAizu: AizuProblemType[] = await getAizuStatus(userName);
    setAizuSolvedDatas(resAizu);
    console.log({ resAizu });
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
                  const endPoint = problem.url
                    .split('/')
                    .splice(-1)[0]
                    .replace('description.jsp?id=', '')
                    .replace('&lang=ja', '');
                  console.log({ endPoint });
                  const isAtcoder = problem.url.includes('atcoder.jp');
                  const isAizu = problem.url.includes('judge.u-aizu.ac.jp');
                  const status = isAtcoder
                    ? getAtCoderDisplayStatus(
                        atcoderSolvedDatas
                          .filter((data) => data.problem_id === endPoint)
                          .map((data) => data.result)
                      )
                    : getAizuDisplayStatus(
                        aizuSolvedDatas
                          .filter((data) => data.problemId === endPoint)
                          .map((data) => data.status)
                      );
                  const atcoderLink = problem.url;
                  return (
                    <TableRow key={problem.title} hover={true}>
                      <TableCell align="right">{problem.problem_id}</TableCell>
                      <TableCell component="th" scope="row">
                        {problem.title}
                      </TableCell>
                      <TableCell align="right">
                        {isAtcoder ? 'atcoder.jp' : 'judge.u-aizu.ac.jp'}
                      </TableCell>
                      <TableCell align="right">
                        {status !== null ? (
                          <Chip
                            variant="outlined"
                            color={
                              isAtcoder
                                ? getColorFromAtCoderStatus(status)
                                : getColorFromAizuStatus(status)
                            }
                            label={status}
                          />
                        ) : (
                          'ー'
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {status !== 'AC' && status !== 'Accept' ? (
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
