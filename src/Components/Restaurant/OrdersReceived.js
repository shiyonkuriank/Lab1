import React, { useEffect, useState } from "react";
import Nav from './Nav';
import Axios from 'axios';
import {Link} from 'react-router-dom';

function Orders(){

    const[orders,setOrders]=useState([]);
    const[filter,setFilterStatus]=useState("");
    const[result,setResult]=useState([]);
    const[orderStatus, setOrderStatus]=useState("");

    useEffect(()=>{
        Axios.post("http://18.218.134.220:3001/viewCustOrder",
        {name:localStorage.getItem('name')}).then((response)=>{
          setOrders(response.data);
         
        });
    },[]);



    
    const filterStatus=()=>{
        Axios.post("http://18.218.134.220:3001/orderStatusFilter",
        {name:localStorage.getItem('name'),status:filter}).then((response)=>{
          setResult(response.data);
         
        });
     

    }

    const setStatus=(cust,dish)=>{
        
        Axios.post("http://18.218.134.220:3001/setOrderStatus",
        {name:localStorage.getItem('name'),customer:cust,dishes:dish, status:orderStatus}).then((response)=>{
          console.log(response.data);
         
        });
    }

return(
   
    <div className="viewOrder">
         <Nav/>
         
         <div className="grid-container">
         {orders.map(function (d, idx) {

return (
    <div className="grid-item">
        <li  className="list" ><Link to={"/Customer"} style={{color:"seagreen"}}
        onClick={()=>{localStorage.setItem('customer',d.Customer)}}
        class="a" ><h4 >{d.Customer}</h4></Link></li>
        <li >Dishes: {d.Dishes}</li>
        <li >Delivery Type: {d.DeliveyType}</li>
        <li >Total Amount: {d.Price}$</li>
        <select type="text" className="orderStatus"  onChange={(e)=>{
                    setOrderStatus(e.target.value); }} style={{width:"40%"}}>
        <option >Update Order Status</option>
    <option value="Order Received">Order Received</option>
	<option value="Prepairing">Prepairing</option>
    <option value="On the way">On the way</option>
    <option value="Delivered">Delivered</option>
    <option value="Pick Up Ready">Pick Up Ready</option>
    <option value="Picked Up">Picked Up</option>
    
</select>
<button className="button" onClick={()=>{setStatus(d.Customer,d.Dishes)}}>Update</button>

                
    </div>
);
})}
         </div>
         <select type="text" className="filterStatus"  onChange={(e)=>{
                    setFilterStatus(e.target.value); }} style={{width:"40%"}}>
    <option >Filter Order Status</option>
	<option value="New Order">New Order</option>
    <option value="Cancelled">Cancelled</option>
    <option value="Delivered">Delivered</option>

    
</select>
<button className="button" onClick={()=>{filterStatus()}}>Filter</button>

<div className="grid-container">
         {result.map(function (d, idx) {

return (
    <div className="grid-item">
       <li  className="list" ><Link to={"/Customer"} style={{color:"seagreen"}}
        onClick={()=>{localStorage.setItem('customer',d.Customer)}}
        class="a" ><h4 >{d.Customer}</h4></Link></li>
        <li >Dishes: {d.Dishes}</li>
        <li >Total Amount: {d.Price}$</li>
                
    </div>
);
})}

         </div>

    </div>
)
}

export default Orders;