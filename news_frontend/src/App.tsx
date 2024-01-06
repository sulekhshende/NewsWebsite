import React from 'react';
import './App.css'
import Header from './Components/Header';
import {BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Home from './Pages/Home';
import Filter from './Pages/Filter';
import User from './Pages/User';
import Reporter from './Pages/Reporter';
import Login from './Pages/Login';
import { useAppSelector } from './redux/reduxHooks';
import ViewNews from './Components/ViewNews';

function App() {
  const user = useAppSelector((state)=>state.currentUser);
  
  return (
  <BrowserRouter>
   <CssBaseline/>
   
  
  <Routes>
    
    
    <Route path='/' element={user ? <Navigate to="/filter"/> : <Login/>} />
    <Route path='home' element={<Home/>} />
    <Route path='filter/*' element={<Filter/>} />
    <Route path='user/*' element={<User/>} />
    <Route path='reporter/*' element={<Reporter/>} />
    <Route path='viewnews/:id' element={<ViewNews/>} />
  </Routes>
 
  </BrowserRouter>
   
  );
}

export default App;
