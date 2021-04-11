import React from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { COLOR } from '../../utils/ColorUtils';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useSnackbar } from 'notistack';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { UserInfoType } from '../../types/User';

type Props = {
  userNames: UserInfoType;
  updateUserNames: (value: UserInfoType) => void;
};

// 半角 or 全角スペースで始まらない
const WHITE_SPACE_REG_EXP = /^(?!(\s|[[:blank:]])).*$/;

export const Setting: React.FC<Props> = () => {
  const { register, watch, setValue, handleSubmit, errors } = useForm({
    shouldUnregister: false,
  });

  const { enqueueSnackbar } = useSnackbar();
  const userNames = watch();

  const onSubmit = () => {
    enqueueSnackbar('Your User Name is updated', {
      variant: 'success',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
    });
  };

  return (
    <PageContainer>
      <ReturnButtonContainer>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none' }}
          >
            <ArrowBackIcon />
            &nbsp; Problem List
          </Button>
        </Link>
      </ReturnButtonContainer>
      <Typography variant="h4">Account Info</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="center" p={3}>
          <FormCard>
            <Typography variant="h5" noWrap={true}>
              AtCoder
            </Typography>
            <Box py={1} />
            <TextField
              name="atcoderUserName"
              error={errors.atcoderUserName}
              helperText={errors.atcoderUserName?.['message']}
              inputRef={register({
                pattern: {
                  value: WHITE_SPACE_REG_EXP,
                  message: 'Invalid input.',
                },
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <Box py={3} />
            <Typography variant="h6">AIZU ONLINE JUDGE</Typography>
            <Box py={1} />
            <TextField
              name="aizuUserName"
              error={errors.aizuUserName}
              helperText={errors.aizuUserName?.['message']}
              inputRef={register({
                pattern: {
                  value: WHITE_SPACE_REG_EXP,
                  message: 'Invalid input.',
                },
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <Box pt={3}>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </FormCard>
        </Box>
      </form>
    </PageContainer>
  );
};

const ReturnButtonContainer = styled.div`
  padding-top: 120px;
  padding-left: 2vh;
  text-align: left;
`;

const PageContainer = styled.div`
  background-color: ${COLOR.PRIMERY_HIGH_LIGHT_COLOR};
  width: 100%;
  height: 100vh;
`;

const FormCard = styled.div`
  padding-top: 20px;
  width: 480px;
  height: 320px;
  background-color: ${COLOR.WHITE};
  box-shadow: 4px 4px 8px ${COLOR.GREY};
`;