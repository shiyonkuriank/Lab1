import React, {useState} from "react";
import {Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './UserSignup.css';
import Axios from 'axios';
import { useHistory } from "react-router";
import {useDispatch} from 'react-redux'
import {login} from '../features/user'

function UserSignup(){
    const history=useHistory();
    const dispatch=useDispatch();
    const[nameReg,setNameReg]=useState(" ");
    const[emailReg,setEmailReg]=useState(" ");
    const[phoneReg,setPhoneReg]=useState(" ");
    const[dobReg,setDOBReg]=useState(" ");
    const[cityReg,setCityReg]=useState(" ");
    const[stateReg,setStateReg]=useState(" ");
    const[countryReg,setCountryReg]=useState(" ");
    const[pwdReg,setPwdReg]=useState(" ");
    const [errorMessage,setErrorMessage]=useState(" ");

    const validate=(value)=>{
        if(value.length<8){
            setErrorMessage("Password requires a min length of 8");
        }
        else{
            setErrorMessage("Password is strong");
        }
    }
    const disp=()=>{
        dispatch(login({name:nameReg, email:emailReg,
            phone:phoneReg,dob:dobReg,city:cityReg,state:stateReg,
                               country:countryReg,password:pwdReg}));
    }
    const userregister=()=>{
        Axios.post("http://localhost:3001/userregister",
        {name:nameReg, email:emailReg, phone:phoneReg, dob: dobReg,
         city: cityReg, state: stateReg, country: countryReg,pwd:pwdReg}).then((response)=>{
           
        });
                        localStorage.setItem('name',nameReg);
                        localStorage.setItem('email',emailReg);
                        localStorage.setItem('phone',phoneReg);
                        localStorage.setItem('dob',dobReg);
                        localStorage.setItem('city',cityReg);
                        localStorage.setItem('state',stateReg);
                        localStorage.setItem('country',countryReg);
                        localStorage.setItem('pwd',pwdReg);
                        localStorage.setItem('currRest',"");
                        localStorage.setItem('isAuthenticated','true');
        
       disp();
        history.push('/User/User');
    };

return(
    <Container>
     <form className="usersignup" onSubmit={userregister}>   
    <Col md={4}>
    
    <h1>Welcome!</h1>
                 <div className="form-group">
                 <label>Enter Your Name</label>
                    <input type="text" pattern="[A-Za-z]{1-32}" onChange={(e)=>{
                    setNameReg(e.target.value); }} name ="name" className="form-control" required autoFocus/>
                    </div>
                    
                    <div className="form-group">
                <label>Enter your Email:</label>
                <input type= "email"  onChange={(e)=>{
                    setEmailReg(e.target.value); }}
                className="form-control" id="mail" required/>
            </div>
                <div className="form-group">
                        <label>Enter your Phone number:</label>
                        <input type="tel"  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  onChange={(e)=>{
                    setPhoneReg(e.target.value); }}
                        id="phone" className="form-control" name ="phone" placeholder="123-456-7892" required/>
                        </div> 

                <div className="form-group">
                        <label>Enter your DOB:</label>
                        <input type="date" placeholder="YYYY-MM-DD"  onChange={(e)=>{
                    setDOBReg(e.target.value); }}
                        id="phone" className="form-control" name ="DOB" required/>
                        </div>

                <div className="form-group">
                        <label>Enter your City:</label>
                        <input type="text"  onChange={(e)=>{
                    setCityReg(e.target.value); }}
                        id="phone" className="form-control" name ="city" required/>
                        </div> 

                        <div className="form-group">
                        <label>Enter your State:</label>
                        <input type="text"  onChange={(e)=>{
                    setStateReg(e.target.value); }}
                        id="phone" className="form-control" name ="state" required/>
                        </div>

                        <div className="form-group">
                        <label>Country:</label>
                        <input type="text"  onChange={(e)=>{
                    setCountryReg(e.target.value); }}
                        id="phone" className="form-control" name ="country" required/>
                        </div>         
                        
                 <div className="form-group">
                 <label >Password:</label>
                 <input type="password"  onChange={(e)=>{
                     validate(e.target.value);
                    setPwdReg(e.target.value); }}
                 className="form-control" id="pwd" name="pwd"/>
                 </div>
                 <span style={{color:"red"}}>{errorMessage}</span>
                
            <button type="submit" className="btn btn-success">Sign up</button>
        
        </Col>
        </form>
        </Container>
       
);
/*const userregister=()=>{
    console.log("userregistercalled");
    Axios.post("http://localhost:3001/userregister",
    {name:nameReg, email:emailReg, phone:phoneReg, dob: dobReg,
     city: cityReg, state: stateReg, country: countryReg,pwd:pwdReg}).then((response)=>{
        console.log(response);
    });
    history.push('/UserSign');
};

    return(
       
        <Container>
     <form className="usersignup" onSubmit={userregister}>   
    <Col md={4}>
    
    <h1>Welcome!</h1>
                 <div className="form-group">
                 <label>Enter Your Name</label>
                    <input type="text" onChange={(e)=>{
                    setNameReg(e.target.value); }} name ="name" className="form-control" required autoFocus/>
                    </div>
                    
                    <div className="form-group">
                <label>Enter your Email:</label>
                <input type= "email"  onChange={(e)=>{
                    setEmailReg(e.target.value); }}
                className="form-control" id="mail" required/>
            </div>
                <div className="form-group">
                        <label>Enter your Phone number:</label>
                        <input type="tel"  onChange={(e)=>{
                    setPhoneReg(e.target.value); }}
                        id="phone" className="form-control" name ="phone" placeholder="123-456-7892" required/>
                        </div> 

                <div className="form-group">
                        <label>Enter your DOB:</label>
                        <input type="date" placeholder="YYYY-MM-DD"  onChange={(e)=>{
                    setDOBReg(e.target.value); }}
                        id="phone" className="form-control" name ="DOB" required/>
                        </div>

                <div className="form-group">
                        <label>Enter your City:</label>
                        <input type="text"  onChange={(e)=>{
                    setCityReg(e.target.value); }}
                        id="phone" className="form-control" name ="city" required/>
                        </div> 

                        <div className="form-group">
                        <label>Enter your State:</label>
                        <input type="text"  onChange={(e)=>{
                    setStateReg(e.target.value); }}
                        id="phone" className="form-control" name ="state" required/>
                        </div>

                        <div className="form-group">
                        <label>Country:</label>
                        <input type="text"  onChange={(e)=>{
                    setCountryReg(e.target.value); }}
                        id="phone" className="form-control" name ="country" required/>
                        </div>         
                        
                 <div className="form-group">
                 <label >Password:</label>
                 <input type="password"  onChange={(e)=>{
                     validate(e.target.value);
                    setPwdReg(e.target.value); }}
                 className="form-control" id="pwd" name="pwd"/>
                 </div>
                 <span style={{color:"red"}}>{errorMessage}</span>
                 <div className="form-group">
                    <label >Confirm Password:</label>
                    <input type="password" className="form-control" id="cpwd" name="cpwd"/>
                    </div>
            <button type="submit" className="btn btn-success">Sign up</button>
        
        </Col>
        </form>
        </Container>
       
       
    );*/
}
export default UserSignup;
