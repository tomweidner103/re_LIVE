const router = require('express').Router()

router.use('/messages', require('./messages'))
router.use('/users', require('./users'))

module.exports = router