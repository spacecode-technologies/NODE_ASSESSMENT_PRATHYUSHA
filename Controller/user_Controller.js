const User = require("../models/User");
const bcrypt = require("bcryptjs");



/**
 * this method is to create the user
 */
exports.create =async (req, res,next) => {
  
  if (!req.body.email || !req.body.password || !req.body.firstName) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }

  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    firstName: req.body.firstName,
    lastName:req.body.lastName,
    phoneNumber:req.body.phoneNumber,
    adress:{
      area:req.body.area,
      pincode:req.body.pincode,
      state:req.body.state,
      country:req.body.country
    }
  });
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
  }







/** 
 * Find all Users
 */
exports.findAll = (req, res) => {
    User.find()
      .sort({ name: -1 })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured",
        });
      });
  };



// finding one user

  exports.findOne = (req, res) => {
    User.findById(req.params.id)
    .populate('Adress')
    .populate('Company')
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found with id " + req.params.id,
          });
        }
        res.status(200).send(user);
        console.log(user);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving user with id " + req.params.id,
        });
      });
  };


  /**
 * Delete a user with the specified id in the request
 */
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found ",
          });
        }
        res.send({ message: "User deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete user ",
        });
      });
  };
  

  /**
 * Update a user with the specified id in the request
 */
exports.UpdateUser = (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.firstName) {
      res.status(400).send({
        message: "required fields cannot be empty",
      });
    }
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "no user found",
          });
        }
        res.status(200).send({message:"update sucessfully",user});
      })
      .catch((err) => {
        return res.status(404).send({
          message: "error while updating the post",
        });
      });
  };