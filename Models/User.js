
const mongoose=require('mongoose')
let mongoXlsx = require('mongo-xlsx');

var excel = require("exceljs");

const User=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
     role: {
  type: String,
  default: 'basic',
  enum: ["basic",  "admin"]
 },
    createdAt:{
        type:Date,
      default:Date.now()
    }

})




let model = mongoXlsx.buildDynamicModel(User);
mongoXlsx.mongoData2Xlsx(User, model, function (err, res) {
    if (err) throw err;
    console.log(res);
	
	let workbook = new excel.Workbook(); //creating workbook
	let worksheet = workbook.addWorksheet('User'); //creating worksheet
	
	//  WorkSheet Header
	worksheet.columns = [
		{ header: 'Id', key: '_id', width: 10 },
		{ header: 'Name', key: 'username', width: 30 },
		{ header: 'email', key: 'email', width: 30},
		{ header: 'role', key: 'role', width: 10, outlineLevel: 1}
	];
	
	// Add Array Rows
	// worksheet.addRows(res);
	
	// Write to File
	workbook.xlsx.writeFile("customer.xlsx")
		.then(function() {
			console.log("file saved!");
		});
	
   
  });



module.exports=mongoose.model("user",User)