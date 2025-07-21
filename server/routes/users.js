const { Router } = require('express');
const verifyUser = require('@middleware/verifyUser');
const User = require('@controllers/users/user');

const router = Router();
router.get('/', verifyUser, User);

module.exports = router;
