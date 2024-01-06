import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';


import BoltIcon from '@mui/icons-material/Bolt';

import { IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';



const LoginHeader = () => {

  

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const url="https://cdn.pixabay.com/photo/2015/11/26/16/28/vintage-1064142_1280.png"
;
  
  
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

          <Typography
            variant="h6"
            noWrap
            //component="div"
            sx={{flexGrow: 1, display: { xs: 'flex', md: 'none', color:'#92fc1c'} }}
          >
            <b>BOLT</b><BoltIcon fontSize="large"/>NEWS
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default LoginHeader;