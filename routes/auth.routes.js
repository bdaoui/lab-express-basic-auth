const express = require("express")
const mongoose = require("mongoose");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 1;

const router = express.Router();



router.get("auth/signup", (req, res)=> {
    res.render("signup");
})


router.post("/signup", (req, res)=>{
    const dataUser = req.body;

})


module.exports = router;