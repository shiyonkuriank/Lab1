import React, {useState} from'react';
import Axios from 'axios';
import {Col} from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import './EditUserProfile.css'
import Nav from './UserNav';

function EditUserProfile(){
    const name=localStorage.getItem('name');
    const[newname,setNewName]=useState(" ");
    const[newemail,setNewEmail]=useState(" ");
    const[newphone,setNewPhone]=useState(" ");
    const[newdob,setNewDob]=useState(" ");
	const[newpass,setNewPass]=useState(" ");
    const[newcity,setNewCity]=useState(" ");
    const[newstate,setNewState]=useState(" ");
    const[newcountry,setNewCountry]=useState(" ");
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

	const uploadImage=()=>{

		alert("Image Uploaded");
        Axios.post("http://18.218.134.220:3001/editProfileImg",
{name:localStorage.getItem('name'),img:profileImg}).then((response)=>{
  
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
	}
			

    const editName=()=>{
               
        Axios.post("http://18.218.134.220:3001/editUserName",
{name:localStorage.getItem('name'),newname:newname}).then((response)=>{
  
console.log(response.data);


});

Axios.post("http://18.218.134.220:3001/editOrderSummaryUserName",
{name:localStorage.getItem('name'),newname:newname}).then((response)=>{
  
console.log(response.data);

});

Axios.post("http://18.218.134.220:3001/editFavUserName",
{name:localStorage.getItem('name'),newname:newname}).then((response)=>{
  
console.log(response.data);

});
localStorage.setItem('name',newname);
    }

    const editEmail=()=>{
		alert("Successfully Edited");
        localStorage.setItem('email',newemail);  
        Axios.post("http://localhost:3001/editUserEmail",
{name:name,newemail:newemail}).then((response)=>{
  
console.log(response.data);

});
    }

    const editPhone=()=>{
        alert("Successfully Edited");
        
        Axios.post("http://18.218.134.220:3001/editUserPhone",
{name:name,newphone:newphone}).then((response)=>{
  
console.log(response.data);

});
    }
    const editDob=()=>{
        alert("Successfully Edited");
        
        Axios.post("http://18.218.134.220:3001/editUserDob",
{name:name,newdob:newdob}).then((response)=>{
  
console.log(response.data);

});
    }

	const editPass=()=>{
        alert("Successfully Edited");
        
        Axios.post("http://18.218.134.220:3001/editUserPass",
{name:name,newpass:newpass}).then((response)=>{
  
console.log(response.data);

});
    }


    const editCity=()=>{
        alert("Successfully Edited");
        
        Axios.post("http://18.218.134.220:3001/editUserCity",
{name:name,newcity:newcity}).then((response)=>{
  
console.log(response.data);

});
    }
    const editState=()=>{
        alert("Successfully Edited");
        
        Axios.post("http://18.218.134.220:3001/editUserState",
{name:name,newstate:newstate}).then((response)=>{
  
console.log(response.data);

});
    }

    const editCountry=()=>{
        alert("Successfully Edited");
        
        Axios.post("http://18.218.134.220:3001/editUserCountry",
{name:name,newcountry:newcountry}).then((response)=>{
  
console.log(response.data);

});
    }



    return(
        <><Nav/>
			
        <Container>
        <div class="editprofile">
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
        <h3>Edit Your Profile</h3>
		<form onSubmit={editName}>
                <div className="form-group" >
                    <label className="label">New Name:</label>
                    <input type="text" class="input" onChange={(e)=>{
                    setNewName(e.target.value); }}></input>
                    <button type="submit" className="button">Edit</button>
                </div>
            </form>


            <form onSubmit={editEmail}>
                <div className="form-group" >
                    <label className="label">Email ID:</label>
                    <input type="email" class="input" onChange={(e)=>{
                    setNewEmail(e.target.value); }}></input>
                    <button type="submit" className="button">Edit</button>
                </div>
            </form>

            <form onSubmit={editPhone}>
                <div className="form-group" >
                    <label className="label">Contact Details:</label>
                    <input type="tel"  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" class="input" placeholder="123-456-8765" onChange={(e)=>{
                    setNewPhone(e.target.value); }}></input>
                    <button type="submit" className="button">Edit</button>
                </div>
            </form>

            <form onSubmit={editDob}>
                <div className="form-group" >
                    <label className="label">DOB:</label>
                    <input type="date" class="input" onChange={(e)=>{
                    setNewDob(e.target.value); }}></input>
                    <button type="submit"  className="button">Edit</button>
                </div>
            </form>

			<form onSubmit={editPass}>
                <div className="form-group" >
                    <label className="label">New Password:</label>
                    <input type="text" class="input" onChange={(e)=>{
                    setNewPass(e.target.value); }}></input>
                    <button type="submit"  className="button">Edit</button>
                </div>
            </form>

            <form onSubmit={editCity}>
                <div className="form-group" >
                    <label className="label">City:</label>
                    <input type="text" class="input" onChange={(e)=>{
                    setNewCity(e.target.value); }}></input>
                    <button type="submit" className="button">Edit</button>
                </div>
            </form>

            <form onSubmit={editState}>
                <div className="form-group" >
                    <label className="label">State:</label>
                    <input type="text" class="input" onChange={(e)=>{
                    setNewState(e.target.value); }} ></input>
                    <button type="submit" className="button">Edit</button>
                </div>
             
            </form>
            <form onSubmit={editCountry}>
                <div className="form-group" >
                    <label className="label">Country:</label>
                    <select type="text" class="input" onChange={(e)=>{
                    setNewCountry(e.target.value); }} >
                        <option value="AF">Afghanistan</option>
	<option value="AX">Åland Islands</option>
	<option value="AL">Albania</option>
	<option value="DZ">Algeria</option>
	<option value="AS">American Samoa</option>
	<option value="AD">Andorra</option>
	<option value="AO">Angola</option>
	<option value="AI">Anguilla</option>
	<option value="AQ">Antarctica</option>
	<option value="AG">Antigua and Barbuda</option>
	<option value="AR">Argentina</option>
	<option value="AM">Armenia</option>
	<option value="AW">Aruba</option>
	<option value="AU">Australia</option>
	<option value="AT">Austria</option>
	<option value="AZ">Azerbaijan</option>
	<option value="BS">Bahamas</option>
	<option value="BH">Bahrain</option>
	<option value="BD">Bangladesh</option>
	<option value="BB">Barbados</option>
	<option value="BY">Belarus</option>
	<option value="BE">Belgium</option>
	<option value="BZ">Belize</option>
	<option value="BJ">Benin</option>
	<option value="BM">Bermuda</option>
	<option value="BT">Bhutan</option>
	<option value="BO">Bolivia, Plurinational State of</option>
	<option value="BQ">Bonaire, Sint Eustatius and Saba</option>
	<option value="BA">Bosnia and Herzegovina</option>
	<option value="BW">Botswana</option>
	<option value="BV">Bouvet Island</option>
	<option value="BR">Brazil</option>
	<option value="IO">British Indian Ocean Territory</option>
	<option value="BN">Brunei Darussalam</option>
	<option value="BG">Bulgaria</option>
	<option value="BF">Burkina Faso</option>
	<option value="BI">Burundi</option>
	<option value="KH">Cambodia</option>
	<option value="CM">Cameroon</option>
	<option value="CA">Canada</option>
	<option value="CV">Cape Verde</option>
	<option value="KY">Cayman Islands</option>
	<option value="CF">Central African Republic</option>
	<option value="TD">Chad</option>
	<option value="CL">Chile</option>
	<option value="CN">China</option>
	<option value="CX">Christmas Island</option>
	<option value="CC">Cocos (Keeling) Islands</option>
	<option value="CO">Colombia</option>
	<option value="KM">Comoros</option>
	<option value="CG">Congo</option>
	<option value="CD">Congo, the Democratic Republic of the</option>
	<option value="CK">Cook Islands</option>
	<option value="CR">Costa Rica</option>
	<option value="CI">Côte d'Ivoire</option>
	<option value="HR">Croatia</option>
	<option value="CU">Cuba</option>
	<option value="CW">Curaçao</option>
	<option value="CY">Cyprus</option>
	<option value="CZ">Czech Republic</option>
	<option value="DK">Denmark</option>
	<option value="DJ">Djibouti</option>
	<option value="DM">Dominica</option>
	<option value="DO">Dominican Republic</option>
	<option value="EC">Ecuador</option>
	<option value="EG">Egypt</option>
	<option value="SV">El Salvador</option>
	<option value="GQ">Equatorial Guinea</option>
	<option value="ER">Eritrea</option>
	<option value="EE">Estonia</option>
	<option value="ET">Ethiopia</option>
	<option value="FK">Falkland Islands (Malvinas)</option>
	<option value="FO">Faroe Islands</option>
	<option value="FJ">Fiji</option>
	<option value="FI">Finland</option>
	<option value="FR">France</option>
	<option value="GF">French Guiana</option>
	<option value="PF">French Polynesia</option>
	<option value="TF">French Southern Territories</option>
	<option value="GA">Gabon</option>
	<option value="GM">Gambia</option>
	<option value="GE">Georgia</option>
	<option value="DE">Germany</option>
	<option value="GH">Ghana</option>
	<option value="GI">Gibraltar</option>
	<option value="GR">Greece</option>
	<option value="GL">Greenland</option>
	<option value="GD">Grenada</option>
	<option value="GP">Guadeloupe</option>
	<option value="GU">Guam</option>
	<option value="GT">Guatemala</option>
	<option value="GG">Guernsey</option>
	<option value="GN">Guinea</option>
	<option value="GW">Guinea-Bissau</option>
	<option value="GY">Guyana</option>
	<option value="HT">Haiti</option>
	<option value="HM">Heard Island and McDonald Islands</option>
	<option value="VA">Holy See (Vatican City State)</option>
	<option value="HN">Honduras</option>
	<option value="HK">Hong Kong</option>
	<option value="HU">Hungary</option>
	<option value="IS">Iceland</option>
	<option value="IN">India</option>
	<option value="ID">Indonesia</option>
	<option value="IR">Iran, Islamic Republic of</option>
	<option value="IQ">Iraq</option>
	<option value="IE">Ireland</option>
	<option value="IM">Isle of Man</option>
	<option value="IL">Israel</option>
	<option value="IT">Italy</option>
	<option value="JM">Jamaica</option>
	<option value="JP">Japan</option>
	<option value="JE">Jersey</option>
	<option value="JO">Jordan</option>
	<option value="KZ">Kazakhstan</option>
	<option value="KE">Kenya</option>
	<option value="KI">Kiribati</option>
	<option value="KP">Korea, Democratic People's Republic of</option>
	<option value="KR">Korea, Republic of</option>
	<option value="KW">Kuwait</option>
	<option value="KG">Kyrgyzstan</option>
	<option value="LA">Lao People's Democratic Republic</option>
	<option value="LV">Latvia</option>
	<option value="LB">Lebanon</option>
	<option value="LS">Lesotho</option>
	<option value="LR">Liberia</option>
	<option value="LY">Libya</option>
	<option value="LI">Liechtenstein</option>
	<option value="LT">Lithuania</option>
	<option value="LU">Luxembourg</option>
	<option value="MO">Macao</option>
	<option value="MK">Macedonia, the former Yugoslav Republic of</option>
	<option value="MG">Madagascar</option>
	<option value="MW">Malawi</option>
	<option value="MY">Malaysia</option>
	<option value="MV">Maldives</option>
	<option value="ML">Mali</option>
	<option value="MT">Malta</option>
	<option value="MH">Marshall Islands</option>
	<option value="MQ">Martinique</option>
	<option value="MR">Mauritania</option>
	<option value="MU">Mauritius</option>
	<option value="YT">Mayotte</option>
	<option value="MX">Mexico</option>
	<option value="FM">Micronesia, Federated States of</option>
	<option value="MD">Moldova, Republic of</option>
	<option value="MC">Monaco</option>
	<option value="MN">Mongolia</option>
	<option value="ME">Montenegro</option>
	<option value="MS">Montserrat</option>
	<option value="MA">Morocco</option>
	<option value="MZ">Mozambique</option>
	<option value="MM">Myanmar</option>
	<option value="NA">Namibia</option>
	<option value="NR">Nauru</option>
	<option value="NP">Nepal</option>
	<option value="NL">Netherlands</option>
	<option value="NC">New Caledonia</option>
	<option value="NZ">New Zealand</option>
	<option value="NI">Nicaragua</option>
	<option value="NE">Niger</option>
	<option value="NG">Nigeria</option>
	<option value="NU">Niue</option>
	<option value="NF">Norfolk Island</option>
	<option value="MP">Northern Mariana Islands</option>
	<option value="NO">Norway</option>
	<option value="OM">Oman</option>
	<option value="PK">Pakistan</option>
	<option value="PW">Palau</option>
	<option value="PS">Palestinian Territory, Occupied</option>
	<option value="PA">Panama</option>
	<option value="PG">Papua New Guinea</option>
	<option value="PY">Paraguay</option>
	<option value="PE">Peru</option>
	<option value="PH">Philippines</option>
	<option value="PN">Pitcairn</option>
	<option value="PL">Poland</option>
	<option value="PT">Portugal</option>
	<option value="PR">Puerto Rico</option>
	<option value="QA">Qatar</option>
	<option value="RE">Réunion</option>
	<option value="RO">Romania</option>
	<option value="RU">Russian Federation</option>
	<option value="RW">Rwanda</option>
	<option value="BL">Saint Barthélemy</option>
	<option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
	<option value="KN">Saint Kitts and Nevis</option>
	<option value="LC">Saint Lucia</option>
	<option value="MF">Saint Martin (French part)</option>
	<option value="PM">Saint Pierre and Miquelon</option>
	<option value="VC">Saint Vincent and the Grenadines</option>
	<option value="WS">Samoa</option>
	<option value="SM">San Marino</option>
	<option value="ST">Sao Tome and Principe</option>
	<option value="SA">Saudi Arabia</option>
	<option value="SN">Senegal</option>
	<option value="RS">Serbia</option>
	<option value="SC">Seychelles</option>
	<option value="SL">Sierra Leone</option>
	<option value="SG">Singapore</option>
	<option value="SX">Sint Maarten (Dutch part)</option>
	<option value="SK">Slovakia</option>
	<option value="SI">Slovenia</option>
	<option value="SB">Solomon Islands</option>
	<option value="SO">Somalia</option>
	<option value="ZA">South Africa</option>
	<option value="GS">South Georgia and the South Sandwich Islands</option>
	<option value="SS">South Sudan</option>
	<option value="ES">Spain</option>
	<option value="LK">Sri Lanka</option>
	<option value="SD">Sudan</option>
	<option value="SR">Suriname</option>
	<option value="SJ">Svalbard and Jan Mayen</option>
	<option value="SZ">Swaziland</option>
	<option value="SE">Sweden</option>
	<option value="CH">Switzerland</option>
	<option value="SY">Syrian Arab Republic</option>
	<option value="TW">Taiwan, Province of China</option>
	<option value="TJ">Tajikistan</option>
	<option value="TZ">Tanzania, United Republic of</option>
	<option value="TH">Thailand</option>
	<option value="TL">Timor-Leste</option>
	<option value="TG">Togo</option>
	<option value="TK">Tokelau</option>
	<option value="TO">Tonga</option>
	<option value="TT">Trinidad and Tobago</option>
	<option value="TN">Tunisia</option>
	<option value="TR">Turkey</option>
	<option value="TM">Turkmenistan</option>
	<option value="TC">Turks and Caicos Islands</option>
	<option value="TV">Tuvalu</option>
	<option value="UG">Uganda</option>
	<option value="UA">Ukraine</option>
	<option value="AE">United Arab Emirates</option>
	<option value="GB">United Kingdom</option>
	<option value="US">United States</option>
	<option value="UM">United States Minor Outlying Islands</option>
	<option value="UY">Uruguay</option>
	<option value="UZ">Uzbekistan</option>
	<option value="VU">Vanuatu</option>
	<option value="VE">Venezuela, Bolivarian Republic of</option>
	<option value="VN">Viet Nam</option>
	<option value="VG">Virgin Islands, British</option>
	<option value="VI">Virgin Islands, U.S.</option>
	<option value="WF">Wallis and Futuna</option>
	<option value="EH">Western Sahara</option>
	<option value="YE">Yemen</option>
	<option value="ZM">Zambia</option>
	<option value="ZW">Zimbabwe</option>
                    </select>
                    <button type="submit" className="button">Edit</button>
                </div>
             
            </form>
            
            </Col>

           


        </div></Container></>
    );
}

export default EditUserProfile;