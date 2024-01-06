import { Box, Container, Grid, Button, Typography, Card, CardContent, CardActions, TextField } from "@mui/material";
import { Link,Routes,Route } from 'react-router-dom';
import AllNews from "../Components/UserComponents/AllNews";
import Reports from "../Components/UserComponents/Reports";
import Header from './../Components/Header';



const User = () => {

    return (

     <>
        <Header/>
        <Grid container style={{
            minWidth: "100%",
            height: "100%",
        }}>
            <Grid item xs={12} sm={2} style={{}}>
                <Box component='div' sx={{ display: 'flex', flexDirection: 'column' }}>


                    <Box sx={{ display:'flex',alignItems:'center' }} component='div'  mb={0.5} pt={3} pb={3} pl={0.5} pr={0.5} >
                        <Button  variant="contained" color="success" component={Link} to="/user/reports">Reports</Button>
                    </Box>

                   
                </Box>

            </Grid>

            <Grid item xs={12} sm={10} style={{
                height: "100%",
            }}>

                <Container>
                    <Box>
                       <Routes>
                           <Route index element={<Reports/>} />
                       </Routes>
                    </Box>
                </Container>

            </Grid>

        </Grid>
     </>



    )
}

export default User;