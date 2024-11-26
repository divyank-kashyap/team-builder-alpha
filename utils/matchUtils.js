// Calculate match score for players
const calculateMatchScore = (user, player) => {
    let score = 0;

    // Rank Difference
    const rankDifference = Math.abs(user.currentRank - player.currentRank);
    score += (10 - rankDifference) * 5;

    // Level Difference
    const levelDifference = Math.abs(user.level - player.level);
    score += (10 - levelDifference) * 3;

    // Preferred Agent
    if (user.mainAgent === player.mainAgent) score += 10;

    // Country & Server Match
    if (user.country === player.country) score += 15;
    if (user.server === player.server) score += 15;

    // Language Match
    if (user.language === player.language) score += 10;

    return score;
};

// Function to find suitable players
const findSuitablePlayers = (user, players) => {
    const scoredPlayers = players.map(player => ({
        player,
        score: calculateMatchScore(user, player)
    }));

    scoredPlayers.sort((a, b) => b.score - a.score);

    const duelistPlayers = scoredPlayers.filter(player => player.player.role === 'duelist');
    const controllerPlayers = scoredPlayers.filter(player => player.player.role === 'controller');
    const initiatorPlayers = scoredPlayers.filter(player => player.player.role === 'initiator');
    const sentinelPlayers = scoredPlayers.filter(player => player.player.role === 'sentinel');

    if (duelistPlayers.length === 0 || controllerPlayers.length === 0 || initiatorPlayers.length === 0 || sentinelPlayers.length === 0) {
        return [];
    }

    const team = [
        duelistPlayers[0].player,
        controllerPlayers[0].player,
        initiatorPlayers[0].player,
        sentinelPlayers[0].player,
    ];

    const randomRolePlayers = [...duelistPlayers, ...sentinelPlayers];
    const randomPlayer = randomRolePlayers[Math.floor(Math.random() * randomRolePlayers.length)];

    team.push(randomPlayer.player);
    team.push(user);

    const uniqueTeam = Array.from(new Set(team.map(player => player._id)))
        .map(id => team.find(player => player._id === id));

    return uniqueTeam.slice(0, 5);
};

module.exports = { findSuitablePlayers };
