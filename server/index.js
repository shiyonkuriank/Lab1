const express=require("express");
const cors=require("cors");
const multer=require('multer');
const path=require('path');
const bcrypt=require("bcrypt");

const app=express();

const{encrypt, decrypt}=require('./EncryptionHandler');

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, 'Images')
  },
  filename:(req, file, cd)=>{
    console.log(file);
    cb(null, Date.now()+path.extname(file.originalname))
  }
})

const upload=multer({storage: storage});
var mysql=require('mysql');
var constants=require("./config.json");
app.use(cors());

app.use(express.json());

const connection=mysql.createConnection({ 
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database

});

app.post('/userregister',(req, res)=>{
  
  const name=req.body.name;
  const email=req.body.email;
  const Phone=req.body.phone;
  const dob=req.body.dob;
  const city=req.body.city;
  const state=req.body.state;
  const country=req.body.country;
  const password=req.body.pwd;
  //const hashedPwd=bcry

  connection.query("INSERT INTO user(Name,Email,Phone,Pwd,DOB, City,State,Country) VALUES(?,?,?,?,?,?,?,?)",
  [name,email,Phone,password,dob,city,state,country], 
  (err,result)=>{
    
     
      res.send(err);
    
  }
  );
});

app.post('/restregister',(req, res)=>{
  
  const Restname=req.body.rname;
  const Email=req.body.email;
  const Phone=req.body.phone;
  const Loc=req.body.loc;
  const Pwd=req.body.pwd;

  connection.query("INSERT INTO Rest(Restname,Email,Phone,Loc,pwd) VALUES(?,?,?,?,?)",
  [Restname,Email,Phone,Loc,Pwd], 
  (err,result)=>{
    console.log(err);
  }
  );
});

app.post('/userlogin',(req, res)=>{
  
  const email=req.body.email; 
  const Pwd=req.body.Pwd;
  connection.query("SELECT * FROM user WHERE Email=?", [email],
  (err, result)=>{
    if(err){
      res.send({err:err});
    }
  
    if(result.length>0){
      //var pass=result[0].Pwd;
      //const verified=bcrypt.compareSync(Pwd,pass);
      //if(verified){
        res.send(result);
      }else{
        
       res.send({message: "No such user found!"});
       
      }
    }
  //}
  
  );
});

app.post('/restlogin',(req, res)=>{
  const email=req.body.email; 
  const Pwd=req.body.pwd;
  connection.query("SELECT * FROM Rest WHERE Email=? AND  pwd=?", [email,Pwd],
  (err, result)=>{
    if(err){
      res.send({err:err});
    }
  
    if(result.length>0){
     
      res.send(result); 
      }else{
       res.send({message: "No such user found!"});
       
      }
    }
  );
});

app.post('/profile',(req, res)=>{
  const name=req.body.name; 
  
  connection.query("SELECT * FROM Rest WHERE Restname=?", [name],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
      }
    }
  );
});

app.post('/userProfile',(req, res)=>{
  const name=req.body.name; 
  
  connection.query("SELECT * FROM user WHERE Name=?", [name],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
      }
    }
  );
});

app.post('/editName',(req, res)=>{
  const name=req.body.name; 
  const newname=req.body.newName;
  
  connection.query("UPDATE Rest SET Restname=? WHERE Restname=?", [newname,name],
  (err, result)=>{
    if(err){
       res.send({err:err});
    }
  
    if(result.length>0){
        res.send(result); 
      }
    }
  );
});

app.post('/editOrderSummaryRestName',(req, res)=>{
  const name=req.body.name; 
  const newname=req.body.newName;
  
  connection.query("UPDATE OrderSummary SET Restname=? WHERE Restname=?", [newname,name],
  (err, result)=>{
    if(err){
       res.send({err:err});
    }
  
    if(result.length>0){
        res.send(result); 
      }
    }
  );
});


app.post('/editDishesRestName',(req, res)=>{
  const name=req.body.name; 
  const newname=req.body.newName;
  
  connection.query("UPDATE Dishes SET Restname=? WHERE Restname=?", [newname,name],
  (err, result)=>{
    if(err){
       res.send({err:err});
    }
  
    if(result.length>0){
        res.send(result); 
      }
    }
  );
});

