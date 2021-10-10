import React from 'react';
import {useHistory} from 'react-router-dom';
import {Row} from 'react-bootstrap';

function Confirmation(){

const history=useHistory();
    return(
        <>
    
    <div className="modalBackground">
        
    
    <div className="modalContainer">
                
           
                <div classname="title"><h1 style={ { color: 'darkcyan' }}>Alert!</h1> </div>
                   
                <div className="body" style={ { color: 'darkcyan' }}>
         <p>Your cart contains items from a different restautant. Do you wish to create a new order?</p>
            </div>
            <div className="footer">
                <Row>
                        <button className="footerbutton" onClick={()=>{
                           localStorage.setItem('currRest',localStorage.getItem('restName'));
                        history.goBack();
                        
                        }}>Yes</button>
                         <button className="footerbutton" onClick={()=>{
                              localStorage.setItem('restName',localStorage.getItem('currRest'));
                             history.push('/OrderNow');
                                                
                        }}>No</button>
                        
                  </Row>      
                    </div> 
    
            
            </div>
        </div>
       
        </>
    )
}

export default Confirmation;