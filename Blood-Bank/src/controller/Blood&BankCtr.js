const blgroup = require("../models/blood_group_Model");
const blcomp = require("../models/blood_component_Model");
const bbank = require("../models/bbank_Model");

//add bgroup
exports.AddBld = async (req, res) => {
    const grp = new blgroup(req.body);
    try {
        await grp.save();
        res.status(201).send(grp);
    } catch (error) {
        console.log("e", error);
        res.status(400).send(error);
    }
}
//add bcomp
exports.AddCmd = async (req, res) => {
    const grp = new blcomp(req.body);
    try {
        await grp.save();
        res.status(201).send(grp);
    } catch (error) {
        console.log("e", error);
        res.status(400).send(error);
    }
}
//add bankdata
exports.addBank = async (req, res) => {
    const bkk = new bbank(req.body);
    try {
        await bkk.save();
        res.status(201).send(bkk);
    } catch (error) {
        console.log("e", error);
        res.status(400).send(error);
    }
}
//for getting bank data
exports.getData = async (req, res) => {
    try {
        const bank = await bbank.find();
        res.json(bank);
    } catch (error) {
        console.log("e", error);
    }
}
//for updating bank data
exports.updateData = async (req, res) => {
    try {
        const bank = await bbank.findOneAndUpdate(req.body);
        res.send(bank);
    } catch (error) {
        console.log("e", error);
    }
}