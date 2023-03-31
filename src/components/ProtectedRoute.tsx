import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  component: ReactJSXElement,
}

export const ProtectedRoute: React.FC<Props> = ({ component }) => {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('authentication');
    }
  }, [user]);

  return component;
};
