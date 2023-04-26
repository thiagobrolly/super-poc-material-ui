import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

export function Private({ children }: { children: ReactElement }) {
  const { signed, loading } = useAuth();

  if (loading) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to="/" />;
  }

  return children;
}
