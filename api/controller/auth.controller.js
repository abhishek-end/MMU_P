import User from  "../models/user.model.js";
import bcrypt from "bcrypt"
import handleError from '../utils/error.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const  signup = async (req,res , next) => {
const {username, email , password} = req.body;
const hashedPassword  =  bcrypt.hashSync(password,10) 
//hashsync is used here which make hashedPassword await without using await 
const newUser = new User({username, email , password:hashedPassword });
try {
    await newUser.save();
res.status(201).json('User Created Successfully')
} catch (error) {
   next(handleError(500, 'Internal Server Error'))
}
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(handleError(404, 'User not found!'));
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) return next(handleError(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET || 'defaultSecret');
      const {password:pass , ...rest} = validUser._doc
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest)

    } catch (error) {
      next(error);
    }
  };



