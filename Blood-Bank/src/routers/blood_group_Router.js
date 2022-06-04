const express = require("express");
const bldCtr = require("../controller/Blood&BankCtr");
const router = new express.Router();

//add groups
router.post('/blg',bldCtr.AddBld);
// for getting bloodgroup
router.get("/getGroups", bldCtr.GetGroup);
// for getting bloodgroup by id
router.get("/getGroupsById/:id", bldCtr.GetGroupById);
// for getting bloodgroup
router.get("/getComp", bldCtr.GetComp);
module.exports=router;