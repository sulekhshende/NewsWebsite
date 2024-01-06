import { Box, Button, Card, CardContent, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, CircularProgress,Backdrop } from '@mui/material'
import axios from 'axios';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { publicRequest, userRequest } from '../../redux/requestMethod';


type dataType = {
    id: number,
    tag_name: string
    // category_id: string
}

type categoryDataType={
    id: number,
    category_name: string
}

export default function Tag() {

    // const [count, setCount] = useState(0);
    const [data, setData] = useState<dataType[]>([]);
    const [categoryData, setCategoryData]= useState<categoryDataType[]>([]);
    const [tag_name, setTag_name] = useState("");
    const [category_id, setCategory_id] =useState('');
    const [isLoading, setIsLoading] = useState(true);


   const loadData = async () => {
        try {
            const response = await publicRequest.get("/tags/");
            console.log(response.data);
            setData(response.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
        
        
    }

    const loadCategories = async ()=>{
        try {
            const response = await publicRequest.get("/category/");

            console.log(response.data);
            setCategoryData(response.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err)
        }
        
        
    }


    useEffect(() => {
        loadData();
        loadCategories();
    }, []);


    const handleChangeCat = (event: SelectChangeEvent) => {
        setCategory_id(event.target.value );
    };
    console.log("category_id :",category_id);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTag_name(e.target.value);

    }



    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!tag_name || !category_id) {
            alert("please provide value into input field!")
        } else {
            userRequest.post("/tags/", {
                category_id,
                tag_name
             
            }).then((response) => {
                setTag_name("");
                console.log(response);

                if(response.statusText === "OK"){
                    loadData()
                }
            }).catch((err) => {
                console.log("error : ", err);
            })

        }
    }


    const handleDelete=async(tag_id:number)=>{
        try {
            if(window.confirm("Are you sure you want to delete this Tag?"))
            {
              const response=await userRequest.delete("/tags/" + `${tag_id}`);
              if(response.statusText === "OK"){
                  loadData()
              }
            } 
        } catch (err) {
            console.log(err)
        }
        

    }


    if (isLoading) {
        return (
            <>
                <div>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoading}
                      
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            </>
        )
    }

    return (
        <div>
            <Grid container style={{}}>

                <Grid item xs={12} md={4} style={{
                    // border: "solid",
                    //  minWidth: "100%",
                    //   height: "90vh",
                    // backgroundColor: 'lightBlue'
                }}>
                    <Box pt={3}>
                        <Container>
                            <Card sx={{ minWidth: 150, backgroundColor: "#dad4d4", borderRadius: 5 }}>
                                <CardContent sx={{ overflow: "auto" }}>
                                    <Box mt={1} mb={2} textAlign="center">
                                        <Typography variant="h5" component="div">
                                            List of Tags
                                        </Typography>
                                    </Box>
                                    <Box >
                                        {/* changes for mapping data */}

                                        {data.map((item) => {
                                            return (
                                                <Box key={item.id} sx={{ display: "flex", justifyContent: "space-around", backgroundColor: "white", borderRadius: 4 }} mb={1}
                                                >
                                                    <Typography variant="h6" component="div" >
                                                        {item.tag_name}
                                                    </Typography>
                                                    <Box pt={0.4}>
                                                        <Button variant="contained" color="error" size="small"
                                                            style={{ maxWidth: '55px', maxHeight: '20px', minWidth: '55px', minHeight: '20px' }}
                                                            onClick={()=>handleDelete(item.id)}
                                                        >Delete</Button>
                                                    </Box>

                                                </Box>

                                            )

                                        })}



                                        {/* end changes */}


                                    </Box>

                                </CardContent>

                            </Card>

                        </Container>
                    </Box>

                </Grid>

                <Grid item xs={12} md={8} style={{
                    // border: "solid",
                    //  minWidth: "100%",
                    height: "90vh",
                    // backgroundColor: 'lightBlue'
                }}>
                    <Box pt={3}>
                        <Container >
                            <Card sx={{ minWidth: 275, backgroundColor: "#dad4d4", borderRadius: 5 }}>
                                <CardContent>
                                    <Box component="form" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} pt={8}
                                        onSubmit={handleSubmit}>
                                        <Typography variant="h5" component="div">
                                            Add new Tag
                                        </Typography>
                                        <TextField
                                            margin="normal"
                                            // required
                                            fullWidth
                                            id="tag"
                                            label="Tag"

                                            name=" tag_name"
                                            autoFocus
                                            onChange={handleChange}
                                        />
                                        {/* select category and send category id to backend */}
                                        <Box sx={{ minWidth: 120 }} mt={3} mb={3}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={category_id}
                                                    label="Category"
                                                    onChange={handleChangeCat}
                                                >
                                                    {categoryData.map((item)=>{
                                                        return   <MenuItem key={item.id} value={item.id}>{item.category_name}</MenuItem>
                                                    })}
                                                   
                                                </Select>
                                            </FormControl>
                                        </Box>

                                        {/*  */}

                                        <Button type="submit" variant="contained">Insert</Button>

                                    </Box>


                                </CardContent>

                            </Card>

                        </Container>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
