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
import { UserInfoType } from '../../types/user';

type Props = {
  handleUserNames: (userNames: UserInfoType | undefined) => void;
};

// 半角 or 全角スペースで始まらない
const WHITE_SPACE_REG_EXP = /^(?!(\s|[[:blank:]])).*$/;

const Top: React.FC<Props> = ({ handleUserNames }) => {
  const { register, watch, setValue, handleSubmit, errors } = useForm({
    shouldUnregister: false,
  });

  const { enqueueSnackbar } = useSnackbar();
  const userNames = watch();

  React.useEffect(() => {
    if (localStorage.getItem('lightBlue_atcoderUserName') !== null) {
      setValue(
        'atcoderUserName',
        localStorage.getItem('lightBlue_atcoderUserName')
      );
    }
    if (localStorage.getItem('lightBlue_aizuUserName') !== null) {
      setValue('aizuUserName', localStorage.getItem('lightBlue_aizuUserName'));
    }
  }, []);

  const handleOnClick = () => {
    if ('atcoderUserName' in userNames) {
      localStorage.setItem(
        'lightBlue_atcoderUserName',
        userNames.atcoderUserName
      );
    }
    if ('aizuUserName' in userNames) {
      localStorage.setItem('lightBlue_aizuUserName', userNames.aizuUserName);
    }

    const newUserNames = {
      atcoderUserName: userNames.atcoderUserName,
      aizuUserName: userNames.aizuUserName,
    };
    handleUserNames(newUserNames);

    enqueueSnackbar('Your User Name is updated', {
      variant: 'success',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
    });
  };

  React.useEffect(() => {
    console.log(errors.atcoderUserName);
  }, [errors]);

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
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit(handleOnClick)}
            >
              Save
            </Button>
          </Box>
        </FormCard>
      </Box>
    </PageContainer>
  );
};

const ReturnButtonContainer = styled.div`
  padding-top: 2vh;
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

export { Top };
