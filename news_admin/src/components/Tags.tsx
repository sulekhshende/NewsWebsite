import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { NewsState } from './AddNews';
import './button.css'
import { publicRequest } from './../redux/requestMethod';

export interface TagsState {
  category_id: number;
  createdAt: string;
  id: number;
  isSelectedTag: boolean
  tag_name: string;
  updatedAt: string;  
}
type TagsProps = {
  categoryId: number | null;
  selectedTags: TagsState[] ;
  setSelectedTags:any;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Tags({categoryId, selectedTags, setSelectedTags}: TagsProps) {
 
  const [chipData, setChipData] = React.useState< TagsState[] | null>(null);

  useEffect(()=>{
    publicRequest.get('/tags/').then((response:any)=>{
       console.log(response);
       setChipData(response.data)
    })
  },[])

  const [filtereData, setFilteredData ] = useState<TagsState[]>([])
  const [colorChange, setColorChange] =useState({
    color:"white",
    bgColor:'#757ce8'
  })

  useEffect(()=>{FilterChipData() 
  },[categoryId,chipData])
  
  function FilterChipData(){
    if(chipData !== null){
        console.log(
            "inside filterchipdata"
        );
        
      const filtereddata =  chipData.filter((chip:TagsState)=> chip.category_id === categoryId);
      setFilteredData(filtereddata)
    }
    
  } 

  console.log(filtereData);
  

  const handleSelect = (chipToSelect: TagsState) => () => {

    if(selectedTags.find((item)=> item.id === chipToSelect.id)){
      filtereData.forEach((item)=>{ 
        if(item.id === chipToSelect.id)
              item.isSelectedTag = false    
      })
      setFilteredData(filtereData)
      setSelectedTags([...selectedTags.filter((item)=> item.id !== chipToSelect.id)])
    }
    else{
      chipToSelect.isSelectedTag = true;
      setSelectedTags([...selectedTags,chipToSelect])
      setColorChange({color:'white',bgColor:"green"})

    }
  };

  if( filtereData === null){
    return(<>
    </>)
  }

  

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      { filtereData.map((data) => {

        if (categoryId === null) {
          return (<></>)
        }

        return (
          <ListItem key={data.id}>
            <Chip
              label={data.tag_name}
              onClick={handleSelect(data)}
              sx={{border:  '1px solid green', color: data.isSelectedTag? colorChange.color : "green", bgcolor: data.isSelectedTag? colorChange.bgColor :  'white' }}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
