import React, {useState} from "react";
import image from './images/ubereats2.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from "react-router-dom";
import Axios from 'axios';
import Navbar from './Navbar'


function UserSign(){
  const history=useHistory();

  //const crypto=require("crypto");
//const secret='pppppppppppppppppppppppppppppppp';
    
   const[email,setEmail]=useState(" ");
    const[pwd,setPass]=useState(" ");
    const[loginstatus,setLoginStatus]=useState(" ");
    /*const[password,setPassword]=useState([]);

    const decrypt=(encryption)=>{

        const decipher = crypto.createDecipheriv
      (
        "aes-256-ctr",
        Buffer.from(secret),
        Buffer.from(encryption.iv, "hex")
      );
      const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encryption.password,"hex")),
        decipher.final(),
      ]);
    
      return decryptedPassword.toString();
        
    }*/

 

    const userlogin=()=>{
        
        Axios.post("http://localhost:3001/userlogin",
        {email:email,Pwd:pwd}).then((response)=>{

            if(response.data.message){
                 
                setLoginStatus(response.data.message);
                localStorage.setItem('isAuthenticated','false');
                     }else{
                         
                                                     
                        window.open("./User/User","_self");
                        localStorage.setItem('isAuthenticated','true');
                        localStorage.setItem('name',response.data[0].Name);
                        localStorage.setItem('email',response.data[0].Email);
                        localStorage.setItem('phone',response.data[0].Phone);
                        localStorage.setItem('dob',response.data[0].DOB);
                        localStorage.setItem('city',response.data[0].City);
                        localStorage.setItem('state',response.data[0].State);
                        localStorage.setItem('country',response.data[0].Country);
                        localStorage.setItem('pwd',response.data[0].Pwd);
                        localStorage.setItem('currRest',"");

                    }
            
                });
            }
            

            /*
            const decryptPass=decrypt(response.data[0].Pwd,response.data[0].iv);
            if(decryptPass==pwd){
                       
                window.open("./User/User","_self");
                localStorage.setItem('isAuthenticated','true');
                localStorage.setItem('name',response.data[0].Name);
                localStorage.setItem('email',response.data[0].Email);
                localStorage.setItem('phone',response.data[0].Phone);
                localStorage.setItem('dob',response.data[0].DOB);
                localStorage.setItem('city',response.data[0].City);
                localStorage.setItem('state',response.data[0].State);
                localStorage.setItem('country',response.data[0].Country);
                localStorage.setItem('pwd',response.data[0].Pwd);
                localStorage.setItem('currRest',"");
                              
            }else{
                setLoginStatus("No such User Found");
            }*/
            
            /*
            
                                      
                    }*/
     



    return(
        <><Navbar /><Container>
            <Row>
                <Col md={6}>
                    <form className="userLogin" onSubmit={userlogin}>
                        <h1>UberEats!</h1>
                        <div className="form-group">
                            <label>Enter your Email:</label>
                            <input type="email" onChange={(e) => {
                                setEmail(e.target.value);
                            } }
                                className="form-control" id="mail" required autoFocus />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password"
                                onChange={(e) => {
                                    setPass(e.target.value);
                                } } className="form-control" id="pwd" required />
                        </div>
                        <button type="submit" className="btn btn-success">Sign in</button>
                    </form>
                    <p>New User?<Link to='/UserSignup' onClick={() => { history.push('/UserSignup'); } }>Sign Up</Link></p>
                    <h1 style={{ color: "red" }}>{loginstatus}</h1>
                </Col>
                <Col md={6}>
                    <img src={image} class="mx-auto d-block" width="700" height="500" style={{ marginTop: "5%" }} />
                </Col>
            </Row>
        </Container></>
        
    );
}

export default UserSign;