const router = require('express').Router();

router.use('/admin/selfcare', require('./middleware/admin'), require('./controllers'));
router.use('/selfcare', require('./middleware/auth'), require('./controllers'));

module.exports = router;