import { Box, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { ProblemsCard } from '../../components/ProblemsCard/ProblemsCard';
import { COLOR } from '../../utils/ColorUtils';

type Props = {};

export const Overview: React.FC<Props> = ({}) => {
  return (
    <PageContainer>
      <Box my={5} mx={10}>
        <Typography variant="h4">問題集一覧</Typography>
      </Box>
      <CardContainerWapper>
        <CardContainer>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(() => (
            <ProblemCardContainer>
              <ProblemsCard
                title="AtCoder Bignner Selection"
                description="これは説明文です。"
                problemNum={10}
              ></ProblemsCard>
            </ProblemCardContainer>
          ))}
        </CardContainer>
      </CardContainerWapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  background: ${COLOR.WHITE};
  height: 100vh;
  padding: 120px 3vw;
`;

const CardContainerWapper = styled.div`
  display: flex;
  /* justify-content: center; */
  /* background-color: black; */
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* width: auto; */
  /* background-color: black; */
`;

const ProblemCardContainer = styled.div`
  padding: 0 2vw;
  margin-bottom: 5%;
`;
