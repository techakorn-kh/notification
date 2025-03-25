const express = require('express');
const router = express.Router();

const { authen } = require('../../../middleware/authentication');

const messageAPI = require('../../../controllers/api/lineMessageAPI/messageAPI');

router.post('/message/push', authen, messageAPI.messagePush);

module.exports = router;