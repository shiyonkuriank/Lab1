import React,{useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import Axios from 'axios';
import Nav from './Nav';
import {useSelector } from "react-redux";
import { current } from '@reduxjs/toolkit';



function Customer(){


const user=useSelector((state)=> state.user.value);

useEffect(()=>{

    Axios.post("http://localhost:3001/userProfile",
{name:localStorage.getItem('customer')}).then((response)=>{
  setdata(response.data);
console.log(response.data);

});

},[]);


    /*<div classname="Profile" style={{ color: "black" }}>
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
console.log(data);





    return(
        <><div classname="Profile" style={{ color: "black" }}>
            <Nav /> 
                
                <h4>{localStorage.getItem('customer')}!</h4>

                {data.map(item => (
                    <>
                    <li ><img className="imageFood" src={item.Img}  alt="img" /></li>
                    <p>Email: {item.Email}</p><p>Phone: {item.Phone}</p><p>City: {item.City}</p><p>State: {item.State}</p><p>Country: {item.Country}</p></>
                ))}
            </div></>
    );
}
export default Customer;