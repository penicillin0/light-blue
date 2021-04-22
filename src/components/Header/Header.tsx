import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../utils/ColorUtils';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { UserInfoType } from '../../types/User';

type Props = {
  userNames: UserInfoType;
};

export const Header: React.FC<Props> = ({ userNames }) => {
  const atcoderUserPageLink = React.useMemo(
    () => 'https://atcoder.jp/users/' + userNames?.atcoderUserName,
    [userNames]
  );

  const aizuUserPageLink = React.useMemo(
    () =>
      'https://judge.u-aizu.ac.jp/onlinejudge/user.jsp?id=' +
      userNames?.aizuUserName,
    [userNames]
  );

  return (
    <PageContainer>
      <LeftContainer>
        <UpContainer>
          <AccountContainer>AtCoder:</AccountContainer>
          {userNames.atcoderUserName === '' ? (
            <Link to="/setting" style={{ textDecoration: 'none' }}>
              Login
            </Link>
          ) : (
            <AccountNameContainer href={atcoderUserPageLink}>
              {userNames.atcoderUserName}
            </AccountNameContainer>
          )}
        </UpContainer>
        <DownContainer>
          <AccountContainer>Aizu:</AccountContainer>
          {userNames.aizuUserName === '' ? (
            <Link to="/setting" style={{ textDecoration: 'none' }}>
              Login
            </Link>
          ) : (
            <AccountNameContainer href={aizuUserPageLink}>
              {userNames.aizuUserName}
            </AccountNameContainer>
          )}
        </DownContainer>
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

const PageContainer = styled.div`
  z-index: 999;
  position: fixed;
  width: 100%;
  height: 96px;
  background-color: ${COLOR.PRIMERY_COLOR};
  opacity: 0.95;
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 12px ${COLOR.GREY};
`;
const LeftContainer = styled.div`
  width: 23%;
  text-align: left;
  margin-left: 2%;
  display: flex;
  flex-direction: column;
  color: ${COLOR.DARK};
`;

const AccountContainer = styled.div`
  min-width: 80px;
  display: inline-block;
`;

const AccountNameContainer = styled.a`
  text-decoration: none;
  color: ${COLOR.DARK};
  :hover {
    color: ${COLOR.GREY};
  }
`;

const UpContainer = styled.div`
  margin-bottom: 5px;
`;

const DownContainer = styled.div``;

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
