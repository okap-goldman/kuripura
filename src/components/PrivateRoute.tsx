import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { type ReactNode } from 'react';

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, isLoading, isInitialized } = useAuth();
  const location = useLocation();

  if (!isInitialized || isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-500"></div>
    </div>;
  }

  if (!user) {
    // 開発環境の場合、モックユーザーを使用
    if (import.meta.env.VITE_DEV_MODE === 'true') {
      return <>{children}</>;
    }
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
