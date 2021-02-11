import React from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";

type Props = {
  handleUserName: (userName: string) => void;
};

const Top: React.FC<Props> = ({ handleUserName }) => {
  const [userName, setUserName] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const onClick = () => {
    if (userName !== "") {
      handleUserName(userName);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClick();
    }
  };

  return (
    <div>
      <Box py={2} />
      <Typography>AtCoderのユーザー名を入力してください。</Typography>
      <Box display="flex" justifyContent="center" p={3}>
        <TextField
          label="user名を入力"
          value={userName}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <Box px={1} />
        <Button variant="outlined" onClick={onClick}>
          設定
        </Button>
      </Box>
    </div>
  );
};

export { Top };
