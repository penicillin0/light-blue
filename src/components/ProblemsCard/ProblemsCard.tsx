import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../utils/ColorUtils';

type Props = {
  title: string;
  problemNum: number;
  description: string;
};

export const ProblemsCard: React.FC<Props> = ({
  title,
  description,
  problemNum,
}) => {
  return <CardContainer>{title}</CardContainer>;
};

const CardContainer = styled.div`
  font-size: 2vw;
  width: 19vw;
  height: 19vw;
  border-radius: 20px;
  background-color: ${COLOR.SECONDARY_HIGH_LIGHT_COLOR};
  box-sizing: border-box;
  border: solid 3px ${COLOR.SECONDARY_HIGH_LIGHT_COLOR};
  :hover {
    border: solid 3px ${COLOR.SECONDARY_COLOR};
  }
`;
