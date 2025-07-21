const express = require("express")
const router = express.Router();
const { newshorturl } = require("../controllers/url");
router.post('/', newshorturl);
module.exports = router;