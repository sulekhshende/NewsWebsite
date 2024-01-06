import { Box, Container, Grid, Button, Typography, Card, CardContent, CardActions, TextField } from "@mui/material";
import { Link,Routes,Route } from 'react-router-dom';
import Report from "../Components/FilterComponents/Report";
import Tag from "../Components/FilterComponents/Tag";
import Location from "../Components/FilterComponents/Location";
import Waiting from "../Components/ReporterComponents/Waiting";
import Approved from "../Components/ReporterComponents/Approved";
import Header from "../Components/Header";



const Reporter = () => {

    return (

      <>
        <Header/>
        <Grid container style={{
            minWidth: "100%",
            height: "100%",
        }}>
            <Grid item xs={12} sm={2} style={{}}>
                <Box component='div' sx={{ display: 'flex', flexDirection: 'column' }}>


                    <Box sx={{display:'flex', alignItems:'center'}} component='div' mt={1} mb={0.5} pt={3} pb={3} pl={0.5} pr={0.5} >
                        <Button style={{maxWidth: '120px', maxHeight: '30px', minWidth: '120px', minHeight: '30px'}} variant="contained" color="success" component={Link} to="/reporter">Waiting</Button>
                    </Box>

                    <Box sx={{ display:'flex',alignItems:'center' }} component='div'  mb={0.5} pt={3} pb={3} pl={0.5} pr={0.5} >
                        <Button style={{maxWidth: '120px', maxHeight: '30px', minWidth: '120px', minHeight: '30px'}}  variant="contained" color="success" component={Link} to="/reporter/approved">Approved</Button>
                    </Box>

                   
                </Box>

            </Grid>

            <Grid item xs={12} sm={10} style={{
                height: "100%",
            }}>

                <Container>
                    <Box>
                       <Routes>

                           <Route index element={<Waiting/>}/>
                           <Route path="approved" element={<Approved/>} />
                           
                       </Routes>

                    </Box>

                </Container>

            </Grid>

        </Grid>

      </>


    )
}

export default Reporter;