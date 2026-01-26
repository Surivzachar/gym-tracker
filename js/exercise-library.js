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
        },
        // CARDIO
        {
            id: 16,
            name: "Outdoor Running",
            category: "cardio",
            difficulty: "beginner",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Core", "Glutes"],
            equipment: "None",
            instructions: [
                "Warm up with 5 minutes of walking or light jogging",
                "Maintain good posture with slight forward lean",
                "Land on midfoot, not heel",
                "Keep arms at 90 degrees, swinging naturally",
                "Control breathing - breathe rhythmically"
            ],
            formTips: [
                "Start with shorter distances and build up",
                "Invest in proper running shoes",
                "Stay hydrated",
                "Track distance and pace"
            ]
        },
        {
            id: 17,
            name: "Indoor Running",
            category: "cardio",
            difficulty: "beginner",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Core", "Glutes"],
            equipment: "Treadmill",
            instructions: [
                "Set treadmill to comfortable pace",
                "Warm up at slow speed for 5 minutes",
                "Gradually increase speed or incline",
                "Maintain good posture, look straight ahead",
                "Cool down with 5 minutes of walking"
            ],
            formTips: [
                "Don't hold onto handrails",
                "Use incline to simulate outdoor running",
                "Stay centered on the belt",
                "Vary speed and incline for better workout"
            ]
        },
        {
            id: 18,
            name: "Outdoor Cycling",
            category: "cardio",
            difficulty: "beginner",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Glutes", "Core"],
            equipment: "Bicycle",
            instructions: [
                "Adjust seat height so leg is almost straight at bottom",
                "Start with easy gear and warm up",
                "Maintain cadence of 70-90 RPM",
                "Keep core engaged and back straight",
                "Shift gears based on terrain"
            ],
            formTips: [
                "Wear helmet for safety",
                "Check tire pressure before riding",
                "Use hand signals when turning",
                "Stay visible with lights/reflectors"
            ]
        },
        {
            id: 19,
            name: "Indoor Cycling",
            category: "cardio",
            difficulty: "beginner",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Glutes", "Core"],
            equipment: "Stationary Bike",
            instructions: [
                "Adjust seat and handlebar height",
                "Start with low resistance for warmup",
                "Maintain steady cadence (80-100 RPM)",
                "Gradually increase resistance for intervals",
                "Keep shoulders relaxed"
            ],
            formTips: [
                "Don't grip handlebars too tight",
                "Engage core throughout",
                "Vary resistance and speed",
                "Track distance and calories"
            ]
        },
        {
            id: 20,
            name: "Treadmill Walking",
            category: "cardio",
            difficulty: "beginner",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Glutes"],
            equipment: "Treadmill",
            instructions: [
                "Start at comfortable walking pace (3-4 mph)",
                "Keep upright posture, shoulders back",
                "Swing arms naturally",
                "Add incline for more intensity",
                "Maintain steady pace throughout"
            ],
            formTips: [
                "Great for beginners or recovery days",
                "Increase incline before speed",
                "Don't look down at feet",
                "Stay hydrated"
            ]
        },
        {
            id: 21,
            name: "Rowing Machine",
            category: "cardio",
            difficulty: "intermediate",
            primaryMuscles: ["Back", "Legs", "Cardiovascular"],
            secondaryMuscles: ["Arms", "Core", "Shoulders"],
            equipment: "Rowing Machine",
            instructions: [
                "Strap feet in securely",
                "Start with legs driving, then pull with arms",
                "Sequence: Legs → Core → Arms (pulling)",
                "Return: Arms → Core → Legs",
                "Keep back straight throughout"
            ],
            formTips: [
                "Full body workout",
                "Power comes from legs, not arms",
                "Maintain 70-80% legs, 20-30% upper body",
                "Track split time (500m pace)"
            ]
        },
        {
            id: 22,
            name: "Elliptical",
            category: "cardio",
            difficulty: "beginner",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Glutes", "Core"],
            equipment: "Elliptical Machine",
            instructions: [
                "Stand upright on pedals",
                "Grip handles lightly",
                "Push and pull with legs in fluid motion",
                "Engage core, don't lean on handles",
                "Vary resistance and incline"
            ],
            formTips: [
                "Low impact on joints",
                "Good for recovery or active rest",
                "Can go backwards to target different muscles",
                "Maintain consistent rhythm"
            ]
        },
        {
            id: 23,
            name: "Jump Rope",
            category: "cardio",
            difficulty: "intermediate",
            primaryMuscles: ["Cardiovascular", "Calves"],
            secondaryMuscles: ["Shoulders", "Core"],
            equipment: "Jump Rope",
            instructions: [
                "Adjust rope length to armpit height",
                "Keep elbows close to body",
                "Rotate from wrists, not arms",
                "Jump on balls of feet",
                "Land softly with slight knee bend"
            ],
            formTips: [
                "High intensity cardio",
                "Start with 30 second intervals",
                "Great for conditioning",
                "Improves coordination and footwork"
            ]
        },
        {
            id: 24,
            name: "Stair Climber",
            category: "cardio",
            difficulty: "intermediate",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Glutes", "Core"],
            equipment: "Stair Climber Machine",
            instructions: [
                "Step with full foot placement",
                "Keep upright posture",
                "Light grip on handrails for balance only",
                "Maintain steady rhythm",
                "Engage glutes with each step"
            ],
            formTips: [
                "Don't lean on handrails",
                "Great for building leg strength",
                "Burns more calories than flat walking",
                "Start with lower speed"
            ]
        },
        {
            id: 25,
            name: "Swimming",
            category: "cardio",
            difficulty: "intermediate",
            primaryMuscles: ["Full Body", "Cardiovascular"],
            secondaryMuscles: ["Shoulders", "Back", "Legs"],
            equipment: "Swimming Pool",
            instructions: [
                "Choose stroke: freestyle, breaststroke, backstroke",
                "Focus on form over speed initially",
                "Breathe rhythmically",
                "Use full range of motion",
                "Take breaks between sets"
            ],
            formTips: [
                "Low impact, easy on joints",
                "Full body workout",
                "Great for active recovery",
                "Wear goggles for comfort"
            ]
        },
        // SPORTS & ACTIVITIES
        {
            id: 26,
            name: "Badminton",
            category: "sports",
            difficulty: "beginner",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Arms", "Shoulders", "Core"],
            equipment: "Badminton Racket & Court",
            instructions: [
                "Warm up with light rallying",
                "Maintain proper grip on racket",
                "Stay on balls of feet for quick movements",
                "Use wrist action for power shots",
                "Recover to center after each shot"
            ],
            formTips: [
                "Great cardio and agility workout",
                "Improves reflexes and coordination",
                "Stay hydrated during play",
                "Track duration and calories burned"
            ]
        },
        {
            id: 27,
            name: "Tennis",
            category: "sports",
            difficulty: "intermediate",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Arms", "Shoulders", "Core"],
            equipment: "Tennis Racket & Court",
            instructions: [
                "Warm up with light rally practice",
                "Focus on footwork and positioning",
                "Use proper technique for groundstrokes",
                "Serve with full body rotation",
                "Stay alert and react quickly"
            ],
            formTips: [
                "Excellent full-body workout",
                "High intensity intervals",
                "Good for bone density",
                "Wear proper tennis shoes"
            ]
        },
        {
            id: 28,
            name: "Basketball",
            category: "sports",
            difficulty: "intermediate",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Arms", "Core"],
            equipment: "Basketball & Court",
            instructions: [
                "Warm up with dynamic stretches",
                "Practice dribbling and shooting",
                "Focus on defensive stance",
                "Jump with proper form",
                "Communicate with teammates"
            ],
            formTips: [
                "High intensity cardio",
                "Builds leg power and explosiveness",
                "Great for coordination",
                "Stay hydrated between quarters"
            ]
        },
        {
            id: 29,
            name: "Football/Soccer",
            category: "sports",
            difficulty: "intermediate",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Core"],
            equipment: "Football & Field",
            instructions: [
                "Warm up with jogging and stretches",
                "Practice ball control and passing",
                "Maintain awareness of field position",
                "Sprint when attacking or defending",
                "Cool down with light jogging"
            ],
            formTips: [
                "Excellent endurance builder",
                "Develops leg strength",
                "Great team sport for motivation",
                "Wear proper cleats and shin guards"
            ]
        },
        {
            id: 30,
            name: "Volleyball",
            category: "sports",
            difficulty: "beginner",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Arms", "Shoulders", "Core"],
            equipment: "Volleyball & Court",
            instructions: [
                "Warm up with passing drills",
                "Keep knees bent and ready to move",
                "Use platform for passing",
                "Jump with proper timing for spikes",
                "Communicate with teammates"
            ],
            formTips: [
                "Good for explosive power",
                "Improves jumping ability",
                "Low to moderate intensity",
                "Great for social fitness"
            ]
        },
        {
            id: 31,
            name: "Table Tennis/Ping Pong",
            category: "sports",
            difficulty: "beginner",
            primaryMuscles: ["Arms", "Core"],
            secondaryMuscles: ["Legs", "Cardiovascular"],
            equipment: "Table Tennis Paddle & Table",
            instructions: [
                "Maintain ready position",
                "Use wrist for spin shots",
                "Stay light on feet",
                "Focus on ball trajectory",
                "Practice serves and returns"
            ],
            formTips: [
                "Excellent for reflexes and hand-eye coordination",
                "Low impact, suitable for all ages",
                "Good for active recovery",
                "Can be played casually or competitively"
            ]
        },
        {
            id: 32,
            name: "Squash",
            category: "sports",
            difficulty: "intermediate",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Arms", "Shoulders", "Core"],
            equipment: "Squash Racket & Court",
            instructions: [
                "Warm up thoroughly",
                "Stay in T-position when possible",
                "Use proper wrist action",
                "Move quickly to corners",
                "Return to center after each shot"
            ],
            formTips: [
                "Extremely high calorie burn",
                "Intense cardio workout",
                "Improves agility and speed",
                "Wear eye protection"
            ]
        },
        {
            id: 33,
            name: "Cricket",
            category: "sports",
            difficulty: "beginner",
            primaryMuscles: ["Legs", "Cardiovascular"],
            secondaryMuscles: ["Arms", "Shoulders", "Core"],
            equipment: "Cricket Bat, Ball & Field",
            instructions: [
                "Warm up with light jogging and stretches",
                "Practice batting stance and shots",
                "Bowl with proper technique",
                "Field with alertness and quick reactions",
                "Stay hydrated during long sessions"
            ],
            formTips: [
                "Moderate intensity with bursts",
                "Good for building endurance",
                "Develops hand-eye coordination",
                "Great team sport"
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
