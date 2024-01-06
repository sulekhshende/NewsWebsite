import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/reduxHooks";
import { publicRequest, userRequest } from "../redux/requestMethod";
import { useNavigate } from "react-router";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import { Grid } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress'
import { Container, Typography } from "@mui/material";

type PublishedNewsProps = {
    setShowNavbar : ( showNavbar:boolean )=>void;
}

const Published=({ setShowNavbar}: PublishedNewsProps)=>{

    useEffect(()=>{
        setShowNavbar(false)
    },[])

    const [ isLoading, setIsloading ] = useState< boolean >(true)
    const [ news, setNews ] = useState<any>(null)
    
    const userLoginState:any = useAppSelector((state:any) => state.user);

    let id:number|null = null;
    if(userLoginState.currentUser!==null){
        id = userLoginState.currentUser.id;
    }
    

    const navigate = useNavigate()

    useEffect(()=>{
        if(id!==null){
            publicRequest.get('/news/published/'+id).then((response)=>{
                setNews(response.data)
                setIsloading(false)
            })
        }
        
    },[id]);


    //for authorized access
    if(userLoginState.currentUser=== null){
        return(<>
        <h1>unauthorized access</h1>
        </>)
    }

    function toFullScreen(news: any){

        navigate(`/viewnews/${news.id}`)

    }
    console.log(news);
    
    function formatDate(date:any){
        return date.split("T")[0]
    }

    if(isLoading){
        return(<>
        <Container sx={{ justifyContent: "center" }}  >
            {/* <Box sx={{ display: 'flex' }}> */}
              <CircularProgress />
            {/* </Box> */}
            </Container>
        </>)
    }


    return(
        <>
        <Grid container sx={{justifyContent: 'center', margin: 3}} >
            <Grid xs={2}></Grid>
            <Grid xs={8}>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="secondary mailbox folder">
                    <h2>published news</h2>
                {
                    news.map(( news: any, index: number)=>{
                        return(
                            <Paper elevation={3}
                                onClick={()=> toFullScreen(news)}
                                key={index}
                                sx={{margin:1}}
                                >
                                {news.title.slice(0,20)}...
                                    
                                | posted at: 
                                {formatDate(news.createdAt)}
                                </Paper>
                        )
                    })
                }
                </List>
                </Box>
            </Grid>
            <Grid xs={2}></Grid>

        </Grid>
        </>
    )
}

export default Published;