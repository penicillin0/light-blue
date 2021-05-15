import React from 'react';
import {
  Chip,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from '@material-ui/core';
import styled from 'styled-components';
import { programs } from '../../data/constants';
import { getAtCoderStatus, getAizuStatus } from '../../api/apiClient';
import { AizuProblemType, AtCoderProblemType } from '../../types/response';
import {
  getAtCoderDisplayStatus,
  getAizuDisplayStatus,
  getColorFromAtCoderStatus,
  getColorFromAizuStatus,
} from '../../utils/functions';
import { UserInfoType } from '../../types/user';
import { useParams, Link as DomLink } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Description } from './internal/Description/Description';
import { ProblemType } from '../../types/content';

type Props = {
  userNames: UserInfoType | null;
};

type ParamTypes = {
  id: string;
};

const getTotal = (numArray: number[]) => {
  return numArray.reduce(function (sum, element) {
    return sum + element;
  }, 0);
};

export const Problems: React.FC<Props> = ({ userNames }) => {
  const params = useParams<ParamTypes>();
  const id = Number(params.id);
  const program = programs.find((program) => program.id === id);

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

  const getEndPoint = (problem: ProblemType) =>
    problem.url
      .split('/')
      .splice(-1)[0]
      .replace('description.jsp?id=', '')
      .replace('&lang=ja', '');

  const getStatus = (
    isAtcoder: boolean,
    isAizu: boolean,
    isYuki: boolean,
    endPoint: string
  ) => {
    if (isAtcoder) {
      return getAtCoderDisplayStatus(
        atcoderSolvedDatas
          .filter((data) => data.problem_id === endPoint)
          .map((data) => data.result)
      );
    }
    if (isAizu) {
      return getAizuDisplayStatus(
        aizuSolvedDatas
          .filter((data) => data.problemId === endPoint)
          .map((data) => data.status)
      );
    }
  };

  const getDomain = (url: string) => {
    return new URL(url).hostname;
  };

  const getAcNum = (problems: ProblemType[]) => {
    const acNum = getTotal(
      problems.map((problem) => {
        const endPoint = getEndPoint(problem);
        const domain = getDomain(problem.url);
        const isAtcoder = domain.includes('atcoder.jp');
        const isAizu = domain.includes('judge.u-aizu.ac.jp');
        const isYuki = domain.includes('yukicoder.me');
        const status = getStatus(isAtcoder, isAizu, isYuki, endPoint);
        if (status === 'AC' || status === 'Accept') {
          return 1;
        }
        return 0;
      })
    );
    return acNum;
  };

  return (
    <TableContainerWrapper>
      <ReturnButtonContainer>
        <DomLink to="/" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none' }}
          >
            <ArrowBackIcon />
            &nbsp; Problem List
          </Button>
        </DomLink>
      </ReturnButtonContainer>
      <Box py={4}>
        <Description
          program={program}
          acNum={getAcNum(program?.problems as ProblemType[])}
        />
      </Box>
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
            {program?.problems.map((problem) => {
              const endPoint = getEndPoint(problem);
              const domain = getDomain(problem.url);
              const isAtcoder = domain.includes('atcoder.jp');
              const isAizu = domain.includes('judge.u-aizu.ac.jp');
              const isYuki = domain.includes('yukicoder.me');
              const status = getStatus(isAtcoder, isAizu, isYuki, endPoint);
              const link = problem.url;
              return (
                <TableRow key={problem.title} hover={true}>
                  <TableCell align="right">{problem.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {problem.title}
                  </TableCell>
                  <TableCell align="right">{domain}</TableCell>
                  <TableCell align="right">
                    {status ? (
                      <Chip
                        variant="outlined"
                        style={
                          isAtcoder
                            ? {
                                backgroundColor: getColorFromAtCoderStatus(
                                  status as string
                                ),
                                color: '#FFFFFF',
                                borderColor: 'transparent',
                                borderRadius: '8px',
                              }
                            : {
                                backgroundColor: getColorFromAizuStatus(
                                  status as string
                                ),
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
                      <Link href={link} color="secondary">
                        Solve It !!!
                      </Link>
                    ) : (
                      <Link href={link}>link</Link>
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

const ReturnButtonContainer = styled.div`
  padding-left: 2vh;
  text-align: left;
`;

const TableContainerWrapper = styled.div`
  min-height: calc(100vh - 120px);
  padding: 120px 10% 0px 10%;
`;
