import { Box, Grid, Container, Typography, InputLabel, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState , useEffect} from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { NewsType } from "../pages/Home";
import { publicRequest, userRequest } from './../redux/requestMethod';
import CircularProgress from '@mui/material/CircularProgress'
import {  FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import {  FacebookIcon, FacebookMessengerIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { useAppSelector } from "../redux/reduxHooks";
 
type ReportsState = {
    createdAt: string
    id: number
    rep_name: string
    updatedAt: string,
   
}
 
type PublishedFullscreenNewsProps = {
    setShowNavbar : ( showNavbar:boolean )=>void;
}
 
const PublishedFullScreen = ({ setShowNavbar}: PublishedFullscreenNewsProps) => {
   
    const { id } = useParams()
    const shareUrl = `https://bolt-news-app.herokuapp.com/${id}`
 
    useEffect(()=>{
        setShowNavbar(false)
    },[])
 
    useEffect(() => {
        userRequest.get('/news/'+id).then((response)=>{
            if(response.statusText === "OK"){
                setNews(response.data)
                console.log(response)
 
                userRequest.get('/reports/').then((response)=>{
                    if(response.statusText === "OK"){
                        console.log(response)
                        setReports(response.data)
                        setIsLoading(false)    
                    }
                })
 
                 
            }
        })
 
    }, []);
 
    const [ reports, setReports] = useState< ReportsState[] >([]);
    const [ volume, setVolume ]= useState(true);
    const [ news, setNews ] = useState< NewsType | null >(null)
    const [ isLoading, setIsLoading ] = useState(true)
    let selectedReport = null
   
   
 
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
              <CircularProgress />
            </Container>
          );
    }
 
    return (
        <>
           
            <Box >
                <Container sx={{ justifyContent: "center" }}  >
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
                         url={ news!.videos === null ? "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"  : news!.videos}
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
 
                 
 
                    <Box component='div' sx={{display:'flex',justifyContent: "center"}}>
                       
                        <FacebookShareButton
                            url={shareUrl}
                            quote={news?.title}
                            className="Demo__some-network__share-button"
                        >
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={shareUrl}
                            title={news?.title}
                            className="Demo__some-network__share-button"
                        >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <WhatsappShareButton
                            url={shareUrl}
                            title={news?.title}
                            separator=":: "
                            className="Demo__some-network__share-button"
                        >
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                       
                       
                    </Box>
                </Container>
 
            </Box>
 
        </>
    )
}
 
export default PublishedFullScreen;