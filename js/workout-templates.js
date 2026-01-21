// Workout Templates/Programs Database
const WorkoutTemplates = {
    templates: [
        {
            id: 'ppl_push',
            name: "PPL - Push Day",
            description: "Push Pull Legs - Push focused workout (Chest, Shoulders, Triceps)",
            type: "ppl",
            difficulty: "intermediate",
            estimatedDuration: "60-75 minutes",
            exercises: [
                { name: "Bench Press", sets: 4, reps: "6-8", restTime: 180 },
                { name: "Overhead Press", sets: 3, reps: "8-10", restTime: 120 },
                { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", restTime: 90 },
                { name: "Lateral Raise", sets: 3, reps: "12-15", restTime: 60 },
                { name: "Tricep Dips", sets: 3, reps: "8-12", restTime: 90 },
                { name: "Push-ups", sets: 2, reps: "AMRAP", restTime: 60 }
            ]
        },
        {
            id: 'ppl_pull',
            name: "PPL - Pull Day",
            description: "Push Pull Legs - Pull focused workout (Back, Biceps)",
            type: "ppl",
            difficulty: "intermediate",
            estimatedDuration: "60-75 minutes",
            exercises: [
                { name: "Deadlift", sets: 3, reps: "5-6", restTime: 240 },
                { name: "Pull-ups", sets: 4, reps: "6-10", restTime: 120 },
                { name: "Barbell Row", sets: 4, reps: "8-10", restTime: 120 },
                { name: "Barbell Curl", sets: 3, reps: "10-12", restTime: 90 },
                { name: "Hammer Curl", sets: 3, reps: "10-12", restTime: 60 }
            ]
        },
        {
            id: 'ppl_legs',
            name: "PPL - Leg Day",
            description: "Push Pull Legs - Leg focused workout (Quads, Hamstrings, Glutes)",
            type: "ppl",
            difficulty: "intermediate",
            estimatedDuration: "60-75 minutes",
            exercises: [
                { name: "Squat", sets: 4, reps: "6-8", restTime: 180 },
                { name: "Romanian Deadlift", sets: 3, reps: "8-10", restTime: 120 },
                { name: "Leg Press", sets: 3, reps: "10-12", restTime: 120 },
                { name: "Plank", sets: 3, reps: "60s", restTime: 60 }
            ]
        },
        {
            id: 'upper_lower_upper',
            name: "Upper/Lower - Upper",
            description: "Upper Lower Split - Upper body focus",
            type: "upper_lower",
            difficulty: "intermediate",
            estimatedDuration: "60-90 minutes",
            exercises: [
                { name: "Bench Press", sets: 4, reps: "6-8", restTime: 180 },
                { name: "Barbell Row", sets: 4, reps: "6-8", restTime: 180 },
                { name: "Overhead Press", sets: 3, reps: "8-10", restTime: 120 },
                { name: "Pull-ups", sets: 3, reps: "8-12", restTime: 120 },
                { name: "Barbell Curl", sets: 3, reps: "10-12", restTime: 90 },
                { name: "Tricep Dips", sets: 3, reps: "10-12", restTime: 90 }
            ]
        },
        {
            id: 'upper_lower_lower',
            name: "Upper/Lower - Lower",
            description: "Upper Lower Split - Lower body focus",
            type: "upper_lower",
            difficulty: "intermediate",
            estimatedDuration: "60-90 minutes",
            exercises: [
                { name: "Squat", sets: 4, reps: "6-8", restTime: 180 },
                { name: "Romanian Deadlift", sets: 3, reps: "8-10", restTime: 120 },
                { name: "Leg Press", sets: 3, reps: "12-15", restTime: 120 },
                { name: "Plank", sets: 3, reps: "60s", restTime: 60 }
            ]
        },
        {
            id: 'full_body_a',
            name: "Full Body - Workout A",
            description: "Full body compound movements - Session A",
            type: "full_body",
            difficulty: "beginner",
            estimatedDuration: "45-60 minutes",
            exercises: [
                { name: "Squat", sets: 3, reps: "8-10", restTime: 120 },
                { name: "Bench Press", sets: 3, reps: "8-10", restTime: 120 },
                { name: "Barbell Row", sets: 3, reps: "8-10", restTime: 120 },
                { name: "Overhead Press", sets: 2, reps: "10-12", restTime: 90 },
                { name: "Plank", sets: 2, reps: "45s", restTime: 60 }
            ]
        },
        {
            id: 'full_body_b',
            name: "Full Body - Workout B",
            description: "Full body compound movements - Session B",
            type: "full_body",
            difficulty: "beginner",
            estimatedDuration: "45-60 minutes",
            exercises: [
                { name: "Deadlift", sets: 3, reps: "6-8", restTime: 180 },
                { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", restTime: 120 },
                { name: "Pull-ups", sets: 3, reps: "6-10", restTime: 120 },
                { name: "Romanian Deadlift", sets: 2, reps: "10-12", restTime: 90 },
                { name: "Plank", sets: 2, reps: "45s", restTime: 60 }
            ]
        },
        {
            id: 'beginner_full',
            name: "Beginner Full Body",
            description: "Perfect for beginners - focuses on form and basics",
            type: "full_body",
            difficulty: "beginner",
            estimatedDuration: "30-45 minutes",
            exercises: [
                { name: "Squat", sets: 3, reps: "10-12", restTime: 90 },
                { name: "Push-ups", sets: 3, reps: "8-12", restTime: 90 },
                { name: "Leg Press", sets: 3, reps: "12-15", restTime: 90 },
                { name: "Barbell Curl", sets: 2, reps: "10-12", restTime: 60 },
                { name: "Plank", sets: 2, reps: "30s", restTime: 60 }
            ]
        }
    ],

    // Get all templates
    getAllTemplates() {
        return this.templates;
    },

    // Get templates by type
    getByType(type) {
        return this.templates.filter(t => t.type === type);
    },

    // Get templates by difficulty
    getByDifficulty(difficulty) {
        return this.templates.filter(t => t.difficulty === difficulty);
    },

    // Get template by ID
    getById(id) {
        return this.templates.find(t => t.id === id);
    },

    // Get all program types
    getTypes() {
        return [...new Set(this.templates.map(t => t.type))];
    },

    // Load template into current workout
    loadTemplate(templateId) {
        const template = this.getById(templateId);
        if (!template) return null;

        return {
            exercises: template.exercises.map((ex, index) => ({
                id: Date.now() + index,
                name: ex.name,
                sets: Array.from({ length: ex.sets }, () => ({ weight: 0, reps: 0 })),
                restTime: ex.restTime || 90,
                targetReps: ex.reps
            }))
        };
    }
};
