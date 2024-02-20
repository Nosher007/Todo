import mongoose from 'mongoose'
const userSchema=mongoose.userSchema({
    name:{
        type:String,
        min:6,
        max:32,
    },
    username:{
        type:String,
        min:6,
        max:32,
        required:true,
    }
    ,password:{
        type:String,
        min:6,
        max:32,
        required:true,
    }
    ,email:{
        type:String,
        min:6,
        max:32,
        required:true,
    },
    date:{
        type:Date,
        default:date.now
    }

})

export default mongoose.model("User",userSchema)