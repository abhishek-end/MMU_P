import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
password:{
    type : String ,
    required:true,
},
avatar:{
    type:String,
    default:"https://lh3.googleusercontent.com/a/ACg8ocJ7BN9cR43COx1NAFDlh69wq-cwb0DDroBEcVxuJOD9GkU=s96-c"

},

}, {timestamps:true})
const User = mongoose.model('User',userSchema)
export default User