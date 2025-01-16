const express = require("express");
const router = express.Router();
const feedController = require("../controller/feed");

router.get("/feed", feedController.getfeed);

router.post("/feed", feedController.postfeed);

module.exports = router;
