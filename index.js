import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // Import the fileURLToPath function
import axios from "axios";
import bodyParser from "body-parser";



//Import the specific named export from model.js
import { empCollection } from "./model/model.js"; // Adjust the import as needed
import { faciCollection } from "./model/model.js"; // Adjust the import as needed
import { delCollection } from "./model/model.js"; // Adjust the import as needed
import { feedCollection } from "./model/model.js"; // Adjust the import as needed

//import { FacilityCenters } from "./model/model.js";


import "./db/db.js"; // Import the database connection module using .js extension
import { name } from "ejs";

const app = express();
const port = 3000;



//Blog app
const API_URL = "http://localhost:4000";

// Your existing routes and middleware

// Route to render the main page

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page
app.get("/blog", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    res.render("blog.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the edit page
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});




// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});









// Use fileURLToPath to convert the current module's URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Calculate the directory path based on the current module's file path
const viewsPath = path.join(__dirname, "views");

app.set("views", viewsPath);
app.set("view engine", "ejs");

app.use(express.static("public"));

 




 

app.get("/", (req, res) => {
  res.render("index.ejs");
});


//Define the route to fetch all facility centers
// app.get("/api/facilityCenters", async (req, res) => {
//   try {
//     const facilityCenters = await FacilityCenters.find({});
//     res.json(facilityCenters);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });











//user login
// app.get("/login_user", (req, res) => {
//   res.render("login_user.ejs");
// });


app.get("/AboutUs", (req, res) => {
  res.render("AboutUs.ejs");
});

//faq
app.get("/support", (req, res) => {
  res.render("support.ejs");
});

//contactus
app.get("/contactus", (req, res) => {
  res.render("contactus.ejs");
});

//recycle
app.get("/recycle", (req, res) => {
  res.render("recycle.ejs");
});


//user's Dashboard
app.get("/home", (req, res) => {
  res.render("home.ejs");
});







//After login user will ridirct to this page

app.get("/homeuser", (req, res) => {
  res.render("homeuser.ejs");
});

//after login
app.get("/userAboutUs", (req, res) => {
  res.render("userAboutUs.ejs");
});

//after login
app.get("/usersupport", (req, res) => {
  res.render("usersupport.ejs");
});

//after login
app.get("/usercontactus", (req, res) => {
  res.render("usercontactus.ejs");
});

//user signup
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

//user login
app.get("/login", (req, res) => {
  res.render("login.ejs");
});


//fac login
app.get("/faclogin", (req, res) => {
  res.render("faclogin.ejs");
});

//fac signup
app.get("/facsignup", (req, res) => {
  res.render("facsignup.ejs");
});


//Delivery partner's signup
app.get("/delsignup", (req, res) => {
  res.render("delsignup.ejs");
});


//Delivery partner's login
app.get("/dellogin", (req, res) => {
  res.render("dellogin.ejs");
});

//cards on home page
app.get("/card1", (req, res) => {
  res.render("card1.ejs");
});

app.get("/card2", (req, res) => {
  res.render("card2.ejs");
});

app.get("/card3", (req, res) => {
  res.render("card3.ejs");
});

app.get("/card4", (req, res) => {
  res.render("card4.ejs");
});

app.get("/card5", (req, res) => {
  res.render("card5.ejs");
});

app.get("/card6", (req, res) => {
  res.render("card6.ejs");
});


//cards in myprofile
app.get("/mcard1", (req, res) => {
  res.render("mcard1.ejs");
});

app.get("/mcard2", (req, res) => {
  res.render("mcard2.ejs");
});

app.get("/mcard3", (req, res) => {
  res.render("mcard3.ejs");
});

app.get("/mcard4", (req, res) => {
  res.render("mcard4.ejs");
});

app.get("/mcard5", (req, res) => {
  res.render("mcard5.ejs");
});

app.get("/mcard6", (req, res) => {
  res.render("mcard6.ejs");
});

app.get("/dashboard1", (req, res) => {
  res.render("dashboard1.ejs");
});


app.get("/chatbot", (req, res) => {
  res.render("chatbot.ejs");
});


app.get("/userchatbot", (req, res) => {
  res.render("userChatbot.ejs");
});

app.get("/blog", (req, res) => {
  res.render("blog.ejs");
});

app.get("/modify", (req, res) => {
  res.render("modify.ejs");
});















app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   res.render("locate.ejs");
// });



//This is for signup form for user

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});


