import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import ScrollCard from "../../components/ScrollCard";
import { publicRequest } from '../../redux/requestMethod';
import { useParams } from "react-router-dom";
import { NewsType } from "../Home";
import ChipsArray from "../../components/ChipArray";
import Tags, { TagsState } from "../../components/Tags";



const Health = () => {

    let { category_id } = useParams();
    
    const [news, setNews] = useState<NewsType[]>([])//its an array of product type.
    const [ selectedTags, setSelectedTags ] = useState< TagsState[] >([])
    console.log(selectedTags);
    
    useEffect(() => {
       
        publicRequest.get('/category/'+category_id).then((response:any)=>{
            setNews(response.data.News)
            console.log(response)
        })


    }, []);



    return (
        <Container maxWidth="xl" sx={{mt:0}} >
            <Container maxWidth="lg" sx={{ pt: 6 }}>
                <Tags  categoryId = {parseInt(category_id!)}  selectedTags={selectedTags} setSelectedTags = { setSelectedTags}/>
                {news.map((news:any) => {
                    return <ScrollCard news={news} key={news.id} />
                })}

            </Container>
        </Container>
    )
}

export default Health;