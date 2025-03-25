const express = require('express');
const router = express.Router();

const messageRoute = require('../api/lineMessageApi/message');
const webhookRoute = require('../api/lineMessageApi/webhook');

router.use('/message', messageRoute);
router.use('/webhook', webhookRoute);

module.exports = router;