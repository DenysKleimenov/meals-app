/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  SxProps,
  Theme,
  TextField,
  Container,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AuthFormState } from '../types/AuthFormState';
import { Error } from '../types/Error';
import {
  isEmailValid,
  isError,
  renderErrorMessage,
} from '../validation/authValidation';
import { signIn, signUp } from '../api/authentication';
import { ErrorNotification } from './ErrorNotification';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { actions } from '../features/authForm/authFormSlice';

const buttonStyles: SxProps<Theme> = {
  bgcolor: '#fff',
  borderRadius: '10px',
  borderColor: '#f2efea',
  color: '#363434',
  fontWeight: 500,
  ':hover': {
    bgcolor: '#000',
    color: 'white',
  },
  ':focus': {
    outline: 'none',
  },
  '&.active': {
    bgcolor: '#000',
    outline: 'none',
    color: 'white',
  },
  '&.MuiButtonGroup-grouped:not(:last-of-type)': {
    borderRight: 'none',
  },
};

const textFieldStyles: SxProps<Theme> = {
  textTransform: 'capitalize',
  width: '100%',
  borderRadius: '10px',
  '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#f2efea' },
  '& .MuiFormHelperText-root.Mui-error': { textTransform: 'none' },
};

export const AuthForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state: RootState) => state);

  const textFields = authState.activeField === 'register'
    ? ['username', 'email', 'password']
    : ['email', 'password'];

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const { name } = event.currentTarget;
    dispatch(actions.setActiveField(name));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(actions.setInputValue({ name, value }));
  };

  const validate = () => {
    const {
      email, password, repeatedPassword, activeField,
    } = authState;
    const isValid = formRef.current?.checkValidity();
    const isRegisterPage = activeField === 'register';

    switch (true) {
      case !isValid:
        formRef.current?.reportValidity();

        return false;
      case !isEmailValid(email):
        dispatch(actions.setError(Error.EMAIL));

        return false;
      case isRegisterPage && !(password === repeatedPassword):
        dispatch(actions.setError(Error.PASSWORDS));

        return false;
      default:
        dispatch(actions.setError(Error.NONE));

        return true;
    }
  };

  const handleSubmit = async () => {
    const {
      activeField, username, email, password,
    } = authState;
    const isValid = validate();
    dispatch(actions.setIsLoading(true));

    if (isValid && activeField === 'register') {
      try {
        await signUp(username, email, password);
        dispatch(actions.reset());
        dispatch(actions.setIsRegistered(true));
      } catch (err) {
        dispatch(actions.setError(Error.EXISTS));
      }
    }

    if (isValid && activeField === 'sign in') {
      try {
        const user = await signIn(email, password);
        localStorage.setItem(
          'user',
          JSON.stringify({ username: user.username, email: user.email }),
        );
        dispatch(actions.reset());
        navigate('/');
      } catch (err) {
        dispatch(actions.setError(Error.INCORRECT));
      }
    }

    dispatch(actions.setIsLoading(false));
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    const { password, repeatedPassword, error } = authState;

    if (error === Error.PASSWORDS && password === repeatedPassword) {
      dispatch(actions.setError(Error.NONE));
    }

    if (error === Error.EMAIL) {
      validate();
    }
  }, [authState.repeatedPassword, authState.password, authState.email]);

  const getValue = (field: keyof AuthFormState) => authState[field];

  return !authState.isRegistered ? (
    <div>
      <Box
        sx={{
          width: 500,
          height: '100%',
          bgcolor: '#fff',
          borderRadius: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: 2,
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="button group"
          sx={{
            height: '40px',
            mt: '20px',
            borderRadius: '10px',
            borderColor: '#f2efea',
          }}
        >
          <Button
            sx={buttonStyles}
            name="sign in"
            onClick={handleClick}
            className={cn({ active: authState.activeField === 'sign in' })}
          >
            Sign in
          </Button>
          <Button
            sx={buttonStyles}
            name="register"
            onClick={handleClick}
            className={cn({ active: authState.activeField === 'register' })}
          >
            Register
          </Button>
        </ButtonGroup>
        <Container
          sx={{
            mt: '20px',
          }}
        >
          <form
            ref={formRef}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {textFields.map((field) => (
              <TextField
                error={isError(field, authState.error)}
                required
                helperText={renderErrorMessage(field, authState.error)}
                autoComplete="on"
                inputProps={{ minLength: '6' }}
                key={field}
                label={field}
                type={field}
                name={field}
                variant="outlined"
                value={getValue(field)}
                onChange={handleChange}
                sx={textFieldStyles}
              />
            ))}
            {authState.activeField === 'register' && (
              <TextField
                error={isError('repeatedPassword', authState.error)}
                required
                helperText={renderErrorMessage(
                  'repeatedPassword',
                  authState.error,
                )}
                autoComplete="on"
                inputProps={{ minLength: '6' }}
                key="repeatedPassword"
                label="repeat password"
                type="password"
                name="repeatedPassword"
                variant="outlined"
                value={authState.repeatedPassword}
                onChange={handleChange}
                sx={textFieldStyles}
              />
            )}
            <LoadingButton
              loading={authState.isLoading}
              variant="contained"
              name={authState.activeField}
              onClick={handleSubmit}
              sx={{
                bgcolor: '#000',
                mt: '30px',
                height: '40px',
                width: '100%',
                borderRadius: '10px',
                ':focus': {
                  outline: 'none',
                },
                ':hover': {
                  bgcolor: '#000',
                },
              }}
            >
              {authState.activeField}
            </LoadingButton>
          </form>
        </Container>
      </Box>
      <ErrorNotification error={authState.error} />
    </div>
  ) : (
    <div style={{ color: '#363434' }}>
      <Typography fontSize="60px">Check your email</Typography>
      <Typography fontSize="28px">
        You have received an email with the activation link
      </Typography>
    </div>
  );
};
