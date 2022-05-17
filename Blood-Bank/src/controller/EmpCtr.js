const MyEmp = require("../models/employee_Model");
const fs = require("fs");

//add new user data
exports.AddEmp = async (req, res) => {
  try {
    const emp = new MyEmp({
      ...req.body,
      imageUrl: req.files,
    });
    await emp.save();
    res.send(emp);
  } catch (error) {
    console.log("e", error);
  }
};
//get all user data
exports.GetEmp = async (req, res) => {
  try {
    const emp = await MyEmp.find();
    res.json(emp);
  } catch (error) {
    console.log("e", error);
  }
};
//function to update data
exports.UpdateEmp = async (req, res) => {
  var objectValue = JSON.parse(JSON.stringify(req.body));
  const pathdata = await MyEmp.find({ email: objectValue["email"] });
  fs.unlink(pathdata[0].imageUrl[0]["path"], (err) => {
    if (err) return;
  });
  const keyFields = Object.keys(req.body);
  const allowUpdate = [
    "name",
    "email",
    "gender",
    "mobile",
    "password",
    "blood_group",
  ];
  const isValidOper = keyFields.every((value) => allowUpdate.includes(value));
  if (!isValidOper) {
    return res.status(400).send({ error: "invalid updates!" });
  }
  try {
    const emp = await MyEmp.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        imageUrl: req.files,
      },
      { new: true }
    );
    res.send(emp);
  } catch (error) {
    console.log("e", error);
  }
};
// Get User Details By User ID
exports.editEmp = async (req, res) => {
  MyEmp.findById(req.params.id, function (err, emp) {
    if (err) return;
    res.json(emp);
  });
};
//to get user details with ref data
exports.getEmpRef = async (req, res) => {
  try {
    const data = await MyEmp.findById(req.params.id).populate(
      "blood_group",
      "group"
    );
    res.json(data);
  } catch (error) {
    console("err", error);
  }
};
//delete userData
exports.deleteEmp = async (req, res) => {
  try {
    filedata = await MyEmp.findById({ _id: req.params.id });
    fs.unlink(filedata.imageUrl[0].path, (err) => {
      if (err) return;
    });
    MyEmp.findByIdAndDelete({ _id: req.params.id }, async (err, data) => {
      if (err) res.json(err);
      else {
        res.json({ success: "User Deleted Successfully" });
      }
    });
  } catch (error) {
    console.log("e", error);
  }
};
