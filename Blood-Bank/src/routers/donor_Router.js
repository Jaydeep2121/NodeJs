const express = require("express");
const dnorContr = require("../controller/DonorCtr");
const FileUpl = require("../controller/FileUpload");
const router = new express.Router();

//for save User data
router.post("/donors", FileUpl.upload.array("imageUrl", 1),dnorContr.AddDonor);
//for update User data
router.patch(
  "/UpdateDonor/:id",
  FileUpl.upload.array("imageUrl", 1),
  dnorContr.UpdateDonor
);
// To Get User Details By User ID
router.get("/editDonor/:id", dnorContr.editDonor);
//to get user details with ref data
router.get("/getDonorref/:id", dnorContr.getDonorRef);
//for delete data
router.get("/deleteDonor/:id", dnorContr.deleteDonor);
// for getting user data
router.get("/getDonors", dnorContr.GetDonor);
module.exports = router;
