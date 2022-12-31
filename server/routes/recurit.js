const router = require("express").Router();
const controllers = require("../controller");
const { isAuthorization } = require("../jwt");

router.post("", isAuthorization, controllers.postRecurit);
router.get("", isAuthorization, controllers.getRecruit);

module.exports = router;
