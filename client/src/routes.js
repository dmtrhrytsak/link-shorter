import { Routes, Route, Navigate } from 'react-router-dom';

import LinksPage from './pages/LinksPage';
import CreatePage from './pages/CreatePage';
import DetailsPage from './pages/DetailsPage';
import AuthPage from './pages/AuthPage';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/details/:linkId" element={<DetailsPage />} />
        <Route path="*" element={<Navigate to="/create" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
