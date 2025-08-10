// Quiz Game Application - Main Controller
class QuizGame {
  constructor() {
    this.currentQuestions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.correctAnswers = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.timeLeft = 30;
    this.timer = null;
    this.selectedCategory = null;
    this.selectedDifficulty = null;
    this.playerName = '';
    this.startTime = null;
    this.achievements = [];
    
    this.initializeElements();
    this.bindEvents();
    this.showLoadingScreen();
  }

  initializeElements() {
    // Screens
    this.loadingScreen = document.getElementById('loading-screen');
    this.mainMenu = document.getElementById('main-menu');
    this.quizScreen = document.getElementById('quiz-screen');
    this.resultsScreen = document.getElementById('results-screen');
    this.leaderboardScreen = document.getElementById('leaderboard-screen');
    
    // Menu elements
    this.playerNameInput = document.getElementById('player-name');
    this.categoryButtons = document.querySelectorAll('.category-btn');
    this.difficultyButtons = document.querySelectorAll('.difficulty-btn');
    this.startQuizBtn = document.getElementById('start-quiz-btn');
    this.leaderboardBtn = document.getElementById('leaderboard-btn');
    
    // Quiz elements
    this.currentQuestionSpan = document.getElementById('current-question');
    this.totalQuestionsSpan = document.getElementById('total-questions');
    this.currentScoreSpan = document.getElementById('current-score');
    this.currentStreakSpan = document.getElementById('current-streak');
    this.timerSpan = document.getElementById('timer');
    this.progressFill = document.querySelector('.progress-fill');
    this.questionCategorySpan = document.getElementById('question-category');
    this.questionDifficultySpan = document.getElementById('question-difficulty');
    this.questionText = document.getElementById('question-text');
    this.optionsContainer = document.getElementById('options-container');
    this.nextQuestionBtn = document.getElementById('next-question-btn');
    this.feedbackContainer = document.getElementById('feedback-container');
    
    // Results elements
    this.resultsEmoji = document.getElementById('results-emoji');
    this.resultsTitle = document.getElementById('results-title');
    this.resultsSubtitle = document.getElementById('results-subtitle');
    this.finalScoreSpan = document.getElementById('final-score');
    this.correctAnswersSpan = document.getElementById('correct-answers');
    this.accuracySpan = document.getElementById('accuracy');
    this.maxStreakSpan = document.getElementById('max-streak');
    this.achievementsList = document.getElementById('achievements-list');
    this.playAgainBtn = document.getElementById('play-again-btn');
    this.backToMenuBtn = document.getElementById('back-to-menu-btn');
    this.viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');
    
    // Leaderboard elements
    this.leaderboardList = document.getElementById('leaderboard-list');
    this.leaderboardCategorySelect = document.getElementById('leaderboard-category');
    this.backFromLeaderboardBtn = document.getElementById('back-from-leaderboard-btn');
    this.clearLeaderboardBtn = document.getElementById('clear-leaderboard-btn');
  }

