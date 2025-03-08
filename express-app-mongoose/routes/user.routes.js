const express= require('express');
const User = require('../models/user');
const { models } = require('mongoose');
const router= express.Router();

router.post('/', async(req, res)=>{
try{
const user =new User(req.body);
await user.save();
res.status(201).send({message:"user saved successfully",user})
}catch(err){
   res.status(500).send({message:"error saving user",err})
}

})




router.get('/all',async(req, res)=>{
    try{
        const users=await User.find()
        res.send({message:"all users",users})

    }catch(err){
        res.send({message:"error",err})
    }

});





router.get('/one/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).send({ message: "user not found", user });
        }
        return res.send({ message: "user found", user });
    } catch (err) {
        return res.status(500).send({ message: "error", err });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ message: "user not found" });
        }
        return res.status(200).send({ message: "success", updatedUser });
    } catch (err) {
        return res.status(500).send({ message: "error", err });
    }
});



router.delete('/delete/:id', async (req, res) => {
    try {
       await User.deleteOne(req.params.id);
       
       res.status(200).send({ message: "success" });
    } catch (err) {
        return res.status(500).send({ message: "error", err });
    }
});



module.exports = router;
