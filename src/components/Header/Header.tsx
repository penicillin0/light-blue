import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../utils/ColorUtils';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import { UserInfoType } from '../../types/user';
import { Box } from '@material-ui/core';
import { Chip, Button } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import media from 'styled-media-query';

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
          <AccountContainer>AtCoder</AccountContainer>
          {userNames.atcoderUserName === '' ? (
            <Link to="/setting" style={{ textDecoration: 'none' }}>
              <Button color="secondary" size="small">
                Login
              </Button>
            </Link>
          ) : (
            <AccountNameContainer href={atcoderUserPageLink}>
              <Chip
                variant="outlined"
                icon={<FaceIcon />}
                clickable
                color="primary"
                label={userNames.atcoderUserName}
              />
            </AccountNameContainer>
          )}
        </UpContainer>
        <DownContainer>
          <AccountContainer>Aizu</AccountContainer>
          {userNames.aizuUserName === '' ? (
            <Link to="/setting" style={{ textDecoration: 'none' }}>
              <Button color="secondary" size="small">
                Login
              </Button>
            </Link>
          ) : (
            <AccountNameContainer href={aizuUserPageLink}>
              <Chip
                variant="outlined"
                icon={<FaceIcon />}
                clickable
                color="primary"
                label={userNames.aizuUserName}
              />
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
        <Link to="/Overview" style={{ textDecoration: 'none' }}>
          <OverviewIconWrap fontSize="large" />
        </Link>
        <Box component="span" px={1} />
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
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  box-shadow: 0px 1px 12px ${COLOR.GREY};
`;
const LeftContainer = styled.div`
  padding-left: 16px;
  text-align: left;
  flex-direction: column;
  color: ${COLOR.DARK};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AccountContainer = styled.div`
  font-size: 18px;
  min-width: 72px;
  display: inline-block;
`;

const AccountNameContainer = styled.a`
  font-size: 18px;
  text-decoration: none;
  color: ${COLOR.DARK};
  :hover {
    color: ${COLOR.GREY};
  }
`;

const UpContainer = styled.div`
  margin-bottom: 3px;
`;

const DownContainer = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2%;
`;
const Title = styled.p`
  width: 200px;
  font-size: 42px;
  ${media.lessThan('medium')`
    font-size: 36px;
  `}
  ${media.lessThan('small')`
    font-size: 30px;
  `}
  font-weight: bold;
  margin: 0 auto;
  color: ${COLOR.DARK};
  :hover {
    color: ${COLOR.GREY};
  }
`;

const OverviewIconWrap = styled(ViewComfyIcon)`
  color: ${COLOR.DARK};
  :hover {
    color: ${COLOR.GREY};
  }
`;

const SettingIconWrap = styled(AccountCircleIcon)`
  color: ${COLOR.DARK};
  :hover {
    color: ${COLOR.GREY};
  }
`;
