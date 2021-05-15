import React from 'react';
import Circle from 'react-circle';
import styled from 'styled-components';
import { ProblemType, ProgramType } from '../../../../types/content';
import { COLOR } from '../../../../utils/ColorUtils';

type Props = {
  program?: ProgramType;
  acNum: number;
};

export const Description: React.FC<Props> = ({ program, acNum }) => {
  console.log({ program });

  return (
    <div>
      <MainContainer>
        <LeftContainer>
          <Circle
            size={'200'}
            percentSpacing={30}
            animationDuration="1.5s"
            lineWidth="40"
            progress={Math.floor(
              (acNum * 100) / (program?.problems as ProblemType[]).length
            )}
            textColor={COLOR.DARK}
            animate={true}
            bgColor={COLOR.LIGHT_GREY}
            progressColor={COLOR.PRIMERY_COLOR}
            roundedStroke={true}
          />
        </LeftContainer>
        <RightContainer>
          <TitleContainer>{program?.title}</TitleContainer>
          <AcNumContainer>
            {acNum}/{program?.problems.length}
          </AcNumContainer>
          <DetailContainer>{program?.description}</DetailContainer>
        </RightContainer>
      </MainContainer>
    </div>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${COLOR.HIGH_LIGHT_GREY};
`;

const LeftContainer = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.div`
  height: 100%;
  width: 70%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  padding: 30px 0px;
  font-size: 36px;
  height: 30%;
`;

const AcNumContainer = styled.div``;

const DetailContainer = styled.div`
  height: 70%;
  padding: 10px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
