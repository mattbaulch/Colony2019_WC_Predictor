// World Cup Predictor App - Main JavaScript

// Global Variables
let currentPlayer = null;
let allPredictions = [];
let matchResults = [];

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
    updateLeaderboard();
    updateStats();
    countPredictions();
});

// Setup Event Listeners
function setupEventListeners() {
    // Entry form submission
    const entryForm = document.getElementById('entryForm');
    if (entryForm) {
        entryForm.addEventListener('submit', handleEntrySubmit);
    }

    // Score input change tracking
    const scoreInputs = document.querySelectorAll('.score-input');
    scoreInputs.forEach(input => {
        input.addEventListener('input', countPredictions);
    });

    // Group winner select tracking
    const winnerSelects = document.querySelectorAll('.winner-select');
    winnerSelects.forEach(select => {
        select.addEventListener('change', countPredictions);
    });
}

// Navigation between sections
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update leaderboard when showing it
    if (sectionName === 'leaderboard') {
        updateLeaderboard();
        updateStats();
    }
}

// Handle entry form submission
function handleEntrySubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('playerName').value.trim();
    const email = document.getElementById('playerEmail').value.trim();
    const phone = document.getElementById('playerPhone').value.trim();

    if (!name || !email || !phone) {
        alert('Please fill in all fields');
        return;
    }

    // Store current player info
    currentPlayer = {
        name: name,
        email: email,
        phone: phone,
        entryDate: new Date().toISOString()
    };

    // Check if player already exists
    const existingPredictions = allPredictions.find(p => p.email === email);
    if (existingPredictions) {
        currentPlayer = existingPredictions.player;
        loadPlayerPredictions(existingPredictions);
        alert('Welcome back! Your existing predictions have been loaded.');
    }

    // Save player info
    localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));

    // Show predictions section
    showSection('predictions');
    window.scrollTo(0, 0);
}

// Load player's existing predictions
function loadPlayerPredictions(playerPredictions) {
    // Load match predictions
    playerPredictions.matches.forEach(match => {
        const matchCard = document.querySelector(`[data-match-id="${match.matchId}"]`);
        if (matchCard) {
            const inputs = matchCard.querySelectorAll('.score-input');
            inputs[0].value = match.homeScore;
            inputs[1].value = match.awayScore;
        }
    });

    // Load group winners
    playerPredictions.groupWinners.forEach(winner => {
        const select = document.querySelector(`[data-group="${winner.group}"]`);
        if (select) {
            select.value = winner.team;
        }
    });

    // Load bonus predictions
    if (playerPredictions.bonus) {
        if (playerPredictions.bonus.tournamentWinner) {
            document.getElementById('tournamentWinner').value = playerPredictions.bonus.tournamentWinner;
        }
        if (playerPredictions.bonus.goldenBoot) {
            document.getElementById('goldenBoot').value = playerPredictions.bonus.goldenBoot;
        }
        if (playerPredictions.bonus.totalGoals) {
            document.getElementById('totalGoals').value = playerPredictions.bonus.totalGoals;
        }
    }

    countPredictions();
}

// Count completed predictions
function countPredictions() {
    const scoreInputs = document.querySelectorAll('.score-input');
    let count = 0;
    
    for (let i = 0; i < scoreInputs.length; i += 2) {
        if (scoreInputs[i].value !== '' && scoreInputs[i + 1].value !== '') {
            count++;
        }
    }

    const countElement = document.getElementById('predictionsCount');
    if (countElement) {
        countElement.textContent = count;
    }
}

