// Leaderboard Management System
class LeaderboardManager {
  constructor() {
    this.storageKey = 'quizmaster_leaderboard';
    this.statsKey = 'quizmaster_stats';
  }

  // Save a new score to the leaderboard
  saveScore(playerName, category, difficulty, score, totalQuestions, correctAnswers, timeElapsed, achievements) {
    if (!playerName || playerName.trim() === '') {
      playerName = 'Anonymous';
    }

    const scores = this.getScores();
    const stats = this.getStats();
    
    const newEntry = {
      id: Date.now(),
      playerName: playerName.trim(),
      category,
      difficulty,
      score,
      totalQuestions,
      correctAnswers,
      accuracy: Math.round((correctAnswers / totalQuestions) * 100),
      timeElapsed,
      achievements: achievements || [],
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    };

    scores.push(newEntry);
    
    // Keep only top 100 scores to prevent storage bloat
    scores.sort((a, b) => b.score - a.score);
    if (scores.length > 100) {
      scores.length = 100;
    }

    // Update player statistics
    this.updatePlayerStats(stats, playerName, newEntry);

    localStorage.setItem(this.storageKey, JSON.stringify(scores));
    localStorage.setItem(this.statsKey, JSON.stringify(stats));
    
    return newEntry;
  }

  // Update player statistics
  updatePlayerStats(stats, playerName, entry) {
    if (!stats[playerName]) {
      stats[playerName] = {
        gamesPlayed: 0,
        totalScore: 0,
        bestScore: 0,
        totalCorrect: 0,
        totalQuestions: 0,
        categoriesPlayed: new Set(),
        difficultiesCompleted: new Set(),
        achievements: new Set(),
        firstPlayed: entry.timestamp,
        lastPlayed: entry.timestamp
      };
    }

    const playerStats = stats[playerName];
    playerStats.gamesPlayed++;
    playerStats.totalScore += entry.score;
    playerStats.bestScore = Math.max(playerStats.bestScore, entry.score);
    playerStats.totalCorrect += entry.correctAnswers;
    playerStats.totalQuestions += entry.totalQuestions;
    playerStats.categoriesPlayed.add(entry.category);
    playerStats.difficultiesCompleted.add(entry.difficulty);
    playerStats.lastPlayed = entry.timestamp;
    
    // Add achievements
    entry.achievements.forEach(achievement => {
      playerStats.achievements.add(achievement.id);
    });

    // Convert Sets back to arrays for storage
    stats[playerName] = {
      ...playerStats,
      categoriesPlayed: Array.from(playerStats.categoriesPlayed),
      difficultiesCompleted: Array.from(playerStats.difficultiesCompleted),
      achievements: Array.from(playerStats.achievements)
    };
  }