app.post('/editFavRestName',(req, res)=>{
  const name=req.body.name; 
  const newname=req.body.newName;
  
  connection.query("UPDATE FavRest SET Restname=? WHERE Restname=?", [newname,name],
  (err, result)=>{
    if(err){
       res.send({err:err});
    }
  
    if(result.length>0){
        res.send(result); 
      }
    }
  );
});

app.post('/editEmail',(req, res)=>{
  const name=req.body.name; 
  const newemail=req.body.newemail;
  
  connection.query("UPDATE Rest SET Email=? WHERE Restname=?", [newemail,name],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
       res.send(result); 
      }
    }
  );
});

app.post('/editPhone',(req, res)=>{
   const name=req.body.name; 
  const newphone=req.body.newPhone;
  
  connection.query("UPDATE Rest SET Phone=? WHERE Restname=?", [newphone,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
      
       res.send(result); 
      }
    }
  );
});

app.post('/editLoc',(req, res)=>{
  
  const name=req.body.name; 
  const newloc=req.body.newLoc;
  
  connection.query("UPDATE Rest SET Loc=? WHERE Restname=?", [newloc,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editType',(req, res)=>{
  
  const name=req.body.name; 
  const type=req.body.type;
  
  connection.query("UPDATE Rest SET DeliveryType=? WHERE Restname=?", [type,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editDesc',(req, res)=>{
  
  const name=req.body.name; 
  const newdesc=req.body.newDesc;
  
  connection.query("UPDATE Rest SET Description=? WHERE Restname=?", [newdesc,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editTime',(req, res)=>{
 
  const name=req.body.name; 
  const newtime=req.body.newTime;
  
  connection.query("UPDATE Rest SET Time=? WHERE Restname=?", [newtime,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});


app.post('/editProfileImg',(req, res)=>{
  console.log("editimage");
  const name=req.body.name; 
  //const id=req.body.id;
  const img=req.body.img;
  
  
connection.query("update user set Img=? where Name=?", 
[img,name],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("pic uploaded");
      res.send(result); 
      }
    }
  );
});


app.post('/editDishImg',(req, res)=>{
  console.log("editimage");
  const name=req.body.name; 
  const dish=req.body.dish;
  const img=req.body.img;
  
  
connection.query("update Dishes set Pic=? where Dishes=? and Restname=?", 
[img,dish,name],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("pic uploaded");
      res.send(result); 
      }
    }
  );
});


app.post('/editRestImg',(req, res)=>{
  console.log("editimage");
  const name=req.body.name; 
  //const dish=req.body.dish;
  const img=req.body.img;
  
  
connection.query("update Rest set Img=? where Restname=?", 
[img,name],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("pic uploaded");
      res.send(result); 
      }
    }
  );
});

app.post('/viewImg',(req, res)=>{
  console.log("viewimage");
  
  const id=req.body.id;
   
  
connection.query("SELECT Img from UserImg where User_id=?", 
[id],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      
      res.send(result); 
      }
    }
  );
});



