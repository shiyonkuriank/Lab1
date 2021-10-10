import React, {useState} from'react';
import Axios from 'axios';
import './EditDishes.css';
import {Col} from  'react-bootstrap';
import { Container } from 'react-bootstrap';
import Nav from './Nav';


function EditDishes(){

    const[isAuth,setIsAuth]=useState(true);

    if(!localStorage.getItem('name')){
        setIsAuth(false);
    }

    const[name,setName]=useState(" ");
    const[newname,setNewName]=useState(" ");
    const[newprice,setNewPrice]=useState(" ");
    const[newcat,setNewCat]=useState(" ");
    const[newing,setNewIng]=useState(" ");
    //const[newdesc,setNewDesc]=useState(" ");

    const[imgPreview,setImagePreview]=useState(null);
	const[error, setError]=useState(false);
	const[profileImg,setProfileImg]=useState("");
    


    const handleImageChange= async (e)=>{
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
	}

	const uploadImage=()=>{
		alert("Image Uploaded");
        Axios.post("http://localhost:3001/editDishImg",
{name:localStorage.getItem('name'),img:profileImg,dish:name}).then((response)=>{
  
console.log(response.data);

});
		
		}


    const editDname=()=>{
        alert("Successfully Edited");
        
        Axios.post("http://localhost:3001/editDname",
{name:name,newname:newname}).then((response)=>{
  
console.log(response.data);

});
    }

    const editPrice=()=>{
        alert("Successfully Edited");
        
        Axios.post("http://localhost:3001/editPrice",
{name:name,newPrice:newprice}).then((response)=>{
  
console.log(response.data);

});
    }

    const editCat=()=>{
        alert("Successfully Edited");
        
        Axios.post("http://localhost:3001/editCat",
{name:name,newCat:newcat}).then((response)=>{
  
console.log(response.data);

});
    }
    const editIng=()=>{
        alert("Successfully Edited");
        
        Axios.post("http://localhost:3001/editIng",
{name:name,newIng:newing}).then((response)=>{
  
console.log(response.data);

});
    }

    
    

    return(
        <><Nav/>
            <Container>
            <div class="editdishes" style={{color:"seagreen"}}>
            <Col md={4}>
		<div className="container">
			{error && <p className="errorMsg" >File Not Supported</p> }
		<div 
		className="imgPreview" 
		style={{background: imgPreview ? "url("+imgPreview+")": "black"}}
		>
				{!imgPreview && (
					<><p>Upload Profile Photo</p>
					<label htmlFor="fileUpload" className="customFileUpload">Upload Image</label>
					<input type="file" id="fileUpload" onChange={(e)=>{handleImageChange(e)}}></input>
					<span>(jpeg, jpeg or png</span></>
				) }
							

			</div>
			<button className="button" onClick={()=>{uploadImage()}}>Save Image</button>
			</div>
			</Col>

                
            <Col md={8}>
            <h3>Edit Your Dish</h3>
            <form >
                
                <div className="form-group" >
                    <label className="label">Enter the Dish to Edit:</label>
                    <input className="input" type="text" onChange={(e)=>{
                    setName(e.target.value); }}></input>
                    
                </div>
            </form>

            <form onSubmit={editDname}>
                <div className="form-group" >
                    <label className="label">New Dish Name:</label>
                    <input className="input" type="text" onChange={(e)=>{
                    setNewName(e.target.value); }}></input>
                    <button type="submit" className="button">Edit</button>
                </div>
            </form>

            <form onSubmit={editPrice}>
                <div className="form-group" >
                    <label className="label">New Price:</label>
                    <input className="input" type="text" onChange={(e)=>{
                    setNewPrice(e.target.value); }}></input>
                    <button type="submit" className="button">Edit</button>
                </div>
            </form>

            <form onSubmit={editCat}>
                <div className="form-group" >
                    <label className="label">New Category:</label>
                    <select className="input" type="text" onChange={(e)=>{
                    setNewCat(e.target.value); }}>
                        <option >Food Category</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Salad">Salad</option>
                        <option value="Desert">Desert</option>
                        <option value="Beverages">Beverages</option>
                    </select>
                    <button type="submit" className="button">Edit</button>
                </div>
            </form>

            <form onSubmit={editIng}>
                <div className="form-group" >
                    <label className="label">Main Ingredient:</label>
                    <input className="input" type="text" onChange={(e)=>{
                    setNewIng(e.target.value); }}></input>
                    <button type="submit" className="button">Edit</button>
                </div>
               
            </form>
            </Col>
            </div>
            </Container>
        

            

           


        </>
    );
}

export default EditDishes;