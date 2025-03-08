const express = require('express');
const User = require('../models/user');


const jwt=require('jsonwebtoken');
const router = express.Router();



 const authentication=require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = new User({name, email, password})
        await user.save();
        res.status(201).json({message: 'User registered successfully',user})
    } catch (err) {
        res.status(400).json({error: err.message});
    }
    

});



router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if (!user) {
            return res.status(404).json({error: 'user not found'});
        }
        const isHavePassword =user.comparePassword(password)
       if(!isHavePassword){
        res.status(400).send({message:'invalid password'})
       }

       const token =await jwt.sign({userId:user.id},process.env.SECRET_KEY)
       res.json({message:'login successfully',token})

    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

router.get('/me',authentication,async(req,res) => {
try{
    const user = await User.findById(req.user.userId)
    if(!user){
        return res.status(404).json({error: 'user not found'});
    }
    res.send(user);
}catch (err) {
    res.status(500).send({message:error.message})

}
  
})

module.exports = router;