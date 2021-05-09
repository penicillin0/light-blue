import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';

type Props = {
  title: string;
  problemNum: number;
  description: string;
  backgroundColor: string;
  boderColoder: string;
};

export const ProblemsCard: React.FC<Props> = ({
  title,
  description,
  problemNum,
  backgroundColor,
  boderColoder,
}) => {
  return (
    <div>
      {/* <CardContainer boderColoder={boderColoder}>{title}</CardContainer> */}
      <CardContainer>
        <ImageContainer backgroundColor={backgroundColor}>
          {title}
        </ImageContainer>
        <DescriptionContainer>{description}</DescriptionContainer>
      </CardContainer>
    </div>
  );
};

const CardContainer = styled.div`
  width: 240px;
  ${media.lessThan('large')`
    width: 220px;
  `}
  ${media.lessThan('medium')`
    width: 200px;
  `}
  ${media.lessThan('small')`
    width: 160px;
  `}

  border-radius: 0px 30px 0px 0px;
  box-shadow: 3px 0px 8px -4px rgba(0, 0, 0, 0.6);
  :hover {
    transform: scale(1.1, 1.1);
    cursor: pointer;
    transition: transform 0.5s;
  }
`;

type ImageContainerType = {
  backgroundColor: string;
};

const ImageContainer = styled.div<ImageContainerType>`
  height: 160px;

  ${media.lessThan('medium')`
    height: 130px;
  `}
  ${media.lessThan('small')`
    height: 110px;
  `}
  display: flex;
  align-items: center;
  font-weight: bold;
  border-radius: 0px 30px 0px 0px;
  padding: 10px 25px;
  background-color: ${(props) => props.backgroundColor};
  ${media.lessThan('small')`
    font-size: 15px;
  `}
`;

const DescriptionContainer = styled.div`
  height: 80px;
  ${media.lessThan('small')`
    height: 70px;
  `}
  padding: 24px 14px;
  font-size: 14px;
  ${media.lessThan('small')`
    font-size: 12px;
  `}
  background-color: #fff;
  display: flex;
  align-items: center;
`;