app.post("/empdata", async(req, res) => {
  // console.log(req.body.name);
  // res.send(req.body.name);
  try {
    
    const password = req.body.password;
    const cpassword = req.body.cpassword;
  
    if(password === cpassword){
       
      const empData = new empCollection({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password,
        cpassword : req.body.cpassword
      });
  
      const postData = await empData.save();
      //res.send(postData);

      res.render("login.ejs");
      
    }else{
      res.send("password are not matching");
    }
   
  } catch (error) {
    res.send(error);
  }
 
});



//This is for login form for user
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/loginPage", async(req, res) => {
  
  try {
    
  const email = req.body.email;
  const password = req.body.loginpassword;

  const getEmail = await empCollection.findOne({email : email});

  //new one
  // const ph = getEmail.phone;
  // console.log(ph);

  // console.log(getEmail.password);
  // res.send(getEmail.password);

  if(getEmail.password  === password){
    res.render("homeuser.ejs");
  }
  else{
    res.send("Password/credentials are not matching");
  }

  } catch (error) {
    res.send(error);
  }


});


// signup for facillity

//This is for signup form for user

app.get("/facsignup", (req, res) => {
  res.render("facsignup.ejs");
});


app.post("/facdata", async(req, res) => {
  // console.log(req.body.name);
  // res.send(req.body.name);
  try {
    
    const password = req.body.password;
    const cpassword = req.body.cpassword;
  
    if(password === cpassword){
       
      const facData = new faciCollection({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password,
        cpassword : req.body.cpassword
      });
  
      const fcData = await facData.save();
      //res.send(fcData);

      res.render("faclogin.ejs");
      
    }else{
      res.send("password are not matching");
    }
   
  } catch (error) {
    res.send(error);
  }
 
});

//This is for login form for facility
app.get("/faclogin", (req, res) => {
  res.render("faclogin.ejs");
});

app.post("/facloginPage", async(req, res) => {
  
  try {
    
  const email = req.body.email;
  const password = req.body.loginpassword;

  const getEmail1 = await faciCollection.findOne({email : email});

  //new one
  // const ph = getEmail.phone;
  // console.log(ph);

  // console.log(getEmail.password);
  // res.send(getEmail.password);

  if(getEmail1.password  === password){
    res.render("homeuser.ejs");
  }
  else{
    res.send("Password/credentials are not matching");
  }

  } catch (error) {
    res.send(error);
  }


});




//This is for signup form for Delivery partner

app.get("/delsignup", (req, res) => {
  res.render("delsignup.ejs");
});


app.post("/deldata", async(req, res) => {
  // console.log(req.body.name);
  // res.send(req.body.name);
  try {
    
    const password = req.body.password;
    const cpassword = req.body.cpassword;
  
    if(password === cpassword){
       
      const delData = new delCollection({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password,
        cpassword : req.body.cpassword
      });
  
      const dlData = await delData.save();
      //res.send(postData);

      res.render("dellogin.ejs");
      
    }else{
      res.send("password are not matching");
    }
   
  } catch (error) {
    res.send(error);
  }
 
});


//This is for login form for Delivery partner
app.get("/dellogin", (req, res) => {
  res.render("dellogin.ejs");
});

app.post("/delloginPage", async(req, res) => {
  
  try {
    
  const email = req.body.email;
  const password = req.body.loginpassword;

  const getEmail2 = await delCollection.findOne({email : email});

  //new one
  // const ph = getEmail.phone;
  // console.log(ph);

  // console.log(getEmail.password);
  // res.send(getEmail.password);

  if(getEmail2.password  === password){
    res.render("homeuser.ejs");
  }
  else{
    res.send("Password/credentials are not matching");
  }

  } catch (error) {
    res.send(error);
  }


});



//User's feedback or query

// app.get("/signup", (req, res) => {
//   res.render("signup.ejs");
// });


app.post("/feedback", async(req, res) => {
  // console.log(req.body.name);
  // res.send(req.body.name);
  try {
    
     
    const email = req.body.email;
    
    if ( email != null ){
       
      const feedData = new feedCollection({
        name : req.body.name,
        email : req.body.email,
        subject : req.body.subject,
        message : req.body.message
         
      });
  
      const fdData = await feedData.save();
      //res.send(fdData);
      
      res.render("index.ejs");

     
  
    }else{
      res.send("Please fill proper information !!!")
    }
   
  } catch (error) {
    res.send(error);
  }
 
});

 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