// Save all predictions
function savePredictions() {
    if (!currentPlayer) {
        alert('Please enter your details first!');
        showSection('entry-form');
        return;
    }

    // Collect all match predictions
    const matches = [];
    const matchCards = document.querySelectorAll('.match-card');
    
    matchCards.forEach(card => {
        const matchId = card.getAttribute('data-match-id');
        const inputs = card.querySelectorAll('.score-input');
        
        if (inputs[0].value !== '' && inputs[1].value !== '') {
            matches.push({
                matchId: matchId,
                homeScore: parseInt(inputs[0].value),
                awayScore: parseInt(inputs[1].value)
            });
        }
    });

    if (matches.length === 0) {
        alert('Please enter at least some predictions before submitting!');
        return;
    }

    // Collect group winners
    const groupWinners = [];
    const winnerSelects = document.querySelectorAll('.winner-select');
    
    winnerSelects.forEach(select => {
        if (select.value) {
            groupWinners.push({
                group: select.getAttribute('data-group'),
                team: select.value
            });
        }
    });

    // Collect bonus predictions
    const bonus = {
        tournamentWinner: document.getElementById('tournamentWinner').value.trim(),
        goldenBoot: document.getElementById('goldenBoot').value.trim(),
        totalGoals: document.getElementById('totalGoals').value
    };

    // Create prediction object
    const prediction = {
        player: currentPlayer,
        matches: matches,
        groupWinners: groupWinners,
        bonus: bonus,
        submittedAt: new Date().toISOString(),
        email: currentPlayer.email
    };

    // Save or update predictions
    const existingIndex = allPredictions.findIndex(p => p.email === currentPlayer.email);
    if (existingIndex !== -1) {
        allPredictions[existingIndex] = prediction;
    } else {
        allPredictions.push(prediction);
    }

    // Save to localStorage
    localStorage.setItem('allPredictions', JSON.stringify(allPredictions));

    alert('Your predictions have been saved successfully! You can edit them anytime before the tournament starts on June 11, 2026.');
    
    // Show leaderboard
    updateLeaderboard();
    showSection('leaderboard');
}

// Calculate points for a player
function calculatePoints(playerPredictions) {
    if (!matchResults || matchResults.length === 0) {
        return {
            total: 0,
            correctScores: 0,
            correctResults: 0,
            perfectPredictions: 0
        };
    }

    let total = 0;
    let correctScores = 0;
    let correctResults = 0;
    let perfectPredictions = 0;

    // Calculate match points
    playerPredictions.matches.forEach(prediction => {
        const result = matchResults.find(r => r.matchId === prediction.matchId);
        
        if (result) {
            let matchPoints = 0;
            let isCorrectHome = false;
            let isCorrectAway = false;
            
            // Check home score
            if (prediction.homeScore === result.homeScore) {
                matchPoints += 5;
                correctScores++;
                isCorrectHome = true;
            }
            
            // Check away score
            if (prediction.awayScore === result.awayScore) {
                matchPoints += 5;
                correctScores++;
                isCorrectAway = true;
            }
            
            // Check result (win/draw/loss)
            const predictedResult = getMatchResult(prediction.homeScore, prediction.awayScore);
            const actualResult = getMatchResult(result.homeScore, result.awayScore);
            
            if (predictedResult === actualResult) {
                matchPoints += 10;
                correctResults++;
            }
            
            // Perfect prediction bonus
            if (isCorrectHome && isCorrectAway) {
                matchPoints += 20;
                perfectPredictions++;
            }
            
            total += matchPoints;
        }
    });

    // Bonus points (10 points each)
    // These would be checked manually or at the end of tournament
    // For now, we'll just store them

    return {
        total: total,
        correctScores: correctScores,
        correctResults: correctResults,
        perfectPredictions: perfectPredictions
    };
}

// Get match result (home win, away win, or draw)
function getMatchResult(homeScore, awayScore) {
    if (homeScore > awayScore) return 'home';
    if (awayScore > homeScore) return 'away';
    return 'draw';
}

// Update leaderboard display
function updateLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboardBody');
    if (!leaderboardBody) return;

    if (allPredictions.length === 0) {
        leaderboardBody.innerHTML = '<tr><td colspan="5" class="empty-state">No predictions submitted yet. Be the first!</td></tr>';
        return;
    }

    // Calculate points for all players
    const playersWithPoints = allPredictions.map(pred => {
        const points = calculatePoints(pred);
        return {
            name: pred.player.name,
            email: pred.player.email,
            ...points
        };
    });

    // Sort by total points
    playersWithPoints.sort((a, b) => b.total - a.total);

    // Generate table rows
    let html = '';
    playersWithPoints.forEach((player, index) => {
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
        html += `
            <tr class="${rankClass}">
                <td><strong>${index + 1}</strong></td>
                <td>${player.name}</td>
                <td><strong>${player.total}</strong></td>
                <td>${player.correctScores}</td>
                <td>${player.correctResults}</td>
            </tr>
        `;
    });

    leaderboardBody.innerHTML = html;
}

