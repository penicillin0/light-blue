import React from 'react';
import styled from 'styled-components';
import { ProblemsCard } from '../../components/ProblemsCard/ProblemsCard';
import { COLOR } from '../../utils/ColorUtils';
import { programs } from '../../data/constants';
import { useHistory } from 'react-router-dom';
import media from 'styled-media-query';

type Props = {};

export const Overview: React.FC<Props> = () => {
  const history = useHistory();

  const handleOnClick = (id: number) => () => {
    history.push('/problems/' + id);
  };

  return (
    <PageContainer>
      <SubTitle>問題集一覧</SubTitle>
      <CardContainer>
        {programs.map((program) => (
          <ProblemCardContainer onClick={handleOnClick(program.id)}>
            <ProblemsCard
              title={program.title}
              description={program.description}
              problemNum={10}
              backgroundColor={COLOR.SECONDARY_HIGH_LIGHT_COLOR}
              boderColoder={COLOR.SECONDARY_COLOR}
            ></ProblemsCard>
          </ProblemCardContainer>
        ))}
      </CardContainer>
    </PageContainer>
  );
};

const SubTitle = styled.p`
  font-size: 32px;
  margin: 24px 0 24px 0;
  ${media.lessThan('medium')`
    font-size: 24px;
  `}
`;

const PageContainer = styled.div`
  min-height: calc(100vh - 120px);
  padding: 120px 20px 0px 20px;
`;

const CardContainer = styled.div`
  display: grid;
  gap: 36px;
  ${media.lessThan('medium')`
    gap: 24px;
  `}
  grid-template-columns: repeat(5, 1fr);
  ${media.lessThan('huge')`
    grid-template-columns: repeat(4, 1fr);
  `}
  ${media.lessThan('large')`
    grid-template-columns: repeat(3, 1fr);
  `}
  ${media.lessThan('medium')`
    grid-template-columns: repeat(2, 1fr);
  `}
`;

const ProblemCardContainer = styled.div`
  display: flex;
  justify-content: center;
`;
