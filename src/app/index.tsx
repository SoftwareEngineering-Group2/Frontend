import React, { useEffect } from 'react';
import { useAuthentication } from '../hooks/useAuth';
import UserStack from './userStack';
import AuthStack from './authStack';

export default function RootNavigation() {
  const { user } = useAuthentication();
  /* console.log(user) */

  return user ? <UserStack /> : <AuthStack />;
}
