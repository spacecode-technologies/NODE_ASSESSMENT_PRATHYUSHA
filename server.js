var express = require("express");

var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const graphqlHTTP = require('express-graphql').graphqlHTTP;
const cors = require("cors");


const router = express.Router();
app.use("/", router);

const User=require('./Models/User')
const Company=require('./Models/Company')
const Exceljs=require('exceljs')
var connect=require("./db");


var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);
// Root resolver
var root = {
    message: () => 'Hello World!'
};
// Create an express server and a GraphQL endpoint

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));





app.use('/',require('./Controller/pincode_controller'))
app.use("/users", require("./Routes/user_route"));


app.use('*', cors());


app.get('/prassi',(req,res)=>{
  User.find({},(err,res)=>{
console.log(res)
  })
})



app.get('/sheet',(req,res)=>{
  
      User.find({},(err,users)=>{
        console.log(users)
        let workbook = new Exceljs.Workbook(); 
        let worksheet = workbook.addWorksheet('My User');
        worksheet.columns = [
          { header: 'Id', key: '_id', width: 10 },
          { header: 'Name', key: 'firstName', width: 30 },
          { header: 'Name', key: 'lastName', width: 30 },
          { header: 'email', key: 'email', width: 30},
          { header: 'phoneNumber', key: 'tel', width: 30},
          { header: 'adress', key: 'adress', width: 30},
          { header: 'company', key: 'company', width: 30},
        ];
        console.log(users)
        users.forEach(user => {
          worksheet.addRow(user)
        });
  
      const data=  workbook.xlsx.writeFile("customer.xlsx")
            console.log(data)
              console.log("file saved!");
            res.send('done')
         
      })
    
//creating workbook
	 //creating worksheet
    
  })




app.listen(8000);
console.log("Listening to PORT 8000");

