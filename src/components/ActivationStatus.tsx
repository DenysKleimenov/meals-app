import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { activate } from '../api/authentication';

export const ActivationStatus: React.FC = () => {
  const [isActivated, setIsActivated] = useState(false);
  const { activationToken } = useParams();

  const activateAccount = async () => {
    try {
      await activate(String(activationToken));
      setIsActivated(true);
    } catch (err) {
      throw new Error("Couldn't find user");
    }
  };

  useEffect(() => {
    activateAccount();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: isActivated ? '#00e676' : '#b71c1c',
        borderRadius: '16px',
        padding: '40px',
        color: isActivated ? '#363434' : '#fff',
        fontWeight: 500,
        fontSize: '32px',
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <p>
        {isActivated
          ? 'Account was succesfully activated!'
          : 'Something went wrong...'}
      </p>
    </Box>
  );
};
