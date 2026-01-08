// Main application logic

class GymTrackerApp {
    constructor() {
        this.currentWorkout = Storage.getCurrentWorkout();
        this.currentMealType = null;
        this.timerInterval = null;
        this.timerSeconds = 90; // Default 1:30
        this.timerRunning = false;

        this.initializeEventListeners();
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
    }

    initializeEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchView(e.target.dataset.view));
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

        document.getElementById('viewFoodHistoryBtn').addEventListener('click', () => {
            this.openFoodHistoryModal();
        });

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
        if (viewName === 'history') {
            this.renderHistory();
        } else if (viewName === 'routines') {
            this.renderRoutines();
        } else if (viewName === 'food') {
            this.renderFood();
        }
    }

    openAddExerciseModal() {
        // Reset form
        document.getElementById('exerciseTypeSelect').value = 'strength';
        document.getElementById('exerciseNameInput').value = '';
        document.getElementById('setsContainer').innerHTML = `
            <div class="set-input">
                <input type="number" placeholder="Weight (kg)" class="input small" data-field="weight">
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

        if (!name) {
            alert('Please enter an exercise name');
            return;
        }

        let exercise = {
            id: Date.now(),
            name: name,
            type: type
        };

        if (type === 'strength') {
            const sets = [];
            document.querySelectorAll('.set-input').forEach(setDiv => {
                const weight = setDiv.querySelector('[data-field="weight"]').value;
                const reps = setDiv.querySelector('[data-field="reps"]').value;

                if (weight || reps) {
                    sets.push({
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

        this.currentWorkout.exercises.push(exercise);
        Storage.saveCurrentWorkout(this.currentWorkout);
        this.renderCurrentWorkout();
        this.closeModal('addExerciseModal');
    }

    renderCurrentWorkout() {
        const container = document.getElementById('currentExercises');

        if (this.currentWorkout.exercises.length === 0) {
            container.innerHTML = '<p class="empty-state">No exercises yet. Add your first exercise!</p>';
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
                exerciseDetails = `
                    <div class="sets-list">
                        ${exercise.sets.map((set, index) => `
                            <div class="set-row">
                                <span class="set-number">Set ${index + 1}</span>
                                <span class="set-detail">${set.weight} kg × ${set.reps} reps</span>
                            </div>
                        `).join('')}
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
                            ${hasHistory && type === 'strength' ? `<button class="btn-icon-small" onclick="app.toggleExerciseHistory(${exercise.id})" title="View Progress">📊</button>` : ''}
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
                                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                const maxWeight = Math.max(...h.sets.map(s => parseInt(s.weight) || 0));
                                const totalReps = h.sets.reduce((sum, s) => sum + (parseInt(s.reps) || 0), 0);
                                return `
                                    <div class="history-item">
                                        <span class="history-date">${formattedDate}</span>
                                        <span class="history-stats">${h.sets.length} sets • Max: ${maxWeight}kg • ${totalReps} reps</span>
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
            Storage.finishWorkout();
            this.currentWorkout = Storage.getCurrentWorkout();
            this.renderCurrentWorkout();
            this.renderHistory();
            alert('Workout saved!');
        }
    }

    renderHistory() {
        const container = document.getElementById('historyList');
        const workouts = Storage.getAllWorkouts();

        if (workouts.length === 0) {
            container.innerHTML = '<p class="empty-state">No workout history yet. Complete your first workout!</p>';
            return;
        }

        container.innerHTML = workouts.map(workout => {
            const date = new Date(workout.date);
            const formattedDate = date.toLocaleDateString('en-US', {
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
                        <button class="btn-icon" onclick="app.deleteWorkout(${workout.id})">🗑️</button>
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

    renderRoutines() {
        const container = document.getElementById('routinesList');
        const routines = Storage.getAllRoutines();

        if (routines.length === 0) {
            container.innerHTML = '<p class="empty-state">No routines saved yet. Create a routine from your current workout!</p>';
            return;
        }

        container.innerHTML = routines.map(routine => {
            return `
                <div class="routine-card">
                    <div class="routine-header">
                        <h3>${routine.name}</h3>
                        <button class="btn-icon" onclick="app.deleteRoutine(${routine.id})">🗑️</button>
                    </div>
                    <p class="routine-meta">${routine.exercises.length} exercises</p>
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
        if (this.currentWorkout.exercises.length === 0) {
            alert('Add some exercises to your workout before creating a routine');
            return;
        }

        document.getElementById('routineNameInput').value = '';
        document.getElementById('createRoutineModal').classList.add('active');
        document.getElementById('routineNameInput').focus();
    }

    saveRoutine() {
        const name = document.getElementById('routineNameInput').value.trim();

        if (!name) {
            alert('Please enter a routine name');
            return;
        }

        Storage.saveRoutine(name, this.currentWorkout.exercises);
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
        container.innerHTML = routines.map(routine => `
            <div class="load-routine-item" onclick="app.loadRoutineToWorkout(${routine.id})">
                <h4>${routine.name}</h4>
                <p>${routine.exercises.length} exercises</p>
            </div>
        `).join('');

        document.getElementById('loadRoutineModal').classList.add('active');
    }

    loadRoutineToWorkout(routineId) {
        if (this.currentWorkout.exercises.length > 0) {
            if (!confirm('This will replace your current workout. Continue?')) {
                return;
            }
        }

        const workout = Storage.loadRoutine(routineId);
        if (workout) {
            this.currentWorkout = workout;
            this.renderCurrentWorkout();
            this.closeModal('loadRoutineModal');
            this.switchView('workout');
        }
    }

    openTimerModal() {
        this.resetTimer();
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
                body: 'Time to start your next set',
                icon: '/icon-192.png'
            });
        }

        alert('Rest time complete!');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    // Food tracking methods
    openAddFoodModal(mealType) {
        this.currentMealType = mealType;

        // Format meal type name for display
        const mealNames = {
            'breakfast': 'Breakfast',
            'midmorning': 'Mid Morning',
            'lunch': 'Lunch',
            'preworkout': 'Pre Workout',
            'postworkout': 'Post Workout',
            'dinner': 'Dinner'
        };

        document.getElementById('foodModalTitle').textContent = `Add ${mealNames[mealType] || mealType}`;
        document.getElementById('foodNameInput').value = '';
        document.getElementById('caloriesInput').value = '';
        document.getElementById('proteinInput').value = '';
        document.getElementById('carbsInput').value = '';
        document.getElementById('fatsInput').value = '';
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
                    <span class="food-suggestion-name">${food.name}</span>
                    <div class="food-suggestion-info">
                        ${food.calories} cal • P: ${food.protein}g • C: ${food.carbs}g • F: ${food.fats}g
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
    }

    saveFood() {
        const name = document.getElementById('foodNameInput').value.trim();
        const calories = document.getElementById('caloriesInput').value;
        const protein = document.getElementById('proteinInput').value;
        const carbs = document.getElementById('carbsInput').value;
        const fats = document.getElementById('fatsInput').value;

        if (!name) {
            alert('Please enter a food name');
            return;
        }

        if (!calories && !protein && !carbs && !fats) {
            alert('Please enter at least calories or macros');
            return;
        }

        const foodItem = {
            name: name,
            calories: calories || '0',
            protein: protein || '0',
            carbs: carbs || '0',
            fats: fats || '0'
        };

        Storage.addFoodItem(this.currentMealType, foodItem);
        this.renderFood();
        this.closeModal('addFoodModal');
    }

    renderFood() {
        const todayFood = Storage.getTodayFood();
        const stats = Storage.getFoodStats();

        // Update stats
        document.querySelector('#foodStats .stat-card:nth-child(1) .stat-value').textContent = stats.totalCalories;
        document.querySelector('#foodStats .stat-card:nth-child(2) .stat-value').textContent = stats.totalProtein + 'g';
        document.querySelector('#foodStats .stat-card:nth-child(3) .stat-value').textContent = stats.totalCarbs + 'g';
        document.querySelector('#foodStats .stat-card:nth-child(4) .stat-value').textContent = stats.totalFats + 'g';

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
                    <div class="food-item-info">
                        <strong>${meal.name}</strong>
                        <span class="food-macros">${meal.calories} cal • P: ${meal.protein}g • C: ${meal.carbs}g • F: ${meal.fats}g</span>
                    </div>
                    <button class="btn-icon" onclick="app.deleteFood(${meal.id})">🗑️</button>
                </div>
            `).join('');
        });
    }

    deleteFood(foodId) {
        if (confirm('Delete this food item?')) {
            Storage.deleteFoodItem(foodId);
            this.renderFood();
        }
    }

    openFoodHistoryModal() {
        const allDays = Storage.getAllFoodDays();
        const container = document.getElementById('foodHistoryList');

        if (allDays.length === 0) {
            container.innerHTML = '<p class="empty-state">No food history yet.</p>';
        } else {
            container.innerHTML = allDays.map(day => {
                const date = new Date(day.date);
                const formattedDate = date.toLocaleDateString('en-US', {
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
