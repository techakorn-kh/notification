const express = require('express');
const router = express.Router();

const lineMessageApiRoute = require('../web/lineMessageApi/lineChannel');

router.use('/line_channel', lineMessageApiRoute);

module.exports = router;