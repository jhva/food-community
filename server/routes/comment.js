const router = require("express").Router();
const controllers = require("../controller");
const { isAuthorization } = require("../jwt");

router.post("/:boardId", isAuthorization, controllers.postComment);
router.delete("/:commentId", isAuthorization, controllers.deleteComment);

module.exports = router;
