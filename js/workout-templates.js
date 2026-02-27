// Workout Templates/Programs Database
// Note: User has custom routines loaded from my-workout-routines.json
// Default templates have been removed to avoid confusion with actual workout routine
const WorkoutTemplates = {
    templates: [],

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
