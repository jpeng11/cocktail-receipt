var express = require("express");
var router = express.Router();
const cocktailCtrl = require("../controllers/cocktail");

router.get("/index", cocktailCtrl.index);
router.get("/:id", cocktailCtrl.show);
module.exports = router;
