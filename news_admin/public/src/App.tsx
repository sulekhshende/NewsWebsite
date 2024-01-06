import React, { createContext, useContext, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Home from './pages/Home'
import Registration from './pages/Registration';
import Login from './pages/Login';
import Reporter from './pages/Reporter';
import AddNews from './components/AddNews';
import Published from './components/Published';
import Culture from './pages/UserRoutes/Culture';
import Sports from './pages/UserRoutes/Sports';
import RepoHeader from './components/RepoHeader';
import FullScreen from './components/FullScreen';
import Health from './pages/UserRoutes/Health';
import Politics from './pages/UserRoutes/Politics';
import Science from './pages/UserRoutes/Science';
import Technology from './pages/UserRoutes/Technology';
import Philosophy from './pages/UserRoutes/Philosophy';
import PublishedFullScreen from './components/PublishedFullScreen';



//for unauthorized access
const Test=()=>{
  return(
    <Box sx={{mt:10}}>
       <h1>404 Not Found</h1>
    </Box>
   
  )
}

function App() {

  const[showNavbar,setShowNavbar]=useState< boolean >(true);   // true for user, false for reporter
  
  return (
    <>
    <CssBaseline/>
      
        <BrowserRouter>
          {showNavbar?<Header/>: <RepoHeader/>}
          <Routes>  
            <Route path='/'  element={<Home showNavbar={showNavbar} setShowNavbar={setShowNavbar}/>}/>
            <Route path='registration'  element={<Registration/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='politics/:category_id' element={<Politics/>}/>
            <Route path='culture/:category_id' element={<Culture/>}/>
            <Route path='sports/:category_id' element={<Sports/>}/>
            <Route path='health/:category_id' element={<Health/>}/>
            <Route path='science/:category_id' element={<Science/>}/>
            <Route path='technology/:category_id' element={<Technology/>}/>
            <Route path='philosophy/:category_id' element={<Philosophy/>}/>
            <Route path='fullscreen/:id' element={<FullScreen/>}/>
            <Route path='*' element={<Test/>}/>

            


            {/* Reporter */}
            {/* <Route path='reporter' element={<Reporter showNavbar={showNavbar} setShowNavbar={setShowNavbar}/>}/> */}
            <Route path='addnews' element={<AddNews setShowNavbar={setShowNavbar} />}/>
            <Route path='publish' element={<Published  setShowNavbar={setShowNavbar}/>}/>
            <Route path='viewnews/:id' element={<PublishedFullScreen setShowNavbar={setShowNavbar}/>}/>
          </Routes>
        </BrowserRouter>
    </>
   
  );
}

export default App;
