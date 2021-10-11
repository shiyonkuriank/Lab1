import React, {useState} from'react';
import Axios from 'axios';
import {Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './AddDish.css';
import Nav from './Nav';

function AddDish(){
    //const[rname,setRestName]=useState(" ");
    const[name,setName]=useState(" ");
    const[price,setPrice]=useState(" ");
    const[cat,setCat]=useState(" ");
    const[ing,setIng]=useState(" ");
    const[foodType,setFoodType]=useState("");
    /*const[newdesc,setNewDesc]=useState(" ");
    const[imgPreview,setImagePreview]=useState(null);
	const[error, setError]=useState(false);
	const[profileImg,setProfileImg]=useState("");*/
    
    const addDish=()=>{
        alert("Dish added Successfully");
        
        Axios.post("http://18.218.134.220:3001/addDish",
{rname:localStorage.getItem('name'),name:name,price:price,type:foodType,cat:cat,ing:ing}
).then((response)=>{


});
    }

   /* const handleImageChange= async (e)=>{
		const selected=e.target.files[0];
		const base64=await convertBase64(selected);
        
		setProfileImg(base64);
		const ALLOWED_TYPES=["image/png", "image/jpeg", "iamge/jpg"];
		if(selected&&ALLOWED_TYPES.includes(selected.type)){
			let reader=new FileReader();
			reader.onloadend=()=>{
				setImagePreview(reader.result);

			}
			reader.readAsDataURL(selected);
		}else{
			setError(true);
			console.log("file not supported");
		}
	}

	const uploadImage=()=>{
		
        Axios.post("http://localhost:3001/editDishImg",
{name:localStorage.getItem('name'),img:profileImg,dish:name}).then((response)=>{
  
console.log(response.data);

});
		
		}

	const convertBase64=(file)=>{
		return new Promise((resolve,reject)=>{
			const fileReader=new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload=()=>{
				resolve(fileReader.result)
			};

			fileReader.onerror=(error)=>{
				reject(error);
			};

		});
	}*/

    
    return(
        
        <><Nav/>
        <div className="addDish" style={{color:"seagreen", height:"100vh"}}>
        
        <Container>
        
        
            <Col md={12}>
            <h2>Add your Specials!</h2>
            <form className="add" onSubmit={()=>addDish()}>
                 

                <div className="form-group" >
                    <label className="label">Dish Name:</label>
                    <input className="input" type="text" onChange={(e)=>{
                    setName(e.target.value); }} className="form-control" required></input>
                    
                </div>

                <div className="form-group" >
                    <label className="label">Price:</label>
                    <input  className="input" type="text" onChange={(e)=>{
                    setPrice(e.target.value);  }} className="form-control" required></input>
                   
                    
                </div>

                <div className="form-group" >
                    <label className="label">Category:</label>
                    <select className="input" onChange={(e)=>{
                    setFoodType(e.target.value); }} className="form-control" required>
                        <option >Food Type</option>
                        <option value="Vegan">Vegan</option>
	                    <option value="Veg">Veg</option>
                        <option value="NonVeg">Non-Veg</option>
                        
                    </select>

                </div>

                <div className="form-group" >
                    <label className="label">Category:</label>
                    <select className="input" onChange={(e)=>{
                    setCat(e.target.value); }} className="form-control" required>
                        <option >Food Category</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Salad">Salad</option>
                        <option value="Desert">Desert</option>
                        <option value="Beverages">Beverages</option>
                    </select>

                </div>

                

                <div className="form-group" >
                    <label className="label">Main Ingredient:</label>
                    <input className="input" type="text" onChange={(e)=>{
                    setIng(e.target.value); }} className="form-control" required ></input>
                    
                </div>

                
                      <button type="submit">Add Dish</button>
                
                </form>

                
                </Col>
            
            </Container>
        </div></>
        
    );
}

export default AddDish;