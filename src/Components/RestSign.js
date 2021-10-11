import React, {useState, useEffect} from "react";
import image from './images/ubereats3.jpg';
import { Link, useHistory, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Axios from 'axios';
import Navbar from './Navbar';


function RestSign(){
    const history=useHistory();

    const[email,setEmail]=useState(" ");
    const[pwd,setPass]=useState(" ");
    const[loginstatus,setLoginStatus]=useState(" ");
   

    const restlogin=()=>{
         
        Axios.post("http://18.218.134.220:3001/restlogin",
        {email:email,pwd:pwd}).then((response)=>{
            if(response.data.message){
                 
                setLoginStatus(response.data.message);
                localStorage.setItem('isAuthenticated','false');
                    }else{
                        
                        window.open("./Restaurant/Restaurant","_self");
                        localStorage.setItem('isAuthenticated','true');
                        
                        localStorage.setItem('name',response.data[0].Restname);
                        localStorage.setItem('email',response.data[0].Email);
                        localStorage.setItem('phone',response.data[0].Phone);
                        localStorage.setItem('city',response.data[0].Loc);
                        localStorage.setItem('pwd',response.data[0].pwd);
                    }
    });

 
 }   
       
 
    return(
        <><Navbar /><Container>
            <Row>
                <Col md={6}>
                    <form className="restLogin" onSubmit={restlogin}>
                        <h1>UberEats!</h1>
                        <div className="form-group">
                            <label>Enter your Email:</label>
                            <input type="email" onChange={(e) => {
                                setEmail(e.target.value);
                            } }
                                className="form-control" id="mail" required />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" onChange={(e) => {
                                setPass(e.target.value);
                            } }
                                class="form-control" id="pwd" required />
                        </div>
                        <button type="submit" className="btn btn-success">Sign in</button>
                    </form>
                    <p>New User?<Link to='/RestSignup' onClick={() => { history.push('/RestSignup'); } }>Add your Restaurant</Link></p>
                    <h1 style={{ color: "red" }}>{loginstatus}</h1>

                </Col>
                <Col md={6}>
                    <img src={image} class="mx-auto d-block" width="700" height="500" style={{ marginTop: "5%" }} />
                </Col>
            </Row>
        </Container></>
    );
    }


    export default RestSign;