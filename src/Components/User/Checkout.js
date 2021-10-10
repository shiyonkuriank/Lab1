import React, {useState} from 'react';
import Axios from 'axios';
import './cart.css';

import { Col, Row } from 'react-bootstrap';


function Checkout(){

    const [cartItem,setCart]=useState([]);
    const[cartTotal,setCartTotal]=useState("");
     
    Axios.post("http://localhost:3001/getCart",
{name:localStorage.getItem('restName'),customer:localStorage.getItem('name')}).then((response)=>{
    setCart(response.data)});

 
let total=0;

for( let {Cost} of cartItem){
    total=total+Cost;
    setCartTotal(total);
}   

    return(
        <div className="modalContainer">
            <div classname="title"><h1 style={ { color: 'darkcyan' }}>Order Details</h1> </div>
                <div className="body">
                {cartItem.map(function (d, idx) {

return (
    <>
        <li style={ { color: 'Orange' }}><h4>{d.Dish}: {d.Cost}$</h4></li> </>
               
);
})}

<h4 style={ { color: 'Orange' }}>Total Amount:{total}$</h4>   


                </div>
                </div>
    )

    }
    

export default Checkout;