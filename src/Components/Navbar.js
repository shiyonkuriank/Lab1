import React, {useState} from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';



function Navbar(){
    const [click, setClick]=useState(false);
    const handleClick=()=> setClick(!click);
    
    return(
        <>
        <nav className='navbar'>
        <Link to ={"/UserSign"}
            className='nav-links' id="user">User Sign in</Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click? 'fas fa-times':'fas fa-bars'}></i>
            </div>
            
            <Link to={'/RestSign'}
            className='nav-links' id="rest">Restaurant Sign in</Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click? 'fas fa-times':'fas fa-bars'}></i>
            </div>
            
        </nav>
        </>

    )
}
export default Navbar;