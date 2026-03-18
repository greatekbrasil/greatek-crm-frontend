import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function AuthGuard({ children, roles }) {
  const { isAuthenticated, isInitialized, user } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Regra de Primeiro Acesso: Se precisa resetar, SÓ pode ver a página de reset
  if (user?.mustReset) {
    if (location.pathname !== '/reset-password') {
      return <Navigate to="/reset-password" replace />;
    }
  } else {
    // Se NÃO precisa resetar e tentou entrar na página de reset, manda pro dashboard
    if (location.pathname === '/reset-password') {
      const target = user?.role === 'diretoria' ? '/diretoria/dashboard' : '/vendedor/dashboard';
      return <Navigate to={target} replace />;
    }
  }

  // Verificação de Roles (após passar pelo reset ou se não precisar)
  if (roles && !roles.includes(user?.role)) {
    console.warn(`Acesso negado para ${user?.email}. Role esperado: ${roles}`);
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
}


export default AuthGuard;
