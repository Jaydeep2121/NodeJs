const express = require("express");
const pagctr = require("../controller/PaginationCtr");
const router = new express.Router();

router.get('/api/items',pagctr.paginator);
module.exports = router;