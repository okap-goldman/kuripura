import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { type ReactNode } from 'react';

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-500"></div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}
