const express = require("express")
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 1;

const router = express.Router();


// Sign Up 


router.get("/signup", (req, res)=> {
    res.render("auth/signup");
})



router.post("/signup", (req, res)=>{
    const dataUser = req.body;

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(dataUser.password, salt))
        .then(hashPassword =>{ 
            return User.create({
                "username": dataUser.username,
                "password": hashPassword,
            });
        })
        .then(result =>{
            res.redirect("/auth/login")
        })
        .catch(error => console.log("this is the issue: ", error));
})  ;


// Sign In


router.get("/profile", (req, res) =>{
    res.render("auth/profile");
})


router.get("/login", (req, res) =>{
    res.render("auth/login");
})

router.post("/login", (req, res) =>{
    const loginData = req.body;
        console.log(loginData)
    
    User.find({"username": loginData.username})
        .then(response =>{

            console.log("response ", response)
            bcrypt.compareSync(loginData.password, response.password)
        })
        .then(response =>{
            res.render("auth/profile", {response})
        })
        .catch(error => console.log("this is the issue: ", error));

})





module.exports = router;