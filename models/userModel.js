const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    currentRank: Number,
    peakRank: Number,
    mainAgent: String,
    level: Number,
    playerName: String,
    hashtag: String,
    country: String,
    server: String,
    language: String,
    role: { type: String, enum: ['duelist', 'controller', 'initiator', 'sentinel'], required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
