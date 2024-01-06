import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import{Link} from 'react-router-dom';
import BoltIcon from '@mui/icons-material/Bolt';
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks';
import { logout } from '../redux/userRedux/usersSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';




const RepoHeader = () => {


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

  function handleCloseNavMenu () {
    
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
    <AppBar position="sticky" sx={{background:' #2F2A45'}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            // component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color:"#92fc1c"}}
            // component={Link} to='/'
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
              
            
            
              <MenuItem key="AddNews" onClick={handleCloseNavMenu} component={Link} to='/addnews' >
                  <Typography textAlign="center">Add News</Typography>
              </MenuItem>

              <MenuItem key='Published' onClick={handleCloseNavMenu} component={Link} to='/publish'>
                  <Typography textAlign="center">Published</Typography>
              </MenuItem>
              <MenuItem key="Logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
              </MenuItem>

            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            // component={Link} to='/'
            //component="div"
            sx={{flexGrow: 1, display: { xs: 'flex', md: 'none', color:'#92fc1c'} }}
          >
            <b>BOLT</b><BoltIcon fontSize="large"/>NEWS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:'flex-end' }}>
           
            <Button
                key="AddNews"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#F5F5F5', display: 'block' }}
                component={Link} to='addnews'
              >
                Add News
              </Button>

              <Button
                key="Published"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#F5F5F5', display: 'block' }}
                component={Link} to='publish'
              >
                Published
              </Button>

              <Button
                key="Logout"
                onClick={handleLogout}
                sx={{ my: 2, color: '#F5F5F5', display: 'block' }}
                
              >
                Logout
              </Button>
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default RepoHeader;