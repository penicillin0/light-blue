import React from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { COLOR } from '../../utils/ColorUtils';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useSnackbar } from 'notistack';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { UserInfoType } from '../../types/user';

type Props = {
  userNames: UserInfoType;
  updateUserNames: (value: UserInfoType) => void;
};

// 半角 or 全角スペースで始まらない
const WHITE_SPACE_REG_EXP = /^(?!(\s|[[:blank:]])).*$/;

type FormValues = {
  atcoderUserName: string;
  aizuUserName: string;
};

export const Setting: React.FC<Props> = ({ userNames, updateUserNames }) => {
  const { register, handleSubmit, errors } = useForm<FormValues>({
    shouldUnregister: false,
    defaultValues: {
      atcoderUserName: userNames.atcoderUserName ?? undefined,
      aizuUserName: userNames.aizuUserName ?? undefined,
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    updateUserNames(data);
    enqueueSnackbar('Updated', {
      variant: 'success',
      autoHideDuration: 1000,
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
              error={!!errors.atcoderUserName}
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
              error={!!errors.aizuUserName}
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
