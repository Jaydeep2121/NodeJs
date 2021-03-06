const Myadmin = require("../models/admin_Model");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require("fs");

//register admin
exports.Addadmin = async (req, res) => {
  try {
    const admin = new Myadmin({
      ...req.body,
      imageUrl: req.files,
    });
    await admin.save();
    res.status(201).send(admin);
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
};
//login Admin
exports.loginadm = async (req, res) => {
  try {
    const admin = await Myadmin.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await admin.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: false, // for more secure and can't acces from outside if true
      nextAge: 24 * 60 * 60 * 1000, //1 day
    });
    res.send({
      message: "success",
    });
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
};
//authenticate admin
exports.authen = async (req, res) => {
  try {
    const cookie = req.headers.authorization.split(" ")[1]; //split from space and get 1st value
    // const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, "thisisdemo");
    if (!claims) {
      return res.status(401).send({
        message: "unauthenticate",
      });
    }
    const admin = await Myadmin.findOne({ _id: claims._id });
    const { password, ...data } = await admin.toJSON();
    res.send(data);
  } catch (error) {
    return res.status(401).send({
      message: "unauthenticate",
    });
  }
};
exports.forPass = async (req, res) => {
  const FindEmail = req.body.email;
  try {
    // See if user exists
    let user = await Myadmin.findOne({ email: FindEmail });
    if (!user) {
      return res.status(400).send({ msg: "Email not registered" });
    }
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jaydipc95@gmail.com",
        pass: "ggkqgbxmkmduknix",
      },
    });

    newpassword = `${user.name}@34A$%`;

    var mailOptiosans = {
      from: "jaydipc95@gmail.com",
      to: FindEmail,
      subject: "Forgot Password",
      html: `<h1> Your New Password is: ${newpassword}</h1>`,
    };
    transporter.sendMail(mailOptiosans, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email Sent:` + info.response);
      }
    });

    const data = await Myadmin.findOneAndUpdate(
      { email: FindEmail },
      { password: newpassword }
    );

    res.status(200).send({ msg: "Password Updated Successfully" });
  } catch (error) {
    res.status(404).send({ error: "notfound" });
    console.log("e", error);
  }
};
//logOut
exports.logout = async (req, res) => {
  res.cookie("jwt", null, { maxAge: 0 });
  res.send({
    message: "logout success",
  });
};
// for getting admin data
exports.getdata = async (req, res) => {
  try {
    const admin = await Myadmin.find();
    res.json(admin);
  } catch (error) {
    console.log("e", error);
  }
};
//for update admindata
exports.updAdmin = async (req, res) => {
  const pathdata = await Myadmin.findOne({}).select("imageUrl -_id");
  fs.unlink(pathdata["imageUrl"][0]["path"], (err) => {
    if (err) return;
  });
  const keyFields = Object.keys(req.body);
  const allowUpdate = ["name", "mobile", "email", "password"];
  const isValidOper = keyFields.every((value) => allowUpdate.includes(value));
  if (!isValidOper) {
    return res.status(400).send({ error: "invalid updates!" });
  }
  try {
    const admin = await Myadmin.findOneAndUpdate({
      ...req.body,
      imageUrl: req.files,
    });
    res.send(admin);
  } catch (error) {
    console.log("e", error);
  }
};
