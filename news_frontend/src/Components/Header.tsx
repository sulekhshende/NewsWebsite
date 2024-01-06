import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';


import BoltIcon from '@mui/icons-material/Bolt';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useAppDispatch } from '../redux/reduxHooks';
import { logout } from '../redux/userRedux/usersSlice';




const Header = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const url="https://cdn.pixabay.com/photo/2015/11/26/16/28/vintage-1064142_1280.png"
;
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogout(){
    
    setAnchorElNav(null);
    navigate('/');
    dispatch(logout());
    
  }
  
  return (
    <AppBar position="sticky" style={{background:'#2F2A45'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            // component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color:"#92fc1c"}}
            
          >
            <b>BOLT</b><BoltIcon fontSize="large"/>NEWS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
              <MenuItem key="Filter" onClick={handleCloseNavMenu} component={Link} to='/filter' >
                  <Typography textAlign="center">Filter</Typography>
              </MenuItem>

              <MenuItem key='User' onClick={handleCloseNavMenu} component={Link} to='/user'>
                  <Typography textAlign="center">User</Typography>
              </MenuItem>
              <MenuItem key="Reporter" onClick={handleCloseNavMenu} component={Link} to='/reporter'>
                  <Typography textAlign="center">Reporter</Typography>
              </MenuItem>
              <MenuItem key="Logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component={Link} to='/'
            //component="div"
            sx={{flexGrow: 1, display: { xs: 'flex', md: 'none', color:'#92fc1c'} }}
          >
            <b>BOLT</b><BoltIcon fontSize="large"/>NEWS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:'flex-end' }}>
           
            <Button
                key="Filter"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link} to='/filter'
              >
               Filter
              </Button>

              <Button
                key="User"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link} to='/user'
              >
                User
              </Button>

              <Button
                key=" Reporter"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link} to='/reporter'
              >
                Reporter
              </Button>

              <Button
                key="Logout"
                onClick={handleLogout}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Logout
              </Button>
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;