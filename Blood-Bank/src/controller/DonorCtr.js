const MyDonor = require("../models/donor_Model");
const fs = require("fs");

//add new donor data
exports.AddDonor = async (req, res) => {
    try {
        const donor = new MyDonor({
            ...req.body,
            imageUrl: req.files,
        });
        await donor.save();
        res.send(donor);
    } catch (error) {
        console.log("e", error);
    }
};
//get all donor data
exports.GetDonor = async (req, res) => {
    try {
        const donor = await MyDonor.find();
        res.json(donor);
    } catch (error) {
        console.log("e", error);
    }
};
//function to update data
exports.UpdateDonor = async (req, res) => {
    var objectValue = JSON.parse(JSON.stringify(req.body));
    const pathdata = await MyDonor.find({ email: objectValue["email"] });
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
        const donor = await MyDonor.findByIdAndUpdate(req.params.id, {
            ...req.body,
            imageUrl: req.files
        }, { new: true });
        res.send(donor);
    } catch (error) {
        console.log("e", error);
    }
};
// Get donor Details By User ID
exports.editDonor = async (req, res) => {
    MyDonor.findById(req.params.id, function (err, dnr) {
        if (err) return;
        res.json(dnr);
    });
};
//to get donor details with ref data
exports.getDonorRef = async (req, res) => {
    try {
        const data = await MyDonor.findById(req.params.id).populate(
            "blood_group",
            "group"
        );
        res.json(data);
    } catch (error) {
        console("err", error);
    }
};
//delete donorData
exports.deleteDonor = async (req, res) => {
    try {
        filedata = await MyDonor.findById({ _id: req.params.id });
        fs.unlink(filedata.imageUrl[0].path, (err) => {
            if (err) return;
        });
        MyDonor.findByIdAndDelete({ _id: req.params.id }, async (err, data) => {
            if (err) res.json(err);
            else {
                res.json({ success: "Donor Deleted Successfully" });
            }
        });
    } catch (error) {
        console.log("e", error);
    }
};
