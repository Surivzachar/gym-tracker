// Exercise Library Database
const ExerciseLibrary = {
    exercises: [
        // CHEST
        {
            id: 1,
            name: "Bench Press",
            category: "chest",
            difficulty: "intermediate",
            primaryMuscles: ["Chest", "Triceps"],
            secondaryMuscles: ["Shoulders"],
            equipment: "Barbell",
            instructions: [
                "Lie flat on bench with feet flat on floor",
                "Grip bar slightly wider than shoulder-width",
                "Lower bar to mid-chest with control",
                "Press bar up explosively until arms are extended",
                "Keep shoulder blades retracted throughout"
            ],
            formTips: [
                "Keep your butt on the bench",
                "Arch your lower back slightly",
                "Don't bounce the bar off your chest",
                "Maintain wrist alignment over elbows"
            ]
        },
        {
            id: 2,
            name: "Incline Dumbbell Press",
            category: "chest",
            difficulty: "intermediate",
            primaryMuscles: ["Upper Chest", "Shoulders"],
            secondaryMuscles: ["Triceps"],
            equipment: "Dumbbells",
            instructions: [
                "Set bench to 30-45 degree incline",
                "Hold dumbbells at shoulder height",
                "Press dumbbells up and slightly together",
                "Lower with control to starting position",
                "Maintain natural arch in lower back"
            ],
            formTips: [
                "Don't set incline too steep (>45°)",
                "Keep elbows at 45° angle from body",
                "Touch dumbbells at top without banging"
            ]
        },
        {
            id: 3,
            name: "Push-ups",
            category: "chest",
            difficulty: "beginner",
            primaryMuscles: ["Chest", "Triceps"],
            secondaryMuscles: ["Shoulders", "Core"],
            equipment: "Bodyweight",
            instructions: [
                "Start in plank position, hands shoulder-width",
                "Lower body until chest nearly touches floor",
                "Keep core tight and body in straight line",
                "Push back up to starting position",
                "Full range of motion on each rep"
            ],
            formTips: [
                "Don't let hips sag or pike up",
                "Keep elbows at 45° angle",
                "Breathe in going down, out going up"
            ]
        },
        // BACK
        {
            id: 4,
            name: "Deadlift",
            category: "back",
            difficulty: "advanced",
            primaryMuscles: ["Lower Back", "Glutes", "Hamstrings"],
            secondaryMuscles: ["Traps", "Forearms", "Core"],
            equipment: "Barbell",
            instructions: [
                "Stand with feet hip-width, bar over mid-foot",
                "Bend down and grip bar just outside legs",
                "Keep back straight, chest up, shoulders back",
                "Drive through heels, extend hips and knees",
                "Stand tall, then lower bar with control"
            ],
            formTips: [
                "Keep bar close to body throughout",
                "Don't round your back",
                "Engage lats by 'bending the bar'",
                "Hinge at hips, not at lower back"
            ]
        },
        {
            id: 5,
            name: "Pull-ups",
            category: "back",
            difficulty: "intermediate",
            primaryMuscles: ["Lats", "Upper Back"],
            secondaryMuscles: ["Biceps", "Forearms"],
            equipment: "Pull-up Bar",
            instructions: [
                "Hang from bar with overhand grip, hands shoulder-width",
                "Pull body up until chin clears bar",
                "Lead with chest, not with chin",
                "Lower with control to full hang",
                "Avoid swinging or kipping"
            ],
            formTips: [
                "Engage lats before pulling",
                "Keep core tight throughout",
                "Full range of motion each rep",
                "Don't shrug shoulders at top"
            ]
        },
        {
            id: 6,
            name: "Barbell Row",
            category: "back",
            difficulty: "intermediate",
            primaryMuscles: ["Middle Back", "Lats"],
            secondaryMuscles: ["Biceps", "Rear Delts"],
            equipment: "Barbell",
            instructions: [
                "Bend forward with flat back, knees slightly bent",
                "Grip bar slightly wider than shoulder-width",
                "Pull bar to lower chest/upper abdomen",
                "Squeeze shoulder blades together at top",
                "Lower bar with control"
            ],
            formTips: [
                "Keep torso angle consistent",
                "Don't use momentum to lift weight",
                "Pull with elbows, not hands",
                "Retract shoulder blades fully"
            ]
        },
        // LEGS
        {
            id: 7,
            name: "Squat",
            category: "legs",
            difficulty: "intermediate",
            primaryMuscles: ["Quads", "Glutes"],
            secondaryMuscles: ["Hamstrings", "Core"],
            equipment: "Barbell",
            instructions: [
                "Bar on upper traps, feet shoulder-width apart",
                "Brace core, take deep breath",
                "Sit back and down, knees track over toes",
                "Descend until thighs parallel or below",
                "Drive through heels to stand"
            ],
            formTips: [
                "Keep chest up and proud",
                "Don't let knees cave inward",
                "Maintain neutral spine",
                "Drive knees out on ascent"
            ]
        },
        {
            id: 8,
            name: "Romanian Deadlift",
            category: "legs",
            difficulty: "intermediate",
            primaryMuscles: ["Hamstrings", "Glutes"],
            secondaryMuscles: ["Lower Back"],
            equipment: "Barbell",
            instructions: [
                "Hold bar at hip level, feet hip-width",
                "Keep slight bend in knees throughout",
                "Hinge at hips, push butt back",
                "Lower bar down front of legs",
                "Feel stretch in hamstrings, then reverse"
            ],
            formTips: [
                "Keep bar close to legs",
                "Maintain neutral spine",
                "Don't round lower back",
                "Focus on hip hinge, not knee bend"
            ]
        },
        {
            id: 9,
            name: "Leg Press",
            category: "legs",
            difficulty: "beginner",
            primaryMuscles: ["Quads", "Glutes"],
            secondaryMuscles: ["Hamstrings"],
            equipment: "Machine",
            instructions: [
                "Sit in machine, feet shoulder-width on platform",
                "Release safety, lower weight with control",
                "Lower until knees at 90 degrees",
                "Press through heels to extend legs",
                "Don't lock out knees at top"
            ],
            formTips: [
                "Keep lower back pressed to pad",
                "Don't let knees cave inward",
                "Full range of motion",
                "Control the negative portion"
            ]
        },
        // SHOULDERS
        {
            id: 10,
            name: "Overhead Press",
            category: "shoulders",
            difficulty: "intermediate",
            primaryMuscles: ["Shoulders", "Triceps"],
            secondaryMuscles: ["Upper Chest", "Core"],
            equipment: "Barbell",
            instructions: [
                "Hold bar at shoulder height, hands shoulder-width",
                "Brace core, squeeze glutes",
                "Press bar straight up overhead",
                "Lock out arms at top",
                "Lower bar to starting position"
            ],
            formTips: [
                "Don't lean back excessively",
                "Keep core tight throughout",
                "Press bar in straight line",
                "Shrug shoulders at top"
            ]
        },
        {
            id: 11,
            name: "Lateral Raise",
            category: "shoulders",
            difficulty: "beginner",
            primaryMuscles: ["Side Delts"],
            secondaryMuscles: [],
            equipment: "Dumbbells",
            instructions: [
                "Stand with dumbbells at sides",
                "Raise arms out to sides",
                "Stop when parallel to floor",
                "Lower with control",
                "Keep slight bend in elbows"
            ],
            formTips: [
                "Don't swing or use momentum",
                "Lead with elbows, not hands",
                "Keep torso still",
                "Controlled tempo both ways"
            ]
        },
        // ARMS
        {
            id: 12,
            name: "Barbell Curl",
            category: "arms",
            difficulty: "beginner",
            primaryMuscles: ["Biceps"],
            secondaryMuscles: ["Forearms"],
            equipment: "Barbell",
            instructions: [
                "Stand with bar at arm's length",
                "Curl bar up to shoulders",
                "Keep elbows stationary",
                "Squeeze biceps at top",
                "Lower with control"
            ],
            formTips: [
                "Don't swing your body",
                "Keep elbows close to sides",
                "Full range of motion",
                "Squeeze at the top"
            ]
        },
        {
            id: 13,
            name: "Tricep Dips",
            category: "arms",
            difficulty: "intermediate",
            primaryMuscles: ["Triceps"],
            secondaryMuscles: ["Chest", "Shoulders"],
            equipment: "Dip Bar",
            instructions: [
                "Support body on dip bars",
                "Lower body by bending elbows",
                "Go down until upper arms parallel",
                "Push back up to start",
                "Keep body upright for triceps focus"
            ],
            formTips: [
                "Don't go too deep",
                "Keep elbows close to body",
                "Lean forward for chest emphasis",
                "Stay upright for triceps"
            ]
        },
        {
            id: 14,
            name: "Hammer Curl",
            category: "arms",
            difficulty: "beginner",
            primaryMuscles: ["Biceps", "Brachialis"],
            secondaryMuscles: ["Forearms"],
            equipment: "Dumbbells",
            instructions: [
                "Hold dumbbells with neutral grip (palms facing in)",
                "Curl weights up to shoulders",
                "Keep upper arms stationary",
                "Squeeze at top",
                "Lower with control"
            ],
            formTips: [
                "Don't rotate wrists",
                "Keep thumbs up throughout",
                "Control the movement",
                "No swinging"
            ]
        },
        // CORE
        {
            id: 15,
            name: "Plank",
            category: "core",
            difficulty: "beginner",
            primaryMuscles: ["Core", "Abs"],
            secondaryMuscles: ["Shoulders"],
            equipment: "Bodyweight",
            instructions: [
                "Start in forearm plank position",
                "Keep body in straight line from head to heels",
                "Engage core and glutes",
                "Hold for prescribed time",
                "Don't let hips sag or pike up"
            ],
            formTips: [
                "Breathe normally",
                "Keep neck neutral",
                "Squeeze glutes tight",
                "Full body tension"
            ]
        }
    ],

    // Get all exercises
    getAllExercises() {
        return this.exercises;
    },

    // Get exercises by category
    getByCategory(category) {
        return this.exercises.filter(ex => ex.category === category);
    },

    // Get exercises by difficulty
    getByDifficulty(difficulty) {
        return this.exercises.filter(ex => ex.difficulty === difficulty);
    },

    // Search exercises by name
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.exercises.filter(ex =>
            ex.name.toLowerCase().includes(lowerQuery) ||
            ex.primaryMuscles.some(m => m.toLowerCase().includes(lowerQuery)) ||
            ex.category.toLowerCase().includes(lowerQuery)
        );
    },

    // Get exercise by name (exact match)
    getByName(name) {
        return this.exercises.find(ex => ex.name.toLowerCase() === name.toLowerCase());
    },

    // Get exercise by ID
    getById(id) {
        return this.exercises.find(ex => ex.id === id);
    },

    // Get all categories
    getCategories() {
        return [...new Set(this.exercises.map(ex => ex.category))];
    }
};