  // Get all scores from localStorage
  getScores() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch (error) {
      console.error('Error parsing leaderboard data:', error);
      return [];
    }
  }

  // Get player statistics
  getStats() {
    try {
      return JSON.parse(localStorage.getItem(this.statsKey)) || {};
    } catch (error) {
      console.error('Error parsing stats data:', error);
      return {};
    }
  }

  // Get filtered leaderboard entries
  getLeaderboard(category = 'all', limit = 10) {
    const scores = this.getScores();
    
    let filteredScores = scores;
    if (category !== 'all') {
      filteredScores = scores.filter(score => score.category === category);
    }

    // Sort by score (descending), then by accuracy, then by time (ascending - faster is better)
    filteredScores.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
      return a.timeElapsed - b.timeElapsed;
    });

    return filteredScores.slice(0, limit);
  }

  // Get player's best scores by category
  getPlayerBestScores(playerName) {
    const scores = this.getScores();
    const playerScores = scores.filter(score => 
      score.playerName.toLowerCase() === playerName.toLowerCase()
    );

    const bestByCategory = {};
    playerScores.forEach(score => {
      const key = `${score.category}_${score.difficulty}`;
      if (!bestByCategory[key] || bestByCategory[key].score < score.score) {
        bestByCategory[key] = score;
      }
    });

    return Object.values(bestByCategory);
  }

  // Get player rank for a specific score
  getPlayerRank(score, category = 'all') {
    const leaderboard = this.getLeaderboard(category, 1000); // Get more entries for accurate ranking
    const rank = leaderboard.findIndex(entry => 
      entry.score <= score
    );
    return rank === -1 ? leaderboard.length + 1 : rank + 1;
  }

  // Clear all leaderboard data
  clearLeaderboard() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.statsKey);
  }

  // Export leaderboard data
  exportData() {
    return {
      leaderboard: this.getScores(),
      stats: this.getStats(),
      exportDate: new Date().toISOString()
    };
  }

  // Import leaderboard data
  importData(data) {
    if (data.leaderboard && Array.isArray(data.leaderboard)) {
      localStorage.setItem(this.storageKey, JSON.stringify(data.leaderboard));
    }
    if (data.stats && typeof data.stats === 'object') {
      localStorage.setItem(this.statsKey, JSON.stringify(data.stats));
    }
  }

  // Get achievement progress for a player
  getAchievementProgress(playerName) {
    const stats = this.getStats();
    const playerStats = stats[playerName];
    
    if (!playerStats) return [];

    return ACHIEVEMENTS.map(achievement => ({
      ...achievement,
      unlocked: playerStats.achievements.includes(achievement.id),
      progress: this.calculateAchievementProgress(achievement.id, playerStats)
    }));
  }

  // Calculate progress towards an achievement
  calculateAchievementProgress(achievementId, playerStats) {
    switch (achievementId) {
      case 'consistent':
        return Math.min(100, (playerStats.gamesPlayed / 5) * 100);
      case 'improvement':
        return playerStats.gamesPlayed >= 2 ? 100 : 0;
      case 'category_expert':
        const avgAccuracy = (playerStats.totalCorrect / playerStats.totalQuestions) * 100;
        return Math.min(100, (avgAccuracy / 80) * 100);
      default:
        return playerStats.achievements.includes(achievementId) ? 100 : 0;
    }
  }

  // Generate insights from player data
  generateInsights(playerName) {
    const stats = this.getStats();
    const playerStats = stats[playerName];
    
    if (!playerStats) return null;

    const avgScore = Math.round(playerStats.totalScore / playerStats.gamesPlayed);
    const avgAccuracy = Math.round((playerStats.totalCorrect / playerStats.totalQuestions) * 100);
    
    return {
      averageScore: avgScore,
      averageAccuracy: avgAccuracy,
      favoriteCategory: this.getMostFrequentCategory(playerName),
      totalPlayTime: this.calculateTotalPlayTime(playerName),
      improvementTrend: this.getImprovementTrend(playerName),
      strongestCategory: this.getStrongestCategory(playerName),
      achievements: playerStats.achievements.length
    };
  }

  getMostFrequentCategory(playerName) {
    const scores = this.getScores();
    const playerScores = scores.filter(s => s.playerName === playerName);
    
    const categoryCount = {};
    playerScores.forEach(score => {
      categoryCount[score.category] = (categoryCount[score.category] || 0) + 1;
    });

    return Object.entries(categoryCount).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
  }

  getStrongestCategory(playerName) {
    const scores = this.getScores();
    const playerScores = scores.filter(s => s.playerName === playerName);
    
    const categoryAvg = {};
    playerScores.forEach(score => {
      if (!categoryAvg[score.category]) {
        categoryAvg[score.category] = { total: 0, count: 0 };
      }
      categoryAvg[score.category].total += score.accuracy;
      categoryAvg[score.category].count++;
    });

    const avgByCategory = Object.entries(categoryAvg).map(([category, data]) => [
      category,
      data.total / data.count
    ]);

    return avgByCategory.sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
  }

  getImprovementTrend(playerName) {
    const scores = this.getScores();
    const playerScores = scores
      .filter(s => s.playerName === playerName)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    if (playerScores.length < 2) return 'insufficient_data';
    
    const firstHalf = playerScores.slice(0, Math.ceil(playerScores.length / 2));
    const secondHalf = playerScores.slice(Math.ceil(playerScores.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, s) => sum + s.score, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, s) => sum + s.score, 0) / secondHalf.length;
    
    if (secondAvg > firstAvg * 1.1) return 'improving';
    if (secondAvg < firstAvg * 0.9) return 'declining';
    return 'stable';
  }

  calculateTotalPlayTime(playerName) {
    const scores = this.getScores();
    const playerScores = scores.filter(s => s.playerName === playerName);
    
    const totalSeconds = playerScores.reduce((sum, score) => sum + (score.timeElapsed || 0), 0);
    const minutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  }
}

// Global instance
const leaderboardManager = new LeaderboardManager();