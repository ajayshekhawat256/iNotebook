const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
// const { findOne } = require('../Models/User');
const bcrypt = require('bcryptjs');
const JWT_SECRET = "Harryisagoodbdollar";
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');


//Create a user using: POST "/api/auth/createuser". No login required 
router.post('/createuser', [
    body('name', 'Please enter atleast three value').isLength({ min: 3 }),
    body('email', 'Please enter a corect email').isEmail(),
    body('password', 'INCORRECT password').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    //Check the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    //check whether the same user exists or not
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry with the same email already exists" });
        }
        const salt = await bcrypt.genSalt();
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            use: {
                id: user.id
            }
        }
        var AuthToken = jwt.sign(data, JWT_SECRET);
        //  console.log(jsonData);
        success=true;
        res.json({ success,AuthToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})
router.post('/login', [
    body('email', 'Email does not exist').isEmail({ min: 3 }),
    body('password', 'Incorrect password').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentails" })
        }
         const passwordcompare = await bcrypt.compare(password, user.password);
         if (!passwordcompare) {
             success = false;
             return res.status(400).json({ success, error: "Please login with correct credentails"})
         }
         const data = {
             user: {
                 id: user.id
             }
         }
         const name=user.name

         const authtoken = jwt.sign(data, JWT_SECRET);
         success = true;
         res.json({ success, authtoken ,name});
    } catch (error) {
        console.log(error.message);
        res.status(400).send("Some error occured");
    }
});
router.post('/getuser',fetchuser,async(req,res)=>{
    try {
       userId=req.user.id;
       const user=await User.findById(userId).select("-password");
       res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(401).send("Internal server error");
    }
})
module.exports = router