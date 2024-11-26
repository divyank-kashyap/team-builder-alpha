const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const { firstName, lastName, email, phoneNo, dob, riotID, tagline, region, password } = req.body;