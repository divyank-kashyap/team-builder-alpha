const User = require("../models/userModel");
const { findSuitablePlayers } = require("../utils/matchUtils");

const createUser = async (req, res) => {
    const { currentRank, peakRank, mainAgent, level, playerName, hashtag, country, server, language, role } = req.body;

    if (!currentRank || !peakRank || !mainAgent || !level || !playerName || !hashtag || !country || !server || language === undefined || !role) {
        return res.status(400).json({
            message: "All fields (currentRank, peakRank, mainAgent, level, playerName, hashtag, country, server, language, role) are required."
        });
    }

    try {
        const userExists = await User.findOne({ playerName, hashtag });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ currentRank, peakRank, mainAgent, level, playerName, hashtag, country, server, language, role });
        await newUser.save();

        res.json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getSuitablePlayers = async (req, res) => {
    const { currentRank, peakRank, mainAgent, level, playerName, hashtag, country, server, language, role } = req.body;

    if (!currentRank || !peakRank || !mainAgent || !level || !playerName || !hashtag || !country || !server || language === undefined || !role) {
        return res.status(400).json({
            message: "All fields (currentRank, peakRank, mainAgent, level, playerName, hashtag, country, server, language, role) are required."
        });
    }

    try {
        const players = await User.find({});
        const user = await User.findOne({ playerName, hashtag });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const suitablePlayers = findSuitablePlayers(user, players);

        if (suitablePlayers.length === 0) {
            return res.status(400).json({ message: "Not enough players to form a valid team" });
        }

        res.json({
            message: "Most suitable players found",
            suitablePlayers
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createUser, getSuitablePlayers };
 