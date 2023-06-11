import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages';
import { CalendarPage } from '../calendar';

export const RouterApp = () => {
  const authStatus = 'autheticated';

  return (
    <Routes>
      {authStatus === 'no-autheticated' ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}
      <Route path="/*" element={<Navigate to="auth/login" />} />
    </Routes>
  );
};
