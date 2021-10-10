import React, {useState} from "react";
import './Restaurant.css'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AddDish from "./AddDish";
import EditDishes from "./EditDishes";
import Menu from "./Menu";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ProtectedRoute from '../../ProtectedRoute';



function Restaurant(){

  

 return(

        <div className="landing">
          <BrowserRouter>
       <div className="navigate">
         
         <Switch>
           <Route exact path='/Restaurant/Restaurant' component={Profile}/>
           <Route path='/Profile' component={Profile} />
           <Route path='/EditProfile' component={EditProfile}/>
           <Route path='/Menu' component={Menu}/>
           <Route path='/AddDish' component={AddDish}/>
           <Route path='/EditDishes' component={EditDishes}/>
           
         </Switch>
         
       </div>
       </BrowserRouter>
       
       </div>
        
        
      
    );
}
export default Restaurant;