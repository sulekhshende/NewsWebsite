import { Box, Container, Grid, Button, Typography, Card, CardContent, CardActions, TextField } from "@mui/material";
import { Link,Routes,Route } from 'react-router-dom';
import Report from "../Components/FilterComponents/Report";
import Tag from "../Components/FilterComponents/Tag";
import Location from "../Components/FilterComponents/Location";
import Header from './../Components/Header';
const Filter = () => {

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
                        <Button style={{maxWidth: '90px', maxHeight: '30px', minWidth: '90px', minHeight: '30px'}} variant="contained" color="success" component={Link} to="/filter">Tag</Button>
                    </Box>

                    <Box sx={{ display:'flex',alignItems:'center' }} component='div'  mb={0.5} pt={3} pb={3} pl={0.5} pr={0.5} >
                        <Button style={{maxWidth: '90px', maxHeight: '30px', minWidth: '90px', minHeight: '30px'}} variant="contained" color="success" component={Link} to="/filter/report">Report</Button>
                    </Box>

                    <Box sx={{ display:'flex',alignItems:'center' }} component='div'  pt={3} pb={3} pl={0.5} pr={0.5} >
                        <Button style={{maxWidth: '90px', maxHeight: '30px', minWidth: '90px', minHeight: '30px'}}  variant="contained" color="success" component={Link} to="/filter/location">Location</Button>
                       
                    </Box>
                </Box>

            </Grid>

            <Grid item xs={12} sm={10} style={{
                height: "100%",
            }}>

                <Container>
                    <Box>

                       <Routes>

                           <Route index element={<Tag/>}/>
                           <Route path="report" element={<Report/>} />
                           <Route path="location" element={<Location/>} />
                       </Routes>

                    </Box>

                </Container>

            </Grid>

        </Grid>


      </>

    )
}

export default Filter;