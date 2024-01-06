

import { useEffect } from "react";
import AddNew from "../components/AddNews";
import RepoHeader from "../components/RepoHeader";



type propType={
    showNavbar:boolean,
    setShowNavbar:( showNavbar:boolean)=>void
}

const Reporter=({ showNavbar,setShowNavbar}:propType)=>{

    useEffect(()=>{
        setShowNavbar(false);
    },[]);


    return(
        <>
        
        </>
       
    )
}


export default Reporter;