import React, {useEffect, useState} from 'react';

import Nav from './UserNav';
import './User.css';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {login} from '../../features/user';
import Filters from './Filters';
import {Link} from 'react-router-dom';
import { useHistory} from 'react-router';


function User(){
       const history=useHistory();


    const[restNear,setRestNearMe]=useState([]);
    const[allRest,setAllRest]=useState([]);

    const dispatch=useDispatch();
   

    const name=localStorage.getItem('name');
const email=localStorage.getItem('email');
const phone=localStorage.getItem('phone');
const dob=localStorage.getItem('dob');
const city=localStorage.getItem('city');
const state=localStorage.getItem('state');
const country=localStorage.getItem('country');
const pwd=localStorage.getItem('pwd');

const disp=()=>{
    dispatch(login({name:name, email:email,phone:phone,dob:dob,city:city,state:state,country:country,password:pwd}));

}


const addToFavourite=(Rest, Loc)=>{
    alert("Added to Favourites");
    Axios.post("http://localhost:3001/favRest",
    {name:Rest,loc:Loc,customer:localStorage.getItem('name')}).then((response)=>{
      console.log("Added to favourite");
     
    });
}

useEffect(()=>{

    Axios.post("http://localhost:3001/restNearMe",
    {city:localStorage.getItem('city')}).then((response)=>{
      setRestNearMe(response.data);
     
    });
    
},[]);

useEffect(()=>{
    Axios.post("http://localhost:3001/allRest",
    {city:localStorage.getItem('city')}).then((response)=>{
      setAllRest(response.data);
      disp();
    });
},[]);

    return(
                
        <div className="landing" style={{height:"100%", background:"white"}}>
           <Nav/> 
          <Filters/>
           <p><h4 style={{color: "seagreen"}}>Restaurants near me</h4></p><div className="grid-container">


            {restNear.map(function (d, idx) {

                return (
                    <div className="grid-item">
                        <li className="list" ><Link to={"/OrderNow"} 
                        onClick={()=>{localStorage.setItem('restName',d.Restname)}}
                        class="a" style={{color:"forestgreen"}}><h4>{d.Restname}</h4></Link></li>
                        <li><img className="imageFood" src={d.Img} alt="img" /></li>
                        <li>City: {d.Loc}</li>
                        <li>Open Hours: {d.Time}</li>
                        <button className="footerbutton" 
                        onClick={()=>{addToFavourite(d.Restname, d.Loc)}}>Add to favourites</button>
                        
                    </div>
                );
            })}</div>
            <p><h4 style={{color: "seagreen"}}>All Restaurants</h4></p>
            <div className="grid-container">
            {allRest.map(function (d, idx) {

                return (
                    <div className="grid-item">
                        <li className="list" ><Link to={"/OrderNow"} 
                        onClick={()=>{localStorage.setItem('restName',d.Restname);
                        localStorage.setItem('dType',d.DeliveryType);
                    }}
                        class="a" style={{color:"forestgreen"}}><h4>{d.Restname}</h4></Link></li>
                        <li><img className="imageFood" src={d.Img} alt="img" /></li>
                        <li>City: {d.Loc}</li>
                        <li>Open Hours: {d.Time}</li>
                        <button className="footerbutton" 
                        onClick={()=>{addToFavourite(d.Restname, d.Loc)}}>Add to favourites</button>
                  
                    </div>
                );
            })}
        </div>
        </div>
        
    );
}

export default User;