const router = require("express").Router();
const controllers = require("../controller");
const { isAuthorization } = require("../jwt");

router.delete("/:id", isAuthorization, controllers.deleteRecruit);
router.post("", isAuthorization, controllers.postRecurit);
router.get("", controllers.getRecruit);

module.exports = router;
