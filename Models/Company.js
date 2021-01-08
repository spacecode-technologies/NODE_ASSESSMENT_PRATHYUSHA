var mongoose=require('mongoose')


var companySchema=new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }, user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})




var Company = mongoose.model("Company", companySchema);

module.exports = Company;