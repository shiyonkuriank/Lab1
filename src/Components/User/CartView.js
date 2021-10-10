import React, {useState,useEffect} from 'react';
import Axios from 'axios';
import './cart.css';
import {} from 'react-dom'
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import { useHistory} from 'react-router';



function NewCart({closeModel}){

    //const [cartItem,setCart]=useState([]);

    //const [address,setAddress]=useState("");
    //const[dType,setDeliveryType]=useState("");
    const history=useHistory();
    const cartItem=JSON.parse(localStorage.getItem('dishes'));
    //const cost=JSON.parse(localStorage.getItem('cost'));


/*const checkOut=()=>{

Axios.post("http://localhost:3001/addTotal",
{tot:total,name:localStorage.getItem('restName'),customer:localStorage.getItem('name'),
dishes:JSON.stringify(cartItem),address: address,deliveryType:dType,status:"New Order"}).then((response)=>{
console.log(response);
});
}



let total=0;

cost.forEach(myFunction);

function myFunction(item){
    total+=item;
}*/

  
return(
    <>
    
    <div className="modalBackground">
    

        <div className="modalContainer">
            
       
            <div classname="title"><h1 style={ { color: 'darkcyan' }}>View the Cart Items</h1> </div>
               
            <div className="body">
            <Container>
    <Row>
        <Col md={12}>
                {cartItem.map(function (d, idx) {

return (
    <>
        <li key={idx} style={ { color: 'Orange' }}><h4>{d}</h4></li> </>
               
);
})}
               
                </Col>

            </Row>

        </Container>
        </div>
        <div className="footer">
                    <button className="footerbutton" style={{width:"40%"}} onClick={()=>{
                    history.push("/NewCart");

                    }}>Proceed To CheckOut</button>
                    
                </div> 

        
        </div>
    </div>
   
    </>
)
}

export default NewCart;