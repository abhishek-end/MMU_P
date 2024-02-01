import User from  "../models/user.model.js";
import bcrypt from "bcrypt"

export const  signup =async (req,res) => {
const {username, email , password} = req.body;
const hashedPasswrod =  bcrypt.hashSync(password,10) 
//hashsync is used here which make hashedPassword await without using await 
const newUser = new User({username, email , password:hashedPasswrod});
try {
    await newUser.save();
res.status(201).json('User Created Successfully')
} catch (error) {
   res.status(500).json(error.message)
}
}
export default signup