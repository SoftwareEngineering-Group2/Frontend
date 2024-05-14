import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from './Toast'; // Ensure the path to Toast is correct

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    console.log("showToast called with message:", message);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // Toast will disappear after 3 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && <Toast message={toastMessage} />}
    </ToastContext.Provider>
  );
};
