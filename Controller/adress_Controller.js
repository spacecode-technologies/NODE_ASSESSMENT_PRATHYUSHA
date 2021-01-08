const Adress=require('../Models/Adress')
const User = require("../models/User");

exports.create = (req, res) => {
  User.findById(req.params.id)
    if (!req.body.pincode || !req.body.state || !req.body.area) {
      return res.status(400).send({
        message: "Required field can not be empty",
      });
    }
    const adress = new Adress({
      area:req.body.area,
      pincode:req.body.pincode,
      state:req.body.state,
      country:req.body.country
    });
    adress
      .save()
      .then((data) => {
        res.send(data);
        return User.findOneAndUpdate({ _id: req.params.id }, { adress: data }, { new: true });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the User.",
        });
      });
  };
  