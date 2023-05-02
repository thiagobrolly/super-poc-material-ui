import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Private({ element }: { element: ReactElement }) {
  const { signed, loading } = useAuth();

  if (loading) {
    return <div></div>;
  }

  return signed ? element : <Navigate to="/" />;
}
