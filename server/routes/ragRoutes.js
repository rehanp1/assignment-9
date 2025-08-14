const express = require("express");
const router = express.Router();
const ragController = require("../controllers/ragController");

router.get("/recommendations", ragController.getRecommendations);

router.get("/compare/:ids", ragController.compareProducts);

module.exports = router;