  bindEvents() {
    // Menu events
    this.categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => this.selectCategory(btn.dataset.category));
    });
    
    this.difficultyButtons.forEach(btn => {
      btn.addEventListener('click', () => this.selectDifficulty(btn.dataset.difficulty));
    });
    
    this.playerNameInput.addEventListener('input', () => this.updateStartButton());
    this.startQuizBtn.addEventListener('click', () => this.startQuiz());
    this.leaderboardBtn.addEventListener('click', () => this.showLeaderboard());
    
    // Quiz events
    this.nextQuestionBtn.addEventListener('click', () => this.nextQuestion());
    
    // Results events
    this.playAgainBtn.addEventListener('click', () => this.resetQuiz());
    this.backToMenuBtn.addEventListener('click', () => this.showMainMenu());
    this.viewLeaderboardBtn.addEventListener('click', () => this.showLeaderboard());
    
    // Leaderboard events
    this.backFromLeaderboardBtn.addEventListener('click', () => this.showMainMenu());
    this.clearLeaderboardBtn.addEventListener('click', () => this.clearLeaderboard());
    this.leaderboardCategorySelect.addEventListener('change', () => this.updateLeaderboard());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }

  showLoadingScreen() {
    setTimeout(() => {
      this.loadingScreen.style.display = 'none';
      this.showMainMenu();
    }, 2000);
  }

  showMainMenu() {
    this.hideAllScreens();
    this.mainMenu.classList.add('active');
    this.updateCategoryBackground();
  }

  showQuizScreen() {
    this.hideAllScreens();
    this.quizScreen.classList.add('active');
    this.updateCategoryBackground();
  }

  showResultsScreen() {
    this.hideAllScreens();
    this.resultsScreen.classList.add('active');
    this.updateCategoryBackground();
  }

  showLeaderboard() {
    this.hideAllScreens();
    this.leaderboardScreen.classList.add('active');
    this.updateLeaderboard();
    this.updateCategoryBackground();
  }

  hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
  }

  updateCategoryBackground() {
    const colors = {
      science: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
      history: 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
      sports: 'radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
      technology: 'radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)'
    };
    
    if (this.selectedCategory && colors[this.selectedCategory]) {
      const baseGradient = 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)';
      document.body.style.background = `${colors[this.selectedCategory]}, ${baseGradient}`;
    } else {
      document.body.style.background = '#0a0a0a';
    }
  }

  selectCategory(category) {
    this.selectedCategory = category;
    this.categoryButtons.forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.category === category);
    });
    this.updateStartButton();
    this.updateCategoryBackground();
  }

  selectDifficulty(difficulty) {
    this.selectedDifficulty = difficulty;
    this.difficultyButtons.forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.difficulty === difficulty);
    });
    this.updateStartButton();
  }

  updateStartButton() {
    const canStart = this.selectedCategory && this.selectedDifficulty && 
                     this.playerNameInput.value.trim() !== '';
    this.startQuizBtn.disabled = !canStart;
  }

  startQuiz() {
    this.playerName = this.playerNameInput.value.trim() || 'Anonymous';
    this.currentQuestions = this.getQuestionsForQuiz();
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.correctAnswers = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.achievements = [];
    this.startTime = Date.now();
    
    this.showQuizScreen();
    this.updateQuizHeader();
    this.loadQuestion();
    this.startTimer();
  }

  getQuestionsForQuiz() {
    const categoryQuestions = QUESTIONS[this.selectedCategory][this.selectedDifficulty];
    const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, shuffled.length));
  }

  updateQuizHeader() {
    this.totalQuestionsSpan.textContent = this.currentQuestions.length;
    this.questionCategorySpan.textContent = this.selectedCategory;
    this.questionDifficultySpan.textContent = this.selectedDifficulty;
    this.questionDifficultySpan.className = `difficulty-badge ${this.selectedDifficulty}`;
  }

  loadQuestion() {
    if (this.currentQuestionIndex >= this.currentQuestions.length) {
      this.endQuiz();
      return;
    }

    const question = this.currentQuestions[this.currentQuestionIndex];
    
    // Update question display
    this.currentQuestionSpan.textContent = this.currentQuestionIndex + 1;
    this.questionText.textContent = question.question;
    
    // Update progress bar
    const progress = ((this.currentQuestionIndex) / this.currentQuestions.length) * 100;
    this.progressFill.style.width = `${progress}%`;
    
    // Load options
    this.loadOptions(question);
    
    // Hide next button and feedback
    this.nextQuestionBtn.style.display = 'none';
    this.feedbackContainer.style.display = 'none';
    
    // Reset timer
    this.timeLeft = 30;
    this.updateTimerDisplay();
  }

  loadOptions(question) {
    this.optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.className = 'option';
      optionElement.innerHTML = `
        <div class="option-letter">${String.fromCharCode(65 + index)}</div>
        <div class="option-text">${option}</div>
      `;
      
      optionElement.addEventListener('click', () => this.selectOption(index));
      this.optionsContainer.appendChild(optionElement);
    });
  }

  selectOption(selectedIndex) {
    if (document.querySelector('.option.disabled')) return; // Already answered
    
    this.stopTimer();
    
    const question = this.currentQuestions[this.currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    // Disable all options
    document.querySelectorAll('.option').forEach((option, index) => {
      option.classList.add('disabled');
      
      if (index === question.correct) {
        option.classList.add('correct');
      } else if (index === selectedIndex && !isCorrect) {
        option.classList.add('incorrect');
      }
    });

    // Update score and streak
    if (isCorrect) {
      const points = this.calculatePoints();
      this.score += points;
      this.correctAnswers++;
      this.streak++;
      this.maxStreak = Math.max(this.maxStreak, this.streak);
    } else {
      this.streak = 0;
    }

    this.updateScoreDisplay();
    this.showFeedback(isCorrect, question.explanation);
    
    // Show next button after delay
    setTimeout(() => {
      this.nextQuestionBtn.style.display = 'block';
    }, 2000);
  }

  calculatePoints() {
    const basePoints = {
      easy: 10,
      medium: 15,
      hard: 25
    };
    
    const timeBonus = Math.floor(this.timeLeft / 3);
    const streakBonus = Math.min(this.streak * 2, 10);
    
    return basePoints[this.selectedDifficulty] + timeBonus + streakBonus;
  }

  updateScoreDisplay() {
    this.currentScoreSpan.textContent = this.score;
    this.currentStreakSpan.textContent = this.streak;
  }

  showFeedback(isCorrect, explanation) {
    const feedbackIcon = this.feedbackContainer.querySelector('.feedback-icon');
    const feedbackText = this.feedbackContainer.querySelector('.feedback-text');
    
    if (isCorrect) {
      feedbackIcon.textContent = '🎉';
      feedbackText.innerHTML = `<strong>Correct!</strong><br>${explanation}`;
    } else {
      feedbackIcon.textContent = '❌';
      feedbackText.innerHTML = `<strong>Incorrect!</strong><br>${explanation}`;
    }
    
    this.feedbackContainer.style.display = 'block';
    
    setTimeout(() => {
      this.feedbackContainer.style.display = 'none';
    }, 3000);
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.loadQuestion();
    this.startTimer();
  }

  startTimer() {
    this.timeLeft = 30;
    this.updateTimerDisplay();
    
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      
      if (this.timeLeft <= 0) {
        this.selectOption(-1); // Auto-fail on timeout
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  updateTimerDisplay() {
    this.timerSpan.textContent = this.timeLeft;
    this.timerSpan.style.color = this.timeLeft <= 10 ? 'var(--error-color)' : 'var(--neutral-800)';
  }

  endQuiz() {
    this.stopTimer();
    this.calculateAchievements();
    this.saveScore();
    this.displayResults();
    this.showResultsScreen();
  }

  calculateAchievements() {
    const totalTime = (Date.now() - this.startTime) / 1000;
    const accuracy = (this.correctAnswers / this.currentQuestions.length) * 100;
    
    // Check achievements
    if (accuracy === 100) {
      this.achievements.push(ACHIEVEMENTS.find(a => a.id === 'perfect_score'));
    }
    
    if (totalTime < 120) {
      this.achievements.push(ACHIEVEMENTS.find(a => a.id === 'speed_demon'));
    }
    
    if (this.maxStreak >= 5) {
      this.achievements.push(ACHIEVEMENTS.find(a => a.id === 'streak_master'));
    }
    
    if (accuracy >= 80) {
      this.achievements.push(ACHIEVEMENTS.find(a => a.id === 'category_expert'));
    }
    
    if (this.selectedDifficulty === 'hard') {
      this.achievements.push(ACHIEVEMENTS.find(a => a.id === 'hard_mode'));
    }
    
    // Check if first quiz
    const stats = leaderboardManager.getStats();
    if (!stats[this.playerName]) {
      this.achievements.push(ACHIEVEMENTS.find(a => a.id === 'first_try'));
    }
    
    // Filter out null achievements
    this.achievements = this.achievements.filter(a => a !== null);
  }

  saveScore() {
    const timeElapsed = (Date.now() - this.startTime) / 1000;
    
    leaderboardManager.saveScore(
      this.playerName,
      this.selectedCategory,
      this.selectedDifficulty,
      this.score,
      this.currentQuestions.length,
      this.correctAnswers,
      timeElapsed,
      this.achievements
    );
  }

  displayResults() {
    const accuracy = Math.round((this.correctAnswers / this.currentQuestions.length) * 100);
    
    // Set results data
    this.finalScoreSpan.textContent = this.score;
    this.correctAnswersSpan.textContent = `${this.correctAnswers}/${this.currentQuestions.length}`;
    this.accuracySpan.textContent = `${accuracy}%`;
    this.maxStreakSpan.textContent = this.maxStreak;
    
    // Set emoji and title based on performance
    if (accuracy >= 90) {
      this.resultsEmoji.textContent = '👑';
      this.resultsTitle.textContent = 'Legendary!';
      this.resultsSubtitle.textContent = 'You\'ve achieved mastery status!';
    } else if (accuracy >= 70) {
      this.resultsEmoji.textContent = '🚀';
      this.resultsTitle.textContent = 'Excellent!';
      this.resultsSubtitle.textContent = 'Your skills are impressive!';
    } else if (accuracy >= 50) {
      this.resultsEmoji.textContent = '⚡';
      this.resultsTitle.textContent = 'Good Progress!';
      this.resultsSubtitle.textContent = 'You\'re on the right track!';
    } else {
      this.resultsEmoji.textContent = '🎯';
      this.resultsTitle.textContent = 'Keep Training!';
      this.resultsSubtitle.textContent = 'Every master was once a beginner!';
    }
    
    // Display achievements
    this.achievementsList.innerHTML = '';
    this.achievements.forEach(achievement => {
      const achievementElement = document.createElement('div');
      achievementElement.className = 'achievement';
      achievementElement.innerHTML = `
        <span>${achievement.icon}</span>
        <span>${achievement.name}</span>
      `;
      this.achievementsList.appendChild(achievementElement);
    });
    
    if (this.achievements.length === 0) {
      this.achievementsList.innerHTML = '<p style="color: #b3b3b3; font-style: italic;">No achievements unlocked this time. Keep training!</p>';
    }
  }

  resetQuiz() {
    this.showMainMenu();
  }

  updateLeaderboard() {
    const selectedCategory = this.leaderboardCategorySelect.value;
    const leaderboard = leaderboardManager.getLeaderboard(selectedCategory, 20);
    
    this.leaderboardList.innerHTML = '';
    
    if (leaderboard.length === 0) {
      this.leaderboardList.innerHTML = `
        <div class="empty-leaderboard">
          🎯 No records found. Be the first to establish dominance!
        </div>
      `;
      return;
    }
    
    leaderboard.forEach((entry, index) => {
      const entryElement = document.createElement('div');
      entryElement.className = `leaderboard-entry ${index < 3 ? 'top-3' : ''}`;
      entryElement.innerHTML = `
        <div class="leaderboard-rank">${index + 1}</div>
        <div class="leaderboard-info">
          <div class="leaderboard-name">${entry.playerName}</div>
          <div class="leaderboard-details">
            ${entry.category} • ${entry.difficulty} • ${entry.accuracy}% accuracy • ${entry.date}
          </div>
        </div>
        <div class="leaderboard-score">${entry.score}</div>
      `;
      this.leaderboardList.appendChild(entryElement);
    });
  }

  clearLeaderboard() {
    if (confirm('⚠️ This will permanently erase all ranking data. Are you absolutely certain?')) {
      leaderboardManager.clearLeaderboard();
      this.updateLeaderboard();
    }
  }

  handleKeyPress(event) {
    // Handle keyboard navigation
    if (this.quizScreen.classList.contains('active')) {
      const options = document.querySelectorAll('.option:not(.disabled)');
      if (event.key >= '1' && event.key <= '4') {
        const index = parseInt(event.key) - 1;
        if (options[index]) {
          this.selectOption(index);
        }
      } else if (event.key === 'Enter' && this.nextQuestionBtn.style.display !== 'none') {
        this.nextQuestion();
      }
    }
    
    // ESC to go back
    if (event.key === 'Escape') {
      if (this.leaderboardScreen.classList.contains('active') || 
          this.resultsScreen.classList.contains('active')) {
        this.showMainMenu();
      }
    }
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new QuizGame();
  
  // Add some extra visual flair
  setTimeout(() => {
    document.body.style.transition = 'background 0.5s ease-in-out';
  }, 100);
});

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}