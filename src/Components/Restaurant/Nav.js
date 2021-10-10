import React,{useState} from 'react';
import {useHistory, Link} from 'react-router-dom';





function Nav(){

    const history=useHistory();
    let user=localStorage.getItem('name');

    function logOut(){
        localStorage.clear();
        window.open('../RestSign','_self');
    }

    return(
        <div className="Nav">
            <div className="leftside">
                
                <div className="links">
                <Link to={"/Profile"} class="a" style={{color:"seagreen"}}>UberEats</Link>
                <Link to={"/EditProfile"} class="a">Edit Profile</Link>
                <Link to={"/Menu"} class="a">Menu</Link>
                <Link to={"/AddDish"} class="a">Add Dish</Link>
                <Link to={"/EditDishes"} class="a">Edit Dishes</Link>
                </div>
                <button>Open</button>
            </div>
            <div className="rightside">
                <div className="links">
                <Link to={"/OrdersReceived"} class="a">Orders Received</Link>
            <Link to={"../RestSign"} class="a" onClick={logOut}>Log Out</Link>
            </div>
            </div>

        </div>
    );
}
export default Nav;