// Storage utility for managing workout data in localStorage

const Storage = {
    // Keys for localStorage
    KEYS: {
        WORKOUTS: 'gym_tracker_workouts',
        ROUTINES: 'gym_tracker_routines',
        CURRENT_WORKOUT: 'gym_tracker_current_workout',
        CURRENT_ROUTINE_ID: 'gym_tracker_current_routine_id',
        FOOD_DIARY: 'gym_tracker_food_diary',
        FOOD_ROUTINES: 'gym_tracker_food_routines',
        START_DATE: 'gym_tracker_start_date',
        AUTO_BACKUPS: 'gym_tracker_auto_backups',
        LAST_BACKUP_DATE: 'gym_tracker_last_backup_date',
        PROGRESS_PHOTOS: 'gym_tracker_progress_photos',
        DAILY_METRICS: 'gym_tracker_daily_metrics',
        WEIGHT_GOAL: 'gym_tracker_weight_goal',
        WEIGHT_LOG: 'gym_tracker_weight_log',
        BODY_MEASUREMENTS: 'gym_tracker_body_measurements',
        REST_DAYS: 'gym_tracker_rest_days',
        GOALS: 'gym_tracker_goals',
        WATER_INTAKE: 'gym_tracker_water_intake',
        SLEEP_LOG: 'gym_tracker_sleep_log',
        JOURNAL_ENTRIES: 'gym_tracker_journal_entries',
        CARDIO_SESSIONS: 'gym_tracker_cardio_sessions',
        NUTRITION_GOALS: 'gym_tracker_nutrition_goals'
    },

    // Get data from localStorage
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    // Save data to localStorage
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },

    // Remove data from localStorage
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },

    // Workout methods
    getCurrentWorkout() {
        return this.get(this.KEYS.CURRENT_WORKOUT) || { exercises: [] };
    },

    saveCurrentWorkout(workout) {
        return this.set(this.KEYS.CURRENT_WORKOUT, workout);
    },

    clearCurrentWorkout() {
        return this.remove(this.KEYS.CURRENT_WORKOUT);
    },

    finishWorkout(customDate = null) {
        const currentWorkout = this.getCurrentWorkout();

        if (currentWorkout.exercises.length === 0) {
            return false;
        }

        // Use custom date if provided, otherwise use today
        const workoutDate = customDate ? new Date(customDate) : new Date();

        const workout = {
            id: Date.now() + Math.random(), // Add random component for uniqueness
            date: workoutDate.toISOString(),
            exercises: currentWorkout.exercises,
            duration: null, // Could be calculated if we track start time
            routineId: this.getCurrentRoutineId() || null // Track which routine was used
        };

        const workouts = this.getAllWorkouts();
        workouts.unshift(workout);
        this.set(this.KEYS.WORKOUTS, workouts);
        this.clearCurrentWorkout();
        this.clearCurrentRoutineId(); // Clear routine tracking after workout is saved

        return true;
    },

    getAllWorkouts() {
        return this.get(this.KEYS.WORKOUTS) || [];
    },

    getWorkout(id) {
        const workouts = this.getAllWorkouts();
        return workouts.find(w => w.id === id);
    },

    deleteWorkout(id) {
        const workouts = this.getAllWorkouts();
        const filtered = workouts.filter(w => w.id !== id);
        return this.set(this.KEYS.WORKOUTS, filtered);
    },

    // Routine methods
    getAllRoutines() {
        return this.get(this.KEYS.ROUTINES) || [];
    },

    saveRoutine(name, exercises) {
        const routine = {
            id: Date.now() + Math.random(), // Add random component for uniqueness
            name: name,
            exercises: exercises,
            createdAt: new Date().toISOString()
        };

        const routines = this.getAllRoutines();
        routines.push(routine);
        return this.set(this.KEYS.ROUTINES, routines);
    },

    deleteRoutine(id) {
        const routines = this.getAllRoutines();
        const filtered = routines.filter(r => r.id !== id);
        return this.set(this.KEYS.ROUTINES, filtered);
    },

    loadRoutine(id) {
        const routines = this.getAllRoutines();
        const routine = routines.find(r => r.id === id);

        if (routine) {
            // Create a deep copy of the exercises with fresh IDs
            const newExercises = routine.exercises.map(exercise => ({
                ...exercise,
                id: Date.now() + Math.random(),
                sets: exercise.sets.map(set => ({...set}))
            }));

            // Get current workout and append to it instead of replacing
            const currentWorkout = this.getCurrentWorkout();
            currentWorkout.exercises = [...currentWorkout.exercises, ...newExercises];
            this.saveCurrentWorkout(currentWorkout);

            // Track which routine is being used (append to list if needed)
            this.setCurrentRoutineId(id);
            return currentWorkout;
        }

        return null;
    },

    setCurrentRoutineId(routineId) {
        return this.set(this.KEYS.CURRENT_ROUTINE_ID, routineId);
    },

    getCurrentRoutineId() {
        return this.get(this.KEYS.CURRENT_ROUTINE_ID);
    },

    clearCurrentRoutineId() {
        return this.remove(this.KEYS.CURRENT_ROUTINE_ID);
    },

    getRoutineHistory(routineId) {
        const workouts = this.getAllWorkouts();
        return workouts.filter(w => w.routineId === routineId).reverse(); // Most recent first
    },

    // Statistics methods
    getStats() {
        const workouts = this.getAllWorkouts();

        if (workouts.length === 0) {
            return {
                totalWorkouts: 0,
                totalExercises: 0,
                totalSets: 0,
                totalReps: 0,
                totalWeight: 0
            };
        }

        let totalExercises = 0;
        let totalSets = 0;
        let totalReps = 0;
        let totalWeight = 0;

        workouts.forEach(workout => {
            totalExercises += workout.exercises.length;

            workout.exercises.forEach(exercise => {
                totalSets += exercise.sets.length;

                exercise.sets.forEach(set => {
                    totalReps += parseInt(set.reps) || 0;
                    totalWeight += (parseInt(set.weight) || 0) * (parseInt(set.reps) || 0);
                });
            });
        });

        return {
            totalWorkouts: workouts.length,
            totalExercises,
            totalSets,
            totalReps,
            totalWeight
        };
    },

    // Get exercise history for a specific exercise name
    getExerciseHistory(exerciseName) {
        const workouts = this.getAllWorkouts();
        const history = [];

        workouts.forEach(workout => {
            const exercise = workout.exercises.find(
                e => e.name.toLowerCase() === exerciseName.toLowerCase()
            );

            if (exercise) {
                history.push({
                    date: workout.date,
                    sets: exercise.sets
                });
            }
        });

        return history.reverse(); // Most recent first
    },

    // Food Diary methods
    getAllFoodDays() {
        return this.get(this.KEYS.FOOD_DIARY) || [];
    },

    getTodayFood(date = null) {
        const targetDate = date ? new Date(date) : new Date();
        const targetDateStr = targetDate.toDateString();
        const allDays = this.getAllFoodDays();
        const todayData = allDays.find(day => new Date(day.date).toDateString() === targetDateStr);

        return todayData || {
            date: targetDate.toISOString(),
            meals: []
        };
    },

    addFoodItem(mealType, foodItem, customDate = null) {
        const allDays = this.getAllFoodDays();
        // Use custom date if provided, otherwise use today
        const targetDate = customDate ? new Date(customDate) : new Date();
        const targetDateStr = targetDate.toDateString();
        let targetIndex = allDays.findIndex(day => new Date(day.date).toDateString() === targetDateStr);

        const foodEntry = {
            id: Date.now() + Math.random(), // Add random component to ensure uniqueness
            mealType: mealType,
            name: foodItem.name,
            calories: parseInt(foodItem.calories) || 0,
            protein: parseInt(foodItem.protein) || 0,
            carbs: parseInt(foodItem.carbs) || 0,
            fats: parseInt(foodItem.fats) || 0,
            time: targetDate.toISOString()
        };

        // Include photo if it exists
        if (foodItem.photo) {
            foodEntry.photo = foodItem.photo;
        }

        if (targetIndex === -1) {
            // Create new day entry
            allDays.unshift({
                date: targetDate.toISOString(),
                meals: [foodEntry]
            });
        } else {
            // Add to existing day
            allDays[targetIndex].meals.push(foodEntry);
        }

        return this.set(this.KEYS.FOOD_DIARY, allDays);
    },

    deleteFoodItem(foodId) {
        const allDays = this.getAllFoodDays();

        allDays.forEach(day => {
            day.meals = day.meals.filter(meal => meal.id !== foodId);
        });

        // Remove empty days
        const filtered = allDays.filter(day => day.meals.length > 0);
        return this.set(this.KEYS.FOOD_DIARY, filtered);
    },

    updateFoodItem(foodId, updatedFoodItem) {
        const allDays = this.getAllFoodDays();

        allDays.forEach(day => {
            const mealIndex = day.meals.findIndex(meal => meal.id === foodId);
            if (mealIndex !== -1) {
                // Update the meal while preserving the original ID and time
                day.meals[mealIndex] = {
                    id: foodId,
                    mealType: updatedFoodItem.mealType,
                    name: updatedFoodItem.name,
                    calories: parseInt(updatedFoodItem.calories) || 0,
                    protein: parseFloat(updatedFoodItem.protein) || 0,
                    carbs: parseFloat(updatedFoodItem.carbs) || 0,
                    fats: parseFloat(updatedFoodItem.fats) || 0,
                    time: day.meals[mealIndex].time // Preserve original time
                };
            }
        });

        return this.set(this.KEYS.FOOD_DIARY, allDays);
    },

    getFoodStats(date = null) {
        let foodDay;

        if (date) {
            const allDays = this.getAllFoodDays();
            const dateStr = new Date(date).toDateString();
            foodDay = allDays.find(day => new Date(day.date).toDateString() === dateStr);
        } else {
            foodDay = this.getTodayFood();
        }

        if (!foodDay || foodDay.meals.length === 0) {
            return {
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFats: 0,
                mealCount: 0
            };
        }

        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFats = 0;

        foodDay.meals.forEach(meal => {
            totalCalories += meal.calories;
            totalProtein += meal.protein;
            totalCarbs += meal.carbs;
            totalFats += meal.fats;
        });

        return {
            totalCalories,
            totalProtein,
            totalCarbs,
            totalFats,
            mealCount: foodDay.meals.length
        };
    },

    // Food Routine methods
    getAllFoodRoutines() {
        return this.get(this.KEYS.FOOD_ROUTINES) || [];
    },

    saveFoodRoutine(name, meals) {
        const routine = {
            id: Date.now() + Math.random(), // Add random component for uniqueness
            name: name,
            meals: meals.map(meal => ({
                mealType: meal.mealType,
                name: meal.name,
                calories: meal.calories,
                protein: meal.protein,
                carbs: meal.carbs,
                fats: meal.fats
            })),
            createdAt: new Date().toISOString()
        };

        const routines = this.getAllFoodRoutines();
        routines.push(routine);
        return this.set(this.KEYS.FOOD_ROUTINES, routines);
    },

    deleteFoodRoutine(id) {
        const routines = this.getAllFoodRoutines();
        const filtered = routines.filter(r => r.id !== id);
        return this.set(this.KEYS.FOOD_ROUTINES, filtered);
    },

    loadFoodRoutine(id, customDate = null) {
        const routines = this.getAllFoodRoutines();
        const routine = routines.find(r => r.id === id);

        if (routine) {
            // Determine correct meal type from routine name
            const routineLower = routine.name.toLowerCase();
            let correctMealType = null;

            // Check routine name to determine the correct meal type
            if (routineLower.includes('breakfast')) {
                correctMealType = 'breakfast';
            } else if (routineLower.includes('mid-morning') || routineLower.includes('midmorning')) {
                correctMealType = 'midmorning';
            } else if (routineLower.includes('lunch')) {
                correctMealType = 'lunch';
            } else if (routineLower.includes('pre-workout') || routineLower.includes('preworkout')) {
                correctMealType = 'preworkout';
            } else if (routineLower.includes('post-workout') || routineLower.includes('postworkout')) {
                correctMealType = 'postworkout';
            } else if (routineLower.includes('dinner')) {
                // Only use dinner if it's not a post-workout routine
                if (!routineLower.includes('post')) {
                    correctMealType = 'dinner';
                }
            } else if (routineLower.includes('snack')) {
                correctMealType = 'snacks';
            }

            // Add routine meals to today (or customDate if provided) - append, don't clear existing
            routine.meals.forEach(meal => {
                // Use the determined meal type from routine name, or fall back to the meal's mealType
                const mealType = correctMealType || meal.mealType;
                this.addFoodItem(mealType, meal, customDate);
            });

            return true;
        }

        return false;
    },

    // Settings methods
    getStartDate() {
        return this.get(this.KEYS.START_DATE);
    },

    setStartDate(date) {
        return this.set(this.KEYS.START_DATE, date);
    },

    getDaysSinceStart() {
        const startDate = this.getStartDate();
        if (!startDate) return null;

        // Use NZ timezone for calculations
        const start = new Date(startDate);
        const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Pacific/Auckland' }));

        // Calculate date difference at midnight NZ time
        const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const diffTime = todayMidnight - startMidnight;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 because day 1 is the start date
        return diffDays;
    },

    // Auto-backup methods
    createAutoBackup() {
        const backupData = {
            date: new Date().toISOString(),
            workouts: this.getAllWorkouts(),
            routines: this.getAllRoutines(),
            currentWorkout: this.getCurrentWorkout(),
            foodDiary: this.getAllFoodDays(),
            foodRoutines: this.getAllFoodRoutines(),
            startDate: this.getStartDate()
        };

        // Get existing backups
        let backups = this.get(this.KEYS.AUTO_BACKUPS) || [];

        // Add new backup
        backups.unshift(backupData);

        // Keep only last 4 backups (4 weeks)
        if (backups.length > 4) {
            backups = backups.slice(0, 4);
        }

        // Save backups
        this.set(this.KEYS.AUTO_BACKUPS, backups);
        this.set(this.KEYS.LAST_BACKUP_DATE, new Date().toDateString());

        return true;
    },

    getAutoBackups() {
        return this.get(this.KEYS.AUTO_BACKUPS) || [];
    },

    shouldCreateBackup() {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Sunday

        // Check if it's Sunday
        if (dayOfWeek !== 0) {
            return false;
        }

        // Check if already backed up today
        const lastBackupDate = this.get(this.KEYS.LAST_BACKUP_DATE);
        if (lastBackupDate === today.toDateString()) {
            return false;
        }

        return true;
    },

    getLastBackupDate() {
        return this.get(this.KEYS.LAST_BACKUP_DATE);
    },

    // Progress Photos Methods
    getAllProgressPhotos() {
        return this.get(this.KEYS.PROGRESS_PHOTOS) || [];
    },

    addProgressPhoto(photoData) {
        const photos = this.getAllProgressPhotos();
        const newPhoto = {
            id: Date.now() + Math.random(),
            date: new Date().toISOString(),
            image: photoData.image, // base64 encoded image
            weight: photoData.weight || null,
            notes: photoData.notes || '',
            measurements: photoData.measurements || {} // chest, waist, arms, etc.
        };
        photos.push(newPhoto);
        return this.set(this.KEYS.PROGRESS_PHOTOS, photos);
    },

    deleteProgressPhoto(photoId) {
        const photos = this.getAllProgressPhotos();
        const filtered = photos.filter(photo => photo.id !== photoId);
        return this.set(this.KEYS.PROGRESS_PHOTOS, filtered);
    },

    getProgressPhoto(photoId) {
        const photos = this.getAllProgressPhotos();
        return photos.find(photo => photo.id === photoId);
    },

    updateProgressPhoto(photoId, updates) {
        const photos = this.getAllProgressPhotos();
        const index = photos.findIndex(photo => photo.id === photoId);
        if (index !== -1) {
            photos[index] = { ...photos[index], ...updates };
            return this.set(this.KEYS.PROGRESS_PHOTOS, photos);
        }
        return false;
    },

    // Daily Metrics Methods
    getAllDailyMetrics() {
        return this.get(this.KEYS.DAILY_METRICS) || [];
    },

    getTodayMetrics(date = null) {
        const allMetrics = this.getAllDailyMetrics();
        const targetDate = date ? new Date(date) : new Date();
        const targetDateStr = targetDate.toDateString();
        let todayMetrics = allMetrics.find(m => new Date(m.date).toDateString() === targetDateStr);

        if (!todayMetrics) {
            todayMetrics = {
                date: targetDate.toISOString(),
                steps: 0,
                waterGlasses: 0, // 1 glass = 250ml
                sleepHours: 0,
                workoutCalories: 0
            };
            // Only add to storage if it's today (don't auto-create past dates)
            if (!date) {
                allMetrics.push(todayMetrics);
                this.set(this.KEYS.DAILY_METRICS, allMetrics);
            }
        }

        return todayMetrics;
    },

    updateTodayMetrics(updates) {
        const allMetrics = this.getAllDailyMetrics();
        const today = new Date().toDateString();
        const index = allMetrics.findIndex(m => new Date(m.date).toDateString() === today);

        if (index !== -1) {
            allMetrics[index] = { ...allMetrics[index], ...updates };
        } else {
            allMetrics.push({
                date: new Date().toISOString(),
                steps: 0,
                waterGlasses: 0,
                sleepHours: 0,
                workoutCalories: 0,
                ...updates
            });
        }

        return this.set(this.KEYS.DAILY_METRICS, allMetrics);
    },

    getMetricsByDate(date) {
        const allMetrics = this.getAllDailyMetrics();
        const dateStr = new Date(date).toDateString();
        return allMetrics.find(m => new Date(m.date).toDateString() === dateStr);
    },

    // Weight Goal Methods
    getWeightGoal() {
        return this.get(this.KEYS.WEIGHT_GOAL) || { startingWeight: null, goalWeight: null };
    },

    setWeightGoal(startingWeight, goalWeight) {
        return this.set(this.KEYS.WEIGHT_GOAL, {
            startingWeight: parseFloat(startingWeight),
            goalWeight: parseFloat(goalWeight),
            setDate: new Date().toISOString()
        });
    },

    // Nutrition Goals Methods
    getNutritionGoals() {
        return this.get(this.KEYS.NUTRITION_GOALS) || {
            calories: 2000,
            protein: 150,
            carbs: 200,
            fats: 65
        };
    },

    setNutritionGoals(calories, protein, carbs, fats) {
        return this.set(this.KEYS.NUTRITION_GOALS, {
            calories: parseFloat(calories) || 2000,
            protein: parseFloat(protein) || 150,
            carbs: parseFloat(carbs) || 200,
            fats: parseFloat(fats) || 65,
            setDate: new Date().toISOString()
        });
    },

    // Weight Log Methods
    getAllWeightEntries() {
        return this.get(this.KEYS.WEIGHT_LOG) || [];
    },

    logWeight(weight) {
        const entries = this.getAllWeightEntries();
        const today = new Date().toDateString();

        // Check if there's already an entry for today
        const existingIndex = entries.findIndex(entry =>
            new Date(entry.date).toDateString() === today
        );

        const newEntry = {
            weight: parseFloat(weight),
            date: new Date().toISOString()
        };

        if (existingIndex !== -1) {
            // Update today's entry
            entries[existingIndex] = newEntry;
        } else {
            // Add new entry
            entries.push(newEntry);
        }

        // Sort by date (newest first)
        entries.sort((a, b) => new Date(b.date) - new Date(a.date));

        return this.set(this.KEYS.WEIGHT_LOG, entries);
    },

    getLatestWeight() {
        const entries = this.getAllWeightEntries();
        return entries.length > 0 ? entries[0] : null;
    },

    getWeightByDate(date) {
        const entries = this.getAllWeightEntries();
        const dateStr = new Date(date).toDateString();
        return entries.find(entry => new Date(entry.date).toDateString() === dateStr);
    },

    // Body Measurements Methods
    getAllBodyMeasurements() {
        return this.get(this.KEYS.BODY_MEASUREMENTS) || [];
    },

    logBodyMeasurements(measurements) {
        const entries = this.getAllBodyMeasurements();
        const today = new Date().toDateString();

        // Check if there's already an entry for today
        const existingIndex = entries.findIndex(entry =>
            new Date(entry.date).toDateString() === today
        );

        const newEntry = {
            date: new Date().toISOString(),
            chest: parseFloat(measurements.chest) || null,
            waist: parseFloat(measurements.waist) || null,
            hips: parseFloat(measurements.hips) || null,
            leftArm: parseFloat(measurements.leftArm) || null,
            rightArm: parseFloat(measurements.rightArm) || null,
            leftThigh: parseFloat(measurements.leftThigh) || null,
            rightThigh: parseFloat(measurements.rightThigh) || null,
            leftCalf: parseFloat(measurements.leftCalf) || null,
            rightCalf: parseFloat(measurements.rightCalf) || null,
            shoulders: parseFloat(measurements.shoulders) || null,
            neck: parseFloat(measurements.neck) || null
        };

        if (existingIndex !== -1) {
            // Update today's entry
            entries[existingIndex] = newEntry;
        } else {
            // Add new entry
            entries.push(newEntry);
        }

        // Sort by date (newest first)
        entries.sort((a, b) => new Date(b.date) - new Date(a.date));

        return this.set(this.KEYS.BODY_MEASUREMENTS, entries);
    },

    getLatestBodyMeasurements() {
        const entries = this.getAllBodyMeasurements();
        return entries.length > 0 ? entries[0] : null;
    },

    // Rest Days Methods
    getAllRestDays() {
        return this.get(this.KEYS.REST_DAYS) || [];
    },

    addRestDay(date, note = '') {
        const restDays = this.getAllRestDays();
        const dateStr = new Date(date).toDateString();

        // Check if rest day already exists for this date
        const existingIndex = restDays.findIndex(rd =>
            new Date(rd.date).toDateString() === dateStr
        );

        const restDay = {
            date: new Date(date).toISOString(),
            note: note,
            type: 'rest'
        };

        if (existingIndex !== -1) {
            restDays[existingIndex] = restDay;
        } else {
            restDays.push(restDay);
        }

        // Sort by date (newest first)
        restDays.sort((a, b) => new Date(b.date) - new Date(a.date));

        return this.set(this.KEYS.REST_DAYS, restDays);
    },

    removeRestDay(date) {
        const restDays = this.getAllRestDays();
        const dateStr = new Date(date).toDateString();

        const filtered = restDays.filter(rd =>
            new Date(rd.date).toDateString() !== dateStr
        );

        return this.set(this.KEYS.REST_DAYS, filtered);
    },

    isRestDay(date) {
        const restDays = this.getAllRestDays();
        const dateStr = new Date(date).toDateString();
        return restDays.some(rd => new Date(rd.date).toDateString() === dateStr);
    },

    getRestDayByDate(date) {
        const restDays = this.getAllRestDays();
        const dateStr = new Date(date).toDateString();
        return restDays.find(rd => new Date(rd.date).toDateString() === dateStr);
    },

    // Goals Methods
    getAllGoals() {
        return this.get(this.KEYS.GOALS) || [];
    },

    addGoal(goal) {
        const goals = this.getAllGoals();
        const newGoal = {
            id: Date.now(),
            title: goal.title,
            description: goal.description || '',
            targetValue: parseFloat(goal.targetValue) || 0,
            currentValue: parseFloat(goal.currentValue) || 0,
            unit: goal.unit || '',
            deadline: goal.deadline ? new Date(goal.deadline).toISOString() : null,
            category: goal.category || 'general', // strength, weight, endurance, general
            createdDate: new Date().toISOString(),
            completed: false,
            completedDate: null
        };

        goals.push(newGoal);
        goals.sort((a, b) => {
            // Incomplete goals first, then by deadline
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            if (a.deadline && b.deadline) {
                return new Date(a.deadline) - new Date(b.deadline);
            }
            return 0;
        });

        return this.set(this.KEYS.GOALS, goals);
    },

    updateGoal(goalId, updates) {
        const goals = this.getAllGoals();
        const index = goals.findIndex(g => g.id === goalId);

        if (index !== -1) {
            goals[index] = { ...goals[index], ...updates };

            // Check if goal is completed
            if (goals[index].currentValue >= goals[index].targetValue && !goals[index].completed) {
                goals[index].completed = true;
                goals[index].completedDate = new Date().toISOString();
            }

            return this.set(this.KEYS.GOALS, goals);
        }
        return false;
    },

    deleteGoal(goalId) {
        const goals = this.getAllGoals();
        const filtered = goals.filter(g => g.id !== goalId);
        return this.set(this.KEYS.GOALS, filtered);
    },

    getGoalById(goalId) {
        const goals = this.getAllGoals();
        return goals.find(g => g.id === goalId);
    },

    // Water Intake Methods
    getWaterIntakeForDate(date) {
        const dateStr = new Date(date).toDateString();
        const allWater = this.get(this.KEYS.WATER_INTAKE) || {};
        return allWater[dateStr] || { glasses: 0, goal: 8 };
    },

    setWaterIntakeForDate(date, data) {
        const dateStr = new Date(date).toDateString();
        const allWater = this.get(this.KEYS.WATER_INTAKE) || {};
        allWater[dateStr] = data;
        return this.set(this.KEYS.WATER_INTAKE, allWater);
    },

    addWaterGlass(date = new Date()) {
        const waterData = this.getWaterIntakeForDate(date);
        waterData.glasses += 1;
        return this.setWaterIntakeForDate(date, waterData);
    },

    removeWaterGlass(date = new Date()) {
        const waterData = this.getWaterIntakeForDate(date);
        if (waterData.glasses > 0) {
            waterData.glasses -= 1;
        }
        return this.setWaterIntakeForDate(date, waterData);
    },

    setWaterGoal(goal, date = new Date()) {
        const waterData = this.getWaterIntakeForDate(date);
        waterData.goal = goal;
        return this.setWaterIntakeForDate(date, waterData);
    },

    // Sleep Tracking Methods
    getAllSleepLogs() {
        return this.get(this.KEYS.SLEEP_LOG) || [];
    },

    getSleepLogForDate(date) {
        const dateStr = new Date(date).toDateString();
        const logs = this.getAllSleepLogs();
        return logs.find(log => new Date(log.date).toDateString() === dateStr);
    },

    addSleepLog(sleepData) {
        const logs = this.getAllSleepLogs();
        const dateStr = new Date(sleepData.date).toDateString();

        // Remove existing log for this date if any
        const filtered = logs.filter(log => new Date(log.date).toDateString() !== dateStr);

        const newLog = {
            id: Date.now(),
            date: new Date(sleepData.date).toISOString(),
            hours: parseFloat(sleepData.hours),
            quality: sleepData.quality || 'good', // good, fair, poor
            notes: sleepData.notes || ''
        };

        filtered.push(newLog);
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        return this.set(this.KEYS.SLEEP_LOG, filtered);
    },

    deleteSleepLog(logId) {
        const logs = this.getAllSleepLogs();
        const filtered = logs.filter(log => log.id !== logId);
        return this.set(this.KEYS.SLEEP_LOG, filtered);
    },

    // Journal Methods
    getAllJournalEntries() {
        return this.get(this.KEYS.JOURNAL_ENTRIES) || [];
    },

    addJournalEntry(entry) {
        const entries = this.getAllJournalEntries();

        const newEntry = {
            id: Date.now(),
            date: new Date(entry.date || new Date()).toISOString(),
            type: entry.type || 'general', // general, workout
            workoutId: entry.workoutId || null,
            title: entry.title || '',
            content: entry.content || '',
            mood: entry.mood || null, // happy, neutral, tired, motivated
            energy: entry.energy || null // 1-5 scale
        };

        entries.unshift(newEntry);
        return this.set(this.KEYS.JOURNAL_ENTRIES, entries);
    },

    updateJournalEntry(entryId, updates) {
        const entries = this.getAllJournalEntries();
        const index = entries.findIndex(e => e.id === entryId);

        if (index !== -1) {
            entries[index] = { ...entries[index], ...updates };
            return this.set(this.KEYS.JOURNAL_ENTRIES, entries);
        }
        return false;
    },

    deleteJournalEntry(entryId) {
        const entries = this.getAllJournalEntries();
        const filtered = entries.filter(e => e.id !== entryId);
        return this.set(this.KEYS.JOURNAL_ENTRIES, filtered);
    },

    getJournalEntryById(entryId) {
        const entries = this.getAllJournalEntries();
        return entries.find(e => e.id === entryId);
    },

    getJournalEntriesForWorkout(workoutId) {
        const entries = this.getAllJournalEntries();
        return entries.filter(e => e.workoutId === workoutId);
    },

    // Cardio Methods
    getAllCardioSessions() {
        return this.get(this.KEYS.CARDIO_SESSIONS) || [];
    },

    addCardioSession(session) {
        const sessions = this.getAllCardioSessions();

        const newSession = {
            id: Date.now(),
            date: new Date(session.date || new Date()).toISOString(),
            type: session.type || 'running', // running, cycling, swimming, other
            duration: parseFloat(session.duration) || 0, // minutes
            distance: parseFloat(session.distance) || 0, // km
            calories: parseFloat(session.calories) || 0,
            notes: session.notes || '',
            avgHeartRate: parseInt(session.avgHeartRate) || null,
            maxHeartRate: parseInt(session.maxHeartRate) || null
        };

        sessions.unshift(newSession);
        return this.set(this.KEYS.CARDIO_SESSIONS, sessions);
    },

    updateCardioSession(sessionId, updates) {
        const sessions = this.getAllCardioSessions();
        const index = sessions.findIndex(s => s.id === sessionId);

        if (index !== -1) {
            sessions[index] = { ...sessions[index], ...updates };
            return this.set(this.KEYS.CARDIO_SESSIONS, sessions);
        }
        return false;
    },

    deleteCardioSession(sessionId) {
        const sessions = this.getAllCardioSessions();
        const filtered = sessions.filter(s => s.id !== sessionId);
        return this.set(this.KEYS.CARDIO_SESSIONS, filtered);
    },

    getCardioSessionById(sessionId) {
        const sessions = this.getAllCardioSessions();
        return sessions.find(s => s.id === sessionId);
    }
};
