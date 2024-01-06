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
import {Grid, InputLabel, FormControl, Select, SelectChangeEvent } from "@mui/material";
import HeaderSelectLocation from './HeaderSelectLocation';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
 
const Header = () => {
 
  const loc = [
  {key:1, category: 'Politics'},
  {key:2, category: 'Culture'},
  {key:3, category: 'Health'},
  {key:4, category: 'Technology'},
  {key:5, category: 'Science'},
  {key:6, category: 'Philosophy'},
  {key:7, category: 'Sports'}]
 
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [ showLocationOption, setShowLocationOption] = useState(true)
 
  const [ color, setColor ] = useState("white")
 
  const navigate = useNavigate()
 
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
    setShowLocationOption(false)
  };
 
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
 
  const handleLocation = () => {
   
  }
 
  const handleClick = () => {
    setShowLocationOption(true)
    navigate('/')
  }
 
 
  let id=2;
 
  return (
    <AppBar position="sticky" sx={{background:' #F5F5F5', }}>
      <Container maxWidth="xl" sx={{color: '#2F2A45'}} >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            // component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color:"#2F2A45"}}
            onClick={handleClick}
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
             
           
           
              <MenuItem key="Politics" onClick={handleCloseNavMenu} component={Link} to={`politics/${loc[0].key}`}>
                  <Typography textAlign="center">Politics</Typography>
              </MenuItem>
 
              <MenuItem key='Culture' onClick={handleCloseNavMenu} component={Link} to={`culture/${loc[1].key}`}>
                  <Typography textAlign="center">Culture</Typography>
              </MenuItem>
 
              <MenuItem key="Health" onClick={handleCloseNavMenu} component={Link} to={`health/${loc[2].key}`}>
                  <Typography textAlign="center">Health</Typography>
              </MenuItem>
              <MenuItem key="Technology" onClick={handleCloseNavMenu} component={Link} to={`technology/${loc[3].key}`}>
                  <Typography textAlign="center">Technology</Typography>
              </MenuItem>
              <MenuItem key="Science" onClick={handleCloseNavMenu} component={Link} to={`science/${loc[4].key}`}>
                  <Typography textAlign="center">Science</Typography>
              </MenuItem>
              <MenuItem key="Philosophy" onClick={handleCloseNavMenu} component={Link} to={`philosophy/${loc[5].key}`}>
                  <Typography textAlign="center">Philosophy</Typography>
              </MenuItem>
              <MenuItem key="Sports" onClick={handleCloseNavMenu} component={Link} to={`sports/${loc[6].key}`}>
                  <Typography textAlign="center">Sports</Typography>
              </MenuItem>
              <MenuItem key="Location" onClick={handleLocation} >
                {
                  showLocationOption ? <HeaderSelectLocation color={"#2F2A45"}/> : ""
                }  
              </MenuItem>
 
            </Menu>
          </Box>
 
          <Typography
            variant="h6"
            noWrap
            // component="div"
            onClick={handleClick}
            sx={{flexGrow: 1, display: { xs: 'flex', md: 'none', color:'#2F2A45'} }}
          >
            <b>BOLT</b><BoltIcon fontSize="large"/>NEWS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           
            <Button
                key="Politics"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#050833', display: 'block' }}
                component={Link} to={`politics/${loc[0].key}`}
              >
                Politics
              </Button>
              
              <Button
                key="Culture"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#050833', display: 'block' }}
                component={Link}  to={`culture/${loc[1].key}`}
              >
                Culture
              </Button>
 
              <Button
                key="Health"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#050833', display: 'block' }}
                component={Link} to={`health/${loc[2].key}`}
              >
                Health
              </Button>
 
              <Button
                key="Technology"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#050833', display: 'block' }}
                component={Link} to={`technology/${loc[3].key}`}
              >
                Technology
              </Button>
 
              <Button
                key="Science"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#050833', display: 'block' }}
                component={Link} to={`science/${loc[4].key}`}
              >
                Science
              </Button>
 
              <Button
                key="Philosophy"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#050833', display: 'block' }}
                component={Link} to={`philosophy/${loc[5].key}`}
              >
                Philosophy
              </Button>
 
              <Button
                key="Sports"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#050833', display: 'block' }}
                component={Link} to={`sports/${loc[6].key}`}
              >
               Sports
              </Button>
              {
                  showLocationOption ? <HeaderSelectLocation/> : ""
              }
             
             
          </Box>
 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Click to Work">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" sx={{backgroundColor:"#2F2A45"}} >
                <WorkOutlineOutlinedIcon color="primary"/>
                </Avatar>
               
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key="Work" onClick={handleCloseUserMenu} component={Link} to='login'>
                  <Typography textAlign="center">Work for us</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
