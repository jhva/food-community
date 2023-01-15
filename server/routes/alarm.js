const router = require("express").Router();
const controllers = require("../controller");
const { isAuthorization } = require("../jwt");

app.get("/push", controllers.push);

module.exports = router;
