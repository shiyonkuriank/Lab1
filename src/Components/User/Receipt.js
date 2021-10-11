import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import Nav from './UserNav';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';

function Receipt(){

    const[receipt,setReceipt]=useState([]);

    useEffect(()=>{
        Axios.post("http://18.218.134.220:3001/viewReceipt",
        {restname:localStorage.getItem('receiptFor'),
        dish:localStorage.getItem('receiptDish'),name:localStorage.getItem('name')}).then((response)=>{
          setReceipt(response.data);
         
        });
    },[]);


    return(
        <>
            <div className="modalBackground">
    

    <div className="modalContainer">
        
    <div classname="title"><h1 style={ { color: 'darkcyan' }}>Receipt</h1> </div>
    <div className="body" style={ { color: 'orange' }}>
            <Container>
    <Row>
        <Col md={12}>
            {receipt.map(function (d, idx) {

return (
   
    
        <><li>Dishes Ordered: {d.Dishes}</li>
        <li>Order Status: {d.OrderStatus}</li>
        <li>Address: {d.Address}</li>
        <li>Total Amount: {d.Price}$</li>
        </>

    );
})}
</Col>
</Row>
</Container>
            </div>
        </div>
        </div></>
    )
}
export default Receipt;