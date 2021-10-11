import React, {useState,useEffect} from 'react';
import Axios from 'axios';
import './cart.css';
import {} from 'react-dom'
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import { useHistory} from 'react-router';



function NewCart({closeModel}){

    //const [cartItem,setCart]=useState([]);

    const [address,setAddress]=useState("");
    const[dType,setDeliveryType]=useState("");
    const history=useHistory();
    const cartItem=JSON.parse(localStorage.getItem('dishes'));
    const cost=JSON.parse(localStorage.getItem('cost'));


const checkOut=()=>{

Axios.post("http://18.218.134.220:3001/addTotal",
{tot:total,name:localStorage.getItem('restName'),customer:localStorage.getItem('name'),
dishes:JSON.stringify(cartItem),address: address,deliveryType:dType,status:"New Order"}).then((response)=>{
console.log(response);
});
}



let total=0;

cost.forEach(myFunction);

function myFunction(item){
    total+=item;
}

  
return(
    <>
    
    <div className="checkout">
    

        <div className="container">
            
       
            <div classname="title"><h1 style={ { color: 'darkcyan' }}>Order Details</h1> </div>
               
            <div className="body">
            <Container>
    <Row>
        <Col md={6}>
                {cartItem.map(function (d, idx) {

return (
    <>
        <li key={idx} style={ { color: 'Orange' }}><h4>{d}</h4></li> </>
               
);
})}

<h4 style={ { color: 'Orange' }}>Total Amount:{total}$</h4>   


                


               
                </Col>

               
        <Col md={6}>
            <Row>
                <Col md={4}>
            <label style={ { color: 'darkcyan' }}>Enter Your Address:</label>
            </Col>
            <Col md={8}>
            <textarea style={{width: "200px", height:"100px"}} onChange={(e) => {
                                setAddress(e.target.value);
                            } } required placeholder="Required Field"></textarea>
            
            </Col>
            <select type="text" className="delivery"  onChange={(e)=>{
                    setDeliveryType(e.target.value); }}>
    <option >Select Delivery Type</option>
    <option value="Delivery">Delivery</option>
	<option value="Take Out">Pick Up</option>
    
</select>

            </Row>
        </Col>
        </Row>
        </Container>
        </div>
        <div className="footer">
                    <button className="footerbutton" onClick={()=>{checkOut();
                    history.push("/User");
                    alert("Order Placed Successfully");
                    localStorage.setItem('currRest',"");
                    }}>Check Out</button>
                    
                </div> 

        
        </div>
    </div>
   
    </>
)
}

export default NewCart;