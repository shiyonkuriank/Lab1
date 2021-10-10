import React,{useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import Axios from 'axios';
import Nav from './UserNav';
import {useSelector } from "react-redux";
import { current } from '@reduxjs/toolkit';



function UserProfile(){


/*const user=useSelector((state)=> state.user.value);

return(
    <div classname="Profile" style={{ color: "black" }}>
    <Nav/>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>DOB: {user.dob}</p>
        <p>City: {user.city}</p>
        <p>State: {user.state}</p>
        <p>Country: {user.country}</p>
    </div>
)*/



  
const[data,setdata]=useState([]);
//const[img,setImg]=useState([]);


useEffect(()=>{
    Axios.post("http://localhost:3001/userProfile",
    {name:localStorage.getItem('name')}).then((response)=>{
      setdata(response.data);
    
    
    });
},[]);



/*Axios.post("http://localhost:3001/viewImg",
{id:3}).then((response)=>{
  setImg(response.data);
  
});*/

    return(
        <><div classname="Profile" style={{ color: "seagreen" , background: "black", height:"100vh"}}>
            <Nav /> 
            
                <h4>Hello {localStorage.getItem('name')}!</h4>

                {data.map(item => (
                    <><p><img className="imageFood" src={item.Img}  alt="img" /></p>
                    <p>Email: {item.Email}</p><p>Phone: {item.Phone}</p><p>City: {item.City}</p><p>State: {item.State}</p><p>Country: {item.Country}</p></>
                ))}
                
                
            </div></>
    );
}
export default UserProfile;