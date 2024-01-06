import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { NewsState } from './AddNews';
import { useState, useEffect } from 'react'
import { publicRequest } from './../redux/requestMethod';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../redux/reduxHooks';
import { setLocation } from '../redux/userRedux/usersSlice'
import { getLocation } from "../redux/locationRedux/locationSlice"



type Props = {
  color? : string;
}

type LocationState = {
  createdAt: string | null
  id: number | null
  loc_name: string | null
  updatedAt: string | null
}

export default function HeaderSelectLocation({color}: Props) {

  const [location, setLocationHeader] = useState<LocationState[] | null>(null)
  const [selectedLoc, setSelectedLocation] = useState<string>("")
 
  const dispatch = useAppDispatch()

  useEffect(()=>{
    publicRequest.get('/locations/').then((response:any)=>{
      console.log(response);
      let location = response.data
      let all = {
        createdAt: null,
        id: 30,
        loc_name: "All",
        updatedAt: null
      }
      location.push(all)
      setLocationHeader(location)
    })
  },[])
  console.log(location);
  const handleChange  = ( loc : string) => (event: SelectChangeEvent) => {
    setSelectedLocation(event.target.value)

    let s = { [loc] : event.target.value}

     dispatch(setLocation(s.location))
     dispatch(getLocation(s.location))
    };

    if(location === null){
      return(<>
        </>)
    }

  return (

    

    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label" sx={{color: color ? color : "#2F2A45"}}>Location</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedLoc ? selectedLoc : "All"}
        label="location"
        onChange={handleChange('location')}
        sx={{color:  color ? color : "#2F2A45"}}
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
