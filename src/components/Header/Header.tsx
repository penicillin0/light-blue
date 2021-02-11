import React from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/ColorUtils";
import HomeIcon from "@material-ui/icons/Home";
import { Box, Link } from "@material-ui/core";

type Props = {
  userName: string;
};

const Header: React.FC<Props> = ({ userName }) => {
  const atcoderUserPageLink = React.useMemo(
    () => "https://atcoder.jp/users/" + userName,
    [userName]
  );

  return (
    <PageContainer>
      <Box display="flex" justifyContent="center" p={3}>
        {userName !== "" ? (
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
        <Title>LightBlue;</Title>
        <HomeIconWrap fontSize="large" />
      </Box>
    </PageContainer>
  );
};

export { Header };

const Title = styled.h1`
  margin: 0 auto;
  color: ${COLOR.DARK};
`;

const HomeIconWrap = styled(HomeIcon)`
  color: ${COLOR.DARK};
`;

const PageContainer = styled.div`
  width: 100%;
  height: 96px;
  background-color: ${COLOR.PRIMERY_COLOR};
`;
