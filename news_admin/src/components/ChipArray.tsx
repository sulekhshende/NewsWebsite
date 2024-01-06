import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { NewsState } from './AddNews';
import './button.css'
import { publicRequest } from './../redux/requestMethod';

export interface ChipData {
  category_id: number;
  createdAt: string;
  id: number;
  isSelectedTag: boolean
  tag_name: string;
  updatedAt: string;  
}
type chipProps = {
  categoryId: number | null;
  values: NewsState;
  setValues:any;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray({categoryId, values, setValues}: chipProps) {

  const [chipData, setChipData] = React.useState< ChipData[] | null>(null);

  useEffect(()=>{
    publicRequest.get('/tags/').then((response:any)=>{
       console.log(response);
       setChipData(response.data)
    })
  },[])

  const [filtereData, setFilteredData ] = useState<ChipData[]>([])
  const [colorChange, setColorChange] =useState({
    color:"white",
    bgColor:'#757ce8'
  })

  useEffect(()=>{FilterChipData() 
  },[categoryId])
  
  function FilterChipData(){
    if(chipData !== null){
      const filtereddata =  chipData.filter((chip:ChipData)=> chip.category_id === categoryId);
      setFilteredData(filtereddata)
    }
    
  } 

  const handleSelect = (chipToSelect: ChipData) => () => {

    if(values.tags.find((item)=> item.id === chipToSelect.id)){
      filtereData.forEach((item)=>{ 
        if(item.id === chipToSelect.id)
              item.isSelectedTag = false    
      })
      setFilteredData(filtereData)
      setValues({...values,tags:[...values.tags.filter((item)=> item.id !== chipToSelect.id)]})
    }
    else{
      chipToSelect.isSelectedTag = true;
      setValues({...values,tags:[...values.tags,chipToSelect]})
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
