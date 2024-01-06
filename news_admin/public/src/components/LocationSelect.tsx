import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { NewsState } from './AddNews';
import { useState, useEffect } from 'react'
import { publicRequest } from './../redux/requestMethod';

type LocationSelectProps = {
  values:object;
  setValues:any;
  clearValue : boolean
}

export default function LocationSelect({values, setValues, clearValue}:LocationSelectProps) {

  const [location, setLocation] = useState<any>(null)
  const [selectedLoc, setSelectedLocation] = useState<string>("")
 
  useEffect(()=>{
    publicRequest.get('/locations/').then((response:any)=>{
      console.log(response);
      setLocation(response.data)
    })
  },[])
  console.log(location);
  
  const handleChange  = (prop: keyof NewsState) => (event: SelectChangeEvent) => {
    setValues({ ...values, [prop]: event.target.value });
    setSelectedLocation(event.target.value)

    };

    if(location === null){
      return(<>
        </>)
    }

  return (

    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">Location</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedLoc ? selectedLoc : ""}
        label="location"
        onChange={handleChange('location')}
      >
          {
              location.map((loc:any,index:number)=>{
                  return <MenuItem key={index} value={loc.id}>{loc.loc_name}</MenuItem>
              })
          }
        </Select>
      </FormControl>
    </div>
  );
}
