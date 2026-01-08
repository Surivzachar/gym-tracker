// Storage utility for managing workout data in localStorage

const Storage = {
    // Keys for localStorage
    KEYS: {
        WORKOUTS: 'gym_tracker_workouts',
        ROUTINES: 'gym_tracker_routines',
        CURRENT_WORKOUT: 'gym_tracker_current_workout',
        FOOD_DIARY: 'gym_tracker_food_diary'
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
            id: Date.now(),
            date: new Date().toISOString(),
            exercises: currentWorkout.exercises,
            duration: null // Could be calculated if we track start time
        };

        const workouts = this.getAllWorkouts();
        workouts.unshift(workout);
        this.set(this.KEYS.WORKOUTS, workouts);
        this.clearCurrentWorkout();

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
            id: Date.now(),
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
            return workout;
        }

        return null;
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
            id: Date.now(),
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
    }
};
