
var mongoose=require('mongoose')
// var Schema=mongoose.Schema

var addressModelSchema = new mongoose.Schema({
  city: String,
  street: String,
  houseNumber: String
})
mongoose.model('address',addressModelSchema ,'address' )

// contactInfo model
var contactInfoModelSchema = new mongoose.Schema({

  email: [String],
  address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'address'
  }
})
mongoose.model('contactInfo ',contactInfoModelSchema ,'contactInfo ')

// customer model
var userSchema = new mongoose.Schema({
  firstName: {
    type:String
  },
  lastName: {
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  company: String,
  tel:Number,
  contactInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'contactInfo'
  }  
});
var User=mongoose.model('User', userSchema,)
module.exports=User
