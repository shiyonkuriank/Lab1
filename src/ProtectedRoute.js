import React, {useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';

function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest}){
   const isAuthenticated= localStorage.getItem('isAuthenticated');
return (
<Route 
         {...rest} 
         render={(props)=>{
         if(isAuthenticated){
        return <Component/>;
    }else{
        return (
        <Redirect to={{pathname: '../RestSign', state:{from:props.location}}} />
        );
    }

}}></Route>
);
}
    

export default ProtectedRoute;