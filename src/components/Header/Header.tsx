import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../utils/ColorUtils';
import HomeIcon from '@material-ui/icons/Home';
import { Box, Link } from '@material-ui/core';

type Props = {
  userName: string;
};

const Header: React.FC<Props> = ({ userName }) => {
  const atcoderUserPageLink = React.useMemo(
    () => 'https://atcoder.jp/users/' + userName,
    [userName]
  );

  return (
    <PageContainer>
      <LeftContainer>
        {userName !== '' ? (
          <p>
            こんにちは
            <Box pr={1} component="span" />
            <Link href={atcoderUserPageLink}>{userName}</Link>
            <Box pr={1} component="span" />
            さん
          </p>
        ) : (
          <p />
        )}
      </LeftContainer>
      <TitleContainer>
        <Title>LightBlue;</Title>
      </TitleContainer>
      <RightContainer>
        <HomeIconWrap fontSize="large" />
      </RightContainer>
    </PageContainer>
  );
};

export { Header };

const PageContainer = styled.div`
  width: 100%;
  height: 96px;
  background-color: ${COLOR.PRIMERY_COLOR};
  display: flex;
  align-items: center;
`;

const LeftContainer = styled.div`
  width: 23%;
  text-align: left;
  margin-left: 2%;
`;

const TitleContainer = styled.div`
  width: 50%;
`;

const RightContainer = styled.div`
  text-align: right;
  width: 23%;
  margin-right: 2%;
`;

const Title = styled.h1`
  margin: 0 auto;
  color: ${COLOR.DARK};
`;

const HomeIconWrap = styled(HomeIcon)`
  color: ${COLOR.DARK};
`;
