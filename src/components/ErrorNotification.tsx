import { Alert, AlertTitle } from '@mui/material';
import cn from 'classnames';
import { useEffect } from 'react';
import { Error } from '../types/Error';
import '../index.css';
import { useAppDispatch } from '../app/hooks';
import { actions } from '../features/authForm/authFormSlice';

interface Props {
  error: Error;
}

export const ErrorNotification: React.FC<Props> = ({ error }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (error === Error.EXISTS || error === Error.INCORRECT) {
        dispatch(actions.setError(Error.NONE));
      }
    }, 3000);
  }, [error]);

  return (
    <Alert
      severity="error"
      sx={{
        transition: 'opacity 0.3s',
        borderRadius: '10px',
        position: 'relative',
        height: '65px',
        left: 0,
        top: 0,
        border: '1px solid red',
        mt: '20px',
        '&.error-notification': {
          transitionProperty: 'opacity, min-height',
          transitionDuration: '1s',
        },
        '&.hidden': {
          opacity: 0,
          minHeight: 0,
          pointerEvents: 'none',
        },
      }}
      className={cn('error-notification', {
        hidden: error !== Error.EXISTS && error !== Error.INCORRECT,
      })}
    >
      <AlertTitle>Error</AlertTitle>
      {error !== Error.NONE && error}
    </Alert>
  );
};
