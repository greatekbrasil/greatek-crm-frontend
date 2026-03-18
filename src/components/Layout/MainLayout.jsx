import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link as RouterLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const drawerWidth = 240;

function MainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { logout, user, isDirector, isVendedor } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redireciona para o login após o logout
  };

  const drawer = (
    <div>
      <Toolbar sx={{ backgroundColor: theme.palette.primary.main }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" noWrap component="div" sx={{ color: theme.palette.primary.contrastText }}>
            Greatek - Dashboard CRM
          </Typography>
        </Box>
      </Toolbar>
      <List>
        {isVendedor() && (
          <ListItem button component={RouterLink} to="/vendedor/dashboard">
            <DashboardIcon sx={{ mr: 2 }} />
            <ListItemText primary="Meu Dashboard" />
          </ListItem>
        )}
        {isDirector() && (
          <>
            <ListItem button component={RouterLink} to="/diretoria/dashboard">
              <DashboardIcon sx={{ mr: 2 }} />
              <ListItemText primary="Dashboard Diretoria" />
            </ListItem>
            <ListItem button component={RouterLink} to="/diretoria/vendedores">
              <PeopleIcon sx={{ mr: 2 }} />
              <ListItemText primary="Gestão Vendedores" />
            </ListItem>
          </>
        )}
        <ListItem button onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 2 }} />
          <ListItemText primary="Sair" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Greatek - Dashboard CRM
          </Typography>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Olá, {user?.name || 'Usuário'} ({user?.role === 'director' || user?.role === 'diretoria' ? 'Diretor' : 'Vendedor'})
          </Typography>
          {!isMobile && (
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
              Sair
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: theme.palette.background.paper },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, minHeight: '100vh', backgroundColor: theme.palette.background.default }}
      >
        <Toolbar /> {/* Para compensar a altura do AppBar */}
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
