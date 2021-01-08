const mongoose= require('../Root/db')
const validator = require('validator');


const adressSchema = new mongoose.Schema({
    area:{
        type:String,required:true
    },
    pincode:{
        type:Number,
        required:true
        
    },
    state:{
        type:String,
        required:true
       
    },
    Country:{
        type:String
    }
})














const userSchema= new mongoose.Schema({
    firstName:{type: String,
         lowercase: true,
          required: [true, "can't be blank"],
           match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    lastName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password:{
        type:String,
        required:true,
        minlength: 8
    },
    phoneNumber:{
        type:Number,
        required:true,
        length:10
    },
    adress:adressSchema,

      company: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
      }]
})



var User = mongoose.model("User", userSchema, "User");

module.exports = User;