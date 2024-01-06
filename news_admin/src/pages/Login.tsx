import { FormEvent, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from './../redux/reduxHooks';
import { loginUser } from "../redux/apiCalls";




    const validationSchema = Yup.object().shape({
      username: Yup.string()
        .required('username is required')
        .min(6, 'username must be at least 6 characters')
        .max(20, 'username must not exceed 20 characters'),
      // Email:Yup.string()
      // .required('Email is required')
      // .email('Email is invalid'),
      password: Yup.string()
        .required('password is required'),
    });

  

function Login(){
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });


 

  const submitForm = (data:any) => {
    
    //console.log("data on line no 50 in Login.tsx: ",data);
    const user = {
      username: data.username,
      password: data.password
    }
    loginUser(dispatch, user).then(() => {
      navigate('/addnews');
      window.location.reload();
    });
    
  };


  

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        
        <Box component="form" noValidate sx={{ mt: 1 }}  onSubmit={handleSubmit(submitForm)}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="User Name"
            label="User Name"
            {...register('username')} 
            name="username"
            autoFocus
          />
          <p> {errors.username?.message} </p>                
          {/* <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            {...register('Email')} 
            name="Email"
            autoComplete="email"
            autoFocus
          />
           <p> {errors.Email?.message} </p> */}
          <TextField
            margin="normal"
            required
            fullWidth
            {...register('password')} 
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
           <p> {errors.password?.message} </p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
             <Button component={Link} to='/registration'>"Don't have an account? Register"</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>   
    </Container>
  );
}
export default Login;