// Update statistics
function updateStats() {
    const totalParticipants = document.getElementById('totalParticipants');
    const totalFundsRaised = document.getElementById('totalFundsRaised');
    const matchesPlayed = document.getElementById('matchesPlayed');

    if (totalParticipants) {
        totalParticipants.textContent = allPredictions.length;
    }

    if (totalFundsRaised) {
        const funds = allPredictions.length * 10;
        totalFundsRaised.textContent = `£${funds}`;
    }

    if (matchesPlayed) {
        matchesPlayed.textContent = matchResults.length;
    }
}

// Load data from localStorage
function loadData() {
    // Load current player
    const savedPlayer = localStorage.getItem('currentPlayer');
    if (savedPlayer) {
        currentPlayer = JSON.parse(savedPlayer);
    }

    // Load all predictions
    const savedPredictions = localStorage.getItem('allPredictions');
    if (savedPredictions) {
        allPredictions = JSON.parse(savedPredictions);
    }

    // Load match results
    const savedResults = localStorage.getItem('matchResults');
    if (savedResults) {
        matchResults = JSON.parse(savedResults);
    }

    // If player exists, load their predictions
    if (currentPlayer) {
        const playerPredictions = allPredictions.find(p => p.email === currentPlayer.email);
        if (playerPredictions) {
            loadPlayerPredictions(playerPredictions);
        }
    }
}

// Export data for backup
function exportData() {
    const data = {
        predictions: allPredictions,
        results: matchResults,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `world-cup-predictor-backup-${Date.now()}.json`;
    link.click();
}

// Import data from backup
function importData(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.predictions) {
                allPredictions = data.predictions;
                localStorage.setItem('allPredictions', JSON.stringify(allPredictions));
            }
            
            if (data.results) {
                matchResults = data.results;
                localStorage.setItem('matchResults', JSON.stringify(matchResults));
            }
            
            alert('Data imported successfully!');
            updateLeaderboard();
            updateStats();
        } catch (error) {
            alert('Error importing data: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// Clear all data (admin function)
function clearAllData() {
    if (confirm('Are you sure you want to clear ALL data? This cannot be undone!')) {
        if (confirm('Really sure? This will delete all predictions and results!')) {
            localStorage.clear();
            allPredictions = [];
            matchResults = [];
            currentPlayer = null;
            alert('All data has been cleared.');
            location.reload();
        }
    }
}

// Share predictor
function sharePredictor() {
    const shareData = {
        title: '2026 FIFA World Cup Predictor',
        text: 'Join our World Cup Predictor fundraiser! £10 entry - support our local football club and win prizes!',
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Link copied to clipboard!'))
            .catch(err => console.log('Error copying:', err));
    }
}

// Get participant list for organizers
function getParticipantList() {
    if (allPredictions.length === 0) {
        alert('No participants yet.');
        return;
    }

    let list = '=== PARTICIPANT LIST ===\n\n';
    allPredictions.forEach((pred, index) => {
        list += `${index + 1}. ${pred.player.name}\n`;
        list += `   Email: ${pred.player.email}\n`;
        list += `   Phone: ${pred.player.phone}\n`;
        list += `   Submitted: ${new Date(pred.submittedAt).toLocaleString()}\n\n`;
    });

    list += `Total Participants: ${allPredictions.length}\n`;
    list += `Total Funds: £${allPredictions.length * 10}`;

    // Create downloadable text file
    const blob = new Blob([list], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `participants-${Date.now()}.txt`;
    link.click();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        loadData();
        updateLeaderboard();
        updateStats();
    });
} else {
    loadData();
    updateLeaderboard();
    updateStats();
}
