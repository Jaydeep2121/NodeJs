const express = require("express");
const EmpContr = require("../controller/EmpCtr");
const FileUpl = require("../controller/FileUpload");
const router = new express.Router();

//for save User data
router.post("/emps", FileUpl.upload.array("imageUrl", 1), EmpContr.AddEmp);
//for update User data
router.patch(
  "/UpdateEmp/:id",
  FileUpl.upload.array("imageUrl", 1),
  EmpContr.UpdateEmp
);
// To Get User Details By User ID
router.get("/editEmp/:id", EmpContr.editEmp);
//to get user details with ref data
router.get("/getEmpRef/:id", EmpContr.getEmpRef);
//for delete data
router.get("/deleteEmp/:id", EmpContr.deleteEmp);
// for getting user data
router.get("/getEmps", EmpContr.GetEmp);
module.exports = router;
