const router = require('express').Router();

router.use("/logs", require('./logs.controller.js'));
router.use("/users", require('./users.controller.js'));

module.exports = router;