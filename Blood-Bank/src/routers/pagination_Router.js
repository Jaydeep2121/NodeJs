const express = require("express");
const pagctr = require("../controller/PaginationCtr");
const router = new express.Router();

router.get('/api/items',pagctr.paginator);
router.get('/sort/:sortby/:sortwith',pagctr.get_userbysort);
module.exports = router;