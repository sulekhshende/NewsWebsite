import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import ScrollCard from "../components/ScrollCard";
import { publicRequest } from './../redux/requestMethod';
import { useAppSelector } from "../redux/reduxHooks";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';


export type NewsType = {
    category_id: number;
    createdAt: string;
    id: number
    images: string;
    information: string;
    loc_id: number;
    title: string;
    updatedAt: string;
    user_id: number;
    videos: string;
}


type propType={
    showNavbar:boolean,
    setShowNavbar:( showNavbar:boolean)=>void
  
}

const Home = ({showNavbar,setShowNavbar}:propType) => {

    useEffect(()=>{
        setShowNavbar(true);
        publicRequest.get('/news/').then((response)=>{
            setNews(response.data)
            console.log(response)
            setIsloading(false)
        })
    },[]);

    const [news, setNews] = useState<NewsType[]>([])//its an array of product type.
    const [isLoading, setIsloading ] = useState(true)

    const locationR = useAppSelector((state)=>state.location.currentLocation)
    console.log(locationR);

    useEffect(() => {
       
        if( locationR === null){
            publicRequest.get('/news/').then((response)=>{
                 setNews(response.data)
                 console.log(response)
                 setIsloading(false)
             })
        }else if(locationR === 30) {
            publicRequest.get('/news/').then((response)=>{
                setNews(response.data)
                console.log(response)
                setIsloading(false)
            })
        }
        else {
            publicRequest.get('/news/').then((response)=>{
                // setNews(response.data)
                 console.log(response)
                 if(response.statusText === "OK"){
     
                  const filteredNews = response.data.filter((news:any)=> news.loc_id === locationR)
                     setNews(filteredNews)
                     setIsloading(false)
                 }
             })
        }
       console.log("Useeffect Triggered");
       
    }, [locationR]);

  
 
    if(isLoading ){
      return (
        <div>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      );
    }

    
    return (
        <Container maxWidth="xl" sx={{mt:0}} >
            <Container maxWidth="lg" sx={{ pt: 6 }}>

                {news.map((news:any) => {
                    return <ScrollCard news={news} key={news.id} />
                })}

            </Container>
        </Container>


    )
}

export default Home;

