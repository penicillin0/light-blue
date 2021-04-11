import React from 'react';
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
import styled from 'styled-components';
import { COLOR } from '../../utils/ColorUtils';
import { problems } from '../../data/constants';
import { getAtCoderStatus, getAizuStatus } from '../../api/apiClient';
import { AizuProblemType, AtCoderProblemType } from '../../types/problem';
import {
  getAtCoderDisplayStatus,
  getAizuDisplayStatus,
  getColorFromAtCoderStatus,
  getColorFromAizuStatus,
} from '../../utils/functions';
import { UserInfoType } from '../../types/User';

type Props = {
  userNames: UserInfoType | null;
};

const Problems: React.FC<Props> = ({ userNames }) => {
  const [atcoderSolvedDatas, setAtcoderSolvedDatas] = React.useState<
    AtCoderProblemType[]
  >([]);
  const [aizuSolvedDatas, setAizuSolvedDatas] = React.useState<
    AizuProblemType[]
  >([]);

  const getAtCoderInfo = async (
    atcoderUserName: UserInfoType['atcoderUserName']
  ) => {
    if (atcoderUserName === null) {
      return;
    }

    const resAtcoder: AtCoderProblemType[] = await getAtCoderStatus(
      atcoderUserName
    );
    setAtcoderSolvedDatas(resAtcoder);
  };

  const getAizuInfo = async (aizuUserName: UserInfoType['aizuUserName']) => {
    if (aizuUserName === null) {
      return;
    }
    const resAizu: AizuProblemType[] = await getAizuStatus(aizuUserName);
    setAizuSolvedDatas(resAizu);
  };

  React.useEffect(() => {
    const handleGetUserInfo = async () => {
      if (!userNames) {
        return;
      }
      await getAtCoderInfo(userNames.atcoderUserName);
      await getAizuInfo(userNames.aizuUserName);
    };
    handleGetUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainerWrapper>
      こんにちは{userNames?.atcoderUserName} さん
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
              const isAtcoder = problem.url.includes('atcoder.jp');
              // const isAizu = problem.url.includes('judge.u-aizu.ac.jp');
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
                        style={
                          isAtcoder
                            ? {
                                backgroundColor: getColorFromAtCoderStatus(
                                  status
                                ),
                                color: '#FFFFFF',
                                borderColor: 'transparent',
                                borderRadius: '8px',
                              }
                            : {
                                backgroundColor: getColorFromAizuStatus(status),
                                color: '#FFFFFF',
                                borderColor: 'transparent',
                                borderRadius: '8px',
                              }
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
  );
};

const TableContainerWrapper = styled.div`
  background: ${COLOR.LIGHT_GREY};
  padding: 120px 10%;
`;

export { Problems };
