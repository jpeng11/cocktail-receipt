var express = require("express");
var router = express.Router();
const cocktailCtrl = require("../controllers/cocktail");

router.get("/index", cocktailCtrl.index);
router.get("/:id", cocktailCtrl.show);
router.get("/add", cocktailCtrl.create);
router.post("/:id", cocktailCtrl.removeOne);
router.post("/:id/modify", cocktailCtrl.update);

router.post("/", cocktailCtrl.addComment);
router.post("/", cocktailCtrl.deleteComment);
module.exports = router;
