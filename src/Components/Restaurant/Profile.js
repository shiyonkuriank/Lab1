import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import Nav from './Nav';
import {useDispatch} from 'react-redux';
import {restlogin} from '../../features/rest';


function Profile(){


    const dispatch=useDispatch();    
const[data,setdata]=useState([]);
console.log(data);

const name=localStorage.getItem('name');
const email=localStorage.getItem('email');
const phone=localStorage.getItem('phone');
const city=localStorage.getItem('city');
const pwd=localStorage.getItem('pwd');

const disp=()=>{
    dispatch(restlogin({name:name, email:email,
        phone:phone,city:city,password:pwd}));
}

useEffect(()=>{
    Axios.post("http://localhost:3001/profile",
{name:localStorage.getItem('name')}).then((response)=>{
  setdata(response.data);
console.log(response.data);

});

},[]);



disp();

    return(

        <div classname="Profile" style={{ color: "seagreen", height:"100vh" }}>
         <Nav/>
         
        <h1>Hello {localStorage.getItem('name')}!</h1>
        
            {data.map(item => (
                <>
                
                <p>Location: {item.Loc}</p>
                <p>Email: {item.Email}</p>
                <p>Contact Us: {item.Phone}</p>
            <p>{item.Description}</p>
            
            <img className="imageRest" src={item.Img}  alt="img" />
            
            
            
            </>

            ))}
        </div>
    );
}
export default Profile;