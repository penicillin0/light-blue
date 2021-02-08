import React from "react";
import styled from "styled-components";
import { PRIMERY_COLOR } from "../../utils/ColorUtils";
import HomeIcon from "@material-ui/icons/Home";
import { Button, TextField } from "@material-ui/core";

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <PageContainer>
      <HomeIcon fontSize="large" />
      <TextField label="user名を入力" />
      <Button variant="outlined">設定</Button>
    </PageContainer>
  );
};

export { Header };

const PageContainer = styled.div`
  width: 100%;
  height: 96px;
  background-color: ${PRIMERY_COLOR};
`;
