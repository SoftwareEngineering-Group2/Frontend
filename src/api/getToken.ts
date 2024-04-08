import { useAuthentication } from '../hooks/useAuth';
import { useEffect, useState } from 'react';

export const useToken = () => {
  const { user } = useAuthentication();
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult(true);
          setToken(tokenResult.token);
        } catch (error) {
          console.error('Error fetching token', error);
        }
      }
    };

    fetchToken();
  }, [user]);

  return token;
}