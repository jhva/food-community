const router = require("express").Router();
const controllers = require("../controller");
const { isAuthorization } = require("../jwt");

router.post("/msg", isAuthorization, controllers.postChat);
router.get("/rooms", isAuthorization, controllers.getRooms);
router.get("/rooms/:id", isAuthorization, controllers.getMsgList);

module.exports = router;
