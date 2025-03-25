const express = require('express');
const router = express.Router();

const lineChannelControllers = require('../../../controllers/web/lineMessageApi/lineChannelControllers');

router.get('/', lineChannelControllers.get);
router.post('/create', lineChannelControllers.create);

module.exports = router;