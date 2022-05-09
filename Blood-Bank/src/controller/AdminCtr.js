const Myadmin = require("../models/admin_Model");
var jwt = require("jsonwebtoken");

//register admin
exports.Addadmin = async (req, res) => {
    admin = new Myadmin(req.body);
    try {
        await admin.save();
        res.status(201).send(admin);
    } catch (error) {
        console.log("e", error);
        res.status(400).send(error);
    }
}
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
}
//authenticate admin
exports.authen = async (req, res) => {
    try {
        const cookie = req.cookies["jwt"];
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
}
//logOut
exports.logout = async (req, res) => {
    res.cookie("jwt", null, { maxAge: 0 });
    res.send({
        message: "logout success",
    });
}
// for getting admin data
exports.getdata = async (req, res) => {
    try {
        const admin = await Myadmin.find();
        res.json(admin);
    } catch (error) {
        console.log("e", error);
    }
}
//for update admindata
exports.updAdmin = async (req, res) => {
    try {
        const admin = await Myadmin.findOneAndUpdate(req.body);
        res.send(admin);
    } catch (error) {
        console.log("e", error);
    }
}