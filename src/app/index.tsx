import React, { useEffect, useState } from 'react';

import UserStack from './userStack';
import AuthStack from './authStack';

import { useAuthentication } from '../hooks/useAuth';


export default function RootNavigation() {
  
 /*  const token = useToken(); */  // Directly use the custom hook her

  // This effect updates the authorization token whenever the token changes

  // This assumes useAuthentication is defined elsewhere and working
  const { user } = useAuthentication();
  return user ? <UserStack /> : <AuthStack />;
}
