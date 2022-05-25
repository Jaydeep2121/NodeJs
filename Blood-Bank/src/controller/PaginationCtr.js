const paginate = require('jw-paginate');
const { options } = require('nodemon/lib/config');
const stockModl = require("../models/stock_Model");

exports.paginator = async (req, res) => {
    try {
        console.log('hi')
         // example array of 150 items to be paged
        const items = [...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));

        // get page from query params or default to first page
        const page = parseInt(req.query.page) || 1;

        // get pager object for specified page
        const pager = paginate(items.length, page);

        // get page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // return pager object and current page of items
        return res.json({ pager, pageOfItems });
    } catch (error) {
        console.log(error)
    }
}
exports.get_userbysort= async function(req, res){
    var sortObject = {};
    var stype =req.params.sortwith;
    if(req.params.sortby=='desc'){
        var sortwith=-1
    }else{
        var sortwith=1
    }
    sortObject[stype] = sortwith;
    stockModl.find((err,data)=>{
        if (err) res.status(400).send({ error: err.message })
            res.status(200).send(data)
    }).populate("blood_group", "group").populate("blood_compo","component")
    .sort(sortObject)
}