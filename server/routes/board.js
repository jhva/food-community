const router = require("express").Router();
const controllers = require("../controller");
const { isAuthorization } = require("../jwt");

router.post("", isAuthorization, controllers.postBoard);
router.get("", isAuthorization, controllers.getBoard);
router.get("/:id", isAuthorization, controllers.detailBoard);
router.patch("/:id", isAuthorization, controllers.patchBoard);
router.delete("/:id", isAuthorization, controllers.deleteBoard);

module.exports = router;
