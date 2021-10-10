import React from 'react';
import image from './ubereats1.png';
import Navbar from './Components/Navbar';
function Home(){
    return(
       
        <div class="jumbotron text-center"  style={{color:"forestgreen"}}>
             <Navbar/>
            <h1>Uber Eats</h1>
            <p>Get your favourites at your door step!</p> 
            
            <img src={image} class="mx-auto d-block" width="1000" height="600"></img>
        </div>
        

    );
}

export default Home;