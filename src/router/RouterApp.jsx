import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

export const RouterApp = () => {
  const { checkAuthToken, status } = useAuthStore();
  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <h3>cargado...</h3>;
  }

  return (
    <Routes>
      {status === 'not-autheticated' ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
