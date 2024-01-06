import { ChangeEvent, FormEvent, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";   
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  Controller } from 'react-hook-form';
import { publicRequest } from './../redux/requestMethod';
import * as Yup from 'yup';
import Popup from "../components/Popup";
import { DialogContent } from "@mui/material";


    const validationSchema = Yup.object().shape({
   
      username: Yup.string()
        .required('username is required')
        .min(6, 'username must be at least 6 characters')
        .max(20, 'username must not exceed 20 characters'),
      email: Yup.string()
        .required('email is required')
        .email('email is invalid'),
      password: Yup.string()
        .required('password is required')
        .min(6, 'password must be at least 6 characters')
        .max(40, 'password must not exceed 10 characters'),
      city: Yup.string()
        .required('city is required')
        .min(2, 'city must be atleast 2 characters')
        .max(15, 'city must not exceed 15 characters')  
    });

  



function Registration() {
    const [buttonPopup, setButtonPopup] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
      });

      

      const submitForm = async (data:any) => {
        //console.log("data : ",data);
        const user = {
          username: data.username,
          email: data.email,
          password: data.password,
          city: data.city
        }
        try {
            const res = await publicRequest.post("/auth/register", user);
            //console.log("line no : 62 response status : " + res.data)
            if(res.statusText === 'Created'){
                setButtonPopup(true)
            }else {
                console.log("something went wrong")
            };
        } catch {

        }
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
                    Register
                </Typography>

                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}></Popup>

                <Box component="form"  noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(submitForm)}>
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="email Address"
                        {...register('email')} 
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                    />
                      <p> {errors.email?.message} </p>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        {...register('password')} 
                        name="password"
                        label="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                      <p> {errors.password?.message} </p>
                    <TextField
                        margin="normal" 
                        required
                        fullWidth
                        id="city"
                        label="city"
                        {...register('city')} 
                        name="city"
                        autoFocus
                    />
                      <p> {errors.city?.message} </p>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        
                    >
                        Sign Up
                    </Button>
                    
                    <Grid container>
                        <Grid item xs>
                           
                            <Button  
                                sx={{ my:1, color: 'red', display: 'block' }}
                                component={Link} to='/login'
                            >
                               Already Have an account? Sign In
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
                               
        </Container>
    );
}
export default Registration;
