// Main application logic

// Timezone utility functions for New Zealand
const NZ_TIMEZONE = 'Pacific/Auckland';
const NZ_LOCALE = 'en-NZ';

function formatDateNZ(date, options = {}) {
    // Add NZ timezone to options
    const nzOptions = { ...options, timeZone: NZ_TIMEZONE };
    return new Date(date).toLocaleDateString(NZ_LOCALE, nzOptions);
}

function formatDateTimeNZ(date, options = {}) {
    // Add NZ timezone to options
    const nzOptions = { ...options, timeZone: NZ_TIMEZONE };
    return new Date(date).toLocaleString(NZ_LOCALE, nzOptions);
}

function getCurrentDateNZ() {
    // Get current date in NZ timezone
    const now = new Date();
    return new Date(now.toLocaleString('en-US', { timeZone: NZ_TIMEZONE }));
}

class GymTrackerApp {
    constructor() {
        this.currentWorkout = Storage.getCurrentWorkout();
        this.currentMealType = null;
        this.timerInterval = null;
        this.timerSeconds = 90; // Default 1:30
        this.timerRunning = false;
        this.editingExerciseId = null; // Track which exercise is being edited
        this.editingFoodId = null; // Track which food item is being edited
        this.currentFoodPhoto = null; // Track food photo for current food item

        // Rest timer properties
        this.restTimerInterval = null;
        this.restTimerSeconds = 0;
        this.activeRestTimer = null; // Track which exercise has active rest timer

        // Modal rest timer properties
        this.modalRestTimerInterval = null;
        this.modalRestTimerSeconds = 0;
        this.modalRestTimerRunning = false;

        // Auto theme properties
        this.autoThemeInterval = null;

        this.initializeEventListeners();
        this.initializeDarkMode();
        this.checkAutoBackup();
        this.updateDateBanner();
        this.renderCurrentWorkout();
        this.renderHistory();
        this.renderRoutines();
        this.renderFood();

        // Register service worker for PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(err => {
                console.log('Service worker registration failed:', err);
            });
        }

        // Monitor online/offline status
        this.initializeConnectionMonitor();
    }

    initializeConnectionMonitor() {
        const statusEl = document.getElementById('connectionStatus');
        const iconEl = document.getElementById('connectionIcon');
        const textEl = document.getElementById('connectionText');

        const updateConnectionStatus = () => {
            if (navigator.onLine) {
                statusEl.classList.remove('offline');
                statusEl.classList.add('online');
                iconEl.textContent = '✅';
                textEl.textContent = 'Back Online';
                statusEl.style.display = 'flex';

                // Hide after 3 seconds
                setTimeout(() => {
                    statusEl.style.display = 'none';
                }, 3000);

                // Trigger sync if available
                if ('sync' in navigator.serviceWorker.registration) {
                    navigator.serviceWorker.ready.then(reg => {
                        return reg.sync.register('sync-data');
                    }).catch(err => console.log('Sync registration failed:', err));
                }
            } else {
                statusEl.classList.remove('online', 'syncing');
                statusEl.classList.add('offline');
                iconEl.textContent = '📡';
                textEl.textContent = 'Offline Mode';
                statusEl.style.display = 'flex';
            }
        };

        // Listen for online/offline events
        window.addEventListener('online', updateConnectionStatus);
        window.addEventListener('offline', updateConnectionStatus);

        // Show initial status briefly if offline
        if (!navigator.onLine) {
            updateConnectionStatus();
        }
    }

    initializeEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchView(e.target.dataset.view));
        });

        // Date Banner - click to return to today
        document.getElementById('currentDateDisplay').addEventListener('click', () => {
            if (this.workingDate) {
                this.returnToToday();
            }
        });

        // Add Exercise
        document.getElementById('addExerciseBtn').addEventListener('click', () => {
            this.openAddExerciseModal();
        });

        document.getElementById('saveExerciseBtn').addEventListener('click', () => {
            this.saveExercise();
        });

        document.getElementById('cancelExerciseBtn').addEventListener('click', () => {
            this.closeModal('addExerciseModal');
        });

        document.getElementById('addSetBtn').addEventListener('click', () => {
            this.addSetInput();
        });

        // Finish Workout
        document.getElementById('finishWorkoutBtn').addEventListener('click', () => {
            this.finishWorkout();
        });

        // Timer
        document.getElementById('timerBtn').addEventListener('click', () => {
            this.openTimerModal();
        });

        document.getElementById('startTimerBtn').addEventListener('click', () => {
            this.toggleTimer();
        });

        document.getElementById('resetTimerBtn').addEventListener('click', () => {
            this.resetTimer();
        });

        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.timerSeconds = parseInt(e.target.dataset.seconds);
                this.updateTimerDisplay();
            });
        });

        // Routines
        document.getElementById('createRoutineBtn').addEventListener('click', () => {
            this.openCreateRoutineModal();
        });

        document.getElementById('saveRoutineBtn').addEventListener('click', () => {
            this.saveRoutine();
        });

        document.getElementById('cancelRoutineBtn').addEventListener('click', () => {
            this.closeModal('createRoutineModal');
        });

        document.getElementById('loadRoutineBtn').addEventListener('click', () => {
            this.openLoadRoutineModal();
        });

        // Food
        document.getElementById('saveFoodBtn').addEventListener('click', () => {
            this.saveFood();
        });

        document.getElementById('cancelFoodBtn').addEventListener('click', () => {
            this.closeModal('addFoodModal');
        });

        document.getElementById('foodPhotoInput').addEventListener('change', (e) => {
            this.handleFoodPhotoSelection(e);
        });

        document.getElementById('viewFoodHistoryBtn').addEventListener('click', () => {
            this.openFoodHistoryModal();
        });

        document.getElementById('setNutritionGoalsBtn').addEventListener('click', () => {
            this.openNutritionGoalsModal();
        });

        document.getElementById('saveNutritionGoalsBtn').addEventListener('click', () => {
            this.saveNutritionGoals();
        });

        // Food Routines
        document.getElementById('createFoodRoutineBtn').addEventListener('click', () => {
            this.openCreateFoodRoutineModal();
        });

        document.getElementById('saveFoodRoutineBtn').addEventListener('click', () => {
            this.saveFoodRoutine();
        });

        document.getElementById('cancelFoodRoutineBtn').addEventListener('click', () => {
            this.closeModal('createFoodRoutineModal');
        });

        document.getElementById('loadFoodRoutineBtn').addEventListener('click', () => {
            this.openLoadFoodRoutineModal();
        });

        // Settings
        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.openSettingsModal();
        });

        document.getElementById('saveSettingsBtn').addEventListener('click', () => {
            this.saveSettings();
        });

        document.getElementById('cancelSettingsBtn').addEventListener('click', () => {
            this.closeModal('settingsModal');
        });

        document.getElementById('clearCacheBtn').addEventListener('click', () => {
            this.clearCacheAndReload();
        });

        // Dark Mode Toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', () => {
                this.toggleDarkMode();
            });
        }

        const autoThemeToggle = document.getElementById('autoThemeToggle');
        if (autoThemeToggle) {
            autoThemeToggle.addEventListener('change', () => {
                this.toggleAutoTheme();
            });
        }

        // Data Export/Import
        document.getElementById('exportDataBtn').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('importDataBtn').addEventListener('click', () => {
            document.getElementById('importFileInput').click();
        });

        document.getElementById('importFileInput').addEventListener('change', (e) => {
            this.importData(e);
        });

        // Download Workout Routines
        document.getElementById('downloadWorkoutBtn').addEventListener('click', () => {
            this.downloadWorkoutRoutines();
        });

        // Import Workout Routines
        document.getElementById('importRoutinesBtn').addEventListener('click', () => {
            document.getElementById('importRoutinesInput').click();
        });

        document.getElementById('importRoutinesInput').addEventListener('change', (e) => {
            this.importRoutines(e);
        });

        // Download Diet Plan
        document.getElementById('downloadDietBtn').addEventListener('click', () => {
            this.downloadDietPlan();
        });

        // Import Diet Plan
        document.getElementById('importDietPlanBtn').addEventListener('click', () => {
            document.getElementById('importDietPlanInput').click();
        });

        document.getElementById('importDietPlanInput').addEventListener('change', (e) => {
            this.importDietPlan(e);
        });

        // Date History
        document.getElementById('calendarBtn').addEventListener('click', () => {
            this.openDateHistoryModal();
        });

        document.getElementById('historyDateInput').addEventListener('change', (e) => {
            this.loadDateHistory(e.target.value);
        });

        // Progress Photos
        document.getElementById('takePhotoBtn').addEventListener('click', () => {
            document.getElementById('photoInput').click();
        });

        document.getElementById('photoInput').addEventListener('change', (e) => {
            this.handlePhotoSelection(e);
        });

        document.getElementById('savePhotoBtn').addEventListener('click', () => {
            this.savePhoto();
        });

        document.getElementById('deletePhotoBtn').addEventListener('click', () => {
            this.deleteCurrentPhoto();
        });

        // Dashboard Metrics
        document.getElementById('saveCaloriesBtn').addEventListener('click', () => {
            this.saveCalories();
        });

        document.getElementById('saveStepsBtn').addEventListener('click', () => {
            this.saveSteps();
        });

        document.getElementById('saveWaterBtn').addEventListener('click', () => {
            this.saveWater();
        });

        document.getElementById('saveDashboardSleepBtn').addEventListener('click', () => {
            this.saveDashboardSleep();
        });

        document.getElementById('saveWeightBtn').addEventListener('click', () => {
            this.saveWeight();
        });

        document.getElementById('saveMeasurementsBtn').addEventListener('click', () => {
            this.saveMeasurements();
        });

        document.getElementById('saveRestDayBtn').addEventListener('click', () => {
            this.saveRestDay();
        });

        document.getElementById('removeRestDayBtn').addEventListener('click', () => {
            this.removeRestDay();
        });

        document.getElementById('saveGoalBtn').addEventListener('click', () => {
            this.saveGoal();
        });

        document.getElementById('saveWaterGoalBtn').addEventListener('click', () => {
            this.saveWaterGoal();
        });

        document.getElementById('saveSleepLogBtn').addEventListener('click', () => {
            this.saveSleepLog();
        });

        document.getElementById('saveCardioBtn').addEventListener('click', () => {
            this.saveCardio();
        });

        document.getElementById('saveJournalBtn').addEventListener('click', () => {
            this.saveJournal();
        });

        // Google Drive Sync
        this.renderGoogleDriveStatus();

        // Handle OAuth callback from Google Drive
        if (window.location.search.includes('code=')) {
            this.handleGoogleDriveCallback();
        }

        // Auto-sync every 5 minutes if enabled
        setInterval(() => {
            GoogleDriveSync.autoSync();
        }, 5 * 60 * 1000);

        // Close modals
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Close modal on background click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });
    }

    switchView(viewName) {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        document.getElementById(`${viewName}View`).classList.add('active');
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

        // Refresh data when switching views
        if (viewName === 'dashboard') {
            this.renderDashboard();
        } else if (viewName === 'calendar') {
            this.renderCalendar();
        } else if (viewName === 'progress') {
            this.renderProgress();
        } else if (viewName === 'history') {
            this.renderHistory();
        } else if (viewName === 'routines') {
            this.renderRoutines();
        } else if (viewName === 'food') {
            this.renderFood();
        } else if (viewName === 'photos') {
            this.renderProgressPhotos();
        }
    }

    openAddExerciseModal(exerciseId = null) {
        this.editingExerciseId = exerciseId;
        const isEditing = exerciseId !== null;

        // Update modal title
        const modalTitle = document.querySelector('#addExerciseModal h3');
        if (modalTitle) {
            modalTitle.textContent = isEditing ? 'Edit Exercise' : 'Add Exercise';
        }

        // Update save button text
        const saveBtn = document.getElementById('saveExerciseBtn');
        if (saveBtn) {
            saveBtn.textContent = isEditing ? 'Update Exercise' : 'Save Exercise';
        }

        if (isEditing) {
            // Load exercise data for editing
            const exercise = this.currentWorkout.exercises.find(e => e.id === exerciseId);
            if (!exercise) return;

            const typeSelect = document.getElementById('exerciseTypeSelect');
            typeSelect.value = exercise.type || 'strength';
            typeSelect.disabled = true; // Disable type change when editing
            document.getElementById('exerciseNameInput').value = exercise.name;
            document.getElementById('exerciseVideoUrl').value = exercise.videoUrl || '';

            if (exercise.type === 'strength' || !exercise.type) {
                // Load strength exercise data
                document.getElementById('setsContainer').innerHTML = exercise.sets.map(set => `
                    <div class="set-input">
                        <select class="input small" data-field="unit">
                            <option value="kg" ${(!set.unit || set.unit === 'kg') ? 'selected' : ''}>kg</option>
                            <option value="lbs" ${set.unit === 'lbs' ? 'selected' : ''}>lbs</option>
                        </select>
                        <input type="number" placeholder="Weight" class="input small" data-field="weight" value="${set.weight}">
                        <input type="number" placeholder="Reps" class="input small" data-field="reps" value="${set.reps}">
                        <button class="btn-icon remove-set">🗑️</button>
                    </div>
                `).join('');
            } else if (exercise.type === 'cardio') {
                document.getElementById('cardioDuration').value = exercise.duration || '';
                document.getElementById('cardioDistance').value = exercise.distance || '';
                document.getElementById('cardioCalories').value = exercise.calories || '';
            } else if (exercise.type === 'hiit') {
                document.getElementById('hiitDuration').value = exercise.duration || '';
                document.getElementById('hiitRounds').value = exercise.rounds || '';
                document.getElementById('hiitCalories').value = exercise.calories || '';
            }

            this.switchExerciseTypeInputs(exercise.type || 'strength');
        } else {
            // Reset form for new exercise
            const typeSelect = document.getElementById('exerciseTypeSelect');
            typeSelect.value = 'strength';
            typeSelect.disabled = false; // Enable type selection for new exercises
            document.getElementById('exerciseNameInput').value = '';
            document.getElementById('exerciseVideoUrl').value = '';
            document.getElementById('setsContainer').innerHTML = `
                <div class="set-input">
                    <select class="input small" data-field="unit">
                        <option value="kg" selected>kg</option>
                        <option value="lbs">lbs</option>
                    </select>
                    <input type="number" placeholder="Weight" class="input small" data-field="weight">
                    <input type="number" placeholder="Reps" class="input small" data-field="reps">
                    <button class="btn-icon remove-set">🗑️</button>
                </div>
            `;

            // Reset cardio inputs
            document.getElementById('cardioDuration').value = '';
            document.getElementById('cardioDistance').value = '';
            document.getElementById('cardioCalories').value = '';

            // Reset HIIT inputs
            document.getElementById('hiitDuration').value = '';
            document.getElementById('hiitRounds').value = '';
            document.getElementById('hiitCalories').value = '';

            // Show strength inputs by default
            this.switchExerciseTypeInputs('strength');
        }

        // Setup exercise type change listener
        document.getElementById('exerciseTypeSelect').onchange = (e) => {
            this.switchExerciseTypeInputs(e.target.value);
        };

        this.attachSetRemoveListeners();
        document.getElementById('addExerciseModal').classList.add('active');
        document.getElementById('exerciseNameInput').focus();
    }

    switchExerciseTypeInputs(type) {
        document.getElementById('strengthInputs').style.display = type === 'strength' ? 'block' : 'none';
        document.getElementById('cardioInputs').style.display = type === 'cardio' ? 'block' : 'none';
        document.getElementById('hiitInputs').style.display = type === 'hiit' ? 'block' : 'none';
    }

    addSetInput() {
        const container = document.getElementById('setsContainer');
        const setInput = document.createElement('div');
        setInput.className = 'set-input';
        setInput.innerHTML = `
            <select class="input small" data-field="unit">
                <option value="kg" selected>kg</option>
                <option value="lbs">lbs</option>
            </select>
            <input type="number" placeholder="Weight" class="input small" data-field="weight">
            <input type="number" placeholder="Reps" class="input small" data-field="reps">
            <button class="btn-icon remove-set">🗑️</button>
        `;
        container.appendChild(setInput);
        this.attachSetRemoveListeners();
    }

    attachSetRemoveListeners() {
        document.querySelectorAll('.remove-set').forEach(btn => {
            btn.onclick = (e) => {
                const setInputs = document.querySelectorAll('.set-input');
                if (setInputs.length > 1) {
                    e.target.closest('.set-input').remove();
                }
            };
        });
    }

    saveExercise() {
        const name = document.getElementById('exerciseNameInput').value.trim();
        const type = document.getElementById('exerciseTypeSelect').value;
        const videoUrl = document.getElementById('exerciseVideoUrl').value.trim();

        if (!name) {
            alert('Please enter an exercise name');
            return;
        }

        const isEditing = this.editingExerciseId !== null;
        let exercise;

        if (isEditing) {
            // Find and update existing exercise
            exercise = this.currentWorkout.exercises.find(e => e.id === this.editingExerciseId);
            if (!exercise) {
                alert('Exercise not found');
                return;
            }
            exercise.name = name;
            exercise.type = type;
            exercise.videoUrl = videoUrl || null;
        } else {
            // Create new exercise
            exercise = {
                id: Date.now() + Math.random(), // Add random component for uniqueness
                name: name,
                type: type,
                videoUrl: videoUrl || null
            };
        }

        if (type === 'strength') {
            const sets = [];
            document.querySelectorAll('.set-input').forEach(setDiv => {
                const unit = setDiv.querySelector('[data-field="unit"]').value;
                const weight = setDiv.querySelector('[data-field="weight"]').value;
                const reps = setDiv.querySelector('[data-field="reps"]').value;

                if (weight || reps) {
                    sets.push({
                        unit: unit || 'kg',
                        weight: weight || '0',
                        reps: reps || '0'
                    });
                }
            });

            if (sets.length === 0) {
                alert('Please add at least one set');
                return;
            }

            exercise.sets = sets;
        } else if (type === 'cardio') {
            const duration = document.getElementById('cardioDuration').value;
            const distance = document.getElementById('cardioDistance').value;
            const calories = document.getElementById('cardioCalories').value;

            if (!duration) {
                alert('Please enter duration');
                return;
            }

            exercise.duration = duration;
            exercise.distance = distance || null;
            exercise.calories = calories || null;
        } else if (type === 'hiit') {
            const duration = document.getElementById('hiitDuration').value;
            const rounds = document.getElementById('hiitRounds').value;
            const calories = document.getElementById('hiitCalories').value;

            if (!duration) {
                alert('Please enter duration');
                return;
            }

            exercise.duration = duration;
            exercise.rounds = rounds || null;
            exercise.calories = calories || null;
        }

        if (!isEditing) {
            this.currentWorkout.exercises.push(exercise);
        }

        Storage.saveCurrentWorkout(this.currentWorkout);
        this.renderCurrentWorkout();
        this.closeModal('addExerciseModal');

        // Check for new PRs (only for strength exercises and new entries)
        if (type === 'strength' && !isEditing) {
            this.checkForNewPR(exercise);

            // Auto-start rest timer
            this.startAutoRestTimer(exercise.id);
        }

        this.editingExerciseId = null;
    }

    checkForNewPR(exercise) {
        // Get all historical workouts
        const workouts = Storage.getAllWorkouts();
        let previousBest = {
            maxWeight: 0,
            maxReps: 0,
            maxVolume: 0
        };

        // Find previous records for this exercise
        workouts.forEach(workout => {
            workout.exercises.forEach(ex => {
                if (ex.name === exercise.name && ex.type === 'strength') {
                    ex.sets.forEach(set => {
                        const weight = parseFloat(set.weight) || 0;
                        const reps = parseInt(set.reps) || 0;
                        const volume = weight * reps;

                        if (weight > previousBest.maxWeight) previousBest.maxWeight = weight;
                        if (reps > previousBest.maxReps) previousBest.maxReps = reps;
                        if (volume > previousBest.maxVolume) previousBest.maxVolume = volume;
                    });
                }
            });
        });

        // Check current exercise for new records
        let currentBest = {
            maxWeight: 0,
            maxReps: 0,
            maxVolume: 0
        };

        exercise.sets.forEach(set => {
            const weight = parseFloat(set.weight) || 0;
            const reps = parseInt(set.reps) || 0;
            const volume = weight * reps;

            if (weight > currentBest.maxWeight) currentBest.maxWeight = weight;
            if (reps > currentBest.maxReps) currentBest.maxReps = reps;
            if (volume > currentBest.maxVolume) currentBest.maxVolume = volume;
        });

        // Check if we have new PRs
        const newPRs = [];
        if (currentBest.maxWeight > previousBest.maxWeight) {
            newPRs.push({
                type: 'weight',
                previous: previousBest.maxWeight,
                new: currentBest.maxWeight
            });
        }
        if (currentBest.maxReps > previousBest.maxReps) {
            newPRs.push({
                type: 'reps',
                previous: previousBest.maxReps,
                new: currentBest.maxReps
            });
        }
        if (currentBest.maxVolume > previousBest.maxVolume) {
            newPRs.push({
                type: 'volume',
                previous: previousBest.maxVolume,
                new: currentBest.maxVolume
            });
        }

        if (newPRs.length > 0) {
            this.showPRCelebration(exercise.name, newPRs);
        }
    }

    showPRCelebration(exerciseName, newPRs) {
        // Create confetti
        this.createConfetti();

        // Create celebration overlay
        const overlay = document.createElement('div');
        overlay.className = 'pr-celebration-overlay';

        let prStatsHTML = '';
        newPRs.forEach(pr => {
            let label = '';
            let emoji = '';
            let value = '';

            if (pr.type === 'weight') {
                label = 'Max Weight';
                emoji = '💪';
                value = `${pr.new.toFixed(1)} kg`;
            } else if (pr.type === 'reps') {
                label = 'Max Reps';
                emoji = '🔥';
                value = pr.new;
            } else if (pr.type === 'volume') {
                label = 'Max Volume';
                emoji = '📊';
                value = `${pr.new.toFixed(1)} kg`;
            }

            prStatsHTML += `
                <div class="pr-stat">
                    ${emoji} ${label}
                    <span class="pr-stat-value">${value}</span>
                </div>
            `;
        });

        overlay.innerHTML = `
            <div class="pr-celebration-content">
                <div class="pr-trophy">🏆</div>
                <div class="pr-title">NEW PR!</div>
                <div class="pr-exercise-name">${exerciseName}</div>
                <div class="pr-stats">
                    ${prStatsHTML}
                </div>
                <button class="pr-close-btn" onclick="app.closePRCelebration()">
                    Awesome! 🎉
                </button>
            </div>
        `;

        document.body.appendChild(overlay);

        // Vibrate if supported
        if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200, 100, 200]);
        }

        // Play sound (optional - you could add a sound effect here)
        // const audio = new Audio('celebration.mp3');
        // audio.play();
    }

    createConfetti() {
        const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), 3000);
            }, i * 30);
        }
    }

    closePRCelebration() {
        const overlay = document.querySelector('.pr-celebration-overlay');
        if (overlay) {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        }
    }

    renderCurrentWorkout() {
        // Render today's completed workouts first
        this.renderTodayCompletedWorkouts();

        const container = document.getElementById('currentExercises');

        if (this.currentWorkout.exercises.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-state-icon">💪</span>
                    <div class="empty-state-title">No Exercises Yet</div>
                    <div class="empty-state-message">Start building your workout by adding your first exercise</div>
                    <button class="empty-state-cta" onclick="app.openAddExerciseModal()">Add Exercise</button>
                </div>
            `;
            return;
        }

        container.innerHTML = this.currentWorkout.exercises.map(exercise => {
            const type = exercise.type || 'strength'; // default to strength for backward compatibility
            const history = Storage.getExerciseHistory(exercise.name);
            const hasHistory = history.length > 0;

            let exerciseIcon = '💪'; // default strength icon
            if (type === 'cardio') exerciseIcon = '🏃';
            if (type === 'hiit') exerciseIcon = '🔥';

            let exerciseDetails = '';

            if (type === 'strength') {
                const activeRestTimer = this.activeRestTimer === exercise.id;
                exerciseDetails = `
                    <div class="sets-list">
                        ${exercise.sets.map((set, index) => `
                            <div class="set-row">
                                <span class="set-number">Set ${index + 1}</span>
                                <span class="set-detail">${set.weight} ${set.unit || 'kg'} × ${set.reps} reps</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="rest-timer-section">
                        <div class="rest-timer-display ${activeRestTimer ? 'active' : ''}" id="rest-timer-${exercise.id}">
                            ${activeRestTimer ? `
                                <div class="timer-countdown">
                                    <div class="timer-time" id="timer-time-${exercise.id}">1:30</div>
                                    <div class="timer-label">Rest Time Remaining</div>
                                </div>
                                <button class="btn-secondary btn-sm" onclick="app.stopRestTimer(${exercise.id})">⏹ Stop</button>
                            ` : `
                                <div class="rest-timer-buttons">
                                    <button class="btn-secondary btn-sm" onclick="app.startRestTimer(${exercise.id}, 60)">60s</button>
                                    <button class="btn-secondary btn-sm" onclick="app.startRestTimer(${exercise.id}, 90)">90s</button>
                                    <button class="btn-secondary btn-sm" onclick="app.startRestTimer(${exercise.id}, 120)">2m</button>
                                    <button class="btn-secondary btn-sm" onclick="app.startRestTimer(${exercise.id}, 180)">3m</button>
                                </div>
                            `}
                        </div>
                    </div>
                `;
            } else if (type === 'cardio') {
                exerciseDetails = `
                    <div class="cardio-details">
                        <div class="detail-item">
                            <span class="detail-label">Duration</span>
                            <span class="detail-value">${exercise.duration} min</span>
                        </div>
                        ${exercise.distance ? `
                            <div class="detail-item">
                                <span class="detail-label">Distance</span>
                                <span class="detail-value">${exercise.distance} km</span>
                            </div>
                        ` : ''}
                        ${exercise.calories ? `
                            <div class="detail-item">
                                <span class="detail-label">Calories</span>
                                <span class="detail-value">${exercise.calories} kcal</span>
                            </div>
                        ` : ''}
                    </div>
                `;
            } else if (type === 'hiit') {
                exerciseDetails = `
                    <div class="cardio-details">
                        <div class="detail-item">
                            <span class="detail-label">Duration</span>
                            <span class="detail-value">${exercise.duration} min</span>
                        </div>
                        ${exercise.rounds ? `
                            <div class="detail-item">
                                <span class="detail-label">Rounds</span>
                                <span class="detail-value">${exercise.rounds}</span>
                            </div>
                        ` : ''}
                        ${exercise.calories ? `
                            <div class="detail-item">
                                <span class="detail-label">Calories</span>
                                <span class="detail-value">${exercise.calories} kcal</span>
                            </div>
                        ` : ''}
                    </div>
                `;
            }

            return `
                <div class="exercise-card ${type}-exercise">
                    <div class="exercise-header">
                        <h3>${exerciseIcon} ${exercise.name}</h3>
                        <div class="exercise-actions">
                            ${exercise.videoUrl ? `<button class="btn-icon-small" onclick="window.open('${exercise.videoUrl}', '_blank')" title="Watch Tutorial">🎥</button>` : ''}
                            ${hasHistory && type === 'strength' ? `<button class="btn-icon-small" onclick="app.toggleExerciseHistory(${exercise.id})" title="View Progress">📊</button>` : ''}
                            <button class="btn-icon-small" onclick="app.openAddExerciseModal(${exercise.id})" title="Edit">✏️</button>
                            <button class="btn-icon" onclick="app.deleteExercise(${exercise.id})">🗑️</button>
                        </div>
                    </div>
                    ${exerciseDetails}
                    ${hasHistory && type === 'strength' ? `
                        <div class="exercise-history" id="history-${exercise.id}" style="display: none;">
                            <div class="history-divider"></div>
                            <h4>Previous Workouts</h4>
                            ${history.slice(0, 3).map(h => {
                                const date = new Date(h.date);
                                const formattedDate = formatDateNZ(date, { month: 'short', day: 'numeric' });
                                const maxWeight = Math.max(...h.sets.map(s => parseInt(s.weight) || 0));
                                const totalReps = h.sets.reduce((sum, s) => sum + (parseInt(s.reps) || 0), 0);
                                const maxUnit = h.sets.find(s => s.unit)?.unit || 'kg';
                                return `
                                    <div class="history-item">
                                        <span class="history-date">${formattedDate}</span>
                                        <span class="history-stats">${h.sets.length} sets • Max: ${maxWeight}${maxUnit} • ${totalReps} reps</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }

    toggleExerciseHistory(exerciseId) {
        const historyEl = document.getElementById(`history-${exerciseId}`);
        if (historyEl) {
            historyEl.style.display = historyEl.style.display === 'none' ? 'block' : 'none';
        }
    }

    renderTodayCompletedWorkouts() {
        const displayDate = this.workingDate || null;
        const workouts = Storage.getAllWorkouts();
        const targetDate = displayDate ? new Date(displayDate) : new Date();
        const targetDateStr = targetDate.toDateString();

        // Get all workouts for today
        const todayWorkouts = workouts.filter(w => new Date(w.date).toDateString() === targetDateStr);

        const section = document.getElementById('todayCompletedSection');
        const container = document.getElementById('todayCompletedWorkouts');

        if (todayWorkouts.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';

        container.innerHTML = todayWorkouts.map(workout => {
            const workoutTime = new Date(workout.date).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });

            return `
                <div class="completed-workout-card">
                    <div class="completed-workout-header">
                        <span class="completed-workout-time">Completed at ${workoutTime}</span>
                        <span class="completed-workout-count">${workout.exercises.length} exercises</span>
                    </div>
                    <div class="completed-workout-exercises">
                        ${workout.exercises.map(ex => {
                            const type = ex.type || 'strength';
                            let details = '';

                            if (type === 'strength') {
                                const totalSets = ex.sets.length;
                                const totalVolume = ex.sets.reduce((sum, set) => sum + (set.weight * set.reps), 0);
                                details = `${totalSets} sets • ${totalVolume.toFixed(0)} kg total volume`;
                            } else if (type === 'cardio') {
                                details = `${ex.duration} min${ex.distance ? ` • ${ex.distance} km` : ''}`;
                            } else if (type === 'hiit') {
                                details = `${ex.rounds} rounds • ${ex.workSeconds}s work / ${ex.restSeconds}s rest`;
                            }

                            return `
                                <div class="completed-exercise-item">
                                    <strong>${ex.name}</strong>
                                    <span class="completed-exercise-details">${details}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    deleteExercise(exerciseId) {
        if (confirm('Delete this exercise?')) {
            this.currentWorkout.exercises = this.currentWorkout.exercises.filter(e => e.id !== exerciseId);
            Storage.saveCurrentWorkout(this.currentWorkout);
            this.renderCurrentWorkout();
        }
    }

    finishWorkout() {
        if (this.currentWorkout.exercises.length === 0) {
            alert('Add some exercises before finishing the workout');
            return;
        }

        if (confirm('Finish and save this workout?')) {
            // Stop any active rest timer
            if (this.restTimerInterval) {
                this.stopRestTimer(this.activeRestTimer);
            }

            // Pass the working date if editing a past date
            Storage.finishWorkout(this.workingDate);
            this.currentWorkout = Storage.getCurrentWorkout();
            this.renderCurrentWorkout();
            this.renderHistory();
            this.renderDashboard();

            const dateMsg = this.workingDate ? ' for ' + formatDateNZ(new Date(this.workingDate), { month: 'short', day: 'numeric' }) : '';
            alert(`Workout saved${dateMsg}!`);
        }
    }

    startRestTimer(exerciseId, seconds) {
        // Stop any existing timer first
        if (this.restTimerInterval) {
            this.stopRestTimer(this.activeRestTimer);
        }

        this.activeRestTimer = exerciseId;
        this.restTimerSeconds = seconds;

        this.renderCurrentWorkout();

        this.restTimerInterval = setInterval(() => {
            this.restTimerSeconds--;

            const minutes = Math.floor(this.restTimerSeconds / 60);
            const secs = this.restTimerSeconds % 60;
            const timeDisplay = `${minutes}:${secs.toString().padStart(2, '0')}`;

            const timeElement = document.getElementById(`timer-time-${exerciseId}`);
            if (timeElement) {
                timeElement.textContent = timeDisplay;

                // Change color as timer gets close to zero
                if (this.restTimerSeconds <= 10) {
                    timeElement.style.color = '#ef4444';
                } else if (this.restTimerSeconds <= 30) {
                    timeElement.style.color = '#f59e0b';
                } else {
                    timeElement.style.color = '#10b981';
                }
            }

            if (this.restTimerSeconds <= 0) {
                this.restTimerComplete(exerciseId);
            }
        }, 1000);
    }

    stopRestTimer(exerciseId) {
        if (this.restTimerInterval) {
            clearInterval(this.restTimerInterval);
            this.restTimerInterval = null;
        }
        this.activeRestTimer = null;
        this.restTimerSeconds = 0;
        this.renderCurrentWorkout();
    }

    startAutoRestTimer(exerciseId) {
        // Auto-start rest timer with default 90 seconds
        const defaultRestTime = 90;
        this.startRestTimer(exerciseId, defaultRestTime);

        // Show brief notification that timer started
        const exerciseName = this.currentWorkout.exercises.find(e => e.id === exerciseId)?.name || 'Exercise';
        console.log(`⏱️ Rest timer started for ${exerciseName} (${defaultRestTime}s)`);
    }

    restTimerComplete(exerciseId) {
        this.stopRestTimer(exerciseId);

        // Play notification sound and vibrate
        if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]);
        }

        // Show notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Rest Complete!', {
                body: 'Time for your next set',
                icon: '/icon-192.png',
                badge: '/icon-192.png',
                tag: 'rest-timer'
            });
        } else {
            alert('⏰ Rest Complete! Ready for next set?');
        }
    }

    // Modal Rest Timer Methods
    startModalRestTimer(seconds) {
        // Stop any existing modal timer first
        if (this.modalRestTimerInterval) {
            this.stopModalRestTimer();
        }

        this.modalRestTimerSeconds = seconds;
        this.modalRestTimerRunning = true;

        // Show countdown, hide buttons
        document.getElementById('modalTimerCountdown').style.display = 'block';
        document.getElementById('modalTimerButtons').style.display = 'none';
        document.getElementById('modalRestTimer').classList.add('active');

        this.modalRestTimerInterval = setInterval(() => {
            this.modalRestTimerSeconds--;

            const minutes = Math.floor(this.modalRestTimerSeconds / 60);
            const secs = this.modalRestTimerSeconds % 60;
            const timeDisplay = `${minutes}:${secs.toString().padStart(2, '0')}`;

            const timeElement = document.getElementById('modalTimerTime');
            if (timeElement) {
                timeElement.textContent = timeDisplay;

                // Change color as timer gets close to zero
                if (this.modalRestTimerSeconds <= 10) {
                    timeElement.style.color = '#ef4444';
                } else if (this.modalRestTimerSeconds <= 30) {
                    timeElement.style.color = '#f59e0b';
                } else {
                    timeElement.style.color = 'white';
                }
            }

            if (this.modalRestTimerSeconds <= 0) {
                this.modalRestTimerComplete();
            }
        }, 1000);
    }

    stopModalRestTimer() {
        if (this.modalRestTimerInterval) {
            clearInterval(this.modalRestTimerInterval);
            this.modalRestTimerInterval = null;
        }
        this.modalRestTimerRunning = false;
        this.modalRestTimerSeconds = 0;

        // Show buttons, hide countdown
        const countdown = document.getElementById('modalTimerCountdown');
        const buttons = document.getElementById('modalTimerButtons');
        const timer = document.getElementById('modalRestTimer');

        if (countdown) countdown.style.display = 'none';
        if (buttons) buttons.style.display = 'flex';
        if (timer) timer.classList.remove('active');
    }

    modalRestTimerComplete() {
        this.stopModalRestTimer();

        // Play notification sound and vibrate
        if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]);
        }

        // Show notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Rest Complete!', {
                body: 'Ready for your next set',
                icon: '/icon-192.png',
                badge: '/icon-192.png',
                tag: 'rest-timer'
            });
        } else {
            alert('⏰ Rest Complete! Ready for next set?');
        }
    }

    renderHistory() {
        const container = document.getElementById('historyList');
        const workouts = Storage.getAllWorkouts();

        if (workouts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-state-icon">📅</span>
                    <div class="empty-state-title">No Workout History</div>
                    <div class="empty-state-message">Complete your first workout to start tracking your fitness journey</div>
                    <button class="empty-state-cta" onclick="app.switchView('workout')">Start Workout</button>
                </div>
            `;
            return;
        }

        container.innerHTML = workouts.map(workout => {
            const date = new Date(workout.date);
            const formattedDate = formatDateNZ(date, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            const strengthCount = workout.exercises.filter(ex => !ex.type || ex.type === 'strength').length;
            const cardioCount = workout.exercises.filter(ex => ex.type === 'cardio').length;
            const hiitCount = workout.exercises.filter(ex => ex.type === 'hiit').length;

            let metaText = `${workout.exercises.length} exercises`;
            if (strengthCount > 0) metaText += ` • ${strengthCount} strength`;
            if (cardioCount > 0) metaText += ` • ${cardioCount} cardio`;
            if (hiitCount > 0) metaText += ` • ${hiitCount} HIIT`;

            return `
                <div class="history-card">
                    <div class="history-header">
                        <div>
                            <h3>${formattedDate}</h3>
                            <p class="history-meta">${metaText}</p>
                        </div>
                        <div class="exercise-actions">
                            <button class="btn-icon-small" onclick="app.resumeWorkout(${workout.id})" title="Resume Workout">↩️</button>
                            <button class="btn-icon" onclick="app.deleteWorkout(${workout.id})">🗑️</button>
                        </div>
                    </div>
                    <div class="history-exercises">
                        ${workout.exercises.map(ex => {
                            const type = ex.type || 'strength';
                            let icon = '💪';
                            if (type === 'cardio') icon = '🏃';
                            if (type === 'hiit') icon = '🔥';

                            let details = '';
                            if (type === 'strength') {
                                details = `${ex.sets.length} sets`;
                            } else if (type === 'cardio') {
                                details = `${ex.duration} min${ex.distance ? ` • ${ex.distance} km` : ''}`;
                            } else if (type === 'hiit') {
                                details = `${ex.duration} min${ex.rounds ? ` • ${ex.rounds} rounds` : ''}`;
                            }

                            return `
                                <div class="history-exercise">
                                    <strong>${icon} ${ex.name}</strong>
                                    <span>${details}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    deleteWorkout(workoutId) {
        if (confirm('Delete this workout from history?')) {
            Storage.deleteWorkout(workoutId);
            this.renderHistory();
        }
    }

    resumeWorkout(workoutId) {
        if (this.currentWorkout.exercises.length > 0) {
            if (!confirm('You have exercises in your current workout. Resuming this workout will replace them. Continue?')) {
                return;
            }
        }

        const workout = Storage.getWorkout(workoutId);
        if (!workout) {
            alert('Workout not found');
            return;
        }

        // Set as current workout
        this.currentWorkout = { exercises: workout.exercises };
        Storage.saveCurrentWorkout(this.currentWorkout);

        // Remove from history
        Storage.deleteWorkout(workoutId);

        // Switch to workout tab and refresh
        this.switchView('workout');
        this.renderCurrentWorkout();
        this.renderHistory();
    }

    renderRoutines() {
        const container = document.getElementById('routinesList');
        const routines = Storage.getAllRoutines();

        if (routines.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-state-icon">📋</span>
                    <div class="empty-state-title">No Saved Routines</div>
                    <div class="empty-state-message">Save your favorite workouts as routines for quick access</div>
                    <button class="empty-state-cta" onclick="app.switchView('workout')">Create Workout</button>
                </div>
            `;
            return;
        }

        container.innerHTML = routines.map(routine => {
            const routineHistory = Storage.getRoutineHistory(routine.id);
            const lastUsed = routineHistory.length > 0 ? routineHistory[0] : null;
            let lastUsedText = '';

            if (lastUsed) {
                const date = new Date(lastUsed.date);
                const now = new Date();
                const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

                if (diffDays === 0) {
                    lastUsedText = ' • Last used: Today';
                } else if (diffDays === 1) {
                    lastUsedText = ' • Last used: Yesterday';
                } else if (diffDays < 7) {
                    lastUsedText = ` • Last used: ${diffDays} days ago`;
                } else {
                    lastUsedText = ` • Last used: ${formatDateNZ(date, { month: 'short', day: 'numeric' })}`;
                }
            }

            return `
                <div class="routine-card">
                    <div class="routine-header">
                        <h3>${routine.name}</h3>
                        <button class="btn-icon" onclick="app.deleteRoutine(${routine.id})">🗑️</button>
                    </div>
                    <p class="routine-meta">${routine.exercises.length} exercises${lastUsedText}</p>
                    <div class="routine-exercises">
                        ${routine.exercises.map(ex => `<span class="routine-exercise-tag">${ex.name}</span>`).join('')}
                    </div>
                    <button class="btn-secondary full-width" onclick="app.loadRoutineToWorkout(${routine.id})">
                        Load Routine
                    </button>
                </div>
            `;
        }).join('');
    }

    openCreateRoutineModal() {
        document.getElementById('routineNameInput').value = '';

        // Setup tab listeners
        document.querySelectorAll('.routine-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.routine-tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.renderRoutineExerciseSelection(e.target.dataset.source);
            });
        });

        // Render current workout exercises by default
        this.renderRoutineExerciseSelection('current');

        document.getElementById('createRoutineModal').classList.add('active');
        document.getElementById('routineNameInput').focus();
    }

    renderRoutineExerciseSelection(source) {
        const container = document.getElementById('routineExerciseSelection');

        if (source === 'current') {
            if (this.currentWorkout.exercises.length === 0) {
                container.innerHTML = '<p class="empty-state-small">No exercises in current workout. Add some exercises first!</p>';
                return;
            }

            container.innerHTML = `
                <div class="workout-group-header">
                    <span>Current Workout</span>
                    <button class="select-all-btn" onclick="app.toggleSelectAll('current')">Select All</button>
                </div>
                ${this.currentWorkout.exercises.map(exercise => {
                    const type = exercise.type || 'strength';
                    let details = '';
                    if (type === 'strength') {
                        details = `${exercise.sets.length} sets`;
                    } else if (type === 'cardio') {
                        details = `${exercise.duration} min cardio`;
                    } else if (type === 'hiit') {
                        details = `${exercise.duration} min HIIT`;
                    }

                    return `
                        <div class="exercise-select-item" data-exercise-id="${exercise.id}" onclick="app.toggleExerciseSelection(${exercise.id})">
                            <input type="checkbox" class="exercise-checkbox" data-exercise-id="${exercise.id}" checked>
                            <div class="exercise-select-info">
                                <span class="exercise-select-name">${exercise.name}</span>
                                <span class="exercise-select-details">${details}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            `;
        } else if (source === 'history') {
            const workouts = Storage.getAllWorkouts();

            if (workouts.length === 0) {
                container.innerHTML = '<p class="empty-state-small">No workout history yet.</p>';
                return;
            }

            container.innerHTML = workouts.map(workout => {
                const date = new Date(workout.date);
                const formattedDate = formatDateNZ(date, { month: 'short', day: 'numeric', year: 'numeric' });

                return `
                    <div class="workout-group-header">
                        <span>${formattedDate}</span>
                        <button class="select-all-btn" onclick="app.toggleSelectAll('workout-${workout.id}')">Select All</button>
                    </div>
                    ${workout.exercises.map(exercise => {
                        const type = exercise.type || 'strength';
                        let details = '';
                        if (type === 'strength') {
                            details = `${exercise.sets.length} sets`;
                        } else if (type === 'cardio') {
                            details = `${exercise.duration} min cardio`;
                        } else if (type === 'hiit') {
                            details = `${exercise.duration} min HIIT`;
                        }

                        const uniqueId = `${workout.id}-${exercise.id}`;
                        return `
                            <div class="exercise-select-item" data-exercise-id="${uniqueId}" data-workout-id="${workout.id}" onclick="app.toggleExerciseSelection('${uniqueId}')">
                                <input type="checkbox" class="exercise-checkbox" data-exercise-id="${uniqueId}">
                                <div class="exercise-select-info">
                                    <span class="exercise-select-name">${exercise.name}</span>
                                    <span class="exercise-select-details">${details}</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                `;
            }).join('');
        }
    }

    toggleExerciseSelection(exerciseId) {
        const item = document.querySelector(`.exercise-select-item[data-exercise-id="${exerciseId}"]`);
        const checkbox = item.querySelector('.exercise-checkbox');

        checkbox.checked = !checkbox.checked;

        if (checkbox.checked) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    }

    toggleSelectAll(groupId) {
        if (groupId === 'current') {
            const checkboxes = document.querySelectorAll('#routineExerciseSelection .exercise-checkbox');
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);

            checkboxes.forEach(cb => {
                cb.checked = !allChecked;
                const item = cb.closest('.exercise-select-item');
                if (cb.checked) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
        } else if (groupId.startsWith('workout-')) {
            const workoutId = parseInt(groupId.split('-')[1]);
            const checkboxes = document.querySelectorAll(`.exercise-select-item[data-workout-id="${workoutId}"] .exercise-checkbox`);
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);

            checkboxes.forEach(cb => {
                cb.checked = !allChecked;
                const item = cb.closest('.exercise-select-item');
                if (cb.checked) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
        }
    }

    saveRoutine() {
        const name = document.getElementById('routineNameInput').value.trim();

        if (!name) {
            alert('Please enter a routine name');
            return;
        }

        // Collect selected exercises
        const selectedCheckboxes = document.querySelectorAll('#routineExerciseSelection .exercise-checkbox:checked');

        if (selectedCheckboxes.length === 0) {
            alert('Please select at least one exercise');
            return;
        }

        const selectedExercises = [];
        const activeTab = document.querySelector('.routine-tab-btn.active').dataset.source;

        selectedCheckboxes.forEach(checkbox => {
            const exerciseId = checkbox.dataset.exerciseId;

            if (activeTab === 'current') {
                // Get from current workout
                const exercise = this.currentWorkout.exercises.find(e => e.id == exerciseId);
                if (exercise) {
                    selectedExercises.push({ ...exercise });
                }
            } else {
                // Get from history
                const [workoutId, exId] = exerciseId.split('-');
                const workouts = Storage.getAllWorkouts();
                const workout = workouts.find(w => w.id == workoutId);
                if (workout) {
                    const exercise = workout.exercises.find(e => e.id == exId);
                    if (exercise) {
                        selectedExercises.push({ ...exercise });
                    }
                }
            }
        });

        Storage.saveRoutine(name, selectedExercises);
        this.closeModal('createRoutineModal');
        this.renderRoutines();
        alert('Routine saved!');
    }

    deleteRoutine(routineId) {
        if (confirm('Delete this routine?')) {
            Storage.deleteRoutine(routineId);
            this.renderRoutines();
        }
    }

    openLoadRoutineModal() {
        const routines = Storage.getAllRoutines();

        if (routines.length === 0) {
            alert('No routines available. Create a routine first!');
            return;
        }

        const container = document.getElementById('loadRoutineList');
        container.innerHTML = routines.map(routine => {
            const routineHistory = Storage.getRoutineHistory(routine.id);
            const lastUsed = routineHistory.length > 0 ? routineHistory[0] : null;

            let historyPreview = '';
            if (lastUsed) {
                const date = new Date(lastUsed.date);
                const formattedDate = formatDateNZ(date, { month: 'short', day: 'numeric' });

                historyPreview = `
                    <div class="routine-history-preview">
                        <strong>Last used: ${formattedDate}</strong>
                        ${lastUsed.exercises.slice(0, 3).map(ex => {
                            if (ex.type === 'strength' || !ex.type) {
                                const maxWeight = Math.max(...ex.sets.map(s => parseFloat(s.weight) || 0));
                                const unit = ex.sets[0]?.unit || 'kg';
                                return `<div class="history-preview-item">${ex.name}: ${maxWeight}${unit} max</div>`;
                            } else if (ex.type === 'cardio') {
                                return `<div class="history-preview-item">${ex.name}: ${ex.duration} min</div>`;
                            } else if (ex.type === 'hiit') {
                                return `<div class="history-preview-item">${ex.name}: ${ex.duration} min HIIT</div>`;
                            }
                        }).join('')}
                    </div>
                `;
            }

            return `
                <div class="load-routine-item" onclick="app.loadRoutineToWorkout(${routine.id})">
                    <h4>${routine.name}</h4>
                    <p>${routine.exercises.length} exercises</p>
                    ${historyPreview}
                </div>
            `;
        }).join('');

        document.getElementById('loadRoutineModal').classList.add('active');
    }

    loadRoutineToWorkout(routineId) {
        // No confirmation needed - loadRoutine now appends instead of replacing
        const workout = Storage.loadRoutine(routineId);
        if (workout) {
            this.currentWorkout = workout;
            this.renderCurrentWorkout();
            this.closeModal('loadRoutineModal');
            this.switchView('workout');

            // Show success message
            const routine = Storage.getAllRoutines().find(r => r.id === routineId);
            if (routine) {
                alert(`✅ Added ${routine.exercises.length} exercises from "${routine.name}"!`);
            }
        }
    }

    // Quick Start Features
    repeatLastWorkout() {
        const workouts = Storage.getAllWorkouts();
        if (workouts.length === 0) {
            alert('No previous workouts found');
            return;
        }

        const lastWorkout = workouts[0];

        if (confirm(`Repeat your last workout from ${formatDateNZ(new Date(lastWorkout.date), { month: 'short', day: 'numeric' })} with ${lastWorkout.exercises.length} exercises?`)) {
            // Copy exercises from last workout to current workout
            lastWorkout.exercises.forEach(ex => {
                const exercise = {
                    id: Date.now() + Math.random(),
                    name: ex.name,
                    sets: ex.sets.map(set => ({...set})) // Deep copy sets
                };
                this.currentWorkout.exercises.push(exercise);
            });

            Storage.saveCurrentWorkout(this.currentWorkout);
            this.renderCurrentWorkout();
            alert(`✅ Added ${lastWorkout.exercises.length} exercises from your last workout!`);
        }
    }

    showFavoriteExercises() {
        // Analyze workout history to find most frequent exercises
        const workouts = Storage.getAllWorkouts();
        const exerciseCount = {};

        workouts.forEach(workout => {
            workout.exercises.forEach(ex => {
                exerciseCount[ex.name] = (exerciseCount[ex.name] || 0) + 1;
            });
        });

        // Sort by frequency and get top 10
        const favorites = Object.entries(exerciseCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        if (favorites.length === 0) {
            alert('No favorite exercises found. Complete some workouts first!');
            return;
        }

        // Show modal with favorites
        const message = `Your most frequent exercises:\n\n${favorites.map((([name, count], i) => `${i + 1}. ${name} (${count}x)`)).join('\n')}\n\nEnter the number to add to your workout:`;

        const choice = prompt(message);
        if (choice) {
            const index = parseInt(choice) - 1;
            if (index >= 0 && index < favorites.length) {
                const exerciseName = favorites[index][0];

                // Find a recent example of this exercise to copy sets
                let exampleSets = null;
                for (const workout of workouts) {
                    const foundEx = workout.exercises.find(ex => ex.name === exerciseName);
                    if (foundEx) {
                        exampleSets = foundEx.sets;
                        break;
                    }
                }

                // Add exercise to current workout
                const exercise = {
                    id: Date.now(),
                    name: exerciseName,
                    sets: exampleSets ? exampleSets.map(set => ({...set})) : [{ weight: 0, reps: 0 }]
                };

                this.currentWorkout.exercises.push(exercise);
                Storage.saveCurrentWorkout(this.currentWorkout);
                this.renderCurrentWorkout();
                alert(`✅ Added "${exerciseName}" to your workout!`);
            } else {
                alert('Invalid choice');
            }
        }
    }

    openTimerModal(exerciseName = null, restTime = 90) {
        // Store current exercise context for timer
        this.currentTimerExercise = exerciseName;
        this.timerSeconds = restTime;

        // Show exercise name if provided
        if (exerciseName) {
            document.getElementById('timerExerciseName').textContent = `Rest after ${exerciseName}`;
            document.getElementById('timerExerciseName').style.display = 'block';
        } else {
            document.getElementById('timerExerciseName').style.display = 'none';
        }

        this.pauseTimer();
        this.updateTimerDisplay();
        document.getElementById('timerModal').classList.add('active');
    }

    toggleTimer() {
        if (this.timerRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.timerRunning = true;
        document.getElementById('startTimerBtn').textContent = 'Pause';

        this.timerInterval = setInterval(() => {
            this.timerSeconds--;
            this.updateTimerDisplay();

            if (this.timerSeconds <= 0) {
                this.timerComplete();
            }
        }, 1000);
    }

    pauseTimer() {
        this.timerRunning = false;
        document.getElementById('startTimerBtn').textContent = 'Start';
        clearInterval(this.timerInterval);
    }

    resetTimer() {
        this.pauseTimer();
        this.timerSeconds = 90;
        this.updateTimerDisplay();
    }

    extendTimer(seconds) {
        this.timerSeconds += seconds;
        this.updateTimerDisplay();
        // Auto-start if not running
        if (!this.timerRunning) {
            this.startTimer();
        }
    }

    skipTimer() {
        this.pauseTimer();
        this.closeModal('timerModal');
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timerSeconds / 60);
        const seconds = this.timerSeconds % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timerDisplay').textContent = display;
    }

    timerComplete() {
        this.pauseTimer();
        this.timerSeconds = 90;
        this.updateTimerDisplay();

        // Try to play notification sound
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Rest Timer Complete!', {
                body: this.currentTimerExercise ? `Ready for next set of ${this.currentTimerExercise}` : 'Time to start your next set',
                icon: '/icon-192.png'
            });
        }

        alert('Rest time complete!');
        this.closeModal('timerModal');
    }

    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');

        // Stop modal rest timer if closing exercise modal
        if (modalId === 'addExerciseModal' && this.modalRestTimerRunning) {
            this.stopModalRestTimer();
        }
    }

    // Food tracking methods
    openAddFoodModal(mealType, foodId = null) {
        this.editingFoodId = foodId;
        const isEditing = foodId !== null;

        // Format meal type name for display
        const mealNames = {
            'breakfast': 'Breakfast',
            'midmorning': 'Mid Morning',
            'lunch': 'Lunch',
            'preworkout': 'Pre Workout',
            'postworkout': 'Post Workout',
            'dinner': 'Dinner'
        };

        if (isEditing) {
            // Get the food item from storage
            const todayFood = Storage.getTodayFood();
            const foodItem = todayFood.meals.find(m => m.id === foodId);

            if (!foodItem) return;

            this.currentMealType = foodItem.mealType;
            document.getElementById('foodModalTitle').textContent = `Edit ${mealNames[foodItem.mealType] || foodItem.mealType}`;

            // Parse quantity from name if it exists (e.g., "2x Egg Whole")
            let name = foodItem.name;
            let quantity = 1;
            const quantityMatch = name.match(/^(\d+(?:\.\d+)?)x\s+(.+)$/);
            if (quantityMatch) {
                quantity = parseFloat(quantityMatch[1]);
                name = quantityMatch[2];
            }

            // Calculate per-serving values
            const perServingCalories = Math.round(parseFloat(foodItem.calories) / quantity);
            const perServingProtein = Math.round((parseFloat(foodItem.protein) / quantity) * 10) / 10;
            const perServingCarbs = Math.round((parseFloat(foodItem.carbs) / quantity) * 10) / 10;
            const perServingFats = Math.round((parseFloat(foodItem.fats) / quantity) * 10) / 10;

            document.getElementById('foodNameInput').value = name;
            document.getElementById('quantityInput').value = quantity.toString();
            document.getElementById('caloriesInput').value = perServingCalories.toString();
            document.getElementById('proteinInput').value = perServingProtein.toString();
            document.getElementById('carbsInput').value = perServingCarbs.toString();
            document.getElementById('fatsInput').value = perServingFats.toString();

            // Update save button text
            const saveBtn = document.getElementById('saveFoodBtn');
            if (saveBtn) {
                saveBtn.textContent = 'Update Food';
            }
        } else {
            this.currentMealType = mealType;
            document.getElementById('foodModalTitle').textContent = `Add ${mealNames[mealType] || mealType}`;
            document.getElementById('foodNameInput').value = '';
            document.getElementById('quantityInput').value = '1';
            document.getElementById('caloriesInput').value = '';
            document.getElementById('proteinInput').value = '';
            document.getElementById('carbsInput').value = '';
            document.getElementById('fatsInput').value = '';

            // Update save button text
            const saveBtn = document.getElementById('saveFoodBtn');
            if (saveBtn) {
                saveBtn.textContent = 'Save Food';
            }
        }

        document.getElementById('foodSuggestions').innerHTML = '';
        document.getElementById('foodSuggestions').classList.remove('active');
        document.getElementById('addFoodModal').classList.add('active');

        // Setup autocomplete
        this.setupFoodAutocomplete();
        document.getElementById('foodNameInput').focus();
    }

    setupFoodAutocomplete() {
        const input = document.getElementById('foodNameInput');
        const suggestionsContainer = document.getElementById('foodSuggestions');

        // Remove existing listeners if any
        input.removeEventListener('input', this.handleFoodSearch);

        // Add input listener
        input.addEventListener('input', (e) => {
            const query = e.target.value.trim();

            if (query.length < 2) {
                suggestionsContainer.classList.remove('active');
                suggestionsContainer.innerHTML = '';
                return;
            }

            const results = searchFoods(query);

            if (results.length === 0) {
                suggestionsContainer.classList.remove('active');
                suggestionsContainer.innerHTML = '';
                return;
            }

            suggestionsContainer.innerHTML = results.map(food => `
                <div class="food-suggestion-item" data-food='${JSON.stringify(food)}'>
                    <span class="food-suggestion-category">${food.category}</span>
                    <span class="food-suggestion-name">${food.name}${food.recipe ? ' 📖' : ''}</span>
                    <div class="food-suggestion-info">
                        ${food.calories} cal • P: ${food.protein}g • C: ${food.carbs}g • F: ${food.fats}g
                        ${food.serving ? ` • ${food.serving}` : ''}
                    </div>
                </div>
            `).join('');

            suggestionsContainer.classList.add('active');

            // Add click listeners to suggestions
            suggestionsContainer.querySelectorAll('.food-suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    const food = JSON.parse(item.dataset.food);
                    this.selectFood(food);
                });
            });
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.food-search-container')) {
                suggestionsContainer.classList.remove('active');
            }
        });
    }

    selectFood(food) {
        document.getElementById('foodNameInput').value = food.name;
        document.getElementById('caloriesInput').value = food.calories;
        document.getElementById('proteinInput').value = food.protein;
        document.getElementById('carbsInput').value = food.carbs;
        document.getElementById('fatsInput').value = food.fats;
        document.getElementById('foodSuggestions').classList.remove('active');
        document.getElementById('foodSuggestions').innerHTML = '';

        // Store recipe if available and show it
        if (food.recipe) {
            this.showFoodRecipe(food.name, food.recipe, food.serving);
        }
    }

    showFoodRecipe(foodName, recipe, serving) {
        // Check if recipe display already exists, if not create it
        let recipeDisplay = document.getElementById('foodRecipeDisplay');
        if (!recipeDisplay) {
            recipeDisplay = document.createElement('div');
            recipeDisplay.id = 'foodRecipeDisplay';
            recipeDisplay.className = 'food-recipe-display';

            // Insert after food name input
            const foodNameInput = document.getElementById('foodNameInput').closest('.food-search-container');
            foodNameInput.parentNode.insertBefore(recipeDisplay, foodNameInput.nextSibling);
        }

        recipeDisplay.innerHTML = `
            <div class="recipe-header">
                <strong>📖 ${foodName}</strong>
                <span class="recipe-serving">${serving || 'Per serving'}</span>
            </div>
            <div class="recipe-content">
                ${recipe.replace(/\n/g, '<br>')}
            </div>
        `;
        recipeDisplay.style.display = 'block';
    }

    saveFood() {
        const name = document.getElementById('foodNameInput').value.trim();
        const quantity = parseFloat(document.getElementById('quantityInput').value) || 1;
        const calories = parseFloat(document.getElementById('caloriesInput').value) || 0;
        const protein = parseFloat(document.getElementById('proteinInput').value) || 0;
        const carbs = parseFloat(document.getElementById('carbsInput').value) || 0;
        const fats = parseFloat(document.getElementById('fatsInput').value) || 0;

        if (!name) {
            alert('Please enter a food name');
            return;
        }

        if (!calories && !protein && !carbs && !fats) {
            alert('Please enter at least calories or macros');
            return;
        }

        // Calculate total values based on quantity
        const totalCalories = Math.round(calories * quantity);
        const totalProtein = Math.round(protein * quantity * 10) / 10;
        const totalCarbs = Math.round(carbs * quantity * 10) / 10;
        const totalFats = Math.round(fats * quantity * 10) / 10;

        // Add quantity indicator to name if quantity > 1
        const displayName = quantity > 1 ? `${quantity}x ${name}` : name;

        const foodItem = {
            name: displayName,
            calories: totalCalories.toString(),
            protein: totalProtein.toString(),
            carbs: totalCarbs.toString(),
            fats: totalFats.toString()
        };

        // Add photo if one was selected
        if (this.currentFoodPhoto) {
            foodItem.photo = this.currentFoodPhoto;
        }

        const isEditing = this.editingFoodId !== null;

        if (isEditing) {
            // Update existing food item
            foodItem.id = this.editingFoodId;
            foodItem.mealType = this.currentMealType;
            Storage.updateFoodItem(this.editingFoodId, foodItem);
            this.editingFoodId = null;
        } else {
            // Add new food item - pass working date if editing past date
            Storage.addFoodItem(this.currentMealType, foodItem, this.workingDate);
        }

        // Clear food photo
        this.currentFoodPhoto = null;
        document.getElementById('foodPhotoInput').value = '';
        document.getElementById('foodPhotoPreview').style.display = 'none';

        this.renderFood();
        this.renderDashboard();
        this.closeModal('addFoodModal');
    }

    editFood(foodId) {
        this.openAddFoodModal(null, foodId);
    }

    handleFoodPhotoSelection(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Photo size must be less than 5MB');
            event.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentFoodPhoto = e.target.result;
            document.getElementById('foodPhotoPreviewImg').src = e.target.result;
            document.getElementById('foodPhotoPreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    removeFoodPhoto() {
        this.currentFoodPhoto = null;
        document.getElementById('foodPhotoInput').value = '';
        document.getElementById('foodPhotoPreview').style.display = 'none';
    }

    renderFood() {
        // Use workingDate if set, otherwise use today
        const displayDate = this.workingDate || null;

        const todayFood = Storage.getTodayFood(displayDate);
        const stats = Storage.getFoodStats(displayDate);
        const goals = Storage.getNutritionGoals();

        // Update nutrition stats with goals and progress
        this.updateNutritionStat('calories', stats.totalCalories, goals.calories);
        this.updateNutritionStat('protein', stats.totalProtein, goals.protein);
        this.updateNutritionStat('carbs', stats.totalCarbs, goals.carbs);
        this.updateNutritionStat('fats', stats.totalFats, goals.fats);

        // Update daily totals summary at the bottom
        document.getElementById('totalCaloriesValue').textContent = stats.totalCalories;
        document.getElementById('totalProteinValue').textContent = stats.totalProtein + 'g';
        document.getElementById('totalCarbsValue').textContent = stats.totalCarbs + 'g';
        document.getElementById('totalFatsValue').textContent = stats.totalFats + 'g';

        // Render each meal type
        ['breakfast', 'midmorning', 'lunch', 'preworkout', 'postworkout', 'dinner'].forEach(mealType => {
            const meals = todayFood.meals.filter(m => m.mealType === mealType);
            const container = document.getElementById(`${mealType}List`);

            if (meals.length === 0) {
                container.innerHTML = '<p class="empty-state-small">No items yet</p>';
                return;
            }

            container.innerHTML = meals.map(meal => `
                <div class="food-item">
                    ${meal.photo ? `<img src="${meal.photo}" class="food-photo-thumb" onclick="app.viewFoodPhoto('${meal.photo}')" title="Click to view full size">` : ''}
                    <div class="food-item-info">
                        <strong>${meal.name}</strong>
                        <span class="food-macros">${meal.calories} cal • P: ${meal.protein}g • C: ${meal.carbs}g • F: ${meal.fats}g</span>
                    </div>
                    <div class="food-item-actions">
                        <button class="btn-icon-small" onclick="app.editFood(${meal.id})" title="Edit">✏️</button>
                        <button class="btn-icon" onclick="app.deleteFood(${meal.id})">🗑️</button>
                    </div>
                </div>
            `).join('');
        });

        // Render water tracker
        this.renderWaterTracker();
    }

    deleteFood(foodId) {
        if (confirm('Delete this food item?')) {
            Storage.deleteFoodItem(foodId);
            this.renderFood();
        }
    }

    viewFoodPhoto(photoData) {
        // Create a simple modal to view the food photo
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 1rem;';

        const img = document.createElement('img');
        img.src = photoData;
        img.style.cssText = 'max-width: 100%; max-height: 100%; border-radius: 8px;';

        overlay.appendChild(img);
        overlay.onclick = () => document.body.removeChild(overlay);

        document.body.appendChild(overlay);
    }

    updateNutritionStat(nutrientType, consumed, goal) {
        const consumedEl = document.getElementById(`${nutrientType}Consumed`);
        const goalEl = document.getElementById(`${nutrientType}Goal`);
        const progressEl = document.getElementById(`${nutrientType}Progress`);
        const remainingEl = document.getElementById(`${nutrientType}Remaining`);

        if (!consumedEl || !goalEl || !progressEl || !remainingEl) return;

        consumedEl.textContent = consumed;
        goalEl.textContent = goal;

        const percentage = Math.min((consumed / goal) * 100, 100);
        progressEl.style.width = percentage + '%';

        const remaining = goal - consumed;
        if (remaining > 0) {
            remainingEl.textContent = `${remaining.toFixed(0)} remaining`;
            remainingEl.classList.remove('over-goal');
        } else {
            remainingEl.textContent = `${Math.abs(remaining).toFixed(0)} over goal`;
            remainingEl.classList.add('over-goal');
        }
    }

    openNutritionGoalsModal() {
        const goals = Storage.getNutritionGoals();

        document.getElementById('caloriesGoalInput').value = goals.calories;
        document.getElementById('proteinGoalInput').value = goals.protein;
        document.getElementById('carbsGoalInput').value = goals.carbs;
        document.getElementById('fatsGoalInput').value = goals.fats;

        this.openModal('nutritionGoalsModal');
    }

    saveNutritionGoals() {
        const calories = parseFloat(document.getElementById('caloriesGoalInput').value);
        const protein = parseFloat(document.getElementById('proteinGoalInput').value);
        const carbs = parseFloat(document.getElementById('carbsGoalInput').value);
        const fats = parseFloat(document.getElementById('fatsGoalInput').value);

        if (!calories || !protein || !carbs || !fats) {
            alert('Please fill in all nutrition goals');
            return;
        }

        if (calories < 1000 || calories > 5000) {
            alert('Calories should be between 1000 and 5000');
            return;
        }

        if (protein < 50 || protein > 500) {
            alert('Protein should be between 50g and 500g');
            return;
        }

        if (carbs < 50 || carbs > 600) {
            alert('Carbs should be between 50g and 600g');
            return;
        }

        if (fats < 20 || fats > 200) {
            alert('Fats should be between 20g and 200g');
            return;
        }

        Storage.setNutritionGoals(calories, protein, carbs, fats);
        this.closeModal('nutritionGoalsModal');
        this.renderFood();
        this.showNotification('Nutrition goals updated successfully!');
    }

    openFoodHistoryModal() {
        const allDays = Storage.getAllFoodDays();
        const container = document.getElementById('foodHistoryList');

        if (allDays.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-state-icon">🍽️</span>
                    <div class="empty-state-title">No Food Logged</div>
                    <div class="empty-state-message">Start tracking your nutrition to reach your goals</div>
                    <button class="empty-state-cta" onclick="app.switchView('food')">Log Food</button>
                </div>
            `;
        } else {
            container.innerHTML = allDays.map(day => {
                const date = new Date(day.date);
                const formattedDate = formatDateNZ(date, {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });

                const stats = Storage.getFoodStats(day.date);

                return `
                    <div class="food-history-card">
                        <h3>${formattedDate}</h3>
                        <div class="food-history-stats">
                            <span>${stats.totalCalories} cal</span>
                            <span>P: ${stats.totalProtein}g</span>
                            <span>C: ${stats.totalCarbs}g</span>
                            <span>F: ${stats.totalFats}g</span>
                        </div>
                        <p class="food-history-meta">${stats.mealCount} items</p>
                    </div>
                `;
            }).join('');
        }

        document.getElementById('foodHistoryModal').classList.add('active');
    }

    openCreateFoodRoutineModal() {
        const todayFood = Storage.getTodayFood();

        if (todayFood.meals.length === 0) {
            alert('Add some food items to your diary before creating a routine');
            return;
        }

        document.getElementById('foodRoutineNameInput').value = '';
        document.getElementById('createFoodRoutineModal').classList.add('active');
        document.getElementById('foodRoutineNameInput').focus();
    }

    saveFoodRoutine() {
        const name = document.getElementById('foodRoutineNameInput').value.trim();

        if (!name) {
            alert('Please enter a routine name');
            return;
        }

        const todayFood = Storage.getTodayFood();

        if (todayFood.meals.length === 0) {
            alert('No food items to save');
            return;
        }

        Storage.saveFoodRoutine(name, todayFood.meals);
        this.closeModal('createFoodRoutineModal');
        alert('Food routine saved!');
    }

    openLoadFoodRoutineModal() {
        const routines = Storage.getAllFoodRoutines();

        if (routines.length === 0) {
            alert('No food routines available. Create a routine first!');
            return;
        }

        const container = document.getElementById('loadFoodRoutineList');
        container.innerHTML = routines.map(routine => {
            const totalCalories = routine.meals.reduce((sum, m) => sum + (parseInt(m.calories) || 0), 0);
            const totalProtein = routine.meals.reduce((sum, m) => sum + (parseInt(m.protein) || 0), 0);
            const mealTypesCount = [...new Set(routine.meals.map(m => m.mealType))].length;

            return `
                <div class="load-routine-item" onclick="app.loadFoodRoutineToToday(${routine.id})">
                    <h4>${routine.name}</h4>
                    <p>${routine.meals.length} items • ${mealTypesCount} meals</p>
                    <div class="routine-history-preview">
                        <strong>${totalCalories} cal • P: ${totalProtein}g</strong>
                    </div>
                    <button class="btn-icon" onclick="event.stopPropagation(); app.deleteFoodRoutine(${routine.id})" style="position: absolute; top: 0.75rem; right: 0.75rem;">🗑️</button>
                </div>
            `;
        }).join('');

        document.getElementById('loadFoodRoutineModal').classList.add('active');
    }

    loadFoodRoutineToToday(routineId) {
        // No confirmation needed - loadFoodRoutine now appends instead of replacing
        // Pass workingDate if editing a past date
        Storage.loadFoodRoutine(routineId, this.workingDate);
        this.renderFood();
        this.renderDashboard(); // Update dashboard as well
        this.closeModal('loadFoodRoutineModal');

        // Show success message
        const routine = Storage.getAllFoodRoutines().find(r => r.id === routineId);
        if (routine) {
            alert(`✅ Added ${routine.meals.length} items from "${routine.name}"!`);
        }
    }

    deleteFoodRoutine(routineId) {
        if (confirm('Delete this food routine?')) {
            Storage.deleteFoodRoutine(routineId);
            this.openLoadFoodRoutineModal(); // Refresh the list
        }
    }

    // Settings and Date Banner
    updateDateBanner() {
        // Check if we're editing a past date
        const displayDate = this.workingDate ? new Date(this.workingDate) : getCurrentDateNZ();
        const today = getCurrentDateNZ();
        const isEditingPast = this.workingDate && displayDate.toDateString() !== today.toDateString();

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = formatDateNZ(displayDate, options);

        const dateDisplay = document.getElementById('currentDateDisplay');
        if (isEditingPast) {
            dateDisplay.innerHTML = `📝 Editing: ${formattedDate} <span style="font-size: 0.85rem; opacity: 0.8;">(tap to return to today)</span>`;
            dateDisplay.style.cursor = 'pointer';
            dateDisplay.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        } else {
            dateDisplay.textContent = formattedDate;
            dateDisplay.style.cursor = 'default';
            dateDisplay.style.background = '';
        }

        // Update journey day
        const startDate = Storage.getStartDate();
        const journeyDisplay = document.getElementById('journeyDayDisplay');

        if (startDate) {
            // Use NZ timezone for calculations
            const start = new Date(startDate);
            const current = this.workingDate ? new Date(this.workingDate) : new Date(new Date().toLocaleString('en-US', { timeZone: 'Pacific/Auckland' }));

            // Calculate date difference at midnight NZ time
            const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate());
            const currentMidnight = new Date(current.getFullYear(), current.getMonth(), current.getDate());

            const diffTime = currentMidnight - startMidnight;
            const daysSinceStart = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 because day 1 is the start date
            journeyDisplay.textContent = `Day ${daysSinceStart}`;
        } else {
            journeyDisplay.textContent = 'Set your start date';
        }
    }

    returnToToday() {
        this.workingDate = null;
        this.updateDateBanner();
        this.renderDashboard();
    }

    openSettingsModal() {
        // Load current start date if exists
        const startDate = Storage.getStartDate();
        const startDateInput = document.getElementById('startDateInput');

        if (startDate) {
            startDateInput.value = startDate;
        }

        // Load weight goal if exists
        const weightGoal = Storage.getWeightGoal();
        if (weightGoal.startingWeight) {
            document.getElementById('startingWeightInput').value = weightGoal.startingWeight;
        }
        if (weightGoal.goalWeight) {
            document.getElementById('goalWeightInput').value = weightGoal.goalWeight;
        }

        // Load dark mode state
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.checked = this.isDarkMode();
        }

        // Update journey info
        this.updateJourneyInfo();

        // Update weight goal info
        this.updateWeightGoalInfo();

        // Render auto-backups list
        this.renderAutoBackups();

        // Display cache version
        this.displayCacheVersion();

        document.getElementById('settingsModal').classList.add('active');
        startDateInput.focus();
    }

    async displayCacheVersion() {
        const cacheDisplay = document.getElementById('cacheVersionDisplay');
        try {
            const cacheNames = await caches.keys();
            const currentCache = cacheNames.find(name => name.startsWith('suresh-aesthetics'));
            if (currentCache) {
                const version = currentCache.split('-v')[1];
                cacheDisplay.textContent = `v${version}`;
                if (version !== '72') {
                    cacheDisplay.style.color = '#ef4444';
                    cacheDisplay.textContent += ' (outdated - please clear cache)';
                } else {
                    cacheDisplay.style.color = '#10b981';
                }
            } else {
                cacheDisplay.textContent = 'none';
            }
        } catch (error) {
            cacheDisplay.textContent = 'unknown';
        }
    }

    async clearCacheAndReload() {
        try {
            // Unregister all service workers
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const registration of registrations) {
                await registration.unregister();
            }

            // Clear all caches
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(name => caches.delete(name)));

            alert('Cache cleared successfully! The app will now reload with the latest version.');

            // Reload the page
            window.location.reload(true);
        } catch (error) {
            console.error('Error clearing cache:', error);
            alert('Error clearing cache. Try manually refreshing the page (Ctrl+Shift+R or Cmd+Shift+R).');
        }
    }

    updateJourneyInfo() {
        const startDate = Storage.getStartDate();
        const journeyInfo = document.getElementById('journeyInfo');

        if (startDate) {
            const daysSinceStart = Storage.getDaysSinceStart();
            const start = new Date(startDate);
            const formattedStart = formatDateNZ(start, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            journeyInfo.innerHTML = `
                <p><strong>Journey Started:</strong> ${formattedStart}</p>
                <p><strong>Days Completed:</strong> ${daysSinceStart} days</p>
                <p>Keep going! You're making progress every day! 💪</p>
            `;
        } else {
            journeyInfo.innerHTML = '<p>Journey not started yet. Set your start date above.</p>';
        }
    }

    saveSettings() {
        const startDate = document.getElementById('startDateInput').value;

        if (!startDate) {
            alert('Please select a start date');
            return;
        }

        Storage.setStartDate(startDate);

        // Save weight goal if provided
        const startingWeight = document.getElementById('startingWeightInput').value;
        const goalWeight = document.getElementById('goalWeightInput').value;

        if (startingWeight && goalWeight) {
            Storage.setWeightGoal(startingWeight, goalWeight);
        }

        this.updateDateBanner();
        this.renderDashboard();
        this.closeModal('settingsModal');
        alert('Settings saved!');
        this.syncAfterChange();
    }

    // Dark Mode
    initializeDarkMode() {
        const autoTheme = localStorage.getItem('autoTheme') === 'true';

        if (autoTheme) {
            // Check time and apply theme accordingly
            this.applyAutoTheme();
            // Check every minute for theme updates
            setInterval(() => this.applyAutoTheme(), 60000);
        } else {
            // Manual mode
            const darkMode = localStorage.getItem('darkMode') === 'true';
            if (darkMode) {
                document.body.setAttribute('data-theme', 'dark');
            }
        }

        // Update toggle states in UI
        this.updateThemeToggles();
    }

    applyAutoTheme() {
        const shouldBeDark = this.isNightTime();

        if (shouldBeDark) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }

        // Update the manual toggle to reflect current state
        this.updateThemeToggles();
    }

    isNightTime() {
        // Get current hour in NZ timezone
        const now = getCurrentDateNZ();
        const hour = now.getHours();

        // Dark mode from 6pm (18:00) to 6am (06:00)
        return hour >= 18 || hour < 6;
    }

    toggleDarkMode() {
        // Disable auto theme when manually toggling
        localStorage.setItem('autoTheme', 'false');

        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        if (newTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('darkMode', 'false');
        }

        this.updateThemeToggles();
    }

    toggleAutoTheme() {
        const autoThemeToggle = document.getElementById('autoThemeToggle');
        const isEnabled = autoThemeToggle.checked;

        localStorage.setItem('autoTheme', isEnabled.toString());

        if (isEnabled) {
            // Apply auto theme immediately
            this.applyAutoTheme();
            // Start checking every minute
            if (!this.autoThemeInterval) {
                this.autoThemeInterval = setInterval(() => this.applyAutoTheme(), 60000);
            }
        } else {
            // Stop auto checking
            if (this.autoThemeInterval) {
                clearInterval(this.autoThemeInterval);
                this.autoThemeInterval = null;
            }
        }

        this.updateThemeToggles();
    }

    updateThemeToggles() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const autoThemeToggle = document.getElementById('autoThemeToggle');

        if (darkModeToggle) {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            darkModeToggle.checked = isDark;
        }

        if (autoThemeToggle) {
            const autoEnabled = localStorage.getItem('autoTheme') === 'true';
            autoThemeToggle.checked = autoEnabled;

            // Disable manual toggle when auto is enabled
            if (darkModeToggle) {
                darkModeToggle.disabled = autoEnabled;
                darkModeToggle.style.opacity = autoEnabled ? '0.5' : '1';
            }
        }
    }

    isDarkMode() {
        return document.body.getAttribute('data-theme') === 'dark';
    }

    updateWeightGoalInfo() {
        const weightGoal = Storage.getWeightGoal();
        const weightGoalInfo = document.getElementById('weightGoalInfo');

        if (weightGoal.startingWeight && weightGoal.goalWeight) {
            const diff = weightGoal.goalWeight - weightGoal.startingWeight;
            const sign = diff > 0 ? '+' : '';
            weightGoalInfo.innerHTML = `<p><strong>Goal:</strong> ${sign}${diff.toFixed(1)} kg (from ${weightGoal.startingWeight} kg to ${weightGoal.goalWeight} kg)</p>`;
        } else {
            weightGoalInfo.innerHTML = '<p>Set your starting and goal weight to track progress.</p>';
        }
    }

    // Auto-Backup
    checkAutoBackup() {
        if (Storage.shouldCreateBackup()) {
            Storage.createAutoBackup();

            // Show notification
            setTimeout(() => {
                alert('📦 Weekly backup created!\n\nYour data has been automatically backed up. You can view and download backups in Settings.');
            }, 1000);
        }
    }

    renderAutoBackups() {
        const backups = Storage.getAutoBackups();
        const container = document.getElementById('autoBackupsList');

        if (backups.length === 0) {
            container.innerHTML = '<div class="auto-backups-empty">No automatic backups yet. First backup will be created on Sunday.</div>';
            return;
        }

        container.innerHTML = backups.map((backup, index) => {
            const backupDate = new Date(backup.date);
            const formattedDate = formatDateNZ(backupDate, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            // Calculate age
            const now = new Date();
            const diffDays = Math.floor((now - backupDate) / (1000 * 60 * 60 * 24));
            let ageText = '';
            if (diffDays === 0) {
                ageText = 'Today';
            } else if (diffDays === 1) {
                ageText = 'Yesterday';
            } else if (diffDays < 7) {
                ageText = `${diffDays} days ago`;
            } else {
                const weeks = Math.floor(diffDays / 7);
                ageText = `${weeks} week${weeks > 1 ? 's' : ''} ago`;
            }

            return `
                <div class="auto-backup-item">
                    <div class="auto-backup-info">
                        <div class="auto-backup-date">${formattedDate}</div>
                        <div class="auto-backup-age">${ageText}</div>
                    </div>
                    <button class="auto-backup-download" onclick="app.downloadAutoBackup(${index})">
                        Download
                    </button>
                </div>
            `;
        }).join('');
    }

    downloadAutoBackup(index) {
        const backups = Storage.getAutoBackups();
        const backup = backups[index];

        if (!backup) {
            alert('Backup not found');
            return;
        }

        const data = {
            version: '1.0',
            exportDate: backup.date,
            workouts: backup.workouts,
            routines: backup.routines,
            currentWorkout: backup.currentWorkout,
            foodDiary: backup.foodDiary,
            foodRoutines: backup.foodRoutines,
            startDate: backup.startDate
        };

        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const backupDate = new Date(backup.date);
        const fileName = `gym-tracker-auto-backup-${backupDate.toISOString().split('T')[0]}.json`;

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Data Export/Import
    exportData() {
        const data = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            workouts: Storage.getAllWorkouts(),
            routines: Storage.getAllRoutines(),
            currentWorkout: Storage.getCurrentWorkout(),
            foodDiary: Storage.getAllFoodDays(),
            foodRoutines: Storage.getAllFoodRoutines(),
            progressPhotos: Storage.getAllProgressPhotos(),
            dailyMetrics: Storage.getAllDailyMetrics(),
            startDate: Storage.getStartDate()
        };

        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `gym-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('Data exported successfully! Save this file in a safe place.');
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                // Validate data structure
                if (!data.version || !data.exportDate) {
                    alert('Invalid backup file format');
                    return;
                }

                // Confirm before importing
                if (!confirm('This will replace ALL your current data with the imported data. Are you sure?\n\n⚠️ Make sure you have exported your current data first!')) {
                    return;
                }

                // Import all data
                if (data.workouts) localStorage.setItem(Storage.KEYS.WORKOUTS, JSON.stringify(data.workouts));
                if (data.routines) localStorage.setItem(Storage.KEYS.ROUTINES, JSON.stringify(data.routines));
                if (data.currentWorkout) localStorage.setItem(Storage.KEYS.CURRENT_WORKOUT, JSON.stringify(data.currentWorkout));
                if (data.foodDiary) localStorage.setItem(Storage.KEYS.FOOD_DIARY, JSON.stringify(data.foodDiary));
                if (data.foodRoutines) localStorage.setItem(Storage.KEYS.FOOD_ROUTINES, JSON.stringify(data.foodRoutines));
                if (data.progressPhotos) localStorage.setItem(Storage.KEYS.PROGRESS_PHOTOS, JSON.stringify(data.progressPhotos));
                if (data.dailyMetrics) localStorage.setItem(Storage.KEYS.DAILY_METRICS, JSON.stringify(data.dailyMetrics));
                if (data.startDate) localStorage.setItem(Storage.KEYS.START_DATE, JSON.stringify(data.startDate));

                alert('Data imported successfully! Refreshing the app...');
                window.location.reload();
            } catch (error) {
                console.error('Import error:', error);
                alert('Error importing data. Please check the file and try again.');
            }
        };

        reader.readAsText(file);

        // Reset file input
        event.target.value = '';
    }

    importRoutines(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                // Validate data structure
                if (!data.routines || !Array.isArray(data.routines)) {
                    alert('❌ Invalid file format!\n\nExpected structure:\n{\n  "routines": [...]\n}\n\nPlease check your JSON file.');
                    return;
                }

                if (data.routines.length === 0) {
                    alert('❌ The file contains no routines to import.');
                    return;
                }

                // Validate each routine has required fields
                for (let i = 0; i < data.routines.length; i++) {
                    const routine = data.routines[i];
                    if (!routine.name || !routine.exercises || !Array.isArray(routine.exercises)) {
                        alert(`❌ Invalid routine at index ${i}.\n\nEach routine must have:\n- name (string)\n- exercises (array)`);
                        return;
                    }
                }

                // Confirm before importing
                if (!confirm(`This will import ${data.routines.length} workout routine(s). Your existing routines will be kept.\n\nContinue?`)) {
                    return;
                }

                // Get existing routines
                const existingRoutines = Storage.getAllRoutines();
                const existingIds = new Set(existingRoutines.map(r => r.id));

                // Merge new routines, avoiding duplicates by ID
                let importedCount = 0;
                data.routines.forEach(routine => {
                    // Ensure routine has an ID
                    if (!routine.id) {
                        routine.id = Date.now() + Math.random();
                    }
                    // Add createdAt if missing
                    if (!routine.createdAt) {
                        routine.createdAt = new Date().toISOString();
                    }

                    if (!existingIds.has(routine.id)) {
                        existingRoutines.push(routine);
                        importedCount++;
                    }
                });

                // Save merged routines
                localStorage.setItem(Storage.KEYS.ROUTINES, JSON.stringify(existingRoutines));

                alert(`✅ Successfully imported ${importedCount} new routine(s)!`);

                // Refresh routines view if we're on that tab
                this.renderRoutines();

            } catch (error) {
                console.error('Import routines error:', error);
                alert(`❌ Error importing routines:\n\n${error.message}\n\nPlease check:\n1. File is valid JSON\n2. File encoding is UTF-8\n3. No special characters causing issues`);
            }
        };

        reader.readAsText(file);

        // Reset file input
        event.target.value = '';
    }

    importDietPlan(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                // Validate data structure
                if (!data.foodRoutines || !Array.isArray(data.foodRoutines)) {
                    alert('❌ Invalid file format!\n\nExpected structure:\n{\n  "foodRoutines": [...]\n}\n\nPlease check your JSON file.');
                    return;
                }

                if (data.foodRoutines.length === 0) {
                    alert('❌ The file contains no meal plans to import.');
                    return;
                }

                // Validate each food routine has required fields
                for (let i = 0; i < data.foodRoutines.length; i++) {
                    const routine = data.foodRoutines[i];
                    if (!routine.name || !routine.meals || !Array.isArray(routine.meals)) {
                        alert(`❌ Invalid meal plan at index ${i}.\n\nEach meal plan must have:\n- name (string)\n- meals (array)`);
                        return;
                    }
                }

                // Confirm before importing
                if (!confirm(`This will import ${data.foodRoutines.length} meal plan(s) as Food Routines. Your existing food routines will be kept.\n\nContinue?`)) {
                    return;
                }

                // Get existing food routines
                const existingRoutines = Storage.getAllFoodRoutines();
                const existingIds = new Set(existingRoutines.map(r => r.id));

                // Merge new food routines, avoiding duplicates by ID
                let importedCount = 0;
                data.foodRoutines.forEach(routine => {
                    // Ensure routine has an ID
                    if (!routine.id) {
                        routine.id = Date.now() + Math.random();
                    }
                    // Add createdAt if missing
                    if (!routine.createdAt) {
                        routine.createdAt = new Date().toISOString();
                    }

                    if (!existingIds.has(routine.id)) {
                        existingRoutines.push(routine);
                        importedCount++;
                    }
                });

                // Save merged food routines
                localStorage.setItem(Storage.KEYS.FOOD_ROUTINES, JSON.stringify(existingRoutines));

                alert(`✅ Successfully imported ${importedCount} new meal plan(s)!\n\nGo to Food tab → Food Routines to load them.`);

            } catch (error) {
                console.error('Import diet plan error:', error);
                alert(`❌ Error importing diet plan:\n\n${error.message}\n\nPlease check:\n1. File is valid JSON\n2. File encoding is UTF-8\n3. No special characters causing issues`);
            }
        };

        reader.readAsText(file);

        // Reset file input
        event.target.value = '';
    }

    downloadWorkoutRoutines() {
        // Fetch the workout routines JSON file from the server
        fetch('my-workout-routines.json')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch file');
                return response.blob();
            })
            .then(blob => {
                // Create a download link
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'my-workout-routines.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

                alert('✅ Workout routines downloaded!\n\nNow tap "Import" and select the downloaded file.');
            })
            .catch(error => {
                console.error('Download error:', error);
                alert('❌ Failed to download workout routines.\n\nPlease check your internet connection and try again.');
            });
    }

    downloadDietPlan() {
        // Fetch the diet plan JSON file from the server
        fetch('my-diet-plan.json')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch file');
                return response.blob();
            })
            .then(blob => {
                // Create a download link
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'my-diet-plan.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

                alert('✅ Diet plan downloaded!\n\nNow tap "Import" and select the downloaded file.');
            })
            .catch(error => {
                console.error('Download error:', error);
                alert('❌ Failed to download diet plan.\n\nPlease check your internet connection and try again.');
            });
    }

    // Date History Methods
    openDateHistoryModal() {
        // Set to today's date by default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('historyDateInput').value = today;
        document.getElementById('historyDateInput').max = today; // Can't select future dates

        this.loadDateHistory(today);
        document.getElementById('dateHistoryModal').classList.add('active');
    }

    loadDateHistory(dateString) {
        const selectedDate = new Date(dateString);
        const formattedDate = formatDateNZ(selectedDate, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Get workout data for this date
        const allWorkouts = Storage.getAllWorkouts();
        const workoutForDate = allWorkouts.find(w => {
            const workoutDate = new Date(w.date).toDateString();
            const targetDate = selectedDate.toDateString();
            return workoutDate === targetDate;
        });

        // Get food data for this date
        const allFoodDays = Storage.getAllFoodDays();
        const foodForDate = allFoodDays.find(f => {
            const foodDate = new Date(f.date).toDateString();
            const targetDate = selectedDate.toDateString();
            return foodDate === targetDate;
        });

        // Calculate journey day if start date is set
        const startDate = Storage.getStartDate();
        let journeyDay = null;
        if (startDate) {
            const start = new Date(startDate);
            const diffTime = selectedDate - start;
            journeyDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        }

        // Render the content
        const container = document.getElementById('dateHistoryContent');

        let content = `
            <div class="date-history-header">
                <h3>${formattedDate}</h3>
                ${journeyDay > 0 ? `<span class="date-history-journey-day">Day ${journeyDay}</span>` : ''}
            </div>
        `;

        // Workout Section
        content += '<div class="date-history-section">';
        content += '<h4 class="section-title">💪 Workout</h4>';

        if (workoutForDate && workoutForDate.exercises.length > 0) {
            content += '<div class="date-history-workout">';
            workoutForDate.exercises.forEach(ex => {
                const type = ex.type || 'strength';
                let icon = '💪';
                if (type === 'cardio') icon = '🏃';
                if (type === 'hiit') icon = '🔥';

                content += `<div class="history-exercise-item">`;
                content += `<div class="exercise-name">${icon} ${ex.name}</div>`;

                if (type === 'strength') {
                    content += '<div class="exercise-details">';
                    ex.sets.forEach((set, index) => {
                        content += `<div class="set-detail">Set ${index + 1}: ${set.weight}${set.unit || 'kg'} × ${set.reps} reps</div>`;
                    });
                    content += '</div>';
                } else if (type === 'cardio') {
                    content += `<div class="exercise-details">`;
                    content += `<div class="set-detail">Duration: ${ex.duration} min</div>`;
                    if (ex.distance) content += `<div class="set-detail">Distance: ${ex.distance} km</div>`;
                    if (ex.calories) content += `<div class="set-detail">Calories: ${ex.calories} kcal</div>`;
                    content += `</div>`;
                } else if (type === 'hiit') {
                    content += `<div class="exercise-details">`;
                    content += `<div class="set-detail">Duration: ${ex.duration} min</div>`;
                    if (ex.rounds) content += `<div class="set-detail">Rounds: ${ex.rounds}</div>`;
                    if (ex.calories) content += `<div class="set-detail">Calories: ${ex.calories} kcal</div>`;
                    content += `</div>`;
                }

                content += `</div>`;
            });
            content += '</div>';
        } else {
            content += '<p class="empty-state-small">No workout recorded for this date</p>';
        }
        content += '</div>';

        // Food Section
        content += '<div class="date-history-section">';
        content += '<h4 class="section-title">🍽️ Food Tracking</h4>';

        if (foodForDate && foodForDate.meals.length > 0) {
            // Calculate totals
            const stats = Storage.getFoodStats(dateString);

            content += `
                <div class="date-food-summary">
                    <div class="summary-item">
                        <span class="summary-label">Calories</span>
                        <span class="summary-value">${stats.totalCalories}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Protein</span>
                        <span class="summary-value">${stats.totalProtein}g</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Carbs</span>
                        <span class="summary-value">${stats.totalCarbs}g</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Fats</span>
                        <span class="summary-value">${stats.totalFats}g</span>
                    </div>
                </div>
            `;

            // Group meals by type
            const mealTypes = {
                'breakfast': '🌅 Breakfast',
                'midmorning': '☕ Mid Morning',
                'lunch': '🌞 Lunch',
                'preworkout': '💪 Pre Workout',
                'postworkout': '🥤 Post Workout',
                'dinner': '🌙 Dinner'
            };

            Object.entries(mealTypes).forEach(([type, label]) => {
                const mealsOfType = foodForDate.meals.filter(m => m.mealType === type);
                if (mealsOfType.length > 0) {
                    content += `<div class="date-meal-group">`;
                    content += `<div class="meal-group-title">${label}</div>`;
                    mealsOfType.forEach(meal => {
                        content += `
                            <div class="date-food-item">
                                <strong>${meal.name}</strong>
                                <span>${meal.calories} cal • P: ${meal.protein}g • C: ${meal.carbs}g • F: ${meal.fats}g</span>
                            </div>
                        `;
                    });
                    content += `</div>`;
                }
            });
        } else {
            content += '<p class="empty-state-small">No food recorded for this date</p>';
        }
        content += '</div>';

        // Add edit button for the selected date
        const isToday = selectedDate.toDateString() === new Date().toDateString();
        if (!isToday) {
            content += `
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
                    <button class="btn-primary full-width" onclick="app.editDateData('${dateString}')">
                        ✏️ Add/Edit Data for This Date
                    </button>
                    <p class="helper-text" style="text-align: center; margin-top: 0.5rem;">Switch to this date to log workout or food data</p>
                </div>
            `;
        }

        container.innerHTML = content;
    }

    editDateData(dateString) {
        // Store the selected date for editing
        this.workingDate = dateString;

        // Update the date banner to show we're editing a past date
        const selectedDate = new Date(dateString);
        const formattedDate = formatDateNZ(selectedDate, {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });

        // Close the history modal
        this.closeModal('dateHistoryModal');

        // Show notification
        alert(`📝 Now editing: ${formattedDate}\n\nYou can now log workout and food data for this date.\n\nTip: Click the date banner to return to today.`);

        // Update date banner
        this.updateDateBanner();

        // Refresh dashboard to show data for this date
        this.renderDashboard();
    }

    // Google Drive Sync Methods
    renderGoogleDriveStatus() {
        const statusContainer = document.getElementById('googleDriveStatus');
        const actionsContainer = document.getElementById('googleDriveActions');

        if (!GoogleDriveSync.isConfigured()) {
            statusContainer.innerHTML = `
                <div class="googledrive-status-header">
                    <span><strong>⚠️ Setup Required</strong></span>
                    <span class="googledrive-status-badge not-configured">Not Configured</span>
                </div>
                <div class="googledrive-sync-info">
                    <p>Google Drive sync requires setup. Follow the instructions below to configure.</p>
                </div>
            `;
            statusContainer.className = 'googledrive-status not-configured';

            actionsContainer.innerHTML = `
                <button class="btn-secondary full-width" onclick="app.showGoogleDriveSetupInstructions()">
                    📖 View Setup Instructions
                </button>
            `;
            return;
        }

        const isConnected = GoogleDriveSync.isConnected();
        const isSyncEnabled = GoogleDriveSync.isSyncEnabled();
        const lastSync = GoogleDriveSync.getLastSyncTimeFormatted();

        if (isConnected) {
            statusContainer.innerHTML = `
                <div class="googledrive-status-header">
                    <span><strong>☁️ Connected</strong></span>
                    <span class="googledrive-status-badge connected">✓ Active</span>
                </div>
                <div class="googledrive-sync-info">
                    <p><strong>Last sync:</strong> ${lastSync}</p>
                </div>
                <div class="sync-toggle">
                    <label class="toggle-switch">
                        <input type="checkbox" id="autoSyncToggle" ${isSyncEnabled ? 'checked' : ''} onchange="app.toggleAutoSync()">
                        <span class="toggle-slider"></span>
                    </label>
                    <span class="toggle-label">Auto-sync enabled</span>
                </div>
            `;
            statusContainer.className = 'googledrive-status connected';

            actionsContainer.innerHTML = `
                <div class="googledrive-actions-grid">
                    <button class="btn-Google Drive" onclick="app.syncToGoogleDrive()">⬆️ Upload Now</button>
                    <button class="btn-Google Drive" onclick="app.downloadFromGoogleDrive()">⬇️ Download</button>
                </div>
                <button class="btn-secondary full-width" style="margin-top: 0.5rem;" onclick="app.disconnectGoogleDrive()">
                    Disconnect Google Drive
                </button>
            `;
        } else {
            statusContainer.innerHTML = `
                <div class="googledrive-status-header">
                    <span><strong>Not Connected</strong></span>
                    <span class="googledrive-status-badge disconnected">Disconnected</span>
                </div>
                <div class="googledrive-sync-info">
                    <p>Connect to Google Drive to sync your data across devices.</p>
                </div>
            `;
            statusContainer.className = 'googledrive-status';

            actionsContainer.innerHTML = `
                <button class="btn-Google Drive full-width" onclick="app.connectGoogleDrive()">
                    Connect to Google Drive
                </button>
            `;
        }
    }

    async handleGoogleDriveCallback() {
        try {
            const result = await GoogleDriveSync.handleCallback();

            if (result.success) {
                alert('✅ Successfully connected to Google Drive!');
                this.renderGoogleDriveStatus();

                // Ask if user wants to upload current data
                if (confirm('Would you like to upload your current data to Google Drive now?')) {
                    await this.syncToGoogleDrive();
                }
            } else {
                alert(`❌ Failed to connect to Google Drive: ${result.error}`);
            }
        } catch (error) {
            alert(`❌ Error: ${error.message}`);
        }
    }

    async connectGoogleDrive() {
        try {
            await GoogleDriveSync.connect();
        } catch (error) {
            alert(`❌ Error connecting to Google Drive: ${error.message}`);
        }
    }

    disconnectGoogleDrive() {
        if (confirm('Are you sure you want to disconnect from Google Drive? Your data will remain on Google Drive but will stop syncing.')) {
            GoogleDriveSync.disconnect();
            this.renderGoogleDriveStatus();
            alert('✅ Disconnected from Google Drive');
        }
    }

    async syncToGoogleDrive(event) {
        try {
            const btn = event?.target;
            if (btn) {
                btn.disabled = true;
                btn.textContent = '⏳ Uploading...';
            }

            const result = await GoogleDriveSync.uploadData();
            if (btn) {
                alert(result.message);
            }

            this.renderGoogleDriveStatus();
            if (btn) {
                btn.disabled = false;
                btn.textContent = '⬆️ Upload Now';
            }
        } catch (error) {
            alert(`❌ Sync failed: ${error.message}`);
            if (event?.target) {
                event.target.disabled = false;
                event.target.textContent = '⬆️ Upload Now';
            }
        }
    }

    async downloadFromGoogleDrive(event) {
        if (!confirm('⚠️ This will replace your local data with data from Google Drive. Continue?')) {
            return;
        }

        try {
            const btn = event?.target;
            if (btn) {
                btn.disabled = true;
                btn.textContent = '⏳ Downloading...';
            }

            const result = await GoogleDriveSync.downloadData();

            if (result.success) {
                // Restore all data
                const data = result.data;
                Storage.set(Storage.KEYS.WORKOUTS, data.workouts || []);
                Storage.set(Storage.KEYS.ROUTINES, data.routines || []);
                Storage.set(Storage.KEYS.CURRENT_WORKOUT, data.currentWorkout || { exercises: [] });
                Storage.set(Storage.KEYS.FOOD_DIARY, data.foodDiary || []);
                Storage.set(Storage.KEYS.FOOD_ROUTINES, data.foodRoutines || []);
                Storage.set(Storage.KEYS.PROGRESS_PHOTOS, data.progressPhotos || []);
                Storage.set(Storage.KEYS.DAILY_METRICS, data.dailyMetrics || []);

                if (data.startDate) {
                    Storage.setStartDate(data.startDate);
                }

                alert('✅ Data downloaded from Google Drive successfully!');

                // Refresh the UI
                this.render();
                this.renderFood();
                this.updateDateDisplay();
            } else {
                alert(`❌ ${result.error}`);
            }

            this.renderGoogleDriveStatus();
            if (btn) {
                btn.disabled = false;
                btn.textContent = '⬇️ Download';
            }
        } catch (error) {
            alert(`❌ Download failed: ${error.message}`);
            if (event?.target) {
                event.target.disabled = false;
                event.target.textContent = '⬇️ Download';
            }
        }
    }

    toggleAutoSync() {
        const enabled = document.getElementById('autoSyncToggle').checked;
        GoogleDriveSync.setSyncEnabled(enabled);

        if (enabled) {
            // Sync immediately when enabled
            GoogleDriveSync.autoSync();
        }
    }

    showGoogleDriveSetupInstructions() {
        const instructions = `
# Google Drive Setup Instructions

## Quick Steps:

1. Go to: https://console.cloud.google.com
2. Sign in with your Google account
3. Create new project (or select existing)
4. Enable "Google Drive API":
   - APIs & Services → Enable APIs
   - Search "Google Drive API" → Enable
5. Create OAuth Credentials:
   - APIs & Services → Credentials
   - + CREATE CREDENTIALS → OAuth client ID
   - Configure consent screen if needed (External, add your email)
6. OAuth client ID settings:
   - Type: Web application
   - Name: Gym Tracker PWA
   - Authorized origins: ${window.location.origin}
   - Authorized redirect URIs: ${window.location.origin}
7. Copy the Client ID (ends with .apps.googleusercontent.com)
8. Open: js/googledrive-sync.js
9. Replace 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com' with your Client ID
10. Save and refresh!

## Notes:
- FREE - no payment needed
- 15GB free storage
- Your data stays private in YOUR Google Drive
- Works on all devices

Detailed guide: GOOGLEDRIVE_SETUP.md
        `;

        alert(instructions);
    }

    // Trigger auto-sync after data changes
    syncAfterChange() {
        if (GoogleDriveSync.isSyncEnabled() && GoogleDriveSync.isConnected()) {
            // Debounce sync by 30 seconds
            clearTimeout(this.syncTimeout);
            this.syncTimeout = setTimeout(() => {
                GoogleDriveSync.autoSync();
            }, 30000);
        }
    }

    // Progress Photos Methods
    handlePhotoSelection(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file');
            return;
        }

        // Validate file size (max 5MB to avoid localStorage limits)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('Image is too large. Please select an image smaller than 5MB');
            return;
        }

        // Read file and convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentPhotoData = e.target.result;
            this.openPhotoDetailsModal();
        };
        reader.readAsDataURL(file);

        // Reset file input
        event.target.value = '';
    }

    openPhotoDetailsModal() {
        // Show preview
        document.getElementById('photoPreview').src = this.currentPhotoData;

        // Clear form
        document.getElementById('photoWeight').value = '';
        document.getElementById('photoNotes').value = '';
        document.getElementById('photoChest').value = '';
        document.getElementById('photoWaist').value = '';
        document.getElementById('photoArms').value = '';
        document.getElementById('photoThighs').value = '';

        this.openModal('photoDetailsModal');
    }

    savePhoto() {
        const weight = document.getElementById('photoWeight').value;
        const notes = document.getElementById('photoNotes').value;
        const chest = document.getElementById('photoChest').value;
        const waist = document.getElementById('photoWaist').value;
        const arms = document.getElementById('photoArms').value;
        const thighs = document.getElementById('photoThighs').value;

        const measurements = {};
        if (chest) measurements.chest = parseFloat(chest);
        if (waist) measurements.waist = parseFloat(waist);
        if (arms) measurements.arms = parseFloat(arms);
        if (thighs) measurements.thighs = parseFloat(thighs);

        const photoData = {
            image: this.currentPhotoData,
            weight: weight ? parseFloat(weight) : null,
            notes: notes,
            measurements: measurements
        };

        Storage.addProgressPhoto(photoData);
        this.closeModal('photoDetailsModal');
        this.renderProgressPhotos();
        this.syncAfterChange();

        alert('Progress photo saved successfully!');
    }

    renderProgressPhotos() {
        const photos = Storage.getAllProgressPhotos();
        const gallery = document.getElementById('photosGallery');

        if (photos.length === 0) {
            gallery.innerHTML = `
                <div class="empty-state">
                    <span class="empty-state-icon">📸</span>
                    <div class="empty-state-title">No Progress Photos</div>
                    <div class="empty-state-message">Document your transformation journey with progress photos</div>
                    <button class="empty-state-cta" onclick="app.openProgressPhotoModal()">Take Photo</button>
                </div>
            `;
            return;
        }

        // Sort by date (newest first)
        photos.sort((a, b) => new Date(b.date) - new Date(a.date));

        let html = '<div class="photos-grid">';
        photos.forEach((photo, index) => {
            const date = new Date(photo.date);
            const now = new Date();
            const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

            const formattedDate = formatDateNZ(date, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });

            // Calculate days since last photo
            let daysSinceLabel = '';
            if (diffDays === 0) {
                daysSinceLabel = 'Today';
            } else if (diffDays === 1) {
                daysSinceLabel = 'Yesterday';
            } else if (diffDays < 7) {
                daysSinceLabel = `${diffDays} days ago`;
            } else if (diffDays < 30) {
                const weeks = Math.floor(diffDays / 7);
                daysSinceLabel = `${weeks} week${weeks > 1 ? 's' : ''} ago`;
            } else {
                const months = Math.floor(diffDays / 30);
                daysSinceLabel = `${months} month${months > 1 ? 's' : ''} ago`;
            }

            // Days between this photo and previous photo
            let daysBetween = '';
            if (index < photos.length - 1) {
                const prevPhotoDate = new Date(photos[index + 1].date);
                const daysDiff = Math.floor((date - prevPhotoDate) / (1000 * 60 * 60 * 24));
                if (daysDiff > 0) {
                    daysBetween = `<div class="photo-progress">+${daysDiff} days from previous</div>`;
                }
            }

            html += `
                <div class="photo-card" onclick="app.viewPhoto(${photo.id})">
                    <img src="${photo.image}" alt="Progress photo">
                    <div class="photo-card-info">
                        <div class="photo-date">${formattedDate}</div>
                        <div class="photo-time-ago">${daysSinceLabel}</div>
                        ${photo.weight ? `<div class="photo-weight">⚖️ ${photo.weight} kg</div>` : ''}
                        ${daysBetween}
                    </div>
                </div>
            `;
        });
        html += '</div>';

        gallery.innerHTML = html;

        // Populate before/after comparison selectors
        this.populatePhotoComparison(photos);
    }

    populatePhotoComparison(photos) {
        const beforeSelect = document.getElementById('beforePhotoSelect');
        const afterSelect = document.getElementById('afterPhotoSelect');
        const comparisonSection = document.getElementById('beforeAfterSection');

        // Show comparison section if we have at least 2 photos
        if (photos.length >= 2) {
            comparisonSection.style.display = 'block';

            // Clear and populate selectors
            beforeSelect.innerHTML = '<option value="">Select photo...</option>';
            afterSelect.innerHTML = '<option value="">Select photo...</option>';

            photos.forEach(photo => {
                const date = new Date(photo.date);
                const formatted = formatDateNZ(date, { month: 'short', day: 'numeric', year: 'numeric' });

                const option1 = document.createElement('option');
                option1.value = photo.id;
                option1.textContent = formatted;
                beforeSelect.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = photo.id;
                option2.textContent = formatted;
                afterSelect.appendChild(option2);
            });

            // Add change listeners
            beforeSelect.onchange = () => this.updateComparison();
            afterSelect.onchange = () => this.updateComparison();
        } else {
            comparisonSection.style.display = 'none';
        }

        // Initialize comparison mode tabs
        this.initializeComparisonTabs();
    }

    initializeComparisonTabs() {
        document.querySelectorAll('.mode-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;

                // Update active tab
                document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');

                // Show correct view
                document.querySelectorAll('.comparison-view').forEach(view => view.classList.remove('active'));
                if (mode === 'side-by-side') {
                    document.getElementById('sideBySideView').classList.add('active');
                } else {
                    document.getElementById('sliderView').classList.add('active');
                }
            });
        });

        // Initialize slider
        const slider = document.getElementById('comparisonSlider');
        const handle = document.getElementById('sliderHandle');
        const beforeImg = document.getElementById('beforePhotoSlider');

        if (slider && handle && beforeImg) {
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                handle.style.left = value + '%';
                beforeImg.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
            });
        }
    }

    updateComparison() {
        const beforeId = parseInt(document.getElementById('beforePhotoSelect').value);
        const afterId = parseInt(document.getElementById('afterPhotoSelect').value);
        const display = document.getElementById('comparisonDisplay');

        if (!beforeId || !afterId) {
            display.style.display = 'none';
            return;
        }

        if (beforeId === afterId) {
            alert('Please select different photos for before and after');
            return;
        }

        const beforePhoto = Storage.getProgressPhoto(beforeId);
        const afterPhoto = Storage.getProgressPhoto(afterId);

        if (!beforePhoto || !afterPhoto) return;

        // Show display
        display.style.display = 'block';

        // Update side by side view
        document.getElementById('beforePhotoImg').src = beforePhoto.image;
        document.getElementById('afterPhotoImg').src = afterPhoto.image;

        document.getElementById('beforePhotoDate').textContent = formatDateNZ(new Date(beforePhoto.date), {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        document.getElementById('afterPhotoDate').textContent = formatDateNZ(new Date(afterPhoto.date), {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        // Update slider view
        document.getElementById('beforePhotoSlider').src = beforePhoto.image;
        document.getElementById('afterPhotoSlider').src = afterPhoto.image;

        // Reset slider to 50%
        const slider = document.getElementById('comparisonSlider');
        slider.value = 50;
        document.getElementById('sliderHandle').style.left = '50%';
        document.getElementById('beforePhotoSlider').style.clipPath = 'inset(0 50% 0 0)';
    }

    viewPhoto(photoId) {
        const photo = Storage.getProgressPhoto(photoId);
        if (!photo) return;

        this.currentViewPhotoId = photoId;

        // Set image
        document.getElementById('viewPhotoImage').src = photo.image;

        // Set date
        const date = new Date(photo.date);
        const formattedDate = formatDateNZ(date, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('viewPhotoDate').textContent = formattedDate;

        // Set weight
        const weightContainer = document.getElementById('viewPhotoWeightContainer');
        if (photo.weight) {
            document.getElementById('viewPhotoWeight').textContent = photo.weight;
            weightContainer.style.display = 'block';
        } else {
            weightContainer.style.display = 'none';
        }

        // Set notes
        const notesContainer = document.getElementById('viewPhotoNotesContainer');
        if (photo.notes) {
            document.getElementById('viewPhotoNotes').textContent = photo.notes;
            notesContainer.style.display = 'block';
        } else {
            notesContainer.style.display = 'none';
        }

        // Set measurements
        const measurementsContainer = document.getElementById('viewPhotoMeasurementsContainer');
        if (photo.measurements && Object.keys(photo.measurements).length > 0) {
            let measurementsHTML = '';
            if (photo.measurements.chest) measurementsHTML += `<div>Chest: ${photo.measurements.chest} cm</div>`;
            if (photo.measurements.waist) measurementsHTML += `<div>Waist: ${photo.measurements.waist} cm</div>`;
            if (photo.measurements.arms) measurementsHTML += `<div>Arms: ${photo.measurements.arms} cm</div>`;
            if (photo.measurements.thighs) measurementsHTML += `<div>Thighs: ${photo.measurements.thighs} cm</div>`;
            document.getElementById('viewPhotoMeasurements').innerHTML = measurementsHTML;
            measurementsContainer.style.display = 'block';
        } else {
            measurementsContainer.style.display = 'none';
        }

        this.openModal('viewPhotoModal');
    }

    deleteCurrentPhoto() {
        if (!confirm('Are you sure you want to delete this progress photo? This cannot be undone.')) {
            return;
        }

        Storage.deleteProgressPhoto(this.currentViewPhotoId);
        this.closeModal('viewPhotoModal');
        this.renderProgressPhotos();
        this.syncAfterChange();

        alert('Photo deleted successfully');
    }

    // Dashboard Methods
    renderDashboard() {
        // Use workingDate if set, otherwise use today
        const displayDate = this.workingDate || null;
        const actualDate = displayDate ? new Date(displayDate) : new Date();

        const metrics = Storage.getTodayMetrics(displayDate);
        const foodStats = Storage.getFoodStats(displayDate);

        // Pull data from new tracking features
        const waterData = Storage.getWaterIntakeForDate(actualDate);
        const sleepLog = Storage.getSleepLogForDate(actualDate);

        // Get cardio calories for today
        const allCardio = Storage.getAllCardioSessions();
        const todayCardio = allCardio.filter(session => {
            const sessionDate = new Date(session.date).toDateString();
            const targetDate = actualDate.toDateString();
            return sessionDate === targetDate;
        });
        const totalCardioCalories = todayCardio.reduce((sum, session) => sum + (session.calories || 0), 0);

        // Update metrics - prioritize new storage over legacy DAILY_METRICS
        document.getElementById('dashSteps').textContent = metrics.steps || 0;
        document.getElementById('dashWater').textContent = waterData.glasses || metrics.waterGlasses || 0;
        document.getElementById('dashSleep').textContent = sleepLog?.hours || metrics.sleepHours || 0;
        document.getElementById('dashCalories').textContent = totalCardioCalories || metrics.workoutCalories || 0;

        // Update weight
        const weightGoal = Storage.getWeightGoal();
        const latestWeight = Storage.getLatestWeight();
        if (latestWeight) {
            document.getElementById('dashWeight').textContent = latestWeight.weight.toFixed(1) + ' kg';
            if (weightGoal.goalWeight) {
                document.getElementById('dashWeightGoal').textContent = `Goal: ${weightGoal.goalWeight} kg`;
            }
        } else if (weightGoal.startingWeight) {
            document.getElementById('dashWeight').textContent = weightGoal.startingWeight.toFixed(1) + ' kg';
            document.getElementById('dashWeightGoal').textContent = `Goal: ${weightGoal.goalWeight} kg`;
        }

        // Update measurements
        const latestMeasurements = Storage.getLatestBodyMeasurements();
        if (latestMeasurements) {
            const measuredCount = Object.values(latestMeasurements).filter(v => v !== null && v !== undefined && !isNaN(v)).length - 1; // -1 for date field
            document.getElementById('dashMeasurements').textContent = measuredCount;
        }

        // Update food stats
        document.getElementById('dashFoodCalories').textContent = foodStats.totalCalories;
        document.getElementById('dashFoodProtein').textContent = foodStats.totalProtein + 'g';
        document.getElementById('dashFoodCarbs').textContent = foodStats.totalCarbs + 'g';
        document.getElementById('dashFoodFats').textContent = foodStats.totalFats + 'g';

        // Update workout summary
        const todayWorkout = this.getTodayWorkout(displayDate);
        const summaryEl = document.getElementById('dashWorkoutSummary');

        if (todayWorkout && todayWorkout.exercises.length > 0) {
            const exerciseList = todayWorkout.exercises.map(ex => ex.name).slice(0, 3).join(', ');
            const moreText = todayWorkout.exercises.length > 3 ? ` +${todayWorkout.exercises.length - 3} more` : '';
            summaryEl.innerHTML = `
                <div class="workout-summary-item">
                    <strong>${todayWorkout.exercises.length} exercises:</strong><br>
                    <span style="font-size: 0.9rem;">${exerciseList}${moreText}</span>
                </div>
                <button class="btn-secondary" onclick="app.switchView('history')">View Details</button>
            `;
        } else {
            summaryEl.innerHTML = '<p class="empty-state-small">No workout logged today. Start tracking!</p>';
        }

        // Render progress charts
        this.renderWeightChart();
        this.renderMetricTrendCharts();
    }

    getTodayWorkout(date = null) {
        const workouts = Storage.getAllWorkouts();
        const targetDate = date ? new Date(date) : new Date();
        const targetDateStr = targetDate.toDateString();
        return workouts.find(w => new Date(w.date).toDateString() === targetDateStr);
    }

    openCaloriesModal() {
        const metrics = Storage.getTodayMetrics();
        document.getElementById('caloriesInput').value = metrics.workoutCalories || '';
        this.openModal('caloriesModal');
    }

    saveCalories() {
        const calories = parseInt(document.getElementById('caloriesInput').value) || 0;
        Storage.updateTodayMetrics({ workoutCalories: calories });
        this.closeModal('caloriesModal');
        this.renderDashboard();
        this.syncAfterChange();
    }

    openStepsModal() {
        const metrics = Storage.getTodayMetrics();
        document.getElementById('stepsInput').value = metrics.steps || '';
        this.openModal('stepsModal');
    }

    saveSteps() {
        const steps = parseInt(document.getElementById('stepsInput').value) || 0;
        Storage.updateTodayMetrics({ steps: steps });
        this.closeModal('stepsModal');
        this.renderDashboard();
        this.syncAfterChange();
    }

    openWaterModal() {
        const metrics = Storage.getTodayMetrics();
        document.getElementById('waterInput').value = metrics.waterGlasses || '';
        this.openModal('waterModal');
    }

    addWaterGlass() {
        const metrics = Storage.getTodayMetrics();
        const current = metrics.waterGlasses || 0;

        // Save to both storages for backward compatibility
        Storage.updateTodayMetrics({ waterGlasses: current + 1 });

        // Also save to WATER_INTAKE for consistency with Progress tab
        Storage.addWaterGlass();

        this.closeModal('waterModal');
        this.renderDashboard();
        this.syncAfterChange();
    }

    saveWater() {
        const glasses = parseInt(document.getElementById('waterInput').value) || 0;

        // Save to both storages for backward compatibility
        Storage.updateTodayMetrics({ waterGlasses: glasses });

        // Also save to WATER_INTAKE for consistency with Progress tab
        const today = getCurrentDateNZ();
        Storage.setWaterIntakeForDate(today, { glasses: glasses, goal: 8 });

        this.closeModal('waterModal');
        this.renderDashboard();
        this.syncAfterChange();
    }

    openSleepModal() {
        const metrics = Storage.getTodayMetrics();
        document.getElementById('sleepInput').value = metrics.sleepHours || '';
        this.openModal('sleepModal');
    }

    saveDashboardSleep() {
        const hours = parseFloat(document.getElementById('sleepInput').value) || 0;

        // Save to both storages for backward compatibility
        Storage.updateTodayMetrics({ sleepHours: hours });

        // Also save to SLEEP_LOG for consistency with Progress tab
        if (hours > 0) {
            const today = getCurrentDateNZ();
            Storage.addSleepLog({
                date: today.toISOString().split('T')[0],
                hours: hours,
                quality: 'good',
                notes: ''
            });
        }

        this.closeModal('sleepModal');
        this.renderDashboard();
        this.syncAfterChange();
    }

    openWeightModal() {
        const latestWeight = Storage.getLatestWeight();
        document.getElementById('weightInput').value = latestWeight ? latestWeight.weight : '';
        this.openModal('weightModal');
    }

    saveWeight() {
        const weight = parseFloat(document.getElementById('weightInput').value);
        if (!weight || weight < 30 || weight > 300) {
            alert('Please enter a valid weight between 30 and 300 kg');
            return;
        }
        Storage.logWeight(weight);
        this.closeModal('weightModal');
        this.renderDashboard();
        this.syncAfterChange();
    }

    openMeasurementsModal() {
        const latest = Storage.getLatestBodyMeasurements();
        if (latest) {
            document.getElementById('chestInput').value = latest.chest || '';
            document.getElementById('waistInput').value = latest.waist || '';
            document.getElementById('hipsInput').value = latest.hips || '';
            document.getElementById('shouldersInput').value = latest.shoulders || '';
            document.getElementById('leftArmInput').value = latest.leftArm || '';
            document.getElementById('rightArmInput').value = latest.rightArm || '';
            document.getElementById('leftThighInput').value = latest.leftThigh || '';
            document.getElementById('rightThighInput').value = latest.rightThigh || '';
            document.getElementById('leftCalfInput').value = latest.leftCalf || '';
            document.getElementById('rightCalfInput').value = latest.rightCalf || '';
            document.getElementById('neckInput').value = latest.neck || '';
        }
        this.openModal('measurementsModal');
    }

    saveMeasurements() {
        const measurements = {
            chest: document.getElementById('chestInput').value,
            waist: document.getElementById('waistInput').value,
            hips: document.getElementById('hipsInput').value,
            shoulders: document.getElementById('shouldersInput').value,
            leftArm: document.getElementById('leftArmInput').value,
            rightArm: document.getElementById('rightArmInput').value,
            leftThigh: document.getElementById('leftThighInput').value,
            rightThigh: document.getElementById('rightThighInput').value,
            leftCalf: document.getElementById('leftCalfInput').value,
            rightCalf: document.getElementById('rightCalfInput').value,
            neck: document.getElementById('neckInput').value
        };

        // Check if at least one measurement is provided
        const hasAnyMeasurement = Object.values(measurements).some(val => val && val.trim() !== '');
        if (!hasAnyMeasurement) {
            alert('Please enter at least one measurement');
            return;
        }

        Storage.logBodyMeasurements(measurements);
        this.closeModal('measurementsModal');
        this.renderDashboard();
        this.syncAfterChange();
        alert('✅ Measurements saved successfully!');
    }

    renderWeightChart() {
        const entries = Storage.getAllWeightEntries();
        const weightGoal = Storage.getWeightGoal();
        const chartContainer = document.getElementById('weightProgressChart');
        const section = document.getElementById('weightProgressSection');

        // Hide section if no data
        if (entries.length === 0 || !weightGoal.startingWeight) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';

        // Update stats
        const latestWeight = entries[0];
        const startWeight = weightGoal.startingWeight;
        const goalWeight = weightGoal.goalWeight;
        const weightChange = latestWeight.weight - startWeight;

        document.getElementById('startingWeightDisplay').textContent = startWeight.toFixed(1) + ' kg';
        document.getElementById('currentWeightDisplay').textContent = latestWeight.weight.toFixed(1) + ' kg';
        document.getElementById('goalWeightDisplay').textContent = goalWeight ? goalWeight.toFixed(1) + ' kg' : '--';
        document.getElementById('weightChangeDisplay').textContent = (weightChange >= 0 ? '+' : '') + weightChange.toFixed(1) + ' kg';

        // Sort entries by date (oldest first for chart)
        const sortedEntries = [...entries].reverse();

        // Calculate min/max for Y-axis
        const weights = sortedEntries.map(e => e.weight);
        if (goalWeight) weights.push(goalWeight);
        if (startWeight) weights.push(startWeight);
        const minWeight = Math.min(...weights) - 2;
        const maxWeight = Math.max(...weights) + 2;
        const weightRange = maxWeight - minWeight;

        // Generate chart HTML
        let chartHTML = '<div class="chart-container">';

        // Add goal line if exists
        if (goalWeight) {
            const goalY = ((maxWeight - goalWeight) / weightRange) * 100;
            chartHTML += `
                <div class="chart-goal-line" style="bottom: ${100 - goalY}%;">
                    <span class="chart-goal-label">Goal: ${goalWeight.toFixed(1)} kg</span>
                </div>
            `;
        }

        // Add start line
        const startY = ((maxWeight - startWeight) / weightRange) * 100;
        chartHTML += `
            <div class="chart-start-line" style="bottom: ${100 - startY}%;">
                <span class="chart-start-label">Start: ${startWeight.toFixed(1)} kg</span>
            </div>
        `;

        // Add data points and create SVG path
        let pathPoints = [];
        sortedEntries.forEach((entry, index) => {
            const x = (index / (sortedEntries.length - 1 || 1)) * 100;
            const y = ((maxWeight - entry.weight) / weightRange) * 100;
            const date = formatDateNZ(entry.date, { month: 'short', day: 'numeric' });

            pathPoints.push(`${x},${100 - y}`);

            chartHTML += `
                <div class="chart-point"
                     style="left: ${x}%; bottom: ${100 - y}%;"
                     title="${entry.weight.toFixed(1)} kg - ${date}">
                </div>
            `;
        });

        // Add SVG line connecting points
        if (pathPoints.length > 1) {
            chartHTML += `
                <svg class="chart-line" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
                    <polyline points="${pathPoints.join(' ')}"
                              fill="none"
                              stroke="#3b82f6"
                              stroke-width="2"
                              style="vector-effect: non-scaling-stroke;" />
                </svg>
            `;
        }

        // Add X-axis labels
        chartHTML += '<div class="chart-x-axis">';
        sortedEntries.forEach((entry, index) => {
            if (index === 0 || index === sortedEntries.length - 1 || sortedEntries.length <= 5) {
                const x = (index / (sortedEntries.length - 1 || 1)) * 100;
                const date = formatDateNZ(entry.date, { month: 'short', day: 'numeric' });
                chartHTML += `<span class="chart-x-label" style="left: ${x}%;">${date}</span>`;
            }
        });
        chartHTML += '</div>';

        chartHTML += '</div>';

        chartContainer.innerHTML = chartHTML;
    }

    renderMetricTrendCharts() {
        // Get last 7 days of metrics
        const allMetrics = Storage.getAllMetrics();
        const last7Days = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            const dayMetrics = allMetrics.find(m => new Date(m.date).toDateString() === dateStr);

            // Pull from new storage locations for water and sleep
            const waterData = Storage.getWaterIntakeForDate(date);
            const sleepLog = Storage.getSleepLogForDate(date);

            last7Days.push({
                date: date,
                dateStr: formatDateNZ(date, { weekday: 'short' }),
                steps: dayMetrics?.steps || 0,
                water: waterData.glasses || 0,
                sleep: sleepLog?.hours || 0
            });
        }

        // Check if we have any data
        const hasData = last7Days.some(d => d.steps > 0 || d.water > 0 || d.sleep > 0);
        if (!hasData) {
            return; // Don't render empty charts
        }

        // We'll render these charts inline in the dashboard sections
        // For now, let's just log that we have the data ready
        // The charts can be added to specific sections in the HTML later
        this.renderMetricBarChart('steps', last7Days, 10000);
        this.renderMetricBarChart('water', last7Days, 8);
        this.renderMetricBarChart('sleep', last7Days, 8);
    }

    renderMetricBarChart(metricType, data, goalValue) {
        const containerId = `${metricType}TrendChart`;
        const container = document.getElementById(containerId);

        if (!container) return;

        const values = data.map(d => d[metricType]);
        const maxValue = Math.max(...values, goalValue);

        if (maxValue === 0) {
            container.innerHTML = '<p class="empty-state-small">No data logged yet</p>';
            return;
        }

        let chartHTML = '<div class="bar-chart">';

        data.forEach(day => {
            const value = day[metricType];
            const height = (value / maxValue) * 100;
            const isToday = day.date.toDateString() === new Date().toDateString();

            chartHTML += `
                <div class="bar-item">
                    <div class="bar" style="height: ${height}%;" title="${day.dateStr}: ${value}"></div>
                    <span class="bar-label ${isToday ? 'today' : ''}">${day.dateStr}</span>
                </div>
            `;
        });

        chartHTML += '</div>';

        // Add average info
        const avg = (values.reduce((a, b) => a + b, 0) / values.filter(v => v > 0).length) || 0;
        const unit = metricType === 'sleep' ? ' hrs' : (metricType === 'water' ? ' glasses' : ' steps');
        chartHTML += `<p class="chart-average">7-day average: ${avg.toFixed(1)}${unit}</p>`;

        container.innerHTML = chartHTML;
    }

    // Progress Charts
    renderProgress() {
        this.renderProgressCharts();
        this.populateExerciseSelector();
        this.renderPersonalRecords();
        this.renderPRHistory();
        this.renderAchievements();
        this.renderGoals();
        this.renderReport('week');
        this.renderSleep();
        this.renderCardio();
        this.renderJournal();
        this.renderQuickStats();
        this.initializeChartFilters();
        this.initializeExerciseProgressChart();
    }

    initializeChartFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chartType = e.target.dataset.chart;
                const days = parseInt(e.target.dataset.days);

                // Update active state
                document.querySelectorAll(`.filter-btn[data-chart="${chartType}"]`).forEach(b => {
                    b.classList.remove('active');
                });
                e.target.classList.add('active');

                // Re-render the specific chart
                if (chartType === 'weight') {
                    this.renderWeightProgressChart(days);
                } else if (chartType === 'volume') {
                    this.renderVolumeChart(days);
                } else if (chartType === 'calories') {
                    this.renderCaloriesChart(days);
                } else if (chartType === 'measurements') {
                    this.renderMeasurementsChart(days);
                }
            });
        });
    }

    renderProgressCharts() {
        this.renderWeightProgressChart(30);
        this.renderVolumeChart(30);
        this.renderCaloriesChart(30);
        this.renderMeasurementsChart(30);
    }

    renderWeightProgressChart(days = 30) {
        const weights = Storage.getAllDailyMetrics()
            .filter(m => m.weight)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        const canvas = document.getElementById('weightChart');
        const emptyState = document.getElementById('weightChartEmpty');

        if (weights.length === 0) {
            canvas.style.display = 'none';
            emptyState.classList.add('show');
            return;
        }

        canvas.style.display = 'block';
        emptyState.classList.remove('show');

        // Filter by days
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        const filteredWeights = weights.filter(w => new Date(w.date) >= cutoffDate);

        const labels = filteredWeights.map(w => {
            const date = new Date(w.date);
            return date.toLocaleDateString('en-NZ', { month: 'short', day: 'numeric' });
        });
        const data = filteredWeights.map(w => w.weight);

        const isDark = this.isDarkMode();
        const ctx = canvas.getContext('2d');

        // Destroy existing chart if it exists
        if (canvas.chart) {
            canvas.chart.destroy();
        }

        canvas.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Weight (kg)',
                    data: data,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#374151' : '#ffffff',
                        titleColor: isDark ? '#f9fafb' : '#1f2937',
                        bodyColor: isDark ? '#d1d5db' : '#6b7280',
                        borderColor: isDark ? '#4b5563' : '#e5e7eb',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            color: isDark ? '#d1d5db' : '#6b7280'
                        },
                        grid: {
                            color: isDark ? '#374151' : '#e5e7eb'
                        }
                    },
                    x: {
                        ticks: {
                            color: isDark ? '#d1d5db' : '#6b7280',
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            color: isDark ? '#374151' : '#e5e7eb'
                        }
                    }
                }
            }
        });
    }

    renderVolumeChart(days = 30) {
        const workouts = Storage.getAllWorkouts()
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        const canvas = document.getElementById('volumeChart');
        const emptyState = document.getElementById('volumeChartEmpty');

        if (workouts.length === 0) {
            canvas.style.display = 'none';
            emptyState.classList.add('show');
            return;
        }

        canvas.style.display = 'block';
        emptyState.classList.remove('show');

        // Filter by days
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        const filteredWorkouts = workouts.filter(w => new Date(w.date) >= cutoffDate);

        const labels = filteredWorkouts.map(w => {
            const date = new Date(w.date);
            return date.toLocaleDateString('en-NZ', { month: 'short', day: 'numeric' });
        });

        const data = filteredWorkouts.map(w => {
            let totalVolume = 0;
            w.exercises.forEach(ex => {
                ex.sets.forEach(set => {
                    totalVolume += (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0);
                });
            });
            return totalVolume;
        });

        const isDark = this.isDarkMode();
        const ctx = canvas.getContext('2d');

        // Destroy existing chart if it exists
        if (canvas.chart) {
            canvas.chart.destroy();
        }

        canvas.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Volume (kg)',
                    data: data,
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    borderColor: '#10b981',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#374151' : '#ffffff',
                        titleColor: isDark ? '#f9fafb' : '#1f2937',
                        bodyColor: isDark ? '#d1d5db' : '#6b7280',
                        borderColor: isDark ? '#4b5563' : '#e5e7eb',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: isDark ? '#d1d5db' : '#6b7280'
                        },
                        grid: {
                            color: isDark ? '#374151' : '#e5e7eb'
                        }
                    },
                    x: {
                        ticks: {
                            color: isDark ? '#d1d5db' : '#6b7280',
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    renderCaloriesChart(days = 30) {
        const foodDays = Storage.getAllFoodDays()
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        const canvas = document.getElementById('caloriesChart');
        const emptyState = document.getElementById('caloriesChartEmpty');

        if (foodDays.length === 0) {
            canvas.style.display = 'none';
            emptyState.classList.add('show');
            return;
        }

        canvas.style.display = 'block';
        emptyState.classList.remove('show');

        // Filter by days
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        const filteredDays = foodDays.filter(d => new Date(d.date) >= cutoffDate);

        const labels = filteredDays.map(d => {
            const date = new Date(d.date);
            return date.toLocaleDateString('en-NZ', { month: 'short', day: 'numeric' });
        });

        const data = filteredDays.map(d => {
            let totalCalories = 0;
            Object.values(d.meals).forEach(mealArray => {
                mealArray.forEach(item => {
                    totalCalories += parseFloat(item.calories) || 0;
                });
            });
            return totalCalories;
        });

        const isDark = this.isDarkMode();
        const ctx = canvas.getContext('2d');

        // Destroy existing chart if it exists
        if (canvas.chart) {
            canvas.chart.destroy();
        }

        canvas.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Calories',
                    data: data,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#374151' : '#ffffff',
                        titleColor: isDark ? '#f9fafb' : '#1f2937',
                        bodyColor: isDark ? '#d1d5db' : '#6b7280',
                        borderColor: isDark ? '#4b5563' : '#e5e7eb',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: isDark ? '#d1d5db' : '#6b7280'
                        },
                        grid: {
                            color: isDark ? '#374151' : '#e5e7eb'
                        }
                    },
                    x: {
                        ticks: {
                            color: isDark ? '#d1d5db' : '#6b7280',
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            color: isDark ? '#374151' : '#e5e7eb'
                        }
                    }
                }
            }
        });
    }

    renderMeasurementsChart(days = 30) {
        const measurements = Storage.getAllBodyMeasurements()
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        const canvas = document.getElementById('measurementsChart');
        const emptyState = document.getElementById('measurementsChartEmpty');

        if (measurements.length === 0) {
            canvas.style.display = 'none';
            emptyState.classList.add('show');
            return;
        }

        canvas.style.display = 'block';
        emptyState.classList.remove('show');

        // Filter by days
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        const filteredMeasurements = measurements.filter(m => new Date(m.date) >= cutoffDate);

        if (filteredMeasurements.length === 0) {
            canvas.style.display = 'none';
            emptyState.classList.add('show');
            return;
        }

        const labels = filteredMeasurements.map(m => {
            const date = new Date(m.date);
            return date.toLocaleDateString('en-NZ', { month: 'short', day: 'numeric' });
        });

        // Create datasets for each measurement that has data
        const datasets = [];
        const colors = {
            chest: { border: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
            waist: { border: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
            hips: { border: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
            shoulders: { border: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
            leftArm: { border: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
            rightArm: { border: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' }
        };

        const measurementsKeys = ['chest', 'waist', 'hips', 'shoulders', 'leftArm', 'rightArm'];

        measurementsKeys.forEach(key => {
            const data = filteredMeasurements.map(m => m[key] || null);
            const hasData = data.some(v => v !== null);

            if (hasData) {
                datasets.push({
                    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
                    data: data,
                    borderColor: colors[key].border,
                    backgroundColor: colors[key].bg,
                    tension: 0.4,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6
                });
            }
        });

        const isDark = this.isDarkMode();
        const ctx = canvas.getContext('2d');

        // Destroy existing chart if it exists
        if (canvas.chart) {
            canvas.chart.destroy();
        }

        canvas.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: isDark ? '#d1d5db' : '#6b7280',
                            padding: 10,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#374151' : '#ffffff',
                        titleColor: isDark ? '#f9fafb' : '#1f2937',
                        bodyColor: isDark ? '#d1d5db' : '#6b7280',
                        borderColor: isDark ? '#4b5563' : '#e5e7eb',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            color: isDark ? '#d1d5db' : '#6b7280',
                            callback: function(value) {
                                return value + ' cm';
                            }
                        },
                        grid: {
                            color: isDark ? '#374151' : '#e5e7eb'
                        }
                    },
                    x: {
                        ticks: {
                            color: isDark ? '#d1d5db' : '#6b7280',
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            color: isDark ? '#374151' : '#e5e7eb'
                        }
                    }
                }
            }
        });
    }

    populateExerciseSelector() {
        const workouts = Storage.getAllWorkouts();
        const exerciseNames = new Set();

        workouts.forEach(workout => {
            workout.exercises.forEach(exercise => {
                if (exercise.type === 'strength') {
                    exerciseNames.add(exercise.name);
                }
            });
        });

        const selector = document.getElementById('exerciseSelectChart');
        selector.innerHTML = '<option value="">Select an exercise...</option>';

        Array.from(exerciseNames).sort().forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            selector.appendChild(option);
        });
    }

    initializeExerciseProgressChart() {
        const selector = document.getElementById('exerciseSelectChart');
        selector.addEventListener('change', (e) => {
            if (e.target.value) {
                this.renderExerciseProgressChart(e.target.value);
            } else {
                document.getElementById('exerciseProgressChart').style.display = 'none';
                document.getElementById('exerciseProgressChartEmpty').classList.add('show');
            }
        });
    }

    renderExerciseProgressChart(exerciseName) {
        const workouts = Storage.getAllWorkouts().sort((a, b) => new Date(a.date) - new Date(b.date));
        const canvas = document.getElementById('exerciseProgressChart');
        const emptyState = document.getElementById('exerciseProgressChartEmpty');

        // Find all instances of this exercise across workouts
        const exerciseData = [];

        workouts.forEach(workout => {
            const exercise = workout.exercises.find(ex => ex.name === exerciseName);
            if (exercise && exercise.sets && exercise.sets.length > 0) {
                // Get max weight and max reps for this workout
                let maxWeight = 0;
                let maxReps = 0;

                exercise.sets.forEach(set => {
                    const weight = parseFloat(set.weight) || 0;
                    const reps = parseInt(set.reps) || 0;

                    if (weight > maxWeight) maxWeight = weight;
                    if (reps > maxReps) maxReps = reps;
                });

                exerciseData.push({
                    date: workout.date,
                    maxWeight: maxWeight,
                    maxReps: maxReps
                });
            }
        });

        if (exerciseData.length === 0) {
            canvas.style.display = 'none';
            emptyState.classList.add('show');
            emptyState.textContent = `No data found for ${exerciseName}`;
            return;
        }

        canvas.style.display = 'block';
        emptyState.classList.remove('show');

        const labels = exerciseData.map(d => {
            const date = new Date(d.date);
            return date.toLocaleDateString('en-NZ', { month: 'short', day: 'numeric' });
        });

        const isDark = this.isDarkMode();
        const ctx = canvas.getContext('2d');

        // Destroy existing chart if it exists
        if (canvas.chart) {
            canvas.chart.destroy();
        }

        canvas.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Max Weight (kg)',
                        data: exerciseData.map(d => d.maxWeight),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        yAxisID: 'y',
                        tension: 0.4,
                        fill: false,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: 'Max Reps',
                        data: exerciseData.map(d => d.maxReps),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        yAxisID: 'y1',
                        tension: 0.4,
                        fill: false,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: isDark ? '#d1d5db' : '#6b7280',
                            padding: 15,
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: `${exerciseName} - Strength Progress`,
                        color: isDark ? '#f9fafb' : '#1f2937',
                        font: {
                            size: 14,
                            weight: '700'
                        },
                        padding: {
                            bottom: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#374151' : '#ffffff',
                        titleColor: isDark ? '#f9fafb' : '#1f2937',
                        bodyColor: isDark ? '#d1d5db' : '#6b7280',
                        borderColor: isDark ? '#4b5563' : '#e5e7eb',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Weight (kg)',
                            color: isDark ? '#3b82f6' : '#3b82f6',
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        },
                        ticks: {
                            color: isDark ? '#d1d5db' : '#6b7280'
                        },
                        grid: {
                            color: isDark ? '#374151' : '#e5e7eb'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Reps',
                            color: isDark ? '#10b981' : '#10b981',
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        },
                        ticks: {
                            color: isDark ? '#d1d5db' : '#6b7280'
                        },
                        grid: {
                            drawOnChartArea: false,
                        }
                    },
                    x: {
                        ticks: {
                            color: isDark ? '#d1d5db' : '#6b7280',
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            color: isDark ? '#374151' : '#e5e7eb'
                        }
                    }
                }
            }
        });
    }

    renderPersonalRecords() {
        const workouts = Storage.getAllWorkouts();
        const container = document.getElementById('prBoardContainer');
        const emptyState = document.getElementById('prBoardEmpty');

        if (workouts.length === 0) {
            container.style.display = 'none';
            emptyState.classList.add('show');
            return;
        }

        // Calculate PRs for each exercise
        const exercisePRs = {};

        workouts.forEach(workout => {
            workout.exercises.forEach(exercise => {
                const exerciseName = exercise.name;

                if (!exercisePRs[exerciseName]) {
                    exercisePRs[exerciseName] = {
                        name: exerciseName,
                        maxWeight: 0,
                        maxWeightDate: null,
                        maxReps: 0,
                        maxRepsDate: null,
                        maxVolume: 0,
                        maxVolumeDate: null
                    };
                }

                exercise.sets.forEach(set => {
                    const weight = parseFloat(set.weight) || 0;
                    const reps = parseInt(set.reps) || 0;
                    const volume = weight * reps;

                    // Max weight
                    if (weight > exercisePRs[exerciseName].maxWeight) {
                        exercisePRs[exerciseName].maxWeight = weight;
                        exercisePRs[exerciseName].maxWeightDate = workout.date;
                    }

                    // Max reps (for bodyweight or same weight)
                    if (reps > exercisePRs[exerciseName].maxReps) {
                        exercisePRs[exerciseName].maxReps = reps;
                        exercisePRs[exerciseName].maxRepsDate = workout.date;
                    }

                    // Max volume (single set)
                    if (volume > exercisePRs[exerciseName].maxVolume) {
                        exercisePRs[exerciseName].maxVolume = volume;
                        exercisePRs[exerciseName].maxVolumeDate = workout.date;
                    }
                });
            });
        });

        // Convert to array and sort by max volume
        const prArray = Object.values(exercisePRs).sort((a, b) => b.maxVolume - a.maxVolume);

        if (prArray.length === 0) {
            container.style.display = 'none';
            emptyState.classList.add('show');
            return;
        }

        container.style.display = 'block';
        emptyState.classList.remove('show');

        // Render PR cards
        container.innerHTML = `
            <div class="pr-grid">
                ${prArray.map(pr => `
                    <div class="pr-card">
                        <div class="pr-card-header">
                            <div class="pr-exercise-name">${pr.name}</div>
                            <div class="pr-trophy">🏆</div>
                        </div>
                        <div class="pr-stats">
                            <div class="pr-stat-row">
                                <span class="pr-stat-label">💪 Max Weight</span>
                                <span class="pr-stat-value">${pr.maxWeight.toFixed(1)} kg</span>
                            </div>
                            <div class="pr-stat-row">
                                <span class="pr-stat-label">🔥 Max Reps</span>
                                <span class="pr-stat-value">${pr.maxReps}</span>
                            </div>
                            <div class="pr-stat-row">
                                <span class="pr-stat-label">📊 Max Volume</span>
                                <span class="pr-stat-value">${pr.maxVolume.toFixed(1)} kg</span>
                            </div>
                        </div>
                        <div class="pr-date">Last PR: ${formatDateNZ(new Date(pr.maxVolumeDate), { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderPRHistory() {
        const workouts = Storage.getAllWorkouts().sort((a, b) => new Date(a.date) - new Date(b.date));
        const container = document.getElementById('prHistoryContainer');
        const emptyState = document.getElementById('prHistoryEmpty');

        // Build PR history by tracking records over time
        const prHistory = [];
        const exerciseRecords = {};

        workouts.forEach(workout => {
            workout.exercises.forEach(exercise => {
                if (exercise.type === 'strength') {
                    const exerciseName = exercise.name;

                    if (!exerciseRecords[exerciseName]) {
                        exerciseRecords[exerciseName] = {
                            maxWeight: 0,
                            maxReps: 0,
                            maxVolume: 0
                        };
                    }

                    let currentMaxWeight = 0;
                    let currentMaxReps = 0;
                    let currentMaxVolume = 0;

                    exercise.sets.forEach(set => {
                        const weight = parseFloat(set.weight) || 0;
                        const reps = parseInt(set.reps) || 0;
                        const volume = weight * reps;

                        if (weight > currentMaxWeight) currentMaxWeight = weight;
                        if (reps > currentMaxReps) currentMaxReps = reps;
                        if (volume > currentMaxVolume) currentMaxVolume = volume;
                    });

                    const newRecords = [];

                    // Check for new weight PR
                    if (currentMaxWeight > exerciseRecords[exerciseName].maxWeight) {
                        newRecords.push({
                            type: 'weight',
                            label: 'Max Weight',
                            emoji: '💪',
                            previous: exerciseRecords[exerciseName].maxWeight,
                            new: currentMaxWeight,
                            unit: 'kg'
                        });
                        exerciseRecords[exerciseName].maxWeight = currentMaxWeight;
                    }

                    // Check for new reps PR
                    if (currentMaxReps > exerciseRecords[exerciseName].maxReps) {
                        newRecords.push({
                            type: 'reps',
                            label: 'Max Reps',
                            emoji: '🔥',
                            previous: exerciseRecords[exerciseName].maxReps,
                            new: currentMaxReps,
                            unit: ''
                        });
                        exerciseRecords[exerciseName].maxReps = currentMaxReps;
                    }

                    // Check for new volume PR
                    if (currentMaxVolume > exerciseRecords[exerciseName].maxVolume) {
                        newRecords.push({
                            type: 'volume',
                            label: 'Max Volume',
                            emoji: '📊',
                            previous: exerciseRecords[exerciseName].maxVolume,
                            new: currentMaxVolume,
                            unit: 'kg'
                        });
                        exerciseRecords[exerciseName].maxVolume = currentMaxVolume;
                    }

                    if (newRecords.length > 0) {
                        prHistory.push({
                            date: workout.date,
                            exercise: exerciseName,
                            records: newRecords
                        });
                    }
                }
            });
        });

        if (prHistory.length === 0) {
            container.style.display = 'none';
            emptyState.classList.add('show');
            return;
        }

        container.style.display = 'block';
        emptyState.classList.remove('show');

        // Reverse to show newest first
        prHistory.reverse();

        container.innerHTML = `
            <div class="pr-timeline">
                ${prHistory.map(pr => `
                    <div class="pr-timeline-item">
                        <div class="pr-timeline-date">
                            ${formatDateNZ(new Date(pr.date), { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div class="pr-timeline-exercise">${pr.exercise}</div>
                        <div class="pr-timeline-records">
                            ${pr.records.map(record => {
                                const improvement = record.previous > 0
                                    ? `+${(record.new - record.previous).toFixed(1)}${record.unit}`
                                    : 'First!';
                                return `
                                    <div class="pr-timeline-record">
                                        <span>${record.emoji}</span>
                                        <span class="pr-timeline-record-label">${record.label}:</span>
                                        <span class="pr-timeline-record-value">${record.new.toFixed(record.type === 'reps' ? 0 : 1)}${record.unit}</span>
                                        <span class="pr-timeline-record-improvement">(${improvement})</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderAchievements() {
        const achievements = this.calculateAchievements();
        const container = document.getElementById('achievementsContainer');

        container.innerHTML = `
            <div class="achievements-grid">
                ${achievements.map(achievement => {
                    const isUnlocked = achievement.unlocked;
                    const isNew = achievement.newlyUnlocked;

                    return `
                        <div class="achievement-badge ${isUnlocked ? 'unlocked' : 'locked'}">
                            ${isNew ? '<div class="achievement-new-badge">NEW!</div>' : ''}
                            <div class="achievement-icon">${achievement.icon}</div>
                            <div class="achievement-name">${achievement.name}</div>
                            <div class="achievement-description">${achievement.description}</div>
                            <div class="achievement-progress">
                                ${isUnlocked ? '✅ Unlocked' : `${achievement.current}/${achievement.target}`}
                            </div>
                            ${isUnlocked && achievement.date ? `<div class="achievement-date">${formatDateNZ(new Date(achievement.date), { month: 'short', day: 'numeric', year: 'numeric' })}</div>` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    calculateAchievements() {
        const workouts = Storage.getAllWorkouts();
        const foodDays = Storage.getAllFoodDays();
        const daysSinceStart = Storage.getDaysSinceStart() || 0;
        const photos = Storage.getAllProgressPhotos();

        // Get stored achievements to check for new ones
        const storedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements') || '{}');
        const newUnlocks = [];

        // Define all achievements
        const achievementsList = [
            {
                id: 'first_workout',
                name: 'First Workout',
                description: 'Complete your first workout',
                icon: '💪',
                target: 1,
                current: workouts.length,
                unlocked: workouts.length >= 1
            },
            {
                id: 'workout_10',
                name: 'Consistent',
                description: 'Complete 10 workouts',
                icon: '🔥',
                target: 10,
                current: workouts.length,
                unlocked: workouts.length >= 10
            },
            {
                id: 'workout_50',
                name: 'Dedicated',
                description: 'Complete 50 workouts',
                icon: '⚡',
                target: 50,
                current: workouts.length,
                unlocked: workouts.length >= 50
            },
            {
                id: 'workout_100',
                name: 'Champion',
                description: 'Complete 100 workouts',
                icon: '👑',
                target: 100,
                current: workouts.length,
                unlocked: workouts.length >= 100
            },
            {
                id: 'streak_7',
                name: '7-Day Streak',
                description: 'Track food for 7 days',
                icon: '🍽️',
                target: 7,
                current: foodDays.length,
                unlocked: foodDays.length >= 7
            },
            {
                id: 'streak_30',
                name: '30-Day Streak',
                description: 'Track food for 30 days',
                icon: '📊',
                target: 30,
                current: foodDays.length,
                unlocked: foodDays.length >= 30
            },
            {
                id: 'journey_7',
                name: 'Week Warrior',
                description: 'Complete 7 days',
                icon: '📅',
                target: 7,
                current: daysSinceStart,
                unlocked: daysSinceStart >= 7
            },
            {
                id: 'journey_30',
                name: 'Month Master',
                description: 'Complete 30 days',
                icon: '🗓️',
                target: 30,
                current: daysSinceStart,
                unlocked: daysSinceStart >= 30
            },
            {
                id: 'journey_90',
                name: 'Quarter Crusher',
                description: 'Complete 90 days',
                icon: '🎯',
                target: 90,
                current: daysSinceStart,
                unlocked: daysSinceStart >= 90
            },
            {
                id: 'journey_365',
                name: 'Year Legend',
                description: 'Complete 365 days',
                icon: '🏅',
                target: 365,
                current: daysSinceStart,
                unlocked: daysSinceStart >= 365
            },
            {
                id: 'progress_photo',
                name: 'Documented',
                description: 'Take first progress photo',
                icon: '📸',
                target: 1,
                current: photos.length,
                unlocked: photos.length >= 1
            },
            {
                id: 'progress_photos_10',
                name: 'Visual Journey',
                description: 'Take 10 progress photos',
                icon: '📷',
                target: 10,
                current: photos.length,
                unlocked: photos.length >= 10
            }
        ];

        // Check for newly unlocked achievements
        achievementsList.forEach(achievement => {
            if (achievement.unlocked && !storedAchievements[achievement.id]) {
                achievement.newlyUnlocked = true;
                newUnlocks.push(achievement.id);
                storedAchievements[achievement.id] = new Date().toISOString();
            }
            achievement.date = storedAchievements[achievement.id];
        });

        // Store updated achievements
        if (newUnlocks.length > 0) {
            localStorage.setItem('unlockedAchievements', JSON.stringify(storedAchievements));
        }

        return achievementsList;
    }

    renderQuickStats() {
        const workouts = Storage.getAllWorkouts();
        const foodDays = Storage.getAllFoodDays();
        const daysSinceStart = Storage.getDaysSinceStart() || 0;

        console.log('QuickStats Debug:', {
            workoutsCount: workouts.length,
            foodDaysCount: foodDays.length,
            daysSinceStart: daysSinceStart,
            workouts: workouts,
            foodDays: foodDays
        });

        // Total workouts
        document.getElementById('totalWorkouts').textContent = workouts.length;

        // Total volume
        let totalVolume = 0;
        workouts.forEach(w => {
            w.exercises.forEach(ex => {
                ex.sets.forEach(set => {
                    totalVolume += (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0);
                });
            });
        });
        document.getElementById('totalVolume').textContent = Math.round(totalVolume).toLocaleString() + ' kg';

        // Average calories
        if (foodDays.length > 0) {
            let totalCalories = 0;
            foodDays.forEach(d => {
                Object.values(d.meals).forEach(mealArray => {
                    mealArray.forEach(item => {
                        totalCalories += parseFloat(item.calories) || 0;
                    });
                });
            });
            const avgCalories = Math.round(totalCalories / foodDays.length);
            document.getElementById('avgCalories').textContent = avgCalories.toLocaleString();
        } else {
            document.getElementById('avgCalories').textContent = '0';
        }

        // Journey days
        document.getElementById('journeyDays').textContent = daysSinceStart;
    }

    // ===== CALENDAR FUNCTIONS =====
    renderCalendar() {
        if (!this.currentCalendarDate) {
            this.currentCalendarDate = getCurrentDateNZ();
        }

        const year = this.currentCalendarDate.getFullYear();
        const month = this.currentCalendarDate.getMonth();

        // Update month/year title
        document.getElementById('calendarMonthYear').textContent =
            this.currentCalendarDate.toLocaleDateString('en-NZ', { month: 'long', year: 'numeric' });

        // Get first and last day of month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        // Get workouts and rest days
        const workouts = Storage.getAllWorkouts();
        const restDays = Storage.getAllRestDays();
        const today = getCurrentDateNZ();

        // Create calendar days array
        const calendarDays = [];

        // Add previous month's days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            calendarDays.push({
                day: prevMonthLastDay - i,
                isCurrentMonth: false
            });
        }

        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateStr = date.toDateString();
            const todayStr = today.toDateString();

            const hasWorkout = workouts.some(w => new Date(w.date).toDateString() === dateStr);
            const isRest = restDays.some(r => new Date(r.date).toDateString() === dateStr);
            const isToday = dateStr === todayStr;

            calendarDays.push({
                day,
                date: new Date(year, month, day),
                isCurrentMonth: true,
                isToday,
                hasWorkout,
                isRest
            });
        }

        // Add next month's days
        const remainingDays = 42 - calendarDays.length;
        for (let day = 1; day <= remainingDays; day++) {
            calendarDays.push({
                day,
                isCurrentMonth: false
            });
        }

        // Render calendar
        const container = document.getElementById('calendarDays');
        container.innerHTML = calendarDays.map(dayInfo => {
            let classes = ['calendar-day'];
            if (!dayInfo.isCurrentMonth) classes.push('other-month');
            if (dayInfo.isToday) classes.push('today');
            if (dayInfo.hasWorkout) classes.push('workout-day');
            if (dayInfo.isRest) classes.push('rest-day');

            const dateStr = dayInfo.date ? dayInfo.date.toISOString() : '';

            return `
                <div class="${classes.join(' ')}" onclick="${dayInfo.isCurrentMonth ? `app.handleCalendarDayClick('${dateStr}')` : ''}">
                    <div class="calendar-day-number">${dayInfo.day}</div>
                    ${(dayInfo.hasWorkout || dayInfo.isRest) ? '<div class="calendar-day-indicator"></div>' : ''}
                </div>
            `;
        }).join('');

        // Calculate and render streaks
        this.renderStreaks();
    }

    previousMonth() {
        const current = this.currentCalendarDate || getCurrentDateNZ();
        this.currentCalendarDate = new Date(current.getFullYear(), current.getMonth() - 1, 1);
        this.renderCalendar();
    }

    nextMonth() {
        const current = this.currentCalendarDate || getCurrentDateNZ();
        this.currentCalendarDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
        this.renderCalendar();
    }

    handleCalendarDayClick(dateStr) {
        const date = new Date(dateStr);

        // Open date history modal or rest day modal depending on what exists
        const workouts = Storage.getAllWorkouts();
        const hasWorkout = workouts.some(w => new Date(w.date).toDateString() === date.toDateString());

        if (hasWorkout) {
            this.openDateHistoryModal(date);
        } else {
            // Open rest day modal with this date pre-selected
            this.openRestDayModal(date);
        }
    }

    renderStreaks() {
        const workouts = Storage.getAllWorkouts();
        const today = getCurrentDateNZ();

        // Calculate current streak
        let currentStreak = 0;
        let checkDate = new Date(today);
        checkDate.setHours(0, 0, 0, 0);

        while (true) {
            const dateStr = checkDate.toDateString();
            const hasWorkout = workouts.some(w => new Date(w.date).toDateString() === dateStr);

            if (hasWorkout) {
                currentStreak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                // Check if it's today - if so, check yesterday
                if (checkDate.toDateString() === today.toDateString()) {
                    checkDate.setDate(checkDate.getDate() - 1);
                    continue;
                }
                break;
            }
        }

        // Calculate longest streak
        let longestStreak = 0;
        let tempStreak = 0;

        // Sort workouts by date
        const sortedWorkouts = workouts.map(w => new Date(w.date).toDateString())
            .sort((a, b) => new Date(a) - new Date(b));

        // Remove duplicates
        const uniqueDates = [...new Set(sortedWorkouts)];

        for (let i = 0; i < uniqueDates.length; i++) {
            if (i === 0) {
                tempStreak = 1;
            } else {
                const prevDate = new Date(uniqueDates[i - 1]);
                const currDate = new Date(uniqueDates[i]);
                const diffDays = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    tempStreak++;
                } else {
                    if (tempStreak > longestStreak) {
                        longestStreak = tempStreak;
                    }
                    tempStreak = 1;
                }
            }
        }

        if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
        }

        // Update UI
        document.getElementById('currentStreakValue').textContent = currentStreak;
        document.getElementById('currentStreakDays').textContent = currentStreak === 1 ? 'day' : 'days';
        document.getElementById('longestStreakValue').textContent = longestStreak;
        document.getElementById('longestStreakDays').textContent = longestStreak === 1 ? 'day' : 'days';
    }

    openRestDayModal(date = null) {
        const dateInput = document.getElementById('restDayDateInput');
        const noteInput = document.getElementById('restDayNoteInput');
        const saveBtn = document.getElementById('saveRestDayBtn');
        const removeBtn = document.getElementById('removeRestDayBtn');

        if (date) {
            // Format date for input (YYYY-MM-DD)
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            dateInput.value = `${year}-${month}-${day}`;

            // Check if rest day exists
            const restDay = Storage.getRestDayByDate(date);
            if (restDay) {
                noteInput.value = restDay.note || '';
                removeBtn.style.display = 'inline-block';
            } else {
                noteInput.value = '';
                removeBtn.style.display = 'none';
            }
        } else {
            const today = getCurrentDateNZ();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            dateInput.value = `${year}-${month}-${day}`;
            noteInput.value = '';
            removeBtn.style.display = 'none';
        }

        this.openModal('restDayModal');
    }

    saveRestDay() {
        const dateInput = document.getElementById('restDayDateInput').value;
        const noteInput = document.getElementById('restDayNoteInput').value;

        if (!dateInput) {
            alert('Please select a date');
            return;
        }

        const date = new Date(dateInput + 'T00:00:00');
        Storage.addRestDay(date, noteInput);

        this.closeModal('restDayModal');
        this.renderCalendar();
        this.syncAfterChange();
    }

    removeRestDay() {
        const dateInput = document.getElementById('restDayDateInput').value;

        if (!dateInput) {
            return;
        }

        const date = new Date(dateInput + 'T00:00:00');
        Storage.removeRestDay(date);

        this.closeModal('restDayModal');
        this.renderCalendar();
        this.syncAfterChange();
    }

    // ===== GOALS FUNCTIONS =====
    renderGoals() {
        const goals = Storage.getAllGoals();
        const container = document.getElementById('goalsContainer');
        const emptyState = document.getElementById('goalsEmpty');

        if (goals.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        container.style.display = 'block';
        emptyState.style.display = 'none';

        container.innerHTML = `
            <div class="goals-grid">
                ${goals.map(goal => {
                    const progress = goal.targetValue > 0 ? (goal.currentValue / goal.targetValue * 100) : 0;
                    const progressClamped = Math.min(progress, 100);

                    let deadlineHTML = '';
                    if (goal.deadline) {
                        const deadline = new Date(goal.deadline);
                        const daysUntil = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));
                        let deadlineClass = '';

                        if (daysUntil < 0) {
                            deadlineHTML = `<div class="goal-deadline">📅 Overdue by ${Math.abs(daysUntil)} days</div>`;
                            deadlineClass = 'urgent';
                        } else if (daysUntil <= 7) {
                            deadlineHTML = `<div class="goal-deadline urgent">📅 ${daysUntil} days left</div>`;
                        } else if (daysUntil <= 30) {
                            deadlineHTML = `<div class="goal-deadline approaching">📅 ${daysUntil} days left</div>`;
                        } else {
                            deadlineHTML = `<div class="goal-deadline">📅 Due ${formatDateNZ(deadline, { month: 'short', day: 'numeric', year: 'numeric' })}</div>`;
                        }
                    }

                    return `
                        <div class="goal-card ${goal.completed ? 'completed' : ''}">
                            ${goal.completed ? '<div class="goal-completed-badge">✅ Completed</div>' : ''}
                            <div class="goal-header">
                                <span class="goal-category-badge ${goal.category}">${goal.category}</span>
                                <div class="goal-actions">
                                    ${!goal.completed ? `<button class="goal-action-btn" onclick="app.updateGoalProgress(${goal.id})" title="Update Progress">📊</button>` : ''}
                                    <button class="goal-action-btn" onclick="app.deleteGoal(${goal.id})" title="Delete">🗑️</button>
                                </div>
                            </div>
                            <div class="goal-title">${goal.title}</div>
                            ${goal.description ? `<div class="goal-description">${goal.description}</div>` : ''}
                            <div class="goal-progress-section">
                                <div class="goal-progress-bar">
                                    <div class="goal-progress-fill" style="width: ${progressClamped}%"></div>
                                </div>
                                <div class="goal-progress-text">
                                    <span class="goal-current">${goal.currentValue.toFixed(1)} ${goal.unit}</span>
                                    <span class="goal-target">/ ${goal.targetValue.toFixed(1)} ${goal.unit}</span>
                                </div>
                            </div>
                            ${deadlineHTML}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    openAddGoalModal() {
        document.getElementById('goalTitleInput').value = '';
        document.getElementById('goalCategoryInput').value = 'strength';
        document.getElementById('goalDescriptionInput').value = '';
        document.getElementById('goalTargetInput').value = '';
        document.getElementById('goalCurrentInput').value = '0';
        document.getElementById('goalUnitInput').value = '';
        document.getElementById('goalDeadlineInput').value = '';

        this.openModal('addGoalModal');
    }

    saveGoal() {
        const title = document.getElementById('goalTitleInput').value;
        const category = document.getElementById('goalCategoryInput').value;
        const description = document.getElementById('goalDescriptionInput').value;
        const targetValue = document.getElementById('goalTargetInput').value;
        const currentValue = document.getElementById('goalCurrentInput').value;
        const unit = document.getElementById('goalUnitInput').value;
        const deadline = document.getElementById('goalDeadlineInput').value;

        if (!title || !targetValue || !unit) {
            alert('Please fill in all required fields');
            return;
        }

        const goal = {
            title,
            category,
            description,
            targetValue,
            currentValue,
            unit,
            deadline
        };

        Storage.addGoal(goal);

        this.closeModal('addGoalModal');
        this.renderGoals();
        this.syncAfterChange();
    }

    updateGoalProgress(goalId) {
        const goal = Storage.getGoalById(goalId);
        if (!goal) return;

        const newValue = prompt(`Update progress for "${goal.title}"\nCurrent: ${goal.currentValue} ${goal.unit}\nEnter new value:`, goal.currentValue);

        if (newValue !== null && newValue !== '') {
            Storage.updateGoal(goalId, { currentValue: parseFloat(newValue) });
            this.renderGoals();
            this.syncAfterChange();
        }
    }

    deleteGoal(goalId) {
        if (confirm('Are you sure you want to delete this goal?')) {
            Storage.deleteGoal(goalId);
            this.renderGoals();
            this.syncAfterChange();
        }
    }

    // ===== REPORTS FUNCTIONS =====
    switchReportTab(period) {
        // Update active tab
        document.querySelectorAll('.report-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-period="${period}"]`).classList.add('active');

        // Render report for this period
        this.renderReport(period);
    }

    renderReport(period = 'week') {
        const container = document.getElementById('reportsContainer');
        const today = getCurrentDateNZ();

        console.log('RenderReport Debug - Period:', period, 'Today:', today);

        let startDate, endDate, periodLabel;

        if (period === 'week') {
            // This week (Sunday to Saturday)
            const dayOfWeek = today.getDay();
            startDate = new Date(today);
            startDate.setDate(today.getDate() - dayOfWeek);
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);
            endDate.setHours(23, 59, 59, 999);

            periodLabel = `${formatDateNZ(startDate, { month: 'short', day: 'numeric' })} - ${formatDateNZ(endDate, { month: 'short', day: 'numeric' })}`;
        } else if (period === 'month') {
            // This month
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
            periodLabel = today.toLocaleDateString('en-NZ', { month: 'long', year: 'numeric' });
        } else {
            // This year
            startDate = new Date(today.getFullYear(), 0, 1);
            endDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
            periodLabel = today.getFullYear().toString();
        }

        // Calculate stats
        const workouts = Storage.getAllWorkouts();
        const foodDays = Storage.getAllFoodDays();

        const periodWorkouts = workouts.filter(w => {
            const date = new Date(w.date);
            return date >= startDate && date <= endDate;
        });

        const periodFoodDays = foodDays.filter(d => {
            const date = new Date(d.date);
            return date >= startDate && date <= endDate;
        });

        console.log('Report Data Debug:', {
            period: period,
            startDate: startDate,
            endDate: endDate,
            totalWorkouts: workouts.length,
            periodWorkouts: periodWorkouts.length,
            totalFoodDays: foodDays.length,
            periodFoodDays: periodFoodDays.length,
            workoutDates: workouts.map(w => w.date),
            foodDates: foodDays.map(d => d.date)
        });

        // Calculate total volume
        let totalVolume = 0;
        periodWorkouts.forEach(w => {
            w.exercises.forEach(ex => {
                ex.sets.forEach(set => {
                    totalVolume += (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0);
                });
            });
        });

        // Calculate total calories
        let totalCalories = 0;
        periodFoodDays.forEach(d => {
            Object.values(d.meals).forEach(mealArray => {
                mealArray.forEach(item => {
                    totalCalories += parseFloat(item.calories) || 0;
                });
            });
        });

        // Get highlights
        const highlights = this.generateReportHighlights(periodWorkouts, periodFoodDays, startDate, endDate);

        container.innerHTML = `
            <div class="report-summary">
                <div class="report-period">${periodLabel}</div>
                <div class="report-stats-grid">
                    <div class="report-stat">
                        <div class="report-stat-value">${periodWorkouts.length}</div>
                        <div class="report-stat-label">Workouts</div>
                    </div>
                    <div class="report-stat">
                        <div class="report-stat-value">${Math.round(totalVolume / 1000)}k</div>
                        <div class="report-stat-label">Total Volume (kg)</div>
                    </div>
                    <div class="report-stat">
                        <div class="report-stat-value">${Math.round(totalCalories / 1000)}k</div>
                        <div class="report-stat-label">Total Calories</div>
                    </div>
                    <div class="report-stat">
                        <div class="report-stat-value">${periodFoodDays.length}</div>
                        <div class="report-stat-label">Days Logged</div>
                    </div>
                </div>

                <div class="report-highlights">
                    <h4>📊 Highlights</h4>
                    ${highlights.length > 0 ? highlights.map(h => `
                        <div class="report-highlight-item">
                            <span class="report-highlight-icon">${h.icon}</span>
                            <span class="report-highlight-text">${h.text}</span>
                        </div>
                    `).join('') : '<div class="report-highlight-item"><span class="report-highlight-text">No highlights yet. Keep training!</span></div>'}
                </div>
            </div>
        `;
    }

    generateReportHighlights(workouts, foodDays, startDate, endDate) {
        const highlights = [];

        // Most worked muscle groups
        const muscleGroups = {};
        workouts.forEach(w => {
            w.exercises.forEach(ex => {
                const muscle = ex.name.split(' ')[0]; // Simple heuristic
                muscleGroups[muscle] = (muscleGroups[muscle] || 0) + 1;
            });
        });

        const topMuscle = Object.entries(muscleGroups).sort((a, b) => b[1] - a[1])[0];
        if (topMuscle) {
            highlights.push({
                icon: '💪',
                text: `Most trained: ${topMuscle[0]} (${topMuscle[1]} exercises)`
            });
        }

        // Workout frequency
        if (workouts.length > 0) {
            const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            const frequency = (workouts.length / days * 7).toFixed(1);
            highlights.push({
                icon: '📅',
                text: `${frequency} workouts per week on average`
            });
        }

        // Weight PRs
        const allWorkouts = Storage.getAllWorkouts();
        const newPRs = this.findNewPRs(allWorkouts, startDate, endDate);
        if (newPRs.length > 0) {
            highlights.push({
                icon: '🏆',
                text: `${newPRs.length} new personal records!`
            });
        }

        // Consistency
        if (workouts.length >= 3) {
            highlights.push({
                icon: '🔥',
                text: 'Great consistency! Keep it up!'
            });
        }

        return highlights;
    }

    findNewPRs(allWorkouts, startDate, endDate) {
        const prs = [];
        // This is a simplified version - tracks volume PRs in period
        const exerciseRecords = {};

        allWorkouts.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(workout => {
            const workoutDate = new Date(workout.date);
            workout.exercises.forEach(ex => {
                if (!exerciseRecords[ex.name]) {
                    exerciseRecords[ex.name] = 0;
                }

                let totalVolume = 0;
                ex.sets.forEach(set => {
                    totalVolume += (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0);
                });

                if (totalVolume > exerciseRecords[ex.name] && workoutDate >= startDate && workoutDate <= endDate) {
                    prs.push({ exercise: ex.name, volume: totalVolume, date: workout.date });
                }

                exerciseRecords[ex.name] = Math.max(exerciseRecords[ex.name], totalVolume);
            });
        });

        return prs;
    }

    // ===== WATER INTAKE FUNCTIONS =====
    renderWaterTracker() {
        const today = getCurrentDateNZ();
        const waterData = Storage.getWaterIntakeForDate(today);

        const progress = waterData.goal > 0 ? (waterData.glasses / waterData.goal * 100) : 0;
        const progressClamped = Math.min(progress, 100);

        // Render water glass icons
        const glassesContainer = document.getElementById('waterGlassesIcons');
        let glassesHTML = '';
        for (let i = 0; i < waterData.goal; i++) {
            glassesHTML += i < waterData.glasses ? '💧' : '🌫️';
        }
        glassesContainer.innerHTML = glassesHTML;

        // Update progress text and bar
        document.getElementById('waterProgressText').textContent = `${waterData.glasses} / ${waterData.goal} glasses`;
        document.getElementById('waterProgressFill').style.width = `${progressClamped}%`;
    }

    addWaterGlass() {
        const today = getCurrentDateNZ();
        Storage.addWaterGlass(today);
        this.renderWaterTracker();
        this.syncAfterChange();
    }

    removeWaterGlass() {
        const today = getCurrentDateNZ();
        Storage.removeWaterGlass(today);
        this.renderWaterTracker();
        this.syncAfterChange();
    }

    openWaterGoalModal() {
        const today = getCurrentDateNZ();
        const waterData = Storage.getWaterIntakeForDate(today);
        document.getElementById('waterGoalInput').value = waterData.goal;
        this.openModal('waterGoalModal');
    }

    saveWaterGoal() {
        const goal = parseInt(document.getElementById('waterGoalInput').value);
        if (!goal || goal < 1) {
            alert('Please enter a valid goal');
            return;
        }

        const today = getCurrentDateNZ();
        Storage.setWaterGoal(goal, today);
        this.closeModal('waterGoalModal');
        this.renderWaterTracker();
        this.syncAfterChange();
    }

    // ===== SLEEP TRACKING FUNCTIONS =====
    renderSleep() {
        const logs = Storage.getAllSleepLogs();
        const container = document.getElementById('sleepContainer');
        const emptyState = document.getElementById('sleepEmpty');

        if (logs.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        container.style.display = 'grid';
        emptyState.style.display = 'none';

        // Show last 7 days
        const recentLogs = logs.slice(0, 7);

        container.innerHTML = recentLogs.map(log => {
            const qualityEmoji = {
                'excellent': '😊',
                'good': '🙂',
                'fair': '😐',
                'poor': '😞'
            };

            return `
                <div class="sleep-card">
                    <div class="sleep-header">
                        <span class="sleep-date">${formatDateNZ(new Date(log.date), { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <button class="sleep-delete-btn" onclick="app.deleteSleep(${log.id})" title="Delete">🗑️</button>
                    </div>
                    <div class="sleep-hours">${log.hours} hours</div>
                    <span class="sleep-quality ${log.quality}">${qualityEmoji[log.quality] || '😐'} ${log.quality}</span>
                    ${log.notes ? `<div class="sleep-notes">${log.notes}</div>` : ''}
                </div>
            `;
        }).join('');
    }

    openAddSleepModal() {
        const today = getCurrentDateNZ();
        document.getElementById('sleepDateInput').value = today.toISOString().split('T')[0];
        document.getElementById('sleepHoursInput').value = '';
        document.getElementById('sleepQualityInput').value = 'good';
        document.getElementById('sleepNotesInput').value = '';

        this.openModal('addSleepModal');
    }

    saveSleepLog() {
        const date = document.getElementById('sleepDateInput').value;
        const hours = document.getElementById('sleepHoursInput').value;
        const quality = document.getElementById('sleepQualityInput').value;
        const notes = document.getElementById('sleepNotesInput').value;

        if (!date || !hours) {
            alert('Please fill in date and hours');
            return;
        }

        Storage.addSleepLog({ date, hours, quality, notes });

        // Also update DAILY_METRICS so it shows in Dashboard
        const logDate = new Date(date);
        const today = getCurrentDateNZ();
        if (logDate.toDateString() === today.toDateString()) {
            Storage.updateTodayMetrics({ sleepHours: parseFloat(hours) });
        }

        this.closeModal('addSleepModal');
        this.renderSleep();
        this.renderDashboard(); // Refresh dashboard to show new data
        this.syncAfterChange();
    }

    deleteSleep(logId) {
        if (confirm('Delete this sleep log?')) {
            Storage.deleteSleepLog(logId);
            this.renderSleep();
            this.syncAfterChange();
        }
    }

    // ===== CARDIO TRACKING FUNCTIONS =====
    renderCardio() {
        const sessions = Storage.getAllCardioSessions();
        const container = document.getElementById('cardioContainer');
        const emptyState = document.getElementById('cardioEmpty');

        if (sessions.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        container.style.display = 'grid';
        emptyState.style.display = 'none';

        // Show last 10 sessions
        const recentSessions = sessions.slice(0, 10);

        const typeIcons = {
            'running': '🏃',
            'cycling': '🚴',
            'swimming': '🏊',
            'walking': '🚶',
            'rowing': '🚣',
            'other': '🏋️'
        };

        container.innerHTML = recentSessions.map(session => `
            <div class="cardio-card">
                <div class="cardio-header">
                    <div>
                        <div class="cardio-type-icon">${typeIcons[session.type] || '🏃'}</div>
                        <div class="cardio-type-name">${session.type.charAt(0).toUpperCase() + session.type.slice(1)}</div>
                        <div class="cardio-date">${formatDateNZ(new Date(session.date), { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                    <div class="cardio-actions">
                        <button class="cardio-action-btn" onclick="app.deleteCardio(${session.id})" title="Delete">🗑️</button>
                    </div>
                </div>
                <div class="cardio-stats-grid">
                    <div class="cardio-stat">
                        <span class="cardio-stat-value">${session.duration}</span>
                        <span class="cardio-stat-label">Minutes</span>
                    </div>
                    <div class="cardio-stat">
                        <span class="cardio-stat-value">${session.distance.toFixed(1)}</span>
                        <span class="cardio-stat-label">Km</span>
                    </div>
                    <div class="cardio-stat">
                        <span class="cardio-stat-value">${session.calories}</span>
                        <span class="cardio-stat-label">Calories</span>
                    </div>
                </div>
                ${session.notes ? `<div class="cardio-notes">${session.notes}</div>` : ''}
            </div>
        `).join('');
    }

    openAddCardioModal() {
        const today = getCurrentDateNZ();
        document.getElementById('cardioDateInput').value = today.toISOString().split('T')[0];
        document.getElementById('cardioTypeInput').value = 'running';
        document.getElementById('cardioDurationInput').value = '';
        document.getElementById('cardioDistanceInput').value = '';
        document.getElementById('cardioCaloriesInput').value = '';
        document.getElementById('cardioNotesInput').value = '';

        this.openModal('addCardioModal');
    }

    saveCardio() {
        const date = document.getElementById('cardioDateInput').value;
        const type = document.getElementById('cardioTypeInput').value;
        const duration = document.getElementById('cardioDurationInput').value;
        const distance = document.getElementById('cardioDistanceInput').value;
        const calories = document.getElementById('cardioCaloriesInput').value;
        const notes = document.getElementById('cardioNotesInput').value;

        if (!date || !duration) {
            alert('Please fill in date and duration');
            return;
        }

        Storage.addCardioSession({ date, type, duration, distance, calories, notes });

        this.closeModal('addCardioModal');
        this.renderCardio();
        this.syncAfterChange();
    }

    deleteCardio(sessionId) {
        if (confirm('Delete this cardio session?')) {
            Storage.deleteCardioSession(sessionId);
            this.renderCardio();
            this.syncAfterChange();
        }
    }

    // ===== JOURNAL FUNCTIONS =====
    renderJournal() {
        const entries = Storage.getAllJournalEntries();
        const container = document.getElementById('journalContainer');
        const emptyState = document.getElementById('journalEmpty');

        if (entries.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        container.style.display = 'flex';
        emptyState.style.display = 'none';

        // Show last 5 entries
        const recentEntries = entries.slice(0, 5);

        const moodEmojis = {
            'motivated': '💪',
            'happy': '😊',
            'neutral': '😐',
            'tired': '😴',
            'sore': '😣'
        };

        container.innerHTML = recentEntries.map(entry => `
            <div class="journal-entry">
                <div class="journal-header">
                    <div class="journal-title-area">
                        ${entry.title ? `<div class="journal-title">${entry.title}</div>` : ''}
                        <div class="journal-date">${formatDateNZ(new Date(entry.date), { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                    <div class="journal-actions">
                        <button class="journal-action-btn" onclick="app.deleteJournal(${entry.id})" title="Delete">🗑️</button>
                    </div>
                </div>
                ${entry.mood || entry.energy ? `
                    <div class="journal-meta">
                        ${entry.mood ? `<div class="journal-mood">${moodEmojis[entry.mood] || '😐'} ${entry.mood}</div>` : ''}
                        ${entry.energy ? `<div class="journal-energy">⚡ Energy: ${entry.energy}/5</div>` : ''}
                    </div>
                ` : ''}
                <div class="journal-content">${entry.content}</div>
            </div>
        `).join('');
    }

    openAddJournalModal() {
        const today = getCurrentDateNZ();
        document.getElementById('journalDateInput').value = today.toISOString().split('T')[0];
        document.getElementById('journalTitleInput').value = '';
        document.getElementById('journalMoodInput').value = '';
        document.getElementById('journalEnergyInput').value = '';
        document.getElementById('journalContentInput').value = '';

        this.openModal('addJournalModal');
    }

    saveJournal() {
        const date = document.getElementById('journalDateInput').value;
        const title = document.getElementById('journalTitleInput').value;
        const mood = document.getElementById('journalMoodInput').value;
        const energy = document.getElementById('journalEnergyInput').value;
        const content = document.getElementById('journalContentInput').value;

        if (!date || !content) {
            alert('Please fill in date and content');
            return;
        }

        Storage.addJournalEntry({ date, title, mood, energy, content });

        this.closeModal('addJournalModal');
        this.renderJournal();
        this.syncAfterChange();
    }

    deleteJournal(entryId) {
        if (confirm('Delete this journal entry?')) {
            Storage.deleteJournalEntry(entryId);
            this.renderJournal();
            this.syncAfterChange();
        }
    }

    // ===== EXERCISE LIBRARY FUNCTIONS =====
    openExerciseLibrary() {
        this.renderExerciseLibrary();
        this.openModal('exerciseLibraryModal');

        // Setup search and filter listeners
        document.getElementById('librarySearchInput').addEventListener('input', () => this.renderExerciseLibrary());
        document.getElementById('libraryFilterCategory').addEventListener('change', () => this.renderExerciseLibrary());
        document.getElementById('libraryFilterDifficulty').addEventListener('change', () => this.renderExerciseLibrary());
    }

    renderExerciseLibrary() {
        const searchQuery = document.getElementById('librarySearchInput')?.value || '';
        const categoryFilter = document.getElementById('libraryFilterCategory')?.value || '';
        const difficultyFilter = document.getElementById('libraryFilterDifficulty')?.value || '';

        let exercises = ExerciseLibrary.getAllExercises();

        // Apply search
        if (searchQuery) {
            exercises = ExerciseLibrary.search(searchQuery);
        }

        // Apply category filter
        if (categoryFilter) {
            exercises = exercises.filter(ex => ex.category === categoryFilter);
        }

        // Apply difficulty filter
        if (difficultyFilter) {
            exercises = exercises.filter(ex => ex.difficulty === difficultyFilter);
        }

        const container = document.getElementById('libraryExerciseList');
        container.innerHTML = exercises.map(ex => `
            <div class="library-exercise-card" onclick="app.showExerciseDetails(${ex.id})">
                <div class="library-exercise-name">${ex.name}</div>
                <div class="library-exercise-meta">
                    <span class="library-badge category">${ex.category}</span>
                    <span class="library-badge difficulty ${ex.difficulty}">${ex.difficulty}</span>
                </div>
                <div class="library-exercise-muscles">
                    ${ex.primaryMuscles.join(', ')}
                </div>
            </div>
        `).join('');
    }

    showExerciseDetails(exerciseId) {
        const exercise = ExerciseLibrary.getById(exerciseId);
        if (!exercise) return;

        document.getElementById('exerciseDetailsTitle').textContent = exercise.name;

        const content = `
            <div class="exercise-details-section">
                <h4>📊 Details</h4>
                <p><strong>Category:</strong> ${exercise.category}</p>
                <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
                <p><strong>Equipment:</strong> ${exercise.equipment}</p>
                <p><strong>Primary Muscles:</strong> ${exercise.primaryMuscles.join(', ')}</p>
                ${exercise.secondaryMuscles.length > 0 ? `<p><strong>Secondary Muscles:</strong> ${exercise.secondaryMuscles.join(', ')}</p>` : ''}
            </div>

            <div class="exercise-details-section">
                <h4>📝 Instructions</h4>
                <ul>
                    ${exercise.instructions.map(inst => `<li>${inst}</li>`).join('')}
                </ul>
            </div>

            <div class="exercise-details-section">
                <h4>💡 Form Tips</h4>
                <ul>
                    ${exercise.formTips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;

        document.getElementById('exerciseDetailsContent').innerHTML = content;

        // Store current exercise for adding to workout
        this.currentLibraryExercise = exercise;

        this.closeModal('exerciseLibraryModal');
        this.openModal('exerciseDetailsModal');

        // Setup button listeners
        document.getElementById('addExerciseFromLibraryBtn').onclick = () => this.addExerciseFromLibrary();
        document.getElementById('viewExerciseHistoryBtn').onclick = () => this.viewExerciseHistory(exercise.name);
    }

    addExerciseFromLibrary() {
        if (!this.currentLibraryExercise) return;

        const exercise = {
            id: Date.now(),
            name: this.currentLibraryExercise.name,
            sets: [{ weight: 0, reps: 0 }]
        };

        this.currentWorkout.exercises.push(exercise);
        Storage.saveCurrentWorkout(this.currentWorkout);
        this.renderCurrentWorkout();

        this.closeModal('exerciseDetailsModal');
        this.switchView('workout');
        alert(`✅ Added "${exercise.name}" to your workout!`);
    }

    // ===== WORKOUT TEMPLATES FUNCTIONS =====
    openTemplatesModal() {
        this.renderTemplates();
        this.openModal('templatesModal');

        // Setup filter listeners
        document.querySelectorAll('.template-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.template-filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.renderTemplates(e.target.dataset.type);
            });
        });
    }

    renderTemplates(typeFilter = 'all') {
        let templates = WorkoutTemplates.getAllTemplates();

        if (typeFilter && typeFilter !== 'all') {
            templates = WorkoutTemplates.getByType(typeFilter);
        }

        const container = document.getElementById('templatesList');
        container.innerHTML = templates.map(template => `
            <div class="template-card" onclick="app.loadTemplate('${template.id}')">
                <div class="template-header">
                    <div class="template-name">${template.name}</div>
                    <div class="template-description">${template.description}</div>
                </div>
                <div class="template-meta">
                    <span class="template-meta-item">⏱️ ${template.estimatedDuration}</span>
                    <span class="template-meta-item">📊 ${template.difficulty}</span>
                    <span class="template-meta-item">🏋️ ${template.exercises.length} exercises</span>
                </div>
                <div class="template-exercises">
                    <div class="template-exercises-list">
                        ${template.exercises.map(ex => `
                            <div class="template-exercise-item">${ex.name} (${ex.sets}x${ex.reps})</div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadTemplate(templateId) {
        if (this.currentWorkout.exercises.length > 0) {
            if (!confirm('This will add exercises to your current workout. Continue?')) {
                return;
            }
        }

        const workout = WorkoutTemplates.loadTemplate(templateId);
        if (!workout) {
            alert('Template not found');
            return;
        }

        // Add exercises to current workout
        workout.exercises.forEach(ex => {
            this.currentWorkout.exercises.push(ex);
        });

        Storage.saveCurrentWorkout(this.currentWorkout);
        this.renderCurrentWorkout();

        this.closeModal('templatesModal');
        this.switchView('workout');

        const template = WorkoutTemplates.getById(templateId);
        alert(`✅ Loaded "${template.name}" with ${template.exercises.length} exercises!`);
    }

    // ===== EXERCISE HISTORY & ANALYTICS FUNCTIONS =====
    viewExerciseHistory(exerciseName) {
        const workouts = Storage.getAllWorkouts();

        // Find all instances of this exercise
        const history = [];
        workouts.forEach(workout => {
            workout.exercises.forEach(ex => {
                if (ex.name.toLowerCase() === exerciseName.toLowerCase()) {
                    history.push({
                        date: workout.date,
                        sets: ex.sets
                    });
                }
            });
        });

        if (history.length === 0) {
            alert('No history found for this exercise');
            return;
        }

        // Calculate stats
        let totalSets = 0;
        let totalVolume = 0;
        let maxWeight = 0;
        let maxReps = 0;

        history.forEach(session => {
            session.sets.forEach(set => {
                totalSets++;
                const volume = (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0);
                totalVolume += volume;
                maxWeight = Math.max(maxWeight, parseFloat(set.weight) || 0);
                maxReps = Math.max(maxReps, parseInt(set.reps) || 0);
            });
        });

        document.getElementById('exerciseHistoryTitle').textContent = `${exerciseName} History`;

        const content = `
            <div class="exercise-history-stats">
                <div class="history-stat-card">
                    <div class="history-stat-value">${history.length}</div>
                    <div class="history-stat-label">Sessions</div>
                </div>
                <div class="history-stat-card">
                    <div class="history-stat-value">${totalSets}</div>
                    <div class="history-stat-label">Total Sets</div>
                </div>
                <div class="history-stat-card">
                    <div class="history-stat-value">${Math.round(totalVolume)}kg</div>
                    <div class="history-stat-label">Total Volume</div>
                </div>
                <div class="history-stat-card">
                    <div class="history-stat-value">${maxWeight}kg</div>
                    <div class="history-stat-label">Max Weight</div>
                </div>
                <div class="history-stat-card">
                    <div class="history-stat-value">${maxReps}</div>
                    <div class="history-stat-label">Max Reps</div>
                </div>
            </div>

            <h4 style="margin-bottom: 1rem;">Recent Sessions</h4>
            <div class="exercise-history-list">
                ${history.slice(0, 10).map(session => `
                    <div class="history-session-card">
                        <div class="history-session-date">${formatDateNZ(new Date(session.date), { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        <div class="history-session-sets">
                            ${session.sets.map((set, idx) => `
                                <div class="history-set-badge">
                                    Set ${idx + 1}: ${set.weight}kg × ${set.reps} reps
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        document.getElementById('exerciseHistoryContent').innerHTML = content;

        this.closeModal('exerciseDetailsModal');
        this.openModal('exerciseHistoryModal');
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new GymTrackerApp();

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});
