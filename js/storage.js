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
        DAILY_METRICS: 'gym_tracker_daily_metrics'
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

    finishWorkout() {
        const currentWorkout = this.getCurrentWorkout();

        if (currentWorkout.exercises.length === 0) {
            return false;
        }

        const workout = {
            id: Date.now() + Math.random(), // Add random component for uniqueness
            date: new Date().toISOString(),
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
            const exercises = routine.exercises.map(exercise => ({
                ...exercise,
                id: Date.now() + Math.random(),
                sets: exercise.sets.map(set => ({...set}))
            }));

            const workout = { exercises };
            this.saveCurrentWorkout(workout);
            // Track which routine is being used
            this.setCurrentRoutineId(id);
            return workout;
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

    getTodayFood() {
        const today = new Date().toDateString();
        const allDays = this.getAllFoodDays();
        const todayData = allDays.find(day => new Date(day.date).toDateString() === today);

        return todayData || {
            date: new Date().toISOString(),
            meals: []
        };
    },

    addFoodItem(mealType, foodItem) {
        const allDays = this.getAllFoodDays();
        const today = new Date().toDateString();
        let todayIndex = allDays.findIndex(day => new Date(day.date).toDateString() === today);

        const foodEntry = {
            id: Date.now() + Math.random(), // Add random component to ensure uniqueness
            mealType: mealType,
            name: foodItem.name,
            calories: parseInt(foodItem.calories) || 0,
            protein: parseInt(foodItem.protein) || 0,
            carbs: parseInt(foodItem.carbs) || 0,
            fats: parseInt(foodItem.fats) || 0,
            time: new Date().toISOString()
        };

        if (todayIndex === -1) {
            // Create new day entry
            allDays.unshift({
                date: new Date().toISOString(),
                meals: [foodEntry]
            });
        } else {
            // Add to existing day
            allDays[todayIndex].meals.push(foodEntry);
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

    loadFoodRoutine(id) {
        const routines = this.getAllFoodRoutines();
        const routine = routines.find(r => r.id === id);

        if (routine) {
            // Clear today's food first
            const allDays = this.getAllFoodDays();
            const today = new Date().toDateString();
            const todayIndex = allDays.findIndex(day => new Date(day.date).toDateString() === today);

            if (todayIndex !== -1) {
                allDays.splice(todayIndex, 1);
                // Save the cleared data before adding new items
                this.set(this.KEYS.FOOD_DIARY, allDays);
            }

            // Add routine meals to today
            routine.meals.forEach(meal => {
                this.addFoodItem(meal.mealType, meal);
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

        const start = new Date(startDate);
        const today = new Date();
        const diffTime = Math.abs(today - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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

    getTodayMetrics() {
        const allMetrics = this.getAllDailyMetrics();
        const today = new Date().toDateString();
        let todayMetrics = allMetrics.find(m => new Date(m.date).toDateString() === today);

        if (!todayMetrics) {
            todayMetrics = {
                date: new Date().toISOString(),
                steps: 0,
                waterGlasses: 0, // 1 glass = 250ml
                sleepHours: 0,
                workoutCalories: 0
            };
            allMetrics.push(todayMetrics);
            this.set(this.KEYS.DAILY_METRICS, allMetrics);
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
    }
};
