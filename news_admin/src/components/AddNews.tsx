import { FormEvent, SetStateAction, useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LocationSelect from './LocationSelect'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CategorySelect from "./CategorySelect";
import { Typography } from "@mui/material";
import ChipsArray from "./ChipArray";
import { storage } from '../firebase/fire'
import ReactPlayer from 'react-player';
import { checkFiles } from "../Validation/ValidateFiles";
import FileSelected from "./FileSelected"
import { publicRequest, userRequest } from './../redux/requestMethod';
import { BloodtypeOutlined } from "@mui/icons-material";
import axios from "axios"
import { useAppSelector } from "../redux/reduxHooks";
//const axios = require('axios').default;
import { UserStateProps } from "../redux/userRedux/usersSlice";
import {CurrentUserType} from "../redux/userRedux/usersSlice";
import { useNavigate } from 'react-router';
const Input = styled('input')({
  display: 'none',
});


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export type tagsProps = {
    category_id: number;
    createdAt: string;
    id: number;
    isSelectedTag: boolean
    tag_name: string;
    updatedAt: string; 
}

export interface NewsState {
    user_id: number | null;
    title: string;
    brief: string;
    image: string | null;
    location: number | null;
    category: number | null;
    video: string | null;
    tags:tagsProps[];
}

const initialState = {
    user_id: null,
    title: '',
    brief: '',
    image: null,
    location: null,
    category:null,
    video: null,
    tags: []
}

type AddNewsProps = {
    setShowNavbar : ( showNavbar:boolean )=>void;
}

export default function AddNews({  setShowNavbar }: AddNewsProps) {

    useEffect(()=>{
        setShowNavbar(false);
    },[])

    const [values, setValues] =useState<NewsState>( {
    user_id: null,
    title: '',
    brief: '',
    image: null,
    location: null,
    category:null,
    video: null,
    tags: []
});
    const [ progress, setProgress ] = useState< number >(0)
    const [ file, setFiles ] = useState< File[] >([])
    const [ videoUrl, setVideoUrl] = useState< string >("")
    const [ imageUrl, setImageUrl] = useState< string >("")
    const [ responseCount, setResponseCount ] = useState< number >(0)
    const [ clearValue, setClearValue ] = useState< boolean >(false)
    //const [userId, setUserId] = useState<number | null>(null);
    const userLoginState:any = useAppSelector((state:any) => state.user);
    
  

    useEffect(()=>{
        if(imageUrl !== "" && videoUrl !== ""){
            setValues({...values,image:imageUrl,video:videoUrl, user_id: userLoginState.currentUser.id});
        }
    },[imageUrl,videoUrl])


    useEffect(()=>{
        if( values.image !== null && values.video !== null){
            console.log("inside effect");
            
            postNews()
        }
    },[values.image,values.video])

    
    if(userLoginState.currentUser=== null){
       return(<>
        <h1>unauthorized access</h1>
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <Typography gutterBottom>
                                Incorrect Username or Password! Or  
                                You haven't got approval for job !
                                CLICK ON LOGOUT BUTTON TO MOVE TO ANOTHER PAGE! 
                </Typography>
            </Typography>
            </Box>
        </>);
    }

    const handleChange =
        (prop: keyof NewsState) => (event: React.ChangeEvent<HTMLInputElement >) => {
            if(prop === 'image' || prop === 'video'){
                for(let i = 0; i < event.target.files!.length; i++){
                    const newFile = event.target.files![i];
                        setFiles((prevState)=>[...prevState,newFile])   
                };
            }else
                setValues({ ...values, [prop]: event.target.value });
        }
    
    
    
    const handleSubmit = (event: FormEvent)=>{
          event.preventDefault()
          if(checkFiles(file)){
            const promises:any = []
            file.map((item:any)=>{
              
              const uploadTask = storage.ref(`saved/${item!.name}`).put(item!)
              promises.push(uploadTask)
              uploadTask.on(
                  "state_changed",
                  (snapshot: { bytesTransferred: number; totalBytes: number; })=>{
                      const liveprogress = Math.round(
                          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                      )
                      setProgress(liveprogress)
                  },
                  (error: any)=> {
                      console.log(error);  
                  },
                  async ()=>{
                     await storage
                      .ref("saved")
                      .child(item!.name)
                      .getDownloadURL()
                      .then((url: SetStateAction<string>)=>{
                          if(item.type.split("/")[0] === 'image')
                                setImageUrl(url)
                          else
                                setVideoUrl(url)
                      })
                  }
              )
            }) 
            Promise.all(promises).then((response)=> {
                alert("Files uploaded")
                setResponseCount(response.length)
                }).catch((err)=> alert(err))
            
                
            }else
               alert("please upload one image or one video ( video optional)")      
    }

    function postNews(){
    userRequest.post('/news/', {
                title: values.title,
                information: values.brief,
                images: values.image,
                videos: values.video,
                user_id: values.user_id,
                loc_id:values.location,
                category_id: values.category
            }).then(
                (response:any)=>{
                    console.log(response)
                    if(response.statusText === "OK"){
                        postTags(response.data.id)
                    }else
                        alert("failed to save tags")
                });
    }

    function postTags(newsid:number){
        let news_id = newsid;
        let endpoints:string[] = []
        let bodys: any[] = []

        values.tags.forEach((tag)=>{
            let url = 'https://bolt-news-app.herokuapp.com/api/news_tags/'
            endpoints.push(url)
            let body = {
                news_id : news_id,
                tag_id : tag.id
            }
            bodys.push(body)
        })

        Promise.all(endpoints.map((endpoint, index) => userRequest.post(endpoint,{
            news_id: news_id,
            tag_id : bodys[index].tag_id
        }))).then((response)=>{
        
            setValues(initialState)
            setFiles([])
            setProgress(0)
            setImageUrl("")
            setVideoUrl("")
            setClearValue(true)
        
        }).catch((err)=> alert(err))
        console.log(endpoints);
        console.log(bodys)
    }

    

console.log("values : " ,values)
console.log("Files: ",file);
console.log("responseCount: "+responseCount);


  return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Grid container spacing={2}>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8}>
                <FormControl fullWidth = {true} sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-Title">Title</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-Title"
                    value={values.title}
                    onChange={handleChange('title')}
                    label="Title"
                />
                </FormControl>
                <FormControl fullWidth = {true} sx={{ m: 1 }}>
                <TextField
                id="outlined-multiline-static"
                label="Brief"
                multiline
                rows={10}
                placeholder="enter news brief in 200 words only"
                value={values.brief}
                onChange={handleChange('brief')}
                />
                </FormControl>
                
                <FormControl  sx={{ m: 1 }}>
                <Typography sx={{fontSize: 13 }} component="h5">select image</Typography>
                <label htmlFor="contained-button-file" >
                    <Input accept=".png, .jpg, .jpeg" id="contained-button-file" multiple type="file" required onChange={handleChange('image')} />
                    <Button variant="contained" component="span">
                     Image
                    </Button>
                </label>                 
                </FormControl>
                <FormControl  sx={{ m: 1 }}>
                <Typography sx={{fontSize: 13 }} component="h5">select video (optional)</Typography>
                <label htmlFor="contained-button-file" >
                    <Input accept="video/*" id="contained-button-file" multiple type="file" onChange={handleChange('video')} />
                    <Button variant="contained" component="span">
                     Video
                    </Button>
                </label>
                </FormControl>
                {
                    file.length === 0 ?  ""  :  (<FormControl  sx={{ m: 1 }}>
                        <Typography sx={  { fontSize: 13, textAlign: "center", color: checkFiles(file)? "black" : "red" }} component="h5">
                            {
                                checkFiles(file) ? "selected files" : "one image required or one video ( video optional)"
                            }
                        </Typography>
                        <FileSelected files={file} setFiles={setFiles}/>
                    </FormControl>)
                }
                <Grid item xs={12}>
                    <FormControl  sx={{ m: 1 }}>
                        <Typography sx={{fontSize: 13 }} component="h5">upload progress: </Typography>
                            <progress value={progress} max="100"/>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item md={3} xs={12}>
                            <FormControl sx={{ m: 1 }}>
                                <LocationSelect values={values} setValues = {setValues}  clearValue={clearValue}/>
                            </FormControl> 
                        </Grid>
                        <Grid item md={9} xs={12}>   
                            <FormControl sx={{ m: 1 }}>
                                <CategorySelect values={values} setValues = {setValues} clearValue={clearValue}/> 
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1 }}>
                                <ChipsArray categoryId={values.category} values={values} setValues={setValues}/>
                            </FormControl> 
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
            
                      
        </Grid>
        
        <Grid item xs={12}>
        <Box textAlign='center'>
            <Button  variant="outlined" onClick={handleSubmit}>Submit</Button>
        </Box>
        </Grid>
        
      </Grid>
    </Box>


    
  );
}
