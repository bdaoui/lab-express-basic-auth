const express = require("express")
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 1;

const router = express.Router();



router.get("/signup", (req, res)=> {
    res.render("auth/signup");
})

router.get("/profile", (req, res) =>{
    res.render("auth/profile");
})


router.post("/signup", (req, res)=>{
    const dataUser = req.body;

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(dataUser.password, salt))
        .then(hashPassword =>{ 
            return User.create({
                "username": dataUser.name,
                "password": hashPassword,
            });
        })
        .then(result =>{
            res.render("auth/profile", {result})
        })
        .catch(error => console.log("this is the issue: ", error));
})  ;


module.exports = router;