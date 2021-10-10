import React, { useState,useEffect } from 'react';
import Axios from 'axios';
import {Row, Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from './Nav';

function Menu(){
 const[data,setdata]=useState([]);
    
  useEffect(()=>{
    Axios.post("http://localhost:3001/dishes",
    {name:localStorage.getItem('name')}).then((response)=>{
      setdata(response.data);
      console.log(data);
    });
        
  },[]);     

    return(
        <div className="menu" style={{color: "seagreen", background:"black", height:"100%"}}>
            <Nav/>
            <Container>
                
            <Row>
            <div className="dishes" >
               <h2 style={{fontStyle:"itlaic", color: "seagreen", background:"black"}}>Our Special Menu...</h2>
               <div className="grid-container">
                   {data.map(function(d,idx){
                    
                       return (
                       <><div className="grid-item">
                        <li style={{fontSize:"larger"},{color:'seagreen'}} key={idx}><h4>{d.Dishes}</h4></li>
                        <li key={idx}><img className="imageFood" src={d.Pic}  alt="img" /></li>
                       <li key={idx}>Category: {d.Category}</li>
                       <li key={idx}>{d.Price}$</li>
                       <li key={idx}>Main Ingredient: {d.Ingredient}</li></div></>
                       )
                   })}
               </div>
               
            </div>
            </Row>
            
            </Container>
        </div>
    );
}

export default Menu;