app.post('/editUserName',(req, res)=>{
  
  const name=req.body.name; 
  const newname=req.body.newname;
  
  connection.query("UPDATE user SET Name=? WHERE Name=?", [newname,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editOrderSummaryUserName',(req, res)=>{
  
  const name=req.body.name; 
  const newname=req.body.newname;
  
  connection.query("UPDATE OrderSummary SET Customer=? WHERE Customer=?", [newname,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editFavUserName',(req, res)=>{
  
  const name=req.body.name; 
  const newname=req.body.newname;
  
  connection.query("UPDATE FavRest SET Customer=? WHERE Customer=?", [newname,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editUserEmail',(req, res)=>{
 
  const name=req.body.name; 
  const newemail=req.body.newemail;
  
  connection.query("UPDATE user SET Email=? WHERE Name=?", [newemail,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
      
       res.send(result); 
      }
    }
  );
});

app.post('/editUserPhone',(req, res)=>{
  
  const name=req.body.name; 
  const newphone=req.body.newphone;
  
  connection.query("UPDATE user SET Phone=? WHERE Name=?", [newphone,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
    
       res.send(result); 
      }
    }
  );
});

app.post('/editUserDob',(req, res)=>{

  const name=req.body.name; 
  const newdob=req.body.newdob;
  
  connection.query("UPDATE user SET DOB=? WHERE Name=?", [newdob,name],
  (err, result)=>{
    if(err){
   
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editUserPass',(req, res)=>{

  const name=req.body.name; 
  const newpass=req.body.newpass;
  const hashedPass=bcrypt.hashSync(newpass,10);
  
  connection.query("UPDATE user SET Pwd=? WHERE Name=?", [hashedPass,name],
  (err, result)=>{
    if(err){
   
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editUserCity',(req, res)=>{
 
  const name=req.body.name; 
  const newcity=req.body.newcity;
  
  connection.query("UPDATE user SET City=? WHERE Name=?", [newcity,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
    
       res.send(result); 
      }
    }
  );
});

app.post('/editUserState',(req, res)=>{
 
  const name=req.body.name; 
  const newstate=req.body.newstate;
  
  connection.query("UPDATE user SET State=? WHERE Name=?", [newstate,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editUserCountry',(req, res)=>{
 
  const name=req.body.name; 
  const newcountry=req.body.newcountry;
  
  connection.query("UPDATE user SET Country=? WHERE Name=?", [newcountry,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
    
       res.send(result); 
      }
    }
  );
});


app.post('/editDname',(req, res)=>{
 
  const name=req.body.name; 
  const newname=req.body.newname;
  
  connection.query("UPDATE Dishes SET Dishes=? WHERE Dishes=?", [newname,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
    
       res.send(result); 
      }
    }
  );
});


app.post('/editPrice',(req, res)=>{
 
  const name=req.body.name; 
  const newprice=req.body.newPrice;
  
  connection.query("UPDATE Dishes SET Price=? WHERE dishes=?", [newprice,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/editCat',(req, res)=>{
 
  const name=req.body.name; 
  const newcat=req.body.newCat;
  
  connection.query("UPDATE Dishes SET Category=? WHERE dishes=?", [newcat,name],
  (err, result)=>{
    if(err){
    
      res.send({err:err});
    }
  
    if(result.length>0){
      
       res.send(result); 
      }
    }
  );
});


app.post('/editIng',(req, res)=>{
 
  const name=req.body.name; 
  const newing=req.body.newIng;
  
  connection.query("UPDATE Dishes SET Ingredient=? WHERE Dishes=?", [newing,name],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
      
       res.send(result); 
      }
    }
  );
});



app.post('/addDish',(req, res)=>{
  
  const rname=req.body.rname; 
  const name=req.body.name;
  const price=req.body.price; 
  const type=req.body.type; 
  const cat=req.body.cat;
  const ing=req.body.ing;
  const pic=req.body.pic;
  connection.query("INSERT INTO Dishes(Restname,Dishes,Price,Category,Ingredient,Pic,Type) VALUES(?,?,?,?,?,?,?)", 
  [rname,name,price,cat,ing,pic,type],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
     
       res.send(result); 
      }
    }
  );
});

app.post('/dishes',(req, res)=>{
  
  const name=req.body.name; 
  
  
  connection.query("SELECT Dishes,Category,Price,Ingredient,Pic FROM Dishes WHERE Restname=?", [name],
  (err, result)=>{
    if(err){
      
      res.send({err:err});
    }
  
    if(result.length>0){
      
       res.send(result); 
      }
    }
  );
});

app.post('/restNearMe',(req, res)=>{
  
  const loc=req.body.city; 
  
  
  connection.query("SELECT * FROM Rest WHERE Loc=?", [loc],
  (err, result)=>{
    if(err){
           res.send({err:err});
    }
  
    if(result.length>0){
      
       res.send(result); 
      }
    }
  );
});


app.post('/allRest',(req, res)=>{
  
  const loc=req.body.city; 
  
connection.query("SELECT * FROM Rest WHERE Loc<>?", [loc],
  (err, result)=>{
    if(err){
     
      res.send({err:err});
    }
  
    if(result.length>0){
      
       res.send(result); 
      }
    }
  );
});

app.post('/dishSearch',(req, res)=>{
 
  const dish=req.body.dish; 
  
connection.query("SELECT Restname FROM Dishes WHERE Dishes=?", [dish],
  (err, result)=>{
    
    if(result.length>0){
      
       res.send(result); 
      }else{
        res.send({message: "No Restaurants found!"});
      }
    }
  );
});

app.post('/locSearch',(req, res)=>{
 
  const loc=req.body.loc; 
  
connection.query("SELECT * FROM Rest WHERE Loc=?", [loc],
  (err, result)=>{
    
    if(result.length>0){
      
       res.send(result); 
      }else{
        res.send({message: "No Restaurants found!"});
      }
    }
  );
});


app.post('/restFoodType',(req, res)=>{
  
  const type=req.body.foodType; 
  
connection.query("SELECT Restname, Loc, FoodType, Time, Img FROM Rest WHERE FoodType=?", [type],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
      }
    }
  );
});

app.post('/restDeliveryType',(req, res)=>{
  console.log("delivery type called");
  const type=req.body.deliveryType; 
  
connection.query("SELECT Restname, Loc, DeliveryType,Time,Img  FROM Rest WHERE DeliveryType =?", [type],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      console.log("delivery type");
      res.send(result); 
      }
    }
  );
});



app.post('/orderSummary',(req, res)=>{
  console.log("add summary called");
  const restname=req.body.name; 
  const customer=req.body.customer;
  const dishes=req.body.dishes;
  
  
connection.query("INSERT INTO OrderSummary (Restname, Customer, Dishes) VALUES(?,?,?)", 
[restname,customer,dishes],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("order summary");
      res.send(result); 
      }
    }
  );
});

app.post('/addTotal',(req, res)=>{
  console.log("add total called");
  const total=req.body.tot; 
  const restname=req.body.name; 
  const customer=req.body.customer; 
  const address=req.body.address; 
  const dishes=req.body.dishes;
  const dtype=req.body.deliveryType;
  const status=req.body.status;
  
connection.query("update OrderSummary set Price=?, Address=?,DeliveyType=?,OrderStatus=? where Restname=? and Customer=? and Dishes=?", 
[total,address, dtype,status,restname,customer,dishes],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("order summary");
      res.send(result); 
      }
    }
  );
});



