const express = require('express');
const feedController = require('../controllers/feed')

const router = express.Router();

router.get('/feeds',feedController.getFeeds)

router.post('/feeds',feedController.postFeeds)

module.exports = router;