import { Box, Grid, Container, Typography, InputLabel, FormControl, MenuItem, Select, SelectChangeEvent, Table, TableContainer, Paper, TableHead, TableCell, TableRow, TableBody, Button } from "@mui/material";
import { useState , useEffect} from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { publicRequest, userRequest } from './../redux/requestMethod';
import CircularProgress from '@mui/material/CircularProgress'

import { useAppSelector } from "../redux/reduxHooks";
import { useNavigate } from 'react-router-dom';
import Header from './Header';
 
type ReportsState = {
    createdAt: string
    id: number
    rep_name: string
    updatedAt: string,
   
}
 
type NewsReportState = {
    news_id: number;
    rep_id: number;
    reportCount: number;
    createdAt: string;
    updatedAt: string;
    images: string;
    videos: string
    information:string;
    title: string;
}
 
const ViewNews = () => {
   
    const { id } = useParams()
    const shareUrl = `https://bolt-news-app.herokuapp.com/fullscreen/${id}`
    const navigate = useNavigate();
   
 
    useEffect(() => {
        userRequest.get('/reportsnews/reportedNewsById/'+id).then((response:any)=>{
            if(response.statusText === "OK"){
                setNews(response.data)
                console.log(response)
                setReports(response.data.Reports)
                setIsLoading(false)
            }
        })
    }, []);
    
    
    const [ reports, setReports] = useState< any >([]);
    const [ volume, setVolume ]= useState(true);
    const [ news, setNews ] = useState< any >();
    const [ isLoading, setIsLoading ] = useState(true)

    let selectedReport = null
   
    const handleDelete=async(id:number)=>{
        try {
            if(window.confirm("Are you sure you want to delete this News?"))
            {   
              console.log("line no 59 : " + id) 
              userRequest.delete("/news/" + id).then((response:any) => {
              console.log(response);
                navigate("/user")
              });
            } 
        } catch (err) {
            console.log(err)
        }
    }
    
    
 
    const handleVolume=()=>{
        console.log("Volume");
        // if(volume === false)
        //     setVolume(!volume)
        setVolume(!volume);     // unmute
       
    }
 
    const url = news?.images;
 
    const description = news?.information;
    const desc1 = description?.slice(0, 400);
    const desc2 = description?.slice(401);
 
    if(isLoading){
        return (
            <Container sx={{ justifyContent: "center" }}  >
            {/* <Box sx={{ display: 'flex' }}> */}
              <CircularProgress />
            {/* </Box> */}
            </Container>
          );
    }
 
    return (
        <>
            <Header/>
            <Box >
                
                <Container sx={{ justifyContent: "center" }}  >
                    <Box component="div" sx={{display:"flex",justifyContent:"center" }} mt={2}>
                        <Box component="span">
                    <TableContainer sx={{maxWidth: 750, minWidth: 450}} component={Paper} elevation={3}>
                    <Table sx={{ minWidth: 400, maxWidth: 700 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight:"bold"}}>  Reports</TableCell>
                            <TableCell  sx={{fontWeight:"bold"}}>Counts</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                         reports.map((report:any, index:number)=>{
                           return(
                           <TableRow
                           key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell >{report.rep_name}</TableCell>
                            <TableCell >{report.News_Reports.reportCount? report.News_Reports.reportCount : 1}</TableCell>
                            </TableRow>)})
                        }
                        
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </Box>
                    </Box>
                    <Box p={4} >
                        <Typography variant="h1" sx={{ fontSize: 44, fontWeight: 600, textAlign: 'center', pb: 5 }}>
                            {news?.title}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", objectFit: 'cover',  width:"100%", height:400 }}>
                        <img src={url} alt="image" style={{ width:"60%", height:"90%"}} />
                    </Box>
 
                    <Box sx={{ display: "flex", justifyContent: "center"}} m={3}>
                        <Box style={{ width:"80%", height:"90%"}}>
                        <Typography variant="h5" sx={{ textAlign: 'center',overflow: 'auto',textIndent:0 }}>
                           {desc1}
                        </Typography>
                        </Box>
                    </Box>
 
                    <Box
                     
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                   
                    }}
                     onClick={handleVolume}
                    >
                        <ReactPlayer
                        sx={{ borderRadius: 5 }}
                         url={ news!.videos === undefined ? "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"  : news!.videos}
                        muted={volume}
                        loop={true}
                        playing />
                    </Box>
 
                    <Box sx={{ display: "flex", justifyContent: "center"}} m={3}>
                        <Box  style={{ width:"80%", height:"90%"}}>
                        <Typography variant="h5" sx={{ textAlign: 'center',overflow: 'auto',textIndent:0 }}>
                           {desc2}
                        </Typography>
                        </Box>
                       
                    </Box>
                    
                        <Box key={news!.news_id} sx={{ display: "flex", justifyContent: "space-around", backgroundColor: "white", borderRadius: 4 }} mb={1}
                        >
                            
                            <Box pt={0.4} pb={1}>
                                <Button variant="contained" color="error" size="medium"
                                    style={{ maxWidth: '75px', maxHeight: '40px', minWidth: '55px', minHeight: '20px' }}
                                    onClick={()=>handleDelete(news!.id)}
                                >Delete</Button>
                            </Box>

                        </Box>
                                                            
                    </Container>
 
            </Box>
 
        </>
    )
}
 
export default ViewNews;