const router = require("express").Router();
const controllers = require("../controller");
const { isAuthorization } = require("../jwt");

router.post("", isAuthorization, controllers.postAttendRecruit);

module.exports = router;
