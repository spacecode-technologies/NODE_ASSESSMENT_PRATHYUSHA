const mongoose= require('mongoose')

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
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Country:{
        type:String
    }
})


var Adress = mongoose.model("Adress", adressSchema, "Adress");

module.exports = Adress;