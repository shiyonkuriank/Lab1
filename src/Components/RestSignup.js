import React, {useState} from "react";
import {Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './RestSignup.css';
import Axios from 'axios';
import { useHistory } from "react-router";
import {useDispatch} from 'react-redux'
import {restlogin} from '../features/rest'

function RestSignup(){
    const history=useHistory();
    const dispatch=useDispatch();

    const [errorMessage,setErrorMessage]=useState(" ");
    const[rnameReg,setRnameReg]=useState(" ");
    const[emailReg,setEmailReg]=useState(" ");
    const[locReg,setLocReg]=useState(" ");
    const[phoneReg,setPhoneReg]=useState(" ");
    const[pwdReg,setPwdReg]=useState(" ");

    const validate=(value)=>{
        if(value.length<8){
            setErrorMessage("Password requires a min length of 8");
        }
        else{
            setErrorMessage("Password is strong");
        }
    }

    const disp=()=>{
        dispatch(restlogin({name:rnameReg, email:emailReg,
            phone:phoneReg,city:locReg,password:pwdReg}));
    }

const restregister=()=>{
    
    Axios.post("http://localhost:3001/restregister",
    {rname:rnameReg,loc:locReg,phone:phoneReg,email:emailReg,pwd:pwdReg}).then((response)=>{
        console.log(response);
    });
    localStorage.setItem('isAuthenticated','true');
    localStorage.setItem('name',rnameReg);
    localStorage.setItem('email',emailReg);
    localStorage.setItem('phone',phoneReg);
    localStorage.setItem('city',locReg);
    localStorage.setItem('pwd',pwdReg);
    disp();
    history.push('/Restaurant/Restaurant');
};

    return(
       
        <Container>
       <form className="restsignup" onSubmit={restregister}> 
    <Col md={4}>
    
    <h1>Welcome!</h1>
    
                 <div className="form-group">
                 <label>Restaurant Name:</label>
                    <input type="text" onChange={(e)=>{
                    setRnameReg(e.target.value); }}
                    id="rname" name ="rname" className="form-control" required autoFocus/>
                    </div>
                    
                    <div className="form-group">
                    <label>Location:</label>
                    <input type="text" onChange={(e)=>{
                    setLocReg(e.target.value); }}
                    id="loc" name ="loc" className="form-control" required/>
                    </div> 
                    <div className="form-group">
                        <label>Enter your Phone number:</label>
                        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={(e)=>{
                            
                    setPhoneReg(e.target.value); }}
                        id="phone" className="form-control" name ="phone" placeholder="123-456-7895" required/>
                        </div>
                           
                        <div className="form-group">
                <label>Enter your Email:</label>
                <input type= "email" onChange={(e)=>{
                    setEmailReg(e.target.value); }}
                className="form-control" id="mail" required/>
            </div>
                 <div class="form-group">
                 <label for="pwd">Password:</label>
                 <input type="password" onChange={(e)=>{
                     validate(e.target.value);
                     setPwdReg(e.target.value); 
                     }}
                     className="form-control" id="pwd" name="pwd"/>
                 </div>
                 <span style={{color:"red"}}>{errorMessage}</span>
                 
            <button type="submit" className="btn btn-success" >Sign up</button>
            
        
       
        </Col>
        </form>
        </Container>
        
       
    );
}
export default RestSignup;
