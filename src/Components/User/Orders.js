import React, { useEffect, useState } from 'react';
import Nav from './UserNav';
import {Link} from 'react-router-dom';
import Axios from 'axios';

function Orders(){

    const[orders,setOrders]=useState([]);
    const[filter,setFilterStatus]=useState("");
    const[result,setResult]=useState([]);
useEffect(()=>{
    Axios.post("http://18.218.134.220:3001/viewRestOrder",
    {name:localStorage.getItem('name')}).then((response)=>{
      setOrders(response.data);
     
    });
},[]);


    const filterStatus=()=>{
        Axios.post("http://18.218.134.220:3001/statusFilter",
        {name:localStorage.getItem('name'),status:filter}).then((response)=>{
          setResult(response.data);
         
        });
     

    }


    return (
        <><Nav />
        <div className="custOrder" style={{ color: "seagreen", background:"black", height:"100vh" }}><h3>Past Orders</h3>
        <div className="grid-container">
         {orders.map(function (d, idx) {

return (
    <div className="grid-item">
        <li><Link to={"/Receipt"} 
                        onClick={()=>{localStorage.setItem('receiptFor',d.Restname);
                        localStorage.setItem('receiptDish',d.Dishes)}}
                        class="a" style={{color:"forestgreen"}}><h4 >{d.Restname}</h4></Link></li>
                
    </div>
);
})}

         </div>

         <select type="text" className="filterStatus"  onChange={(e)=>{
                    setFilterStatus(e.target.value); }} style={{width:"40%"}}>
    <option >Filter Status</option>
    <option value="Order Received">Order Received</option>
	<option value="Prepairing">Prepairing</option>
    <option value="On the way">On the way</option>
    <option value="Delivered">Delivered</option>
    <option value="Pick Up Ready">Pick Up Ready</option>
    <option value="Picked Up">Picked Up</option>
    
</select>
<button className="button" onClick={()=>{filterStatus()}}>Filter</button>

<div className="grid-container">
         {result.map(function (d, idx) {

return (
    <div className="grid-item">
        <li><h4>{d.Restname}</h4></li>
        <li><h5>{d.Dishes}</h5></li>
                
    </div>
);
})}

         </div>

        </div>
        </>

    )
}
export default Orders;