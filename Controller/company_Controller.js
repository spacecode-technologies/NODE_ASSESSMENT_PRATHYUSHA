const Company=require('../Models/Company')
const User = require("../models/User");



exports.create = (req, res) => {
  User.findById(req.params.id)
    if (!req.body.companyName ) {
      return res.status(400).send({
        message: "Required field can not be empty",
      });
    }
    const company = new Company({
      companyName:req.body.companyName,
      location:req.body.location
    })
    company
      .save()
      .then(function(data) {
        console.log(data)
        res.send(data);
        return User.findOneAndUpdate({ _id: req.params.id }, { company: data }, { new: true });
       
      })
    
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the User.",
        });
      });
  };
  