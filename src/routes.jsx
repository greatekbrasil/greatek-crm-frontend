import React from 'react';
import { useRoutes } from 'react-router-dom';

// Layouts
import MainLayout from './components/Layout/MainLayout';
import AuthLayout from './components/Layout/AuthLayout';

// Páginas
import LoginPage from './pages/Auth/LoginPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';
import DashboardVendedor from './pages/Vendedor/DashboardVendedor.jsx';
import LeadDetailPage from './pages/Vendedor/LeadDetailPage.jsx';
import DashboardDiretoria from './pages/Diretoria/DashboardDiretoria.jsx';
import SalespersonReportPage from './pages/Diretoria/SalespersonReportPage.jsx';
import VendedoresManagementPage from './pages/Diretoria/VendedoresManagementPage.jsx';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';

// Guards
import AuthGuard from './components/AuthGuard/AuthGuard';

export default function AppRoutes() {
  return useRoutes([
    // Rotas de Autenticação (sem AuthGuard)
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: '/', element: <LoginPage /> },
      ],
    },
    {
      path: '/reset-password',
      element: (
        <AuthGuard>
          <ResetPasswordPage />
        </AuthGuard>
      ),
    },
    {
      path: '/unauthorized',
      element: <AuthLayout />,
      children: [
        { path: '', element: <UnauthorizedPage /> },
      ],
    },

    // Rotas Protegidas (Vendedores)
    {
      path: '/vendedor',
      element: (
        <AuthGuard roles={['vendedor', 'salesman']}> {/* Apenas vendedores podem acessar */}
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        { path: 'dashboard', element: <DashboardVendedor /> },
        { path: 'lead/:leadId', element: <LeadDetailPage /> },
        { path: '*', element: <NotFoundPage /> }, // Catch all para rotas não encontradas dentro de /vendedor
      ],
    },

    // Rotas Protegidas (Diretoria)
    {
      path: '/diretoria',
      element: (
        <AuthGuard roles={['diretoria']}> {/* Apenas diretores podem acessar */}
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        { path: 'dashboard', element: <DashboardDiretoria /> },
        { path: 'vendedor/:vendedorId', element: <SalespersonReportPage /> },
        { path: 'vendedores', element: <VendedoresManagementPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },

    // Rotas Fallback (páginas de erro)
    { path: '*', element: <NotFoundPage /> },
  ]);
}