app.post('/setOrderStatus',(req, res)=>{
  console.log("status called");
  //const name=req.body.name;
  //const customer=req.body.customer;
  const dishes=req.body.dishes;
  const status=req.body.status;
  
connection.query("update OrderSummary set OrderStatus=? where Dishes=?", 
[status,dishes],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("status updated");
      res.send(result); 
      }
    }
  );
});



app.post('/favRest',(req, res)=>{
  console.log("fav called");
  const restname=req.body.name; 
  const loc=req.body.loc;
  const customer=req.body.customer;
  
connection.query("INSERT INTO FavRest (Restname, Loc, Customer) VALUES(?,?,?)", 
[restname,loc,customer],
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result){
      console.log("added to fav");
            }
    }
  );
});

app.post('/fav',(req, res)=>{
  console.log("fav rest called");
  const customer=req.body.name;
  
connection.query("SELECT * FROM FavRest WHERE Customer=?",[customer], 
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
      console.log("fav displayed");
        }
    }
  );
});

app.post('/viewCustOrder',(req, res)=>{
 
  const name=req.body.name;
  
connection.query("SELECT * FROM OrderSummary WHERE Restname=?",[name], 
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
     
        }
    }
  );
});

app.post('/viewRestOrder',(req, res)=>{
 
  const name=req.body.name;
  
connection.query("SELECT Restname, Dishes FROM OrderSummary WHERE Customer=?",[name], 
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
     
        }
    }
  );
});


app.post('/statusFilter',(req, res)=>{
 
  const name=req.body.name;
  const status=req.body.status;
  
connection.query("SELECT Restname, Dishes FROM OrderSummary WHERE Customer=? and OrderStatus=?",[name,status], 
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
     
        }
 
    }
  );
});

app.post('/orderStatusFilter',(req, res)=>{
 
  const name=req.body.name;
  const status=req.body.status;
  
connection.query("SELECT Customer, Dishes FROM OrderSummary WHERE Restname=? and OrderStatus=?",[name,status], 
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      res.send(result); 
     
        }
    }
  );
});

app.post('/viewReceipt',(req, res)=>{
 console.log("receipt called");
 

  const name=req.body.name;
  const restname=req.body.restname;
  const dish=req.body.dish;
  
connection.query("SELECT * FROM OrderSummary WHERE Restname=? and Customer=? and Dishes=?",[restname,name,dish], 
  (err, result)=>{
    if(err){
     res.send({err:err});
    }
  
    if(result.length>0){
      console.log("receipt returned");
      res.send(result); 
     
        }
    }
  );
});

app.get("/uploadUserImage",(req,res)=>{
  res.render("Upload")
})

app.post("/uploadUserImage", upload.single('image'), (req,res)=>{
  res.send("Image Uploaded")
})

app.listen('3001', ()=>{
console.log("Server running on 3001");
});