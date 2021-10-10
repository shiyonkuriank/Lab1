import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {Row, Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from './UserNav';
import { useHistory } from 'react-router';
import NewCart from './NewCart';

function OrderNow(){
    const[data,setdata]=useState([]);
    const history=useHistory();
    const[openModel,setOpenModel]=useState(false);
    


 const[cart,setCart]=useState([]);

 const[cost,setCost]=useState([]);
 

 const orderSummary=()=>{
 console.log("summary called");
  Axios.post("http://localhost:3001/orderSummary",
  {name:localStorage.getItem('restName'),customer:localStorage.getItem('name'),
  dishes:JSON.stringify(cart)}).then((response)=>{
  console.log(response);
  });
 }


  const addToCart = (dish) => {
   if(localStorage.getItem('currRest')=="")
   {
    localStorage.setItem('currRest',localStorage.getItem('restName'));
    alert("Added to Cart");
    setCart([...cart,dish.Dishes]);
    setCost([...cost,dish.Price]);
    console.log(cart);
  
  }else{
     if(localStorage.getItem('currRest')!=localStorage.getItem('restName')){
history.push('/Confirmation');
}else{
        alert("Added to Cart");
        setCart([...cart,dish.Dishes]);
        setCost([...cost,dish.Price]);
        console.log(cart);
        
     }
   }

  };
    
 useEffect(()=>{
    Axios.post("http://localhost:3001/dishes",
{name:localStorage.getItem('restName')}).then((response)=>{
setdata(response.data);

});

 },[]); 
 



return(
    <div className="menu">
        <Nav/>
       
        <div className="dishes">
           <h2 style={{fontStyle:"itlaic"}}>Place Your Order</h2>
           <div className="grid-container">
               {data.map(function(d,idx){
                
                   return (
                   <><div className="grid-item">
                           <li style={{ fontSize: "larger" }, { color: 'black' }}><h4>{d.Dishes}</h4></li>
                           <li><img className="imageFood" src={d.Pic} alt="img" /></li>
                           <li>Category: {d.Category}</li>
                           <li>{d.Price}$</li>
                           <li>Main Ingredient: {d.Ingredient}</li>
                           <button className="button" 
                            onClick={()=>{addToCart(d)}}
                           >Add to cart</button></div></>
                   )
               })}
           </div>
          <button className="footerbutton" onClick={()=>{history.push("/CartView");
          setOpenModel(true);
          localStorage.setItem('dishes',JSON.stringify(cart));
          localStorage.setItem('cost',JSON.stringify(cost));
        orderSummary();
        }}>Go to Cart</button> 
         { openModel && <NewCart closeModel={setOpenModel}/>} 
        </div>
      
        
    </div>
);
}

export default OrderNow;