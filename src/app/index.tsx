import React, { useEffect, useState } from 'react';
import { useToken } from '../api/getToken';
import UserStack from './userStack';
import AuthStack from './authStack';
import httpClient from "../api/httpClient";
import { useAuthentication } from '../hooks/useAuth';


export default function RootNavigation() {
  
  const token = useToken();  // Directly use the custom hook her

  const updateAuthToken = (token: string) => {
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  useEffect(() => {
    if (token) {
      updateAuthToken(token);
    }
  }, [token]);  // This effect updates the authorization token whenever the token changes

    // This assumes useAuthentication is defined elsewhere and working
    const { user } = useAuthentication();
  return user ? <UserStack /> : <AuthStack />;
}
