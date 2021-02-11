import React from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";

type Props = {};

const Top: React.FC<Props> = ({}) => {
  return (
    <div>
      <Box py={2} />
      <Typography>AtCoderのユーザー名を入力してください。</Typography>
      <Box display="flex" justifyContent="center" p={3}>
        <TextField label="user名を入力" />
        <Box px={1} />
        <Button variant="outlined">設定</Button>
      </Box>
    </div>
  );
};

export { Top };
