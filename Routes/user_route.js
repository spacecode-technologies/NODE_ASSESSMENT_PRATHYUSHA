const express = require("express");
const router = express.Router();
const userController = require("../Controller/user_Controller");
const companyController=require("../Controller/company_Controller");
const adressController=require("../Controller/adress_Controller")

router.get("/", userController.findAll);
router.post("/", userController.create);
router.get("/:id", userController.findOne);
router.put("/:id", userController.UpdateUser);
router.delete("/:id", userController.delete);
router.post("/:id/company",companyController.create);
router.post("/:id/adress",adressController.create)
module.exports = router;