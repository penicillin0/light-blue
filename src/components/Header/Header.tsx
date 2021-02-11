import React from "react";
import styled from "styled-components";
import { PRIMERY_COLOR } from "../../utils/ColorUtils";
import HomeIcon from "@material-ui/icons/Home";
import { Box } from "@material-ui/core";

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <PageContainer>
      <Box display="flex" justifyContent="center" p={3}>
        <Title>LightBlue;</Title>
        <HomeIcon fontSize="large" />
      </Box>
    </PageContainer>
  );
};

export { Header };

const Title = styled.h1`
  margin: 0 auto;
`;

const PageContainer = styled.div`
  width: 100%;
  height: 96px;
  background-color: ${PRIMERY_COLOR};
`;
