import React,{useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {logout} from '../../features/user';



function Nav(){

    const dispatch=useDispatch();
    let user=localStorage.getItem('name');
    const history=useHistory();

    const disp=()=>{
        dispatch(logout());
    }

    function logOut(){
        localStorage.clear();
        disp();
        window.open('../UserSign','_self');
    }

    return(
        <div className="Nav">
            
            <div className="leftside">
                
                <div className="links">
                <Link to={"/User"} class="a" style={{color:"seagreen"}}>UberEats</Link>
                <Link to={"/UserProfile"} class="a">Profile</Link>
                <Link to={"/EditUserProfile"} class="a">Edit Profile</Link>
                
                <Link to={"/Favourites"} class="a">Favourites</Link>
                 <button>Open</button>
            </div>
            </div>
            <div className="rightside">
                <div className="links">
                <Link to={"/Orders"} class="a">Orders</Link>
            <Link to={"../UserSign"} class="a" onClick={logOut}>Log Out</Link>
            </div>
            </div>

        </div>
    );
}
export default Nav;