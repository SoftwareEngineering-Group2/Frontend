import React, { useEffect, useState } from 'react';
import UserStack from './userStack';
import AuthStack from './authStack';
import { useAuthentication } from '../hooks/useAuth';

export default function RootNavigation() {
  const { user } = useAuthentication();
  
  return user ? <UserStack /> : <AuthStack />;
}
