import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { activate } from '../api/authentication';

export const ActivationStatus: React.FC = () => {
  const [isActivated, setIsActivated] = useState(false);
  const { activationToken } = useParams();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await activate(String(activationToken));
        setIsActivated(true);
      } catch (err) {
        throw new Error("Couldn't find user with this token");
      }
    };

    activateAccount();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        color: '#363434',
        fontWeight: 500,
        fontSize: '48px',
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        marginTop: '10px',
        padding: '10px',
      }}
    >
      <Link to="/authentication" style={{ fontSize: 24 }}>
        Back to login page
      </Link>
      <p style={{ margin: 0 }}>
        {isActivated
          ? 'Account was succesfully activated!😉'
          : 'Something went wrong🤔'}
      </p>
    </Box>
  );
};
