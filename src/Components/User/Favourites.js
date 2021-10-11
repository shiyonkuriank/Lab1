import React, { useState,useEffect } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Nav from './UserNav';

function Favourites(){

    const[fav,setFav]=useState([]);

    useEffect(()=>{
        Axios.post("http://18.218.134.220:3001/fav",
        {name:localStorage.getItem('name')}).then((response)=>{
          setFav(response.data);
         
        });
    
    },[]);

    return(
        <>
        <Nav/>
        <div className="favourites" style={{height:"100vh", background:"black", color:"seagreen"}}>
        <p><h4>Favourites</h4></p>
        
        <div className="grid-container">


        {fav.map(function (d, idx) {

            return (
                <div className="grid-item">
                    <li className="list" ><Link to={"/OrderNow"} 
                    onClick={()=>{localStorage.setItem('restName',d.Restname)}}
                    class="a" style={{color:"forestgreen"}}><h4>{d.Restname}</h4></Link></li>
                    <li>City: {d.Loc}</li>
                 
                    
                </div>
            );
        })}
        </div>
        </div>
        </>
    )
}

export default Favourites;