var express = require("express");
var router = express.Router();
const cocktailCtrl = require("../controllers/cocktail");

router.get("/index", cocktailCtrl.index);
router.get("/:id", cocktailCtrl.show);
router.post("/add", cocktailCtrl.create);
router.post("/:id", cocktailCtrl.removeOne);
router.post("/:id/modify", cocktailCtrl.update);

router.post("/:id/comment", cocktailCtrl.addComment);
router.delete(":id/comment/:comment_id/remove", cocktailCtrl.deleteComment);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
}

module.exports = router;
