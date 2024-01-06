import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { publicRequest } from './../redux/requestMethod';
import { useEffect } from 'react'
import {NewsState} from './AddNews'
import { useState } from 'react'

type CategorySelectProps = {
  values:NewsState;
  setValues:any;
  clearValue : boolean;
}

export default function CategorySelect({values, setValues, clearValue}:CategorySelectProps) {
 
  const [category, setCategory] = useState<any>(null)
  const [selectedCat, setSelectedCategory] = useState<string>("")


  useEffect(()=>{
    publicRequest.get('/category/').then((response:any)=>{
      console.log(response.data);
      setCategory(response.data)
    })
  },[])
  console.log(category);
  
  const handleChange  = (prop: keyof NewsState) => (event: SelectChangeEvent) => {
    setValues({ ...values, [prop]: event.target.value });
    setSelectedCategory(event.target.value)
    };

    
  
    if(category === null){
      return(<>
        </>)
    }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={ selectedCat === "" ? "" : selectedCat}
        label="Category"
        onChange={handleChange('category')}
      >
          {
              category.map((cat:any,index:number)=>{
                  return <MenuItem key={index} value={cat.id}>{cat.category_name}</MenuItem>
              })
          }
        </Select>
      </FormControl>
    </div>
  );
}
