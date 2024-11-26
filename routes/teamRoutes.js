const express = require("express");
const router = express.Router();
const { createUser, getSuitablePlayers } = require("../controllers/teamController");

router.post("/user", createUser);           // Make sure this is `/user`
router.post("/teamMake", getSuitablePlayers);  // Ensure this route is defined correctly

module.exports = router;
