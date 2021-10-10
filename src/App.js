import React,{useState} from 'react';
import './App.css';
import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import UserSign from "./Components/UserSign";
import RestSign from "./Components/RestSign";
import UserSignup from './Components/UserSignup';
import RestSignup from './Components/RestSignup';
import Restaurant from './Components/Restaurant/Restaurant';
import EditProfile from './Components/Restaurant/EditProfile';
import Menu from './Components/Restaurant/Menu';
import EditDishes from './Components/Restaurant/EditDishes';
import AddDish from './Components/Restaurant/AddDish';
import Nav from './Components/Restaurant/Nav';
import Profile from './Components/Restaurant/Profile';
import User from './Components/User/User';
import UserProfile from './Components/User/UserProfile';
import EditUserProfile from './Components/User/EditUserProfile';
import OrderNow from './Components/User/OrderNow';
import Filters from './Components/User/Filters';
import NewCart from './Components/User/NewCart';
import Favourites from './Components/User/Favourites';
import Orders from './Components/User/Orders';
import OrdersReceived from './Components/Restaurant/OrdersReceived';
import Customer from './Components/Restaurant/Customer';
import Receipt from './Components/User/Receipt';
import ProtectedRoute from './ProtectedRoute';
import CartView from './Components/User/CartView';
import Confirmation from './Components/User/Confirmation';


function App() {

  const[isAuth, setIsAuth]=useState(false);
  return (
    <div className="App">
     
       <Router>
            
            <Switch>
              <Route exact path='/'  component={Home}/>
               <Route path='/UserSign'  component={UserSign}/>
               <Route path='/RestSign' component={RestSign}/>
               <Route path='/UserSignup' component={UserSignup}/>
               <Route path='/RestSignup' component={RestSignup}/>
               <Route path='/Restaurant' component={Restaurant}/>
               <ProtectedRoute path='/Profile' component={Profile} isAuthenticated={true}/>
               <ProtectedRoute path='/EditProfile' component={EditProfile} isAuthenticated={true} />
               <Route path='/Menu' component={Menu}/>
               <ProtectedRoute path='/EditDishes' component={EditDishes} isAuthenticated={true}/>
               <Route path='/Nav' component={Nav}/>
               <ProtectedRoute path='/AddDish' component={AddDish} isAuthenticated={true}/>
               <Route path='/User' component={User}/>
               <Route path='/UserProfile' component={UserProfile}/>
               <ProtectedRoute path='/EditUserProfile' component={EditUserProfile} isAuthenticated={true}/>
               <Route path='/OrderNow' component={OrderNow}/>
               <Route path='/Filters' component={Filters}/>
               <Route path='/NewCart' component={NewCart}/>
               <Route path='/CartView' component={CartView}/>
               <Route path='/Favourites' component={Favourites}/>
               <Route exact path='/Orders' component={Orders}/>
               <Route exact path='/OrdersReceived' component={OrdersReceived}/>
               <Route path='/Customer' component={Customer}/>
               <Route path='/Receipt' component={Receipt}/>
               <Route path='/Confirmation' component={Confirmation}/>
              
               </Switch>
      </Router>                       
            
    </div>
  );
}

export default App;
