import React from 'react';
import UserStack from './userStack';
import AuthStack from './authStack';
import { useAuthentication } from '../hooks/useAuth';
import { ToastProvider } from '../app/toastProvider'; // Import ToastProvider


export default function RootNavigation() {
  const { user } = useAuthentication();
  
  return (
    <ToastProvider>
      {user ? <UserStack /> : <AuthStack />}
    </ToastProvider>
  );
}