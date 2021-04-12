import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../utils/ColorUtils';
import SettingsIcon from '@material-ui/icons/Settings';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { UserInfoType } from '../../types/User';

type Props = {
  userNames: UserInfoType;
};

const Header: React.FC<Props> = ({ userNames }) => {
  const atcoderUserPageLink = React.useMemo(
    () => 'https://atcoder.jp/users/' + userNames?.atcoderUserName,
    [userNames]
  );

  return (
    <PageContainer>
      <LeftContainer>
        {userNames && (
          <p>
            こんにちは
            <Box pr={1} component="span" />
            <a href={atcoderUserPageLink}>{userNames.atcoderUserName}</a>
            <Box pr={1} component="span" />
            さん
          </p>
        )}
      </LeftContainer>
      <TitleContainer>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Title>LightBlue;</Title>
        </Link>
      </TitleContainer>
      <RightContainer>
        <Link to="/setting" style={{ textDecoration: 'none' }}>
          <SettingIconWrap fontSize="large" />
        </Link>
      </RightContainer>
    </PageContainer>
  );
};

export { Header };

const PageContainer = styled.div`
  z-index: 999;
  position: fixed;
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
  width: 200px;
  margin: 0 auto;
  color: ${COLOR.DARK};
  :hover {
    color: ${COLOR.GREY};
  }
`;

const SettingIconWrap = styled(SettingsIcon)`
  color: ${COLOR.DARK};
  :hover {
    color: ${COLOR.GREY};
  }
`;
