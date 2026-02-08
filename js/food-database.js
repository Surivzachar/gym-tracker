// Common foods database with nutritional information
// All values are per serving unless specified

const FoodDatabase = [
    // Proteins
    {
        name: "Chicken Breast",
        category: "Protein",
        servings: [
            { type: "1 breast (150g)", calories: 248, protein: 46.5, carbs: 0, fats: 5.4 },
            { type: "100g", calories: 165, protein: 31, carbs: 0, fats: 3.6 },
            { type: "1 oz (28g)", calories: 46, protein: 8.7, carbs: 0, fats: 1 },
            { type: "200g", calories: 330, protein: 62, carbs: 0, fats: 7.2 }
        ]
    },
    { name: "Chicken Thigh", calories: 209, protein: 26, carbs: 0, fats: 11, category: "Protein", serving: "100g" },
    {
        name: "Egg (whole)",
        category: "Protein",
        servings: [
            { type: "1 egg (50g)", calories: 70, protein: 6, carbs: 0.5, fats: 5 },
            { type: "2 eggs (100g)", calories: 140, protein: 12, carbs: 1, fats: 10 },
            { type: "3 eggs (150g)", calories: 210, protein: 18, carbs: 1.5, fats: 15 },
            { type: "4 eggs (200g)", calories: 280, protein: 24, carbs: 2, fats: 20 },
            { type: "100g", calories: 140, protein: 12, carbs: 1, fats: 10 }
        ]
    },
    {
        name: "Egg White",
        category: "Protein",
        servings: [
            { type: "1 egg white (33g)", calories: 17, protein: 3.5, carbs: 0.25, fats: 0 },
            { type: "2 egg whites (66g)", calories: 34, protein: 7, carbs: 0.5, fats: 0 },
            { type: "3 egg whites (99g)", calories: 51, protein: 10.5, carbs: 0.75, fats: 0 },
            { type: "4 egg whites (132g)", calories: 68, protein: 14, carbs: 1, fats: 0 },
            { type: "100g", calories: 52, protein: 10.6, carbs: 0.76, fats: 0 }
        ]
    },
    { name: "Salmon", calories: 208, protein: 20, carbs: 0, fats: 13, category: "Protein", serving: "100g" },
    { name: "Tuna (canned)", calories: 132, protein: 28, carbs: 0, fats: 1, category: "Protein", serving: "100g" },
    { name: "White Fish (cooked)", calories: 167, protein: 30, carbs: 0, fats: 3.3, category: "Protein", serving: "100g" },
    { name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.6, fats: 0.4, category: "Protein", serving: "100g" },
    { name: "Cottage Cheese", calories: 98, protein: 11, carbs: 3.4, fats: 4.3, category: "Protein", serving: "100g" },
    { name: "Whey Protein (1 scoop)", calories: 120, protein: 24, carbs: 3, fats: 1.5, category: "Protein", serving: "1 scoop (30g)" },
    { name: "ISO Whey Protein (1 scoop)", calories: 100, protein: 25, carbs: 1, fats: 0, category: "Protein", serving: "1 scoop (30g)" },
    { name: "Beef (lean)", calories: 250, protein: 26, carbs: 0, fats: 15, category: "Protein", serving: "100g" },
    { name: "Pork Chop", calories: 242, protein: 27, carbs: 0, fats: 14, category: "Protein", serving: "100g" },
    { name: "Turkey Breast", calories: 135, protein: 30, carbs: 0, fats: 1, category: "Protein", serving: "100g" },
    { name: "Tofu", calories: 76, protein: 8, carbs: 1.9, fats: 4.8, category: "Protein", serving: "100g" },

    // Paneer Dishes
    {
        name: "Paneer (raw)",
        category: "Protein",
        servings: [
            { type: "1 cube (25g)", calories: 66, protein: 4.5, carbs: 0.75, fats: 5 },
            { type: "50g", calories: 133, protein: 9, carbs: 1.5, fats: 10 },
            { type: "100g", calories: 265, protein: 18, carbs: 3, fats: 20 },
            { type: "150g", calories: 398, protein: 27, carbs: 4.5, fats: 30 },
            { type: "1 oz (28g)", calories: 74, protein: 5, carbs: 0.84, fats: 5.6 }
        ],
        recipe: "Raw paneer - no preparation needed. Can be cubed and added to curries or grilled."
    },
    {
        name: "Paneer Tikka",
        calories: 320, protein: 20, carbs: 8, fats: 22,
        category: "Protein",
        serving: "200g",
        recipe: "Ingredients (for 200g serving):\n• Paneer cubes - 150g\n• Yogurt - 50g\n• Spices - 1 tsp (red chili, turmeric, garam masala)\n• Oil - 1 tsp\n\nPreparation:\n1. Marinate paneer in yogurt and spices for 30 min\n2. Grill or air-fry until golden (15 min at 180°C)\n3. Serve hot with mint chutney"
    },
    {
        name: "Paneer Bhurji",
        calories: 280, protein: 16, carbs: 6, fats: 21,
        category: "Protein",
        serving: "150g",
        recipe: "Ingredients (for 150g serving):\n• Paneer (crumbled) - 100g\n• Onion - 30g\n• Tomato - 40g\n• Oil - 1 tsp\n• Spices - 1 tsp\n\nPreparation:\n1. Sauté onions until golden\n2. Add tomatoes and cook till soft\n3. Add crumbled paneer and spices\n4. Cook for 5-7 minutes"
    },

    // Carbs
    {
        name: "White Rice (cooked)",
        category: "Carbs",
        servings: [
            { type: "1 katori (150g)", calories: 195, protein: 4.05, carbs: 42, fats: 0.45 },
            { type: "1 bowl (200g)", calories: 260, protein: 5.4, carbs: 56, fats: 0.6 },
            { type: "1 cup (158g)", calories: 205, protein: 4.3, carbs: 44.2, fats: 0.47 },
            { type: "100g", calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
            { type: "1 oz (28g)", calories: 36, protein: 0.76, carbs: 7.8, fats: 0.08 }
        ]
    },
    {
        name: "Brown Rice (cooked)",
        category: "Carbs",
        servings: [
            { type: "1 katori (150g)", calories: 168, protein: 3.9, carbs: 36, fats: 1.35 },
            { type: "1 bowl (200g)", calories: 224, protein: 5.2, carbs: 48, fats: 1.8 },
            { type: "1 cup (195g)", calories: 218, protein: 5.1, carbs: 46.8, fats: 1.76 },
            { type: "100g", calories: 112, protein: 2.6, carbs: 24, fats: 0.9 },
            { type: "1 oz (28g)", calories: 31, protein: 0.73, carbs: 6.7, fats: 0.25 }
        ]
    },
    {
        name: "Basmati Rice (cooked)",
        category: "Carbs",
        servings: [
            { type: "1 katori (150g)", calories: 195, protein: 3.75, carbs: 42, fats: 0.38 },
            { type: "1 bowl (200g)", calories: 260, protein: 5, carbs: 56, fats: 0.5 },
            { type: "1 cup (158g)", calories: 205, protein: 3.95, carbs: 44.2, fats: 0.4 },
            { type: "100g", calories: 130, protein: 2.5, carbs: 28, fats: 0.25 },
            { type: "1 oz (28g)", calories: 36, protein: 0.7, carbs: 7.8, fats: 0.07 }
        ]
    },
    { name: "Oats (dry)", calories: 389, protein: 17, carbs: 66, fats: 7, category: "Carbs", serving: "100g" },
    { name: "Quinoa (cooked)", calories: 120, protein: 4.4, carbs: 21, fats: 1.9, category: "Carbs", serving: "100g" },
    { name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fats: 0.1, category: "Carbs", serving: "100g" },
    { name: "Potato", calories: 77, protein: 2, carbs: 17, fats: 0.1, category: "Carbs", serving: "100g" },
    {
        name: "Whole Wheat Bread",
        category: "Carbs",
        servings: [
            { type: "1 slice (30g)", calories: 80, protein: 4, carbs: 14, fats: 1 },
            { type: "2 slices (60g)", calories: 160, protein: 8, carbs: 28, fats: 2 },
            { type: "3 slices (90g)", calories: 240, protein: 12, carbs: 42, fats: 3 },
            { type: "100g", calories: 267, protein: 13.3, carbs: 46.7, fats: 3.3 },
            { type: "1 oz (28g)", calories: 75, protein: 3.7, carbs: 13.1, fats: 0.9 }
        ]
    },
    {
        name: "White Bread",
        category: "Carbs",
        servings: [
            { type: "1 slice (25g)", calories: 75, protein: 2.5, carbs: 14, fats: 1 },
            { type: "2 slices (50g)", calories: 150, protein: 5, carbs: 28, fats: 2 },
            { type: "3 slices (75g)", calories: 225, protein: 7.5, carbs: 42, fats: 3 },
            { type: "100g", calories: 300, protein: 10, carbs: 56, fats: 4 },
            { type: "1 oz (28g)", calories: 84, protein: 2.8, carbs: 15.7, fats: 1.1 }
        ]
    },
    { name: "Pasta (cooked)", calories: 131, protein: 5, carbs: 25, fats: 1.1, category: "Carbs", serving: "100g" },
    {
        name: "Roti/Chapati",
        category: "Carbs",
        servings: [
            { type: "1 roti (30g)", calories: 71, protein: 2, carbs: 15, fats: 0.4 },
            { type: "2 roti (60g)", calories: 142, protein: 4, carbs: 30, fats: 0.8 },
            { type: "3 roti (90g)", calories: 213, protein: 6, carbs: 45, fats: 1.2 },
            { type: "4 roti (120g)", calories: 284, protein: 8, carbs: 60, fats: 1.6 },
            { type: "100g", calories: 237, protein: 6.7, carbs: 50, fats: 1.3 }
        ],
        recipe: "Ingredients (for 1 roti):\n• Whole wheat flour - 30g\n• Water - 15ml\n• Salt - pinch\n\nPreparation:\n1. Knead flour with water into soft dough\n2. Roll into thin circle (6-7 inches)\n3. Cook on hot tawa (1 min each side)\n4. Optional: apply 1/2 tsp ghee"
    },
    {
        name: "Paratha",
        category: "Carbs",
        servings: [
            { type: "1 paratha (80g)", calories: 268, protein: 6, carbs: 38, fats: 10 },
            { type: "2 paratha (160g)", calories: 536, protein: 12, carbs: 76, fats: 20 },
            { type: "3 paratha (240g)", calories: 804, protein: 18, carbs: 114, fats: 30 },
            { type: "100g", calories: 335, protein: 7.5, carbs: 47.5, fats: 12.5 }
        ],
        recipe: "Ingredients (for 1 paratha):\n• Whole wheat flour - 60g\n• Ghee/Oil - 1 tbsp (10g)\n• Water - 30ml\n• Salt - pinch\n\nPreparation:\n1. Make dough, rest 15 min\n2. Roll, apply ghee, fold and roll again\n3. Cook on tawa with ghee until golden\n4. Takes 3-4 minutes"
    },
    { name: "Banana", calories: 89, protein: 1.1, carbs: 23, fats: 0.3, category: "Carbs", serving: "100g" },
    { name: "Apple", calories: 52, protein: 0.3, carbs: 14, fats: 0.2, category: "Carbs", serving: "100g" },

    // Nuts & Seeds
    { name: "Almonds", calories: 579, protein: 21, carbs: 22, fats: 50, category: "Fats", serving: "100g (23 almonds)" },
    { name: "Peanuts", calories: 567, protein: 26, carbs: 16, fats: 49, category: "Fats", serving: "100g" },
    { name: "Peanut Butter (1 tbsp)", calories: 94, protein: 4, carbs: 3.5, fats: 8, category: "Fats", serving: "1 tbsp (15g)" },
    { name: "Cashews", calories: 553, protein: 18, carbs: 30, fats: 44, category: "Fats", serving: "100g (18 cashews)" },
    { name: "Walnuts", calories: 654, protein: 15, carbs: 14, fats: 65, category: "Fats", serving: "100g (14 halves)" },
    { name: "Chia Seeds (1 tbsp)", calories: 58, protein: 2, carbs: 5, fats: 3.7, category: "Fats", serving: "1 tbsp" },

    // Vegetables
    { name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fats: 0.4, category: "Vegetables", serving: "100g" },
    { name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, category: "Vegetables", serving: "100g" },
    { name: "Tomato", calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, category: "Vegetables", serving: "100g" },
    { name: "Cucumber", calories: 15, protein: 0.7, carbs: 3.6, fats: 0.1, category: "Vegetables", serving: "100g" },
    { name: "Carrot", calories: 41, protein: 0.9, carbs: 10, fats: 0.2, category: "Vegetables", serving: "100g" },
    { name: "Cauliflower", calories: 25, protein: 1.9, carbs: 5, fats: 0.3, category: "Vegetables", serving: "100g" },

    // Dairy
    {
        name: "Milk (whole)",
        category: "Dairy",
        servings: [
            { type: "1 glass (250ml)", calories: 153, protein: 8, carbs: 12, fats: 8.3, calcium: 300 },
            { type: "1 cup (200ml)", calories: 122, protein: 6.4, carbs: 9.6, fats: 6.6, calcium: 240 },
            { type: "100ml", calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3, calcium: 120 },
            { type: "1 oz (30ml)", calories: 18, protein: 1, carbs: 1.4, fats: 1, calcium: 36 }
        ]
    },
    {
        name: "Milk (skim)",
        category: "Dairy",
        servings: [
            { type: "1 glass (250ml)", calories: 85, protein: 8.5, carbs: 12.5, fats: 0.25, calcium: 300 },
            { type: "1 cup (200ml)", calories: 68, protein: 6.8, carbs: 10, fats: 0.2, calcium: 240 },
            { type: "100ml", calories: 34, protein: 3.4, carbs: 5, fats: 0.1, calcium: 120 },
            { type: "1 oz (30ml)", calories: 10, protein: 1, carbs: 1.5, fats: 0.03, calcium: 36 }
        ]
    },
    { name: "Cheddar Cheese", calories: 402, protein: 25, carbs: 1.3, fats: 33, category: "Dairy", serving: "100g" },
    { name: "Mozzarella Cheese", calories: 280, protein: 28, carbs: 2.2, fats: 17, category: "Dairy", serving: "100g" },
    { name: "Butter (1 tbsp)", calories: 102, protein: 0.1, carbs: 0, fats: 12, category: "Dairy", serving: "1 tbsp (15g)" },

    // Oils & Fats
    { name: "Olive Oil (1 tbsp)", calories: 119, protein: 0, carbs: 0, fats: 14, category: "Fats", serving: "1 tbsp" },
    { name: "Olive Oil (1 tsp)", calories: 40, protein: 0, carbs: 0, fats: 4.5, category: "Fats", serving: "1 tsp" },
    { name: "Coconut Oil (1 tbsp)", calories: 117, protein: 0, carbs: 0, fats: 14, category: "Fats", serving: "1 tbsp" },
    { name: "Ghee (1 tbsp)", calories: 112, protein: 0, carbs: 0, fats: 13, category: "Fats", serving: "1 tbsp" },
    { name: "Avocado", calories: 160, protein: 2, carbs: 9, fats: 15, category: "Fats", serving: "100g" },

    // Indian Dal/Lentils
    {
        name: "Moong Dal (cooked)",
        calories: 105, protein: 7, carbs: 19, fats: 0.4,
        category: "Protein",
        serving: "150g (1 katori)",
        recipe: "Ingredients (for 150g serving):\n• Moong dal - 30g (raw)\n• Water - 120ml\n• Turmeric - 1/4 tsp\n• Salt - 1/4 tsp\n• Tempering: oil (1 tsp), cumin, garlic\n\nPreparation:\n1. Pressure cook dal with turmeric (3 whistles)\n2. Add salt, mash lightly\n3. Temper with cumin & garlic\n4. Cooking time: 20 minutes"
    },
    {
        name: "Masoor Dal (cooked)",
        calories: 116, protein: 9, carbs: 20, fats: 0.4,
        category: "Protein",
        serving: "150g (1 katori)",
        recipe: "Ingredients (for 150g serving):\n• Masoor dal - 35g (raw)\n• Water - 120ml\n• Onion - 20g\n• Tomato - 20g\n• Spices - 1/2 tsp\n• Oil - 1 tsp\n\nPreparation:\n1. Pressure cook dal (2 whistles)\n2. Sauté onion-tomato with spices\n3. Mix with cooked dal\n4. Simmer for 5 minutes"
    },
    {
        name: "Rajma (cooked)",
        calories: 127, protein: 8.7, carbs: 23, fats: 0.5,
        category: "Protein",
        serving: "150g (1 katori)",
        recipe: "Ingredients (for 150g serving):\n• Rajma (soaked) - 40g\n• Onion - 30g\n• Tomato - 30g\n• Ginger-garlic paste - 1 tsp\n• Spices - 1 tsp\n• Oil - 1 tsp\n\nPreparation:\n1. Soak rajma overnight (8 hours)\n2. Pressure cook with salt (6-7 whistles)\n3. Make gravy with onion-tomato\n4. Add cooked rajma, simmer 10 min"
    },
    {
        name: "Chole (cooked)",
        calories: 164, protein: 8.9, carbs: 27, fats: 2.6,
        category: "Protein",
        serving: "150g (1 katori)",
        recipe: "Ingredients (for 150g serving):\n• Chickpeas (soaked) - 50g\n• Onion - 30g\n• Tomato - 30g\n• Chole masala - 1 tsp\n• Tea bag - 1 (for color)\n• Oil - 1 tsp\n\nPreparation:\n1. Soak chickpeas 8 hours\n2. Pressure cook with tea bag (5 whistles)\n3. Make spicy gravy\n4. Mix and cook 15 minutes"
    },

    // South Indian
    {
        name: "Idli (2 medium)",
        calories: 78, protein: 4, carbs: 16, fats: 0.2,
        category: "Carbs",
        serving: "2 idli (80g)",
        recipe: "Ingredients (for 2 idlis):\n• Idli batter - 80g\n  (Rice:Urad dal = 3:1 ratio)\n• Salt - to taste\n\nPreparation:\n1. Use fermented batter (8-12 hrs)\n2. Pour in greased idli moulds\n3. Steam for 10-12 minutes\n4. Serve hot with sambar/chutney"
    },
    {
        name: "Dosa (1 medium)",
        calories: 133, protein: 4, carbs: 25, fats: 2,
        category: "Carbs",
        serving: "1 dosa (70g)",
        recipe: "Ingredients (for 1 dosa):\n• Dosa batter - 70g\n• Oil - 1 tsp\n• Salt - to taste\n\nPreparation:\n1. Spread batter thin on hot tawa\n2. Drizzle oil around edges\n3. Cook till crispy (2-3 min)\n4. Fold and serve with chutney"
    },
    {
        name: "Upma",
        calories: 195, protein: 4, carbs: 35, fats: 4,
        category: "Carbs",
        serving: "200g (1 plate)",
        recipe: "Ingredients (for 200g serving):\n• Rava/Semolina - 50g\n• Water - 150ml\n• Vegetables - 30g (optional)\n• Oil - 1 tsp\n• Mustard, curry leaves - for tempering\n\nPreparation:\n1. Roast rava till aromatic (3 min)\n2. Temper mustard, curry leaves\n3. Add water, bring to boil\n4. Add roasted rava, stir (5 min)"
    },
    {
        name: "Uttapam (1 medium)",
        calories: 150, protein: 5, carbs: 28, fats: 2,
        category: "Carbs",
        serving: "1 uttapam (100g)",
        recipe: "Ingredients (for 1 uttapam):\n• Dosa batter - 80g\n• Onion - 15g\n• Tomato - 10g\n• Green chili - 1\n• Oil - 1 tsp\n\nPreparation:\n1. Spread thick batter on tawa\n2. Top with chopped veggies\n3. Cook both sides with oil\n4. Time: 5-6 minutes"
    },
    {
        name: "Ven Pongal",
        calories: 185, protein: 6, carbs: 32, fats: 4,
        category: "Carbs",
        serving: "200g (1 plate)",
        recipe: "Ingredients (for 200g serving):\n• Rice - 40g\n• Moong dal - 15g\n• Black pepper - 1 tsp\n• Cumin - 1 tsp\n• Ginger - 1 tsp\n• Ghee - 1 tsp\n• Cashews - 5-6\n\nPreparation:\n1. Pressure cook rice + moong dal (soft)\n2. Temper with pepper, cumin\n3. Add ghee, cashews\n4. Mix well, season\nServe: Hot with chutney & sambar"
    },
    {
        name: "Khichdi",
        calories: 165, protein: 6, carbs: 30, fats: 2.5,
        category: "Carbs",
        serving: "200g (1 bowl)",
        recipe: "Ingredients (for 200g serving):\n• Rice - 35g\n• Moong dal - 15g\n• Turmeric - 1/4 tsp\n• Ghee - 1 tsp\n• Cumin - 1/2 tsp\n\nPreparation:\n1. Wash rice and dal together\n2. Pressure cook with turmeric (3 whistles)\n3. Temper with cumin\n4. Add ghee on top\nServe: With yogurt or pickle"
    },
    {
        name: "Vegetable Pulao",
        calories: 210, protein: 5, carbs: 40, fats: 4,
        category: "Carbs",
        serving: "200g (1 plate)",
        recipe: "Ingredients (for 200g serving):\n• Basmati rice - 70g (raw)\n• Mixed vegetables - 40g\n• Whole spices - 1 tsp\n• Ghee - 1 tsp\n• Onion - 15g\n\nPreparation:\n1. Sauté whole spices in ghee\n2. Add onion, vegetables\n3. Add rice, water (1:2)\n4. Cook till fluffy (15-20 min)"
    },
    {
        name: "Coconut Chutney",
        calories: 65, protein: 1, carbs: 4, fats: 5,
        category: "Mixed",
        serving: "50g (2 tbsp)",
        recipe: "Ingredients (for 50g):\n• Fresh coconut - 30g\n• Green chili - 2\n• Ginger - small piece\n• Urad dal - 1 tsp\n• Curry leaves - 5-6\n• Oil - 1/2 tsp\n\nPreparation:\n1. Grind coconut + chili + ginger\n2. Add water for consistency\n3. Temper with urad dal\n4. Add curry leaves"
    },
    {
        name: "Tomato Chutney",
        calories: 45, protein: 1, carbs: 6, fats: 2,
        category: "Mixed",
        serving: "50g (2 tbsp)",
        recipe: "Ingredients:\n• Tomato - 40g\n• Onion - 10g\n• Red chili - 2\n• Garlic - 2 cloves\n• Oil - 1/2 tsp\n\nPreparation:\n1. Sauté tomatoes till soft\n2. Add onion, garlic, chili\n3. Grind to paste\n4. Temper with mustard"
    },
    {
        name: "Peanut Chutney",
        calories: 85, protein: 3, carbs: 5, fats: 6,
        category: "Mixed",
        serving: "50g (2 tbsp)",
        recipe: "Ingredients:\n• Peanuts (roasted) - 25g\n• Red chili - 2\n• Garlic - 2 cloves\n• Tamarind - small piece\n• Oil - 1/2 tsp\n\nPreparation:\n1. Dry roast peanuts\n2. Grind with chili, garlic\n3. Add tamarind for tang\n4. Temper with mustard"
    },

    // North Indian Curries
    {
        name: "Palak Paneer",
        calories: 180, protein: 10, carbs: 8, fats: 12,
        category: "Protein",
        serving: "200g (1 katori)",
        recipe: "Ingredients (for 200g serving):\n• Paneer cubes - 50g\n• Spinach (blanched) - 100g\n• Onion - 20g\n• Tomato - 20g\n• Cream - 1 tbsp\n• Oil - 1 tsp\n• Spices - 1 tsp\n\nPreparation:\n1. Blanch spinach, make puree\n2. Sauté onion-tomato, add spices\n3. Add spinach puree, simmer\n4. Add paneer cubes, cream\n5. Cook for 10 minutes"
    },
    {
        name: "Dal Makhani",
        calories: 168, protein: 8, carbs: 18, fats: 7,
        category: "Protein",
        serving: "200g (1 katori)",
        recipe: "Ingredients (for 200g serving):\n• Black dal + Rajma - 40g\n• Butter - 1 tbsp\n• Cream - 1 tbsp\n• Tomato puree - 30g\n• Ginger-garlic paste - 1 tsp\n• Spices - 1 tsp\n\nPreparation:\n1. Soak dal overnight\n2. Pressure cook (8 whistles)\n3. Simmer with butter, cream\n4. Add tomato puree, spices\n5. Cook on low heat 30 min"
    },
    {
        name: "Kadhi Pakora",
        calories: 145, protein: 5, carbs: 15, fats: 7,
        category: "Protein",
        serving: "200g (1 katori)",
        recipe: "Ingredients (for 200g serving):\n• Yogurt - 100g\n• Besan - 15g\n• Pakora - 30g\n• Oil - 1 tsp\n• Spices - 1 tsp\n\nPreparation:\n1. Mix yogurt + besan + water\n2. Make pakoras (besan fritters)\n3. Boil yogurt mixture with spices\n4. Add pakoras, simmer 10 min\n5. Temper with mustard seeds"
    },

    // Chicken Dishes
    {
        name: "Chicken Curry",
        calories: 210, protein: 25, carbs: 8, fats: 9,
        category: "Protein",
        serving: "200g",
        recipe: "Ingredients (for 200g serving):\n• Chicken - 150g\n• Onion - 30g\n• Tomato - 30g\n• Ginger-garlic paste - 1 tsp\n• Oil - 1 tbsp\n• Curry spices - 1 tsp\n\nPreparation:\n1. Sauté onions till golden\n2. Add ginger-garlic, tomato\n3. Add chicken pieces, spices\n4. Cook covered 20-25 minutes\n5. Add water for gravy"
    },
    {
        name: "Chicken Tikka",
        calories: 195, protein: 28, carbs: 4, fats: 7,
        category: "Protein",
        serving: "150g",
        recipe: "Ingredients (for 150g serving):\n• Chicken - 150g\n• Yogurt - 50g\n• Tikka masala - 1 tbsp\n• Lemon juice - 1 tsp\n• Oil - 1 tsp\n\nPreparation:\n1. Marinate chicken 2 hours\n2. Skewer and grill/bake\n3. Cook at 200°C for 20 min\n4. Baste with oil while cooking"
    },

    // Vegetable Dishes
    {
        name: "Aloo Gobi",
        calories: 120, protein: 3, carbs: 20, fats: 3,
        category: "Vegetables",
        serving: "150g",
        recipe: "Ingredients (for 150g serving):\n• Potato - 60g\n• Cauliflower - 60g\n• Onion - 20g\n• Spices - 1 tsp\n• Oil - 1 tsp\n\nPreparation:\n1. Cut potato & cauliflower\n2. Sauté with onions\n3. Add turmeric, spices\n4. Cover and cook 15 min\n5. Stir occasionally"
    },
    {
        name: "Baingan Bharta",
        calories: 110, protein: 2, carbs: 12, fats: 6,
        category: "Vegetables",
        serving: "150g",
        recipe: "Ingredients (for 150g serving):\n• Brinjal (roasted) - 100g\n• Onion - 20g\n• Tomato - 20g\n• Green chili - 1\n• Oil - 1 tsp\n\nPreparation:\n1. Roast brinjal till charred\n2. Peel and mash\n3. Sauté onion-tomato\n4. Add mashed brinjal\n5. Cook 10 minutes"
    },

    // Rice Dishes
    {
        name: "Vegetable Biryani",
        calories: 210, protein: 5, carbs: 40, fats: 4,
        category: "Carbs",
        serving: "250g (1 plate)",
        recipe: "Ingredients (for 250g serving):\n• Basmati rice - 80g (raw)\n• Mixed vegetables - 50g\n• Yogurt - 20g\n• Biryani masala - 1 tsp\n• Oil - 1 tbsp\n• Fried onions - 10g\n\nPreparation:\n1. Cook rice 70% done\n2. Sauté vegetables with masala\n3. Layer rice & vegetables\n4. Dum cook 15-20 minutes\n5. Garnish with fried onions"
    },
    {
        name: "Jeera Rice",
        calories: 195, protein: 4, carbs: 40, fats: 3,
        category: "Carbs",
        serving: "200g",
        recipe: "Ingredients (for 200g serving):\n• Basmati rice - 80g (raw)\n• Cumin seeds - 1 tsp\n• Ghee - 1 tsp\n• Bay leaf - 1\n• Salt - to taste\n\nPreparation:\n1. Wash and soak rice 15 min\n2. Temper cumin in ghee\n3. Add rice and water (1:2)\n4. Cook till fluffy (15 min)"
    },
    {
        name: "Vangi Bath",
        calories: 245, protein: 5, carbs: 42, fats: 6,
        category: "Carbs",
        serving: "250g (1 plate)",
        recipe: "Ingredients (for 250g serving):\n• Rice (cooked) - 150g\n• Brinjal/Eggplant - 60g\n• Vangi bath powder - 2 tsp\n• Onion - 20g\n• Peanuts - 10g\n• Oil - 1 tbsp\n• Tamarind - small piece\n\nPreparation:\n1. Cut brinjal, soak in water\n2. Temper with mustard, curry leaves\n3. Fry brinjal till soft\n4. Add vangi bath powder, tamarind\n5. Mix with cooked rice\n6. Garnish with roasted peanuts"
    },
    {
        name: "Puliyogare",
        calories: 235, protein: 4, carbs: 44, fats: 5,
        category: "Carbs",
        serving: "250g (1 plate)",
        recipe: "Ingredients (for 250g serving):\n• Rice (cooked) - 150g\n• Tamarind paste - 2 tbsp\n• Puliyogare powder - 2 tsp\n• Peanuts - 10g\n• Sesame oil - 1 tbsp\n• Jaggery - 1 tsp\n• Curry leaves - 8-10\n\nPreparation:\n1. Extract tamarind juice\n2. Temper with mustard, peanuts\n3. Add puliyogare powder, jaggery\n4. Mix with warm rice\n5. Add curry leaves\nServe: Hot or at room temperature"
    },
    {
        name: "Lemon Rice",
        calories: 210, protein: 4, carbs: 40, fats: 4,
        category: "Carbs",
        serving: "200g (1 plate)",
        recipe: "Ingredients (for 200g serving):\n• Rice (cooked) - 150g\n• Lemon juice - 2 tbsp\n• Peanuts - 10g\n• Turmeric - 1/4 tsp\n• Green chili - 2\n• Curry leaves - 8-10\n• Oil - 1 tbsp\n\nPreparation:\n1. Temper with mustard, peanuts\n2. Add turmeric, curry leaves\n3. Mix with rice\n4. Add lemon juice\n5. Mix well, garnish with coriander"
    },
    {
        name: "Curd Rice",
        calories: 180, protein: 6, carbs: 32, fats: 3,
        category: "Carbs",
        serving: "250g (1 bowl)",
        recipe: "Ingredients (for 250g serving):\n• Rice (cooked) - 120g\n• Curd/Yogurt - 120g\n• Milk - 30ml\n• Cucumber - 20g\n• Coriander - 1 tbsp\n• Green chili - 1\n• Ginger - 1 tsp\n\nPreparation:\n1. Mash warm rice with curd\n2. Add milk for smooth consistency\n3. Temper with mustard, curry leaves\n4. Add chopped cucumber, coriander\n5. Season with salt\nServe: Chilled"
    },
    {
        name: "Tomato Rice",
        calories: 220, protein: 4, carbs: 42, fats: 4,
        category: "Carbs",
        serving: "200g (1 plate)",
        recipe: "Ingredients (for 200g serving):\n• Rice (cooked) - 140g\n• Tomato - 80g\n• Onion - 20g\n• Tomato rice powder - 1 tsp\n• Oil - 1 tbsp\n• Curry leaves - 8-10\n\nPreparation:\n1. Chop tomatoes finely\n2. Temper with spices\n3. Cook tomatoes till mushy\n4. Add cooked rice\n5. Mix well with tomato rice powder"
    },
    {
        name: "Coconut Rice",
        calories: 260, protein: 4, carbs: 42, fats: 8,
        category: "Carbs",
        serving: "200g (1 plate)",
        recipe: "Ingredients (for 200g serving):\n• Rice (cooked) - 140g\n• Fresh coconut (grated) - 30g\n• Peanuts - 10g\n• Chana dal - 1 tsp\n• Coconut oil - 1 tbsp\n• Curry leaves - 8-10\n\nPreparation:\n1. Temper with mustard, chana dal\n2. Add peanuts, curry leaves\n3. Add grated coconut, fry briefly\n4. Mix with warm rice\n5. Season with salt"
    },
    {
        name: "Bisi Bele Bath",
        calories: 240, protein: 7, carbs: 43, fats: 4,
        category: "Mixed",
        serving: "250g (1 plate)",
        recipe: "Ingredients (for 250g serving):\n• Rice - 50g (raw)\n• Toor dal - 15g (raw)\n• Mixed vegetables - 40g\n• Bisi bele bath powder - 2 tsp\n• Tamarind - small piece\n• Jaggery - 1 tsp\n• Ghee - 1 tsp\n\nPreparation:\n1. Pressure cook rice + dal + vegetables\n2. Add bisi bele bath powder\n3. Add tamarind juice, jaggery\n4. Simmer 10 minutes\n5. Temper with ghee, cashews"
    },

    // Common Meals
    { name: "Pizza (1 slice)", calories: 285, protein: 12, carbs: 36, fats: 10, category: "Mixed", serving: "1 slice" },
    { name: "Burger (basic)", calories: 354, protein: 20, carbs: 30, fats: 16, category: "Mixed", serving: "1 burger" },
    { name: "French Fries", calories: 312, protein: 3.4, carbs: 41, fats: 15, category: "Carbs", serving: "100g" },

    // Additional Items for Diet Plan
    { name: "Honey (1 tbsp)", calories: 64, protein: 0.1, carbs: 17, fats: 0, category: "Carbs", serving: "1 tbsp (21g)" },
    { name: "Rice Cake (1 cake)", calories: 35, protein: 0.7, carbs: 7.3, fats: 0.3, category: "Carbs", serving: "1 rice cake (9g)" },
    { name: "Herbal Tea", calories: 2, protein: 0, carbs: 0.4, fats: 0, category: "Beverages", serving: "1 cup" },
    { name: "Black Tea/Coffee", calories: 2, protein: 0.3, carbs: 0, fats: 0, category: "Beverages", serving: "1 cup" },
    { name: "Cooked Vegetables", calories: 35, protein: 2, carbs: 7, fats: 0, category: "Vegetables", serving: "100g" },
    { name: "Mixed Vegetables (cooked)", calories: 65, protein: 2.5, carbs: 13, fats: 0.5, category: "Vegetables", serving: "1 cup (150g)" },

    // === EXPANDED FOOD DATABASE ===

    // More Dal/Lentils
    {
        name: "Toor Dal (cooked)",
        calories: 113, protein: 6, carbs: 20, fats: 0.7,
        category: "Protein",
        serving: "150g (1 katori)",
        recipe: "Ingredients:\n• Toor dal - 35g (raw)\n• Water - 120ml\n• Turmeric - 1/4 tsp\n• Tamarind - small piece\n• Jaggery - 1 tsp\n• Oil - 1 tsp\n\nPreparation:\n1. Pressure cook dal (3 whistles)\n2. Add tamarind water, jaggery\n3. Temper with mustard, curry leaves\n4. Simmer 10 minutes"
    },
    {
        name: "Urad Dal (cooked)",
        calories: 105, protein: 9, carbs: 16, fats: 1,
        category: "Protein",
        serving: "150g (1 katori)",
        recipe: "Ingredients:\n• Urad dal - 30g (raw)\n• Water - 120ml\n• Onion - 20g\n• Tomato - 20g\n• Spices - 1 tsp\n• Oil - 1 tsp\n\nPreparation:\n1. Soak dal 2 hours\n2. Pressure cook (3 whistles)\n3. Temper with spices\n4. Cook 10 minutes"
    },
    {
        name: "Chana Dal (cooked)",
        calories: 120, protein: 8, carbs: 20, fats: 1.5,
        category: "Protein",
        serving: "150g (1 katori)",
        recipe: "Ingredients:\n• Chana dal - 35g (raw)\n• Water - 120ml\n• Cumin seeds - 1/2 tsp\n• Ginger - 1 tsp\n• Oil - 1 tsp\n\nPreparation:\n1. Soak dal 1 hour\n2. Pressure cook (4 whistles)\n3. Temper and cook 10 min"
    },
    { name: "Mixed Dal (cooked)", calories: 110, protein: 7.5, carbs: 19, fats: 0.8, category: "Protein", serving: "150g (1 katori)" },
    { name: "Dal Tadka", calories: 125, protein: 8, carbs: 18, fats: 3, category: "Protein", serving: "150g (1 katori)" },
    { name: "Sambar", calories: 95, protein: 4, carbs: 15, fats: 2, category: "Protein", serving: "200g (1 bowl)" },

    // More Indian Breads
    {
        name: "Naan (1 medium)",
        calories: 262, protein: 7, carbs: 45, fats: 5,
        category: "Carbs",
        serving: "1 naan (90g)",
        recipe: "Ingredients:\n• All-purpose flour - 70g\n• Yogurt - 20g\n• Yeast - 1/4 tsp\n• Butter - 1 tsp\n• Milk - 30ml\n\nPreparation:\n1. Make dough, rest 2 hours\n2. Roll and stretch\n3. Cook in tandoor/oven\n4. Brush with butter"
    },
    {
        name: "Butter Naan (1 medium)",
        calories: 310, protein: 7, carbs: 45, fats: 11,
        category: "Carbs",
        serving: "1 naan (90g)",
        recipe: "Regular naan brushed with melted butter (1 tbsp)"
    },
    {
        name: "Garlic Naan (1 medium)",
        calories: 280, protein: 8, carbs: 46, fats: 7,
        category: "Carbs",
        serving: "1 naan (90g)",
        recipe: "Naan topped with garlic and butter before cooking"
    },
    {
        name: "Puri (1 medium)",
        calories: 116, protein: 2, carbs: 16, fats: 5,
        category: "Carbs",
        serving: "1 puri (30g)",
        recipe: "Ingredients:\n• Whole wheat flour - 25g\n• Oil for frying - 1 tsp\n• Salt - pinch\n\nPreparation:\n1. Make stiff dough\n2. Roll into small circles\n3. Deep fry till puffed\n4. Drain excess oil"
    },
    {
        name: "Bhatura (1 medium)",
        calories: 255, protein: 5, carbs: 38, fats: 9,
        category: "Carbs",
        serving: "1 bhatura (70g)",
        recipe: "Ingredients:\n• All-purpose flour - 50g\n• Yogurt - 20g\n• Baking powder - 1/4 tsp\n• Oil for frying\n\nPreparation:\n1. Ferment dough 2-3 hours\n2. Roll into large circles\n3. Deep fry till puffed\n4. Serve hot with chole"
    },
    { name: "Kulcha (1 medium)", calories: 180, protein: 5, carbs: 32, fats: 3, category: "Carbs", serving: "1 kulcha (60g)" },
    { name: "Missi Roti (1 medium)", calories: 95, protein: 4, carbs: 16, fats: 2, category: "Carbs", serving: "1 roti (35g)" },
    { name: "Thepla (1 medium)", calories: 85, protein: 2, carbs: 14, fats: 2.5, category: "Carbs", serving: "1 thepla (30g)" },
    { name: "Aloo Paratha (1 medium)", calories: 315, protein: 7, carbs: 42, fats: 13, category: "Carbs", serving: "1 paratha (100g)" },
    { name: "Paneer Paratha (1 medium)", calories: 350, protein: 12, carbs: 40, fats: 15, category: "Carbs", serving: "1 paratha (100g)" },
    { name: "Methi Paratha (1 medium)", calories: 280, protein: 7, carbs: 38, fats: 11, category: "Carbs", serving: "1 paratha (80g)" },
    { name: "Gobi Paratha (1 medium)", calories: 295, protein: 6, carbs: 40, fats: 12, category: "Carbs", serving: "1 paratha (90g)" },

    // More Rice Dishes
    {
        name: "Chicken Biryani",
        calories: 290, protein: 15, carbs: 42, fats: 6,
        category: "Mixed",
        serving: "300g (1 plate)",
        recipe: "Ingredients:\n• Basmati rice - 80g (raw)\n• Chicken - 80g\n• Yogurt - 30g\n• Biryani masala - 1 tbsp\n• Oil - 1 tbsp\n• Fried onions - 15g\n\nPreparation:\n1. Marinate chicken in yogurt\n2. Cook rice 70% done\n3. Layer rice & chicken\n4. Dum cook 25 minutes"
    },
    {
        name: "Mutton Biryani",
        calories: 320, protein: 18, carbs: 42, fats: 8,
        category: "Mixed",
        serving: "300g (1 plate)",
        recipe: "Similar to chicken biryani but with mutton. Requires longer cooking time."
    },
    { name: "Egg Biryani", calories: 260, protein: 12, carbs: 40, fats: 5, category: "Mixed", serving: "300g (1 plate)" },
    {
        name: "Fried Rice (Veg)",
        calories: 210, protein: 5, carbs: 38, fats: 4,
        category: "Carbs",
        serving: "250g (1 plate)",
        recipe: "Ingredients:\n• Cooked rice - 200g\n• Mixed vegetables - 50g\n• Soy sauce - 1 tbsp\n• Oil - 1 tbsp\n• Garlic - 1 tsp\n\nPreparation:\n1. Heat oil, add garlic\n2. Stir-fry vegetables\n3. Add rice, soy sauce\n4. Toss for 5 minutes"
    },
    { name: "Chicken Fried Rice", calories: 255, protein: 14, carbs: 38, fats: 5, category: "Mixed", serving: "300g (1 plate)" },
    { name: "Egg Fried Rice", calories: 230, protein: 9, carbs: 38, fats: 4.5, category: "Mixed", serving: "250g (1 plate)" },
    {
        name: "Curd Rice",
        calories: 165, protein: 5, carbs: 30, fats: 3,
        category: "Carbs",
        serving: "250g (1 bowl)",
        recipe: "Ingredients:\n• Cooked rice - 150g\n• Yogurt - 100g\n• Milk - 30ml\n• Tempering - mustard, curry leaves\n• Salt - to taste\n\nPreparation:\n1. Mix rice with yogurt\n2. Add milk for consistency\n3. Temper and mix\n4. Serve chilled"
    },
    { name: "Lemon Rice", calories: 195, protein: 4, carbs: 38, fats: 3.5, category: "Carbs", serving: "200g (1 plate)" },
    { name: "Tamarind Rice", calories: 205, protein: 4, carbs: 40, fats: 4, category: "Carbs", serving: "200g (1 plate)" },
    { name: "Coconut Rice", calories: 220, protein: 4, carbs: 40, fats: 5, category: "Carbs", serving: "200g (1 plate)" },
    { name: "Vegetable Pulao", calories: 195, protein: 4, carbs: 38, fats: 3, category: "Carbs", serving: "250g (1 plate)" },
    { name: "Ghee Rice", calories: 240, protein: 4, carbs: 42, fats: 6, category: "Carbs", serving: "200g (1 plate)" },

    // More South Indian
    {
        name: "Medu Vada (2 pieces)",
        calories: 195, protein: 8, carbs: 20, fats: 9,
        category: "Carbs",
        serving: "2 vada (80g)",
        recipe: "Ingredients:\n• Urad dal batter - 60g\n• Curry leaves - few\n• Green chili - 1\n• Ginger - 1 tsp\n• Oil for frying\n\nPreparation:\n1. Make vada with hole\n2. Deep fry till golden\n3. Drain excess oil\n4. Serve with chutney"
    },
    { name: "Masala Dosa (1 medium)", calories: 240, protein: 6, carbs: 38, fats: 7, category: "Carbs", serving: "1 dosa (120g)" },
    { name: "Rava Dosa (1 medium)", calories: 150, protein: 3, carbs: 28, fats: 3, category: "Carbs", serving: "1 dosa (70g)" },
    { name: "Pesarattu (1 medium)", calories: 145, protein: 7, carbs: 24, fats: 2.5, category: "Carbs", serving: "1 dosa (80g)" },
    { name: "Appam (2 pieces)", calories: 110, protein: 2, carbs: 24, fats: 0.5, category: "Carbs", serving: "2 appam (80g)" },
    { name: "Puttu (1 cup)", calories: 130, protein: 3, carbs: 27, fats: 0.5, category: "Carbs", serving: "1 cup (100g)" },
    { name: "Pongal", calories: 180, protein: 5, carbs: 32, fats: 4, category: "Carbs", serving: "200g (1 plate)" },
    { name: "Bonda (2 pieces)", calories: 155, protein: 3, carbs: 22, fats: 6, category: "Carbs", serving: "2 bonda (60g)" },

    // More Vegetable Dishes/Sabzis
    {
        name: "Bhindi Masala (Okra)",
        calories: 95, protein: 2, carbs: 12, fats: 4,
        category: "Vegetables",
        serving: "150g",
        recipe: "Ingredients:\n• Okra - 120g\n• Onion - 20g\n• Tomato - 20g\n• Spices - 1 tsp\n• Oil - 1 tsp\n\nPreparation:\n1. Cut okra, dry roast\n2. Sauté onion-tomato\n3. Add okra, spices\n4. Cook 10-12 minutes"
    },
    { name: "Aloo Matar (Potato Peas)", calories: 135, protein: 4, carbs: 22, fats: 3.5, category: "Vegetables", serving: "150g" },
    { name: "Aloo Palak (Potato Spinach)", calories: 110, protein: 3, carbs: 16, fats: 4, category: "Vegetables", serving: "150g" },
    { name: "Beans Poriyal", calories: 75, protein: 3, carbs: 10, fats: 2.5, category: "Vegetables", serving: "100g" },
    { name: "Cabbage Sabzi", calories: 65, protein: 2, carbs: 9, fats: 2.5, category: "Vegetables", serving: "100g" },
    { name: "Mixed Veg Curry", calories: 95, protein: 3, carbs: 14, fats: 3, category: "Vegetables", serving: "150g" },
    { name: "Mushroom Masala", calories: 115, protein: 5, carbs: 10, fats: 6, category: "Vegetables", serving: "150g" },
    { name: "Matar Paneer", calories: 185, protein: 10, carbs: 12, fats: 11, category: "Protein", serving: "200g" },
    { name: "Shahi Paneer", calories: 220, protein: 11, carbs: 10, fats: 15, category: "Protein", serving: "200g" },
    { name: "Paneer Butter Masala", calories: 240, protein: 12, carbs: 12, fats: 16, category: "Protein", serving: "200g" },
    { name: "Paneer Do Pyaza", calories: 200, protein: 11, carbs: 10, fats: 13, category: "Protein", serving: "200g" },
    { name: "Kadai Paneer", calories: 210, protein: 11, carbs: 9, fats: 14, category: "Protein", serving: "200g" },
    { name: "Dum Aloo", calories: 155, protein: 3, carbs: 24, fats: 5, category: "Vegetables", serving: "150g" },
    { name: "Jeera Aloo", calories: 130, protein: 2, carbs: 22, fats: 4, category: "Vegetables", serving: "150g" },
    { name: "Veg Jalfrezi", calories: 105, protein: 3, carbs: 15, fats: 4, category: "Vegetables", serving: "150g" },
    { name: "Chana Masala", calories: 180, protein: 9, carbs: 28, fats: 3.5, category: "Protein", serving: "150g" },
    { name: "Rajma Masala", calories: 145, protein: 9, carbs: 24, fats: 2, category: "Protein", serving: "150g" },

    // More Chicken/Meat Dishes
    { name: "Butter Chicken", calories: 280, protein: 24, carbs: 10, fats: 17, category: "Protein", serving: "250g" },
    { name: "Chicken Tikka Masala", calories: 260, protein: 26, carbs: 12, fats: 13, category: "Protein", serving: "250g" },
    { name: "Chicken Biryani Boneless", calories: 310, protein: 20, carbs: 42, fats: 7, category: "Mixed", serving: "300g" },
    { name: "Chicken Korma", calories: 285, protein: 23, carbs: 8, fats: 18, category: "Protein", serving: "250g" },
    { name: "Kadai Chicken", calories: 245, protein: 26, carbs: 9, fats: 12, category: "Protein", serving: "200g" },
    { name: "Chicken 65", calories: 220, protein: 22, carbs: 12, fats: 10, category: "Protein", serving: "150g" },
    { name: "Tandoori Chicken (1/4)", calories: 240, protein: 35, carbs: 3, fats: 10, category: "Protein", serving: "200g" },
    { name: "Chicken Kebab (3 pieces)", calories: 180, protein: 24, carbs: 4, fats: 7, category: "Protein", serving: "100g" },
    { name: "Chicken Shawarma", calories: 265, protein: 22, carbs: 28, fats: 8, category: "Mixed", serving: "200g" },
    { name: "Egg Curry", calories: 180, protein: 12, carbs: 8, fats: 11, category: "Protein", serving: "200g (2 eggs)" },
    { name: "Egg Bhurji", calories: 155, protein: 11, carbs: 4, fats: 11, category: "Protein", serving: "100g (2 eggs)" },
    { name: "Boiled Eggs (2)", calories: 140, protein: 12, carbs: 1, fats: 10, category: "Protein", serving: "2 eggs (100g)" },
    { name: "Omelette (2 eggs)", calories: 185, protein: 12, carbs: 2, fats: 14, category: "Protein", serving: "120g" },
    { name: "Egg White Omelette (4 whites)", calories: 68, protein: 16, carbs: 0, fats: 0, category: "Protein", serving: "136g (4 egg whites)" },
    { name: "Egg White Omelette (3 whites)", calories: 51, protein: 12, carbs: 0, fats: 0, category: "Protein", serving: "102g (3 egg whites)" },
    { name: "Fish Curry", calories: 195, protein: 20, carbs: 6, fats: 10, category: "Protein", serving: "200g" },
    { name: "Fish Fry", calories: 210, protein: 22, carbs: 8, fats: 10, category: "Protein", serving: "150g" },
    { name: "Prawns Curry", calories: 165, protein: 24, carbs: 5, fats: 5, category: "Protein", serving: "150g" },
    { name: "Mutton Curry", calories: 260, protein: 22, carbs: 6, fats: 16, category: "Protein", serving: "200g" },
    { name: "Mutton Rogan Josh", calories: 285, protein: 24, carbs: 8, fats: 18, category: "Protein", serving: "200g" },

    // Indian Snacks & Street Food
    {
        name: "Samosa (1 medium)",
        calories: 262, protein: 5, carbs: 28, fats: 15,
        category: "Snacks",
        serving: "1 samosa (80g)",
        recipe: "Deep-fried pastry with spiced potato filling"
    },
    { name: "Pakora (5 pieces)", calories: 180, protein: 4, carbs: 20, fats: 9, category: "Snacks", serving: "100g" },
    { name: "Kachori (1 medium)", calories: 210, protein: 4, carbs: 25, fats: 10, category: "Snacks", serving: "70g" },
    {
        name: "Poha",
        calories: 180, protein: 3, carbs: 32, fats: 4,
        category: "Carbs",
        serving: "200g (1 plate)",
        recipe: "Ingredients:\n• Flattened rice - 80g\n• Onion - 20g\n• Peanuts - 10g\n• Potato - 30g\n• Oil - 1 tsp\n• Spices - 1 tsp\n\nPreparation:\n1. Wash and soak poha\n2. Temper with mustard seeds\n3. Add onions, potato\n4. Mix poha, cook 5 min"
    },
    {
        name: "Sabudana Khichdi",
        calories: 225, protein: 2, carbs: 42, fats: 5,
        category: "Carbs",
        serving: "200g (1 plate)",
        recipe: "Ingredients:\n• Sabudana (soaked) - 100g\n• Peanuts - 15g\n• Potato - 30g\n• Oil - 1 tsp\n• Cumin - 1/2 tsp\n\nPreparation:\n1. Soak sabudana 4 hours\n2. Roast peanuts\n3. Temper, add ingredients\n4. Cook 5-7 minutes"
    },
    { name: "Dhokla (2 pieces)", calories: 160, protein: 6, carbs: 28, fats: 3, category: "Snacks", serving: "100g" },
    { name: "Vada Pav (1 piece)", calories: 285, protein: 6, carbs: 42, fats: 10, category: "Snacks", serving: "120g" },
    { name: "Pav Bhaji", calories: 310, protein: 7, carbs: 45, fats: 11, category: "Mixed", serving: "300g" },
    { name: "Misal Pav", calories: 350, protein: 12, carbs: 52, fats: 10, category: "Mixed", serving: "300g" },
    { name: "Bhel Puri", calories: 220, protein: 5, carbs: 38, fats: 6, category: "Snacks", serving: "150g" },
    { name: "Pani Puri (6 pieces)", calories: 180, protein: 4, carbs: 32, fats: 4, category: "Snacks", serving: "100g" },
    { name: "Dahi Puri (6 pieces)", calories: 240, protein: 6, carbs: 36, fats: 8, category: "Snacks", serving: "150g" },
    { name: "Sev Puri (1 plate)", calories: 265, protein: 5, carbs: 40, fats: 9, category: "Snacks", serving: "150g" },
    { name: "Aloo Tikki (2 pieces)", calories: 195, protein: 4, carbs: 28, fats: 7, category: "Snacks", serving: "100g" },
    { name: "Chole Bhature (1 plate)", calories: 550, protein: 15, carbs: 75, fats: 20, category: "Mixed", serving: "350g" },
    { name: "Puri Bhaji (2 puri + bhaji)", calories: 390, protein: 8, carbs: 52, fats: 16, category: "Mixed", serving: "200g" },

    // Indian Sweets & Desserts
    { name: "Gulab Jamun (2 pieces)", calories: 300, protein: 4, carbs: 50, fats: 10, category: "Desserts", serving: "100g" },
    { name: "Jalebi (3 pieces)", calories: 285, protein: 3, carbs: 55, fats: 6, category: "Desserts", serving: "100g" },
    { name: "Rasgulla (2 pieces)", calories: 186, protein: 4, carbs: 40, fats: 1, category: "Desserts", serving: "100g" },
    { name: "Rasmalai (2 pieces)", calories: 240, protein: 6, carbs: 38, fats: 7, category: "Desserts", serving: "150g" },
    { name: "Ladoo (2 pieces)", calories: 220, protein: 5, carbs: 32, fats: 8, category: "Desserts", serving: "80g" },
    { name: "Barfi (2 pieces)", calories: 200, protein: 6, carbs: 28, fats: 7, category: "Desserts", serving: "60g" },
    { name: "Halwa (1 bowl)", calories: 255, protein: 4, carbs: 40, fats: 9, category: "Desserts", serving: "100g" },
    { name: "Kheer (1 bowl)", calories: 195, protein: 5, carbs: 30, fats: 6, category: "Desserts", serving: "150g" },
    { name: "Gajar Halwa (1 bowl)", calories: 280, protein: 4, carbs: 42, fats: 11, category: "Desserts", serving: "150g" },
    { name: "Shrikhand (1 bowl)", calories: 220, protein: 8, carbs: 36, fats: 5, category: "Desserts", serving: "150g" },
    { name: "Kulfi (1 piece)", calories: 180, protein: 5, carbs: 28, fats: 6, category: "Desserts", serving: "100g" },

    // Indian Beverages
    { name: "Masala Chai (1 cup)", calories: 75, protein: 2, carbs: 12, fats: 2, category: "Beverages", serving: "200ml" },
    { name: "Sweet Lassi (1 glass)", calories: 140, protein: 6, carbs: 22, fats: 3, category: "Beverages", serving: "250ml" },
    { name: "Salted Lassi (1 glass)", calories: 90, protein: 6, carbs: 10, fats: 3, category: "Beverages", serving: "250ml" },
    { name: "Mango Lassi (1 glass)", calories: 175, protein: 5, carbs: 30, fats: 3, category: "Beverages", serving: "250ml" },
    { name: "Buttermilk (1 glass)", calories: 40, protein: 2, carbs: 5, fats: 1, category: "Beverages", serving: "250ml" },
    { name: "Nimbu Pani (1 glass)", calories: 60, protein: 0, carbs: 15, fats: 0, category: "Beverages", serving: "250ml" },
    { name: "Jaljeera (1 glass)", calories: 50, protein: 0.5, carbs: 12, fats: 0, category: "Beverages", serving: "250ml" },
    { name: "Sugarcane Juice (1 glass)", calories: 180, protein: 0.5, carbs: 45, fats: 0, category: "Beverages", serving: "250ml" },
    { name: "Coconut Water (1 glass)", calories: 46, protein: 1.7, carbs: 9, fats: 0.5, category: "Beverages", serving: "250ml" },

    // === WESTERN FOODS ===

    // More Proteins (Western)
    { name: "Bacon (3 strips)", calories: 161, protein: 12, carbs: 0.4, fats: 12, category: "Protein", serving: "42g" },
    { name: "Sausage (2 links)", calories: 230, protein: 10, carbs: 2, fats: 20, category: "Protein", serving: "85g" },
    { name: "Ham (3 slices)", calories: 145, protein: 19, carbs: 3, fats: 6, category: "Protein", serving: "100g" },
    { name: "Steak (Sirloin)", calories: 271, protein: 29, carbs: 0, fats: 16, category: "Protein", serving: "150g" },
    { name: "Ribeye Steak", calories: 320, protein: 28, carbs: 0, fats: 23, category: "Protein", serving: "150g" },
    { name: "Lamb Chops (2)", calories: 310, protein: 26, carbs: 0, fats: 22, category: "Protein", serving: "140g" },
    { name: "Cod Fish", calories: 105, protein: 23, carbs: 0, fats: 0.9, category: "Protein", serving: "150g" },
    { name: "Tilapia", calories: 128, protein: 26, carbs: 0, fats: 2.7, category: "Protein", serving: "150g" },
    { name: "Shrimp", calories: 99, protein: 24, carbs: 0.2, fats: 0.3, category: "Protein", serving: "100g" },
    { name: "Crab Meat", calories: 97, protein: 20, carbs: 0, fats: 1.3, category: "Protein", serving: "100g" },
    { name: "Protein Bar", calories: 200, protein: 20, carbs: 22, fats: 5, category: "Protein", serving: "1 bar (60g)" },
    { name: "Beef Jerky", calories: 116, protein: 9.4, carbs: 3, fats: 7, category: "Protein", serving: "1 oz (28g)" },

    // Western Carbs
    { name: "Spaghetti (cooked)", calories: 158, protein: 5.8, carbs: 30, fats: 0.9, category: "Carbs", serving: "140g" },
    { name: "Penne Pasta (cooked)", calories: 131, protein: 5, carbs: 25, fats: 1.1, category: "Carbs", serving: "100g" },
    { name: "Macaroni (cooked)", calories: 158, protein: 5.5, carbs: 30, fats: 0.9, category: "Carbs", serving: "140g" },
    { name: "Mac and Cheese", calories: 310, protein: 13, carbs: 40, fats: 11, category: "Mixed", serving: "250g" },
    { name: "Bagel (1 medium)", calories: 245, protein: 9, carbs: 48, fats: 1.5, category: "Carbs", serving: "1 bagel (90g)" },
    { name: "English Muffin (1)", calories: 134, protein: 4.4, carbs: 26, fats: 1, category: "Carbs", serving: "1 muffin (57g)" },
    { name: "Croissant (1)", calories: 231, protein: 4.7, carbs: 26, fats: 12, category: "Carbs", serving: "1 croissant (57g)" },
    { name: "Tortilla (1)", calories: 138, protein: 3.6, carbs: 22, fats: 3.5, category: "Carbs", serving: "1 tortilla (49g)" },
    { name: "Pita Bread (1)", calories: 165, protein: 5.5, carbs: 33, fats: 0.7, category: "Carbs", serving: "1 pita (60g)" },
    { name: "Cornflakes (1 cup)", calories: 101, protein: 1.8, carbs: 24, fats: 0.1, category: "Carbs", serving: "30g" },
    { name: "Cheerios (1 cup)", calories: 111, protein: 3.3, carbs: 22, fats: 1.8, category: "Carbs", serving: "30g" },
    { name: "Granola (1/2 cup)", calories: 298, protein: 9, carbs: 32, fats: 15, category: "Carbs", serving: "60g" },
    { name: "Muesli (1/2 cup)", calories: 183, protein: 5.5, carbs: 34, fats: 3.6, category: "Carbs", serving: "50g" },
    { name: "Pancake (1 medium)", calories: 86, protein: 2.4, carbs: 11, fats: 3.5, category: "Carbs", serving: "1 pancake (38g)" },
    { name: "Waffle (1 medium)", calories: 218, protein: 6, carbs: 25, fats: 11, category: "Carbs", serving: "1 waffle (75g)" },
    { name: "French Toast (1 slice)", calories: 149, protein: 5, carbs: 16, fats: 7, category: "Carbs", serving: "1 slice (65g)" },

    // More Vegetables & Fruits
    { name: "Bell Pepper", calories: 31, protein: 1, carbs: 6, fats: 0.3, category: "Vegetables", serving: "100g" },
    { name: "Zucchini", calories: 17, protein: 1.2, carbs: 3.1, fats: 0.3, category: "Vegetables", serving: "100g" },
    { name: "Mushrooms", calories: 22, protein: 3.1, carbs: 3.3, fats: 0.3, category: "Vegetables", serving: "100g" },
    { name: "Asparagus", calories: 20, protein: 2.2, carbs: 3.9, fats: 0.1, category: "Vegetables", serving: "100g" },
    { name: "Green Beans", calories: 31, protein: 1.8, carbs: 7, fats: 0.2, category: "Vegetables", serving: "100g" },
    { name: "Peas (cooked)", calories: 84, protein: 5.4, carbs: 16, fats: 0.2, category: "Vegetables", serving: "100g" },
    { name: "Corn (cooked)", calories: 96, protein: 3.4, carbs: 21, fats: 1.5, category: "Vegetables", serving: "100g" },
    { name: "Lettuce", calories: 15, protein: 1.4, carbs: 2.9, fats: 0.2, category: "Vegetables", serving: "100g" },
    { name: "Onion", calories: 40, protein: 1.1, carbs: 9.3, fats: 0.1, category: "Vegetables", serving: "100g" },
    { name: "Garlic (1 clove)", calories: 4, protein: 0.2, carbs: 1, fats: 0, category: "Vegetables", serving: "3g" },
    { name: "Ginger (1 tbsp)", calories: 5, protein: 0.1, carbs: 1.1, fats: 0, category: "Vegetables", serving: "6g" },
    { name: "Orange", calories: 47, protein: 0.9, carbs: 12, fats: 0.1, category: "Carbs", serving: "100g" },
    { name: "Grapes", calories: 69, protein: 0.7, carbs: 18, fats: 0.2, category: "Carbs", serving: "100g" },
    { name: "Strawberries", calories: 32, protein: 0.7, carbs: 7.7, fats: 0.3, category: "Carbs", serving: "100g" },
    { name: "Blueberries", calories: 57, protein: 0.7, carbs: 14, fats: 0.3, category: "Carbs", serving: "100g" },
    { name: "Watermelon", calories: 30, protein: 0.6, carbs: 7.6, fats: 0.2, category: "Carbs", serving: "100g" },
    { name: "Mango", calories: 60, protein: 0.8, carbs: 15, fats: 0.4, category: "Carbs", serving: "100g" },
    { name: "Pineapple", calories: 50, protein: 0.5, carbs: 13, fats: 0.1, category: "Carbs", serving: "100g" },
    { name: "Papaya", calories: 43, protein: 0.5, carbs: 11, fats: 0.3, category: "Carbs", serving: "100g" },
    { name: "Kiwi", calories: 61, protein: 1.1, carbs: 15, fats: 0.5, category: "Carbs", serving: "100g" },
    { name: "Pomegranate", calories: 83, protein: 1.7, carbs: 19, fats: 1.2, category: "Carbs", serving: "100g" },

    // Western Meals & Fast Food
    {
        name: "Cheeseburger",
        calories: 407, protein: 23, carbs: 32, fats: 20,
        category: "Mixed",
        serving: "1 burger (150g)",
        recipe: "Beef patty with cheese, bun, lettuce, tomato, condiments"
    },
    { name: "Double Cheeseburger", calories: 615, protein: 38, carbs: 35, fats: 35, category: "Mixed", serving: "1 burger (200g)" },
    { name: "Chicken Burger", calories: 385, protein: 26, carbs: 38, fats: 14, category: "Mixed", serving: "1 burger (180g)" },
    { name: "Veggie Burger", calories: 310, protein: 12, carbs: 40, fats: 12, category: "Mixed", serving: "1 burger (150g)" },
    { name: "Hot Dog", calories: 290, protein: 10, carbs: 24, fats: 17, category: "Mixed", serving: "1 hot dog (100g)" },
    { name: "Beef Taco (1)", calories: 210, protein: 12, carbs: 13, fats: 12, category: "Mixed", serving: "1 taco (85g)" },
    { name: "Chicken Taco (1)", calories: 180, protein: 14, carbs: 13, fats: 8, category: "Mixed", serving: "1 taco (85g)" },
    { name: "Burrito (Chicken)", calories: 465, protein: 28, carbs: 50, fats: 16, category: "Mixed", serving: "1 burrito (250g)" },
    { name: "Burrito (Beef)", calories: 510, protein: 26, carbs: 48, fats: 22, category: "Mixed", serving: "1 burrito (250g)" },
    { name: "Quesadilla (Chicken)", calories: 440, protein: 26, carbs: 38, fats: 20, category: "Mixed", serving: "1 quesadilla (180g)" },
    { name: "Nachos with Cheese", calories: 346, protein: 9, carbs: 36, fats: 19, category: "Snacks", serving: "1 serving (113g)" },
    { name: "Subway 6 inch (Turkey)", calories: 280, protein: 18, carbs: 46, fats: 3.5, category: "Mixed", serving: "1 sub (212g)" },
    { name: "Subway 6 inch (Chicken)", calories: 320, protein: 23, carbs: 46, fats: 5, category: "Mixed", serving: "1 sub (225g)" },
    { name: "Grilled Cheese Sandwich", calories: 390, protein: 15, carbs: 34, fats: 21, category: "Mixed", serving: "1 sandwich (120g)" },
    { name: "Club Sandwich", calories: 445, protein: 28, carbs: 38, fats: 20, category: "Mixed", serving: "1 sandwich (250g)" },
    { name: "BLT Sandwich", calories: 355, protein: 14, carbs: 32, fats: 19, category: "Mixed", serving: "1 sandwich (150g)" },
    { name: "Tuna Sandwich", calories: 280, protein: 18, carbs: 35, fats: 7, category: "Mixed", serving: "1 sandwich (150g)" },
    { name: "Chicken Wrap", calories: 390, protein: 26, carbs: 42, fats: 12, category: "Mixed", serving: "1 wrap (200g)" },
    { name: "Caesar Wrap", calories: 420, protein: 22, carbs: 40, fats: 18, category: "Mixed", serving: "1 wrap (200g)" },

    // Salads
    { name: "Caesar Salad", calories: 184, protein: 9, carbs: 11, fats: 12, category: "Vegetables", serving: "200g" },
    { name: "Greek Salad", calories: 165, protein: 6, carbs: 12, fats: 11, category: "Vegetables", serving: "200g" },
    { name: "Garden Salad", calories: 45, protein: 2, carbs: 8, fats: 0.5, category: "Vegetables", serving: "200g" },
    { name: "Chicken Caesar Salad", calories: 320, protein: 28, carbs: 12, fats: 18, category: "Mixed", serving: "300g" },
    { name: "Cobb Salad", calories: 390, protein: 26, carbs: 10, fats: 27, category: "Mixed", serving: "300g" },

    // Pasta Dishes
    { name: "Spaghetti Bolognese", calories: 340, protein: 18, carbs: 45, fats: 10, category: "Mixed", serving: "350g" },
    { name: "Pasta Carbonara", calories: 450, protein: 20, carbs: 50, fats: 18, category: "Mixed", serving: "350g" },
    { name: "Pasta Alfredo", calories: 520, protein: 16, carbs: 55, fats: 25, category: "Mixed", serving: "350g" },
    { name: "Pasta Primavera", calories: 310, protein: 11, carbs: 48, fats: 9, category: "Mixed", serving: "350g" },
    { name: "Lasagna", calories: 380, protein: 20, carbs: 35, fats: 18, category: "Mixed", serving: "250g" },

    // Pizza Varieties
    { name: "Pizza Margherita (1 slice)", calories: 250, protein: 10, carbs: 33, fats: 9, category: "Mixed", serving: "1 slice (110g)" },
    { name: "Pizza Pepperoni (1 slice)", calories: 298, protein: 12, carbs: 34, fats: 12, category: "Mixed", serving: "1 slice (115g)" },
    { name: "Pizza Veggie (1 slice)", calories: 235, protein: 9, carbs: 32, fats: 8, category: "Mixed", serving: "1 slice (110g)" },
    { name: "Pizza Supreme (1 slice)", calories: 315, protein: 13, carbs: 35, fats: 13, category: "Mixed", serving: "1 slice (120g)" },

    // Snacks (Western)
    { name: "Potato Chips (1 bag)", calories: 152, protein: 2, carbs: 15, fats: 10, category: "Snacks", serving: "1 oz (28g)" },
    { name: "Tortilla Chips", calories: 142, protein: 2, carbs: 18, fats: 7, category: "Snacks", serving: "1 oz (28g)" },
    { name: "Popcorn (air-popped)", calories: 31, protein: 1, carbs: 6, fats: 0.4, category: "Snacks", serving: "1 cup (8g)" },
    { name: "Popcorn (buttered)", calories: 91, protein: 1.5, carbs: 9, fats: 6, category: "Snacks", serving: "1 cup (14g)" },
    { name: "Pretzels", calories: 108, protein: 2.6, carbs: 23, fats: 0.7, category: "Snacks", serving: "1 oz (28g)" },
    { name: "Trail Mix", calories: 131, protein: 4, carbs: 13, fats: 8, category: "Snacks", serving: "1 oz (28g)" },
    { name: "Granola Bar", calories: 120, protein: 2, carbs: 20, fats: 4, category: "Snacks", serving: "1 bar (28g)" },
    { name: "Energy Bar", calories: 230, protein: 10, carbs: 32, fats: 7, category: "Snacks", serving: "1 bar (60g)" },
    { name: "Crackers (5 pieces)", calories: 71, protein: 1.2, carbs: 12, fats: 2, category: "Snacks", serving: "15g" },
    { name: "Oreos (3 cookies)", calories: 160, protein: 2, carbs: 25, fats: 7, category: "Desserts", serving: "3 cookies (34g)" },
    { name: "Chocolate Chip Cookie", calories: 140, protein: 2, carbs: 19, fats: 7, category: "Desserts", serving: "1 cookie (30g)" },
    { name: "Brownie", calories: 243, protein: 3, carbs: 36, fats: 10, category: "Desserts", serving: "1 brownie (56g)" },
    { name: "Donut (glazed)", calories: 260, protein: 3, carbs: 31, fats: 14, category: "Desserts", serving: "1 donut (52g)" },
    { name: "Muffin (blueberry)", calories: 313, protein: 5, carbs: 54, fats: 9, category: "Desserts", serving: "1 muffin (113g)" },
    { name: "Cupcake", calories: 305, protein: 3, carbs: 45, fats: 13, category: "Desserts", serving: "1 cupcake (80g)" },
    { name: "Cake (chocolate)", calories: 352, protein: 5, carbs: 51, fats: 15, category: "Desserts", serving: "1 slice (95g)" },

    // Desserts & Ice Cream
    { name: "Vanilla Ice Cream (1 scoop)", calories: 137, protein: 2.3, carbs: 16, fats: 7, category: "Desserts", serving: "1/2 cup (66g)" },
    { name: "Chocolate Ice Cream (1 scoop)", calories: 143, protein: 2.5, carbs: 19, fats: 7, category: "Desserts", serving: "1/2 cup (66g)" },
    { name: "Strawberry Ice Cream (1 scoop)", calories: 127, protein: 2.1, carbs: 18, fats: 5.5, category: "Desserts", serving: "1/2 cup (66g)" },
    { name: "Frozen Yogurt (1 scoop)", calories: 114, protein: 2.9, carbs: 22, fats: 2, category: "Desserts", serving: "1/2 cup (72g)" },
    { name: "Gelato (1 scoop)", calories: 90, protein: 2, carbs: 13, fats: 3, category: "Desserts", serving: "1/2 cup (55g)" },

    // Beverages (Western)
    { name: "Orange Juice (1 glass)", calories: 112, protein: 1.7, carbs: 26, fats: 0.5, category: "Beverages", serving: "250ml" },
    { name: "Apple Juice (1 glass)", calories: 114, protein: 0.3, carbs: 28, fats: 0.3, category: "Beverages", serving: "250ml" },
    { name: "Protein Shake", calories: 180, protein: 30, carbs: 8, fats: 3, category: "Protein", serving: "300ml" },
    { name: "Smoothie (Mixed Berry)", calories: 145, protein: 3, carbs: 32, fats: 1.5, category: "Beverages", serving: "250ml" },
    { name: "Green Smoothie", calories: 120, protein: 2.5, carbs: 28, fats: 1, category: "Beverages", serving: "250ml" },
    { name: "Coca Cola (1 can)", calories: 140, protein: 0, carbs: 39, fats: 0, category: "Beverages", serving: "330ml" },
    { name: "Sprite (1 can)", calories: 140, protein: 0, carbs: 38, fats: 0, category: "Beverages", serving: "330ml" },
    { name: "Pepsi (1 can)", calories: 150, protein: 0, carbs: 41, fats: 0, category: "Beverages", serving: "330ml" },
    { name: "Red Bull (1 can)", calories: 110, protein: 1, carbs: 27, fats: 0, category: "Beverages", serving: "250ml" },
    { name: "Monster Energy (1 can)", calories: 210, protein: 2, carbs: 54, fats: 0, category: "Beverages", serving: "473ml" },
    { name: "Sports Drink (Gatorade)", calories: 80, protein: 0, carbs: 21, fats: 0, category: "Beverages", serving: "355ml" },
    { name: "Latte (1 cup)", calories: 190, protein: 9, carbs: 18, fats: 7, category: "Beverages", serving: "350ml" },
    { name: "Cappuccino (1 cup)", calories: 120, protein: 6, carbs: 10, fats: 6, category: "Beverages", serving: "240ml" },
    { name: "Mocha (1 cup)", calories: 260, protein: 10, carbs: 33, fats: 10, category: "Beverages", serving: "350ml" },
    { name: "Hot Chocolate (1 cup)", calories: 192, protein: 9, carbs: 27, fats: 6, category: "Beverages", serving: "250ml" },
    { name: "Warm Water with Lime", calories: 5, protein: 0, carbs: 1, fats: 0, category: "Beverages", serving: "1 glass (250ml)" },
    { name: "Lemon Water", calories: 6, protein: 0, carbs: 1.5, fats: 0, category: "Beverages", serving: "1 glass (250ml)" },

    // Condiments & Sauces
    { name: "Ketchup (1 tbsp)", calories: 17, protein: 0.2, carbs: 4.5, fats: 0, category: "Condiments", serving: "15g" },
    { name: "Mayonnaise (1 tbsp)", calories: 94, protein: 0.1, carbs: 0.1, fats: 10, category: "Condiments", serving: "13g" },
    { name: "Mustard (1 tsp)", calories: 3, protein: 0.2, carbs: 0.3, fats: 0.2, category: "Condiments", serving: "5g" },
    { name: "BBQ Sauce (1 tbsp)", calories: 29, protein: 0.3, carbs: 7, fats: 0.1, category: "Condiments", serving: "15g" },
    { name: "Ranch Dressing (1 tbsp)", calories: 73, protein: 0.4, carbs: 0.9, fats: 7.7, category: "Condiments", serving: "15ml" },
    { name: "Caesar Dressing (1 tbsp)", calories: 78, protein: 0.5, carbs: 0.5, fats: 8.5, category: "Condiments", serving: "15ml" },
    { name: "Soy Sauce (1 tbsp)", calories: 8, protein: 1.3, carbs: 0.8, fats: 0, category: "Condiments", serving: "15ml" },
    { name: "Hot Sauce (1 tsp)", calories: 1, protein: 0, carbs: 0.1, fats: 0, category: "Condiments", serving: "5ml" },
    { name: "Sriracha (1 tsp)", calories: 5, protein: 0.1, carbs: 1, fats: 0.1, category: "Condiments", serving: "5g" },

    // Additional Indian & Asian Sweets/Snacks
    {
        name: "Carrot Halwa (Gajar Ka Halwa)",
        calories: 260,
        protein: 4,
        carbs: 45,
        fats: 8,
        category: "Carbs",
        serving: "150g (1 bowl)",
        recipe: "Traditional Indian dessert made with grated carrots, milk, sugar, ghee, and nuts"
    },
    {
        name: "Multi-Seed Laddu",
        calories: 110,
        protein: 3,
        carbs: 5,
        fats: 8,
        category: "Snacks",
        serving: "1 piece (25g)",
        recipe: "Nutritious energy ball made with mixed seeds (sesame, flax, pumpkin), jaggery, and ghee"
    },
    {
        name: "Banana Chips",
        calories: 520,
        protein: 2,
        carbs: 58,
        fats: 31,
        category: "Snacks",
        serving: "100g",
        recipe: "Deep fried banana slices, popular South Indian snack"
    },
    {
        name: "Murukku",
        calories: 500,
        protein: 9,
        carbs: 58,
        fats: 25,
        category: "Snacks",
        serving: "100g",
        recipe: "Crunchy South Indian spiral snack made from rice flour and urad dal"
    },
    {
        name: "Mixture (South Indian Snack)",
        calories: 480,
        protein: 10,
        carbs: 55,
        fats: 24,
        category: "Snacks",
        serving: "100g",
        recipe: "Savory mix of fried lentils, peanuts, sev, and spices"
    },
    {
        name: "Jalebi",
        calories: 320,
        protein: 2,
        carbs: 68,
        fats: 7,
        category: "Carbs",
        serving: "100g (3-4 pieces)",
        recipe: "Crispy spiral-shaped Indian sweet soaked in sugar syrup"
    },
    {
        name: "Gulab Jamun",
        calories: 175,
        protein: 3,
        carbs: 28,
        fats: 6,
        category: "Carbs",
        serving: "50g (2 pieces)",
        recipe: "Soft milk solid balls deep fried and soaked in sugar syrup"
    },
    {
        name: "Rasgulla",
        calories: 145,
        protein: 3,
        carbs: 32,
        fats: 1,
        category: "Carbs",
        serving: "100g (2 pieces)",
        recipe: "Spongy cottage cheese balls soaked in light sugar syrup"
    },
    {
        name: "Pani Puri (6 pieces)",
        calories: 160,
        protein: 4,
        carbs: 32,
        fats: 2,
        category: "Snacks",
        serving: "6 puris with pani",
        recipe: "Crispy hollow puris filled with spiced water, potatoes, and chickpeas"
    },
    {
        name: "Bhel Puri",
        calories: 180,
        protein: 5,
        carbs: 35,
        fats: 3,
        category: "Snacks",
        serving: "150g (1 plate)",
        recipe: "Mumbai street food with puffed rice, sev, vegetables, and tamarind chutney"
    },
    {
        name: "Pav Bhaji",
        calories: 420,
        protein: 10,
        carbs: 58,
        fats: 16,
        category: "Carbs",
        serving: "300g (2 pav + bhaji)",
        recipe: "Spiced mashed vegetable curry served with buttered bread rolls"
    },
    {
        name: "Vada Pav",
        calories: 290,
        protein: 7,
        carbs: 42,
        fats: 11,
        category: "Carbs",
        serving: "1 vada pav",
        recipe: "Potato fritter in bread bun with chutneys - Mumbai street food"
    },

    // Japanese/Asian Foods
    {
        name: "Chicken Katsu",
        calories: 380,
        protein: 28,
        carbs: 28,
        fats: 16,
        category: "Protein",
        serving: "200g (1 piece with sauce)",
        recipe: "Breaded and deep-fried chicken cutlet, Japanese style"
    },
    {
        name: "Chicken Teriyaki",
        calories: 280,
        protein: 32,
        carbs: 18,
        fats: 9,
        category: "Protein",
        serving: "200g",
        recipe: "Grilled chicken glazed with sweet soy sauce"
    },
    {
        name: "Ramen (Bowl)",
        calories: 450,
        protein: 22,
        carbs: 60,
        fats: 14,
        category: "Carbs",
        serving: "400g (1 bowl)",
        recipe: "Japanese noodle soup with broth, noodles, egg, pork, and vegetables"
    },
    {
        name: "Pad Thai",
        calories: 400,
        protein: 18,
        carbs: 55,
        fats: 12,
        category: "Carbs",
        serving: "350g (1 plate)",
        recipe: "Thai stir-fried rice noodles with eggs, peanuts, and vegetables"
    },
    {
        name: "Spring Rolls (2 pieces)",
        calories: 180,
        protein: 6,
        carbs: 22,
        fats: 8,
        category: "Snacks",
        serving: "100g (2 rolls)",
        recipe: "Fried rolls filled with vegetables and sometimes meat"
    },
    {
        name: "Dim Sum (4 pieces)",
        calories: 240,
        protein: 12,
        carbs: 28,
        fats: 8,
        category: "Protein",
        serving: "4 pieces",
        recipe: "Steamed or fried Chinese dumplings with various fillings"
    },
    {
        name: "Fried Rice (Chicken)",
        calories: 340,
        protein: 18,
        carbs: 48,
        fats: 9,
        category: "Carbs",
        serving: "250g (1 plate)",
        recipe: "Stir-fried rice with chicken, eggs, and vegetables"
    },
    {
        name: "Nasi Goreng",
        calories: 360,
        protein: 16,
        carbs: 52,
        fats: 10,
        category: "Carbs",
        serving: "250g (1 plate)",
        recipe: "Indonesian fried rice with sweet soy sauce, vegetables, and egg"
    },
    {
        name: "Sushi Roll (8 pieces)",
        calories: 280,
        protein: 16,
        carbs: 42,
        fats: 6,
        category: "Protein",
        serving: "8 pieces",
        recipe: "Vinegared rice with fish, vegetables wrapped in seaweed"
    },
    {
        name: "Poke Bowl",
        calories: 420,
        protein: 28,
        carbs: 52,
        fats: 12,
        category: "Protein",
        serving: "400g (1 bowl)",
        recipe: "Hawaiian bowl with raw fish, rice, vegetables, and sauce"
    },

    // Subway & Fast Food
    {
        name: "Subway Chicken Teriyaki Wrap (6 inch)",
        calories: 320,
        protein: 22,
        carbs: 52,
        fats: 4,
        category: "Protein",
        serving: "1 wrap",
        recipe: "Subway wrap with chicken teriyaki, vegetables, and sauce"
    },
    {
        name: "Subway Veggie Delite Wrap (6 inch)",
        calories: 230,
        protein: 9,
        carbs: 44,
        fats: 2,
        category: "Carbs",
        serving: "1 wrap",
        recipe: "Subway wrap with assorted vegetables and light dressing"
    },
    {
        name: "Subway Turkey Sub (6 inch)",
        calories: 280,
        protein: 19,
        carbs: 46,
        fats: 4,
        category: "Protein",
        serving: "1 sub",
        recipe: "Subway sandwich with turkey, lettuce, tomato, and condiments"
    },
    {
        name: "Subway Italian BMT (6 inch)",
        calories: 410,
        protein: 20,
        carbs: 45,
        fats: 16,
        category: "Protein",
        serving: "1 sub",
        recipe: "Subway sandwich with salami, pepperoni, ham, and cheese"
    },
    {
        name: "Subway Meatball Marinara (6 inch)",
        calories: 480,
        protein: 22,
        carbs: 56,
        fats: 18,
        category: "Protein",
        serving: "1 sub",
        recipe: "Subway sandwich with meatballs in marinara sauce"
    },
    {
        name: "Subway Tuna Sub (6 inch)",
        calories: 480,
        protein: 22,
        carbs: 42,
        fats: 24,
        category: "Protein",
        serving: "1 sub",
        recipe: "Subway sandwich with tuna salad and vegetables"
    },
    {
        name: "Burrito Bowl (Chicken)",
        calories: 520,
        protein: 35,
        carbs: 58,
        fats: 16,
        category: "Protein",
        serving: "400g (1 bowl)",
        recipe: "Mexican bowl with rice, chicken, beans, vegetables, and toppings"
    },
    {
        name: "Chicken Shawarma Wrap",
        calories: 450,
        protein: 28,
        carbs: 48,
        fats: 16,
        category: "Protein",
        serving: "1 wrap",
        recipe: "Middle Eastern wrap with spiced chicken, vegetables, and garlic sauce"
    },
    {
        name: "Falafel Wrap",
        calories: 420,
        protein: 14,
        carbs: 54,
        fats: 16,
        category: "Carbs",
        serving: "1 wrap",
        recipe: "Mediterranean wrap with chickpea fritters, vegetables, and tahini"
    },

    // Additional Indian Foods - Breakfast
    { name: "Upma", calories: 200, protein: 4, carbs: 38, fats: 4, category: "Carbs", serving: "200g (1 bowl)" },
    { name: "Poha", calories: 250, protein: 5, carbs: 40, fats: 8, category: "Carbs", serving: "200g (1 bowl)" },
    { name: "Medu Vada (2 pieces)", calories: 220, protein: 6, carbs: 28, fats: 9, category: "Carbs", serving: "2 vadas (100g)" },
    { name: "Idli Sambar (3 idlis)", calories: 180, protein: 6, carbs: 35, fats: 2, category: "Carbs", serving: "3 idlis + sambar" },
    { name: "Rava Dosa", calories: 160, protein: 4, carbs: 28, fats: 4, category: "Carbs", serving: "1 dosa (150g)" },
    { name: "Masala Dosa with Potato", calories: 280, protein: 7, carbs: 48, fats: 7, category: "Carbs", serving: "1 dosa (200g)" },
    { name: "Uttapam (plain)", calories: 140, protein: 4, carbs: 26, fats: 2, category: "Carbs", serving: "1 uttapam (120g)" },
    { name: "Puri (1 piece)", calories: 110, protein: 2, carbs: 14, fats: 5, category: "Carbs", serving: "1 puri (30g)" },
    { name: "Aloo Puri (2 puris + curry)", calories: 360, protein: 8, carbs: 52, fats: 13, category: "Carbs", serving: "2 puris + aloo" },
    { name: "Pongal (Ven Pongal)", calories: 220, protein: 6, carbs: 38, fats: 5, category: "Carbs", serving: "200g (1 bowl)" },

    // Indian Curries & Main Dishes
    { name: "Chicken Curry (restaurant style)", calories: 250, protein: 24, carbs: 8, fats: 14, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Butter Chicken", calories: 320, protein: 22, carbs: 10, fats: 22, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Chicken Tikka Masala", calories: 300, protein: 26, carbs: 12, fats: 17, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Chicken Biryani", calories: 450, protein: 28, carbs: 58, fats: 12, category: "Carbs", serving: "350g (1 plate)" },
    { name: "Mutton Biryani", calories: 520, protein: 26, carbs: 60, fats: 18, category: "Carbs", serving: "350g (1 plate)" },
    { name: "Veg Biryani", calories: 380, protein: 8, carbs: 62, fats: 10, category: "Carbs", serving: "350g (1 plate)" },
    { name: "Hyderabadi Biryani (Chicken)", calories: 480, protein: 30, carbs: 56, fats: 14, category: "Carbs", serving: "350g (1 plate)" },
    { name: "Fish Curry (Kerala style)", calories: 220, protein: 28, carbs: 6, fats: 9, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Mutton Rogan Josh", calories: 340, protein: 26, carbs: 8, fats: 23, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Palak Paneer", calories: 260, protein: 14, carbs: 10, fats: 18, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Paneer Butter Masala", calories: 320, protein: 16, carbs: 12, fats: 24, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Kadai Paneer", calories: 280, protein: 15, carbs: 11, fats: 20, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Shahi Paneer", calories: 310, protein: 14, carbs: 13, fats: 23, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Paneer Tikka Masala", calories: 290, protein: 16, carbs: 10, fats: 20, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Aloo Gobi", calories: 180, protein: 4, carbs: 28, fats: 6, category: "Carbs", serving: "200g (1 bowl)" },
    { name: "Baingan Bharta", calories: 160, protein: 3, carbs: 18, fats: 8, category: "Vegetables", serving: "200g (1 bowl)" },
    { name: "Bhindi Masala (Okra)", calories: 140, protein: 3, carbs: 16, fats: 7, category: "Vegetables", serving: "200g (1 bowl)" },
    { name: "Chole (Chickpea Curry)", calories: 240, protein: 12, carbs: 38, fats: 5, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Rajma (Kidney Bean Curry)", calories: 230, protein: 14, carbs: 36, fats: 4, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Egg Curry", calories: 190, protein: 12, carbs: 8, fats: 12, category: "Protein", serving: "200g (2 eggs)" },

    // Dals & Lentils
    { name: "Moong Dal Tadka", calories: 150, protein: 10, carbs: 24, fats: 2, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Masoor Dal", calories: 140, protein: 9, carbs: 23, fats: 2, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Chana Dal", calories: 160, protein: 10, carbs: 26, fats: 2, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Urad Dal", calories: 170, protein: 11, carbs: 26, fats: 3, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Sambar", calories: 120, protein: 5, carbs: 20, fats: 2, category: "Protein", serving: "200g (1 bowl)" },
    { name: "Rasam", calories: 80, protein: 3, carbs: 15, fats: 1, category: "Vegetables", serving: "200g (1 bowl)" },

    // Indian Snacks & Street Food
    { name: "Samosa (1 piece)", calories: 252, protein: 5, carbs: 30, fats: 12, category: "Snacks", serving: "1 samosa (100g)" },
    { name: "Kachori (1 piece)", calories: 180, protein: 4, carbs: 22, fats: 8, category: "Snacks", serving: "1 kachori (50g)" },
    { name: "Pakora (100g)", calories: 250, protein: 6, carbs: 28, fats: 12, category: "Snacks", serving: "100g (4-5 pieces)" },
    { name: "Bhajiya/Bhaji (100g)", calories: 240, protein: 5, carbs: 26, fats: 12, category: "Snacks", serving: "100g (4-5 pieces)" },
    { name: "Vada Pav", calories: 290, protein: 6, carbs: 42, fats: 11, category: "Carbs", serving: "1 vada pav" },
    { name: "Pav Bhaji", calories: 380, protein: 10, carbs: 52, fats: 14, category: "Carbs", serving: "2 pavs + bhaji" },
    { name: "Panipuri (6 pieces)", calories: 120, protein: 3, carbs: 24, fats: 2, category: "Snacks", serving: "6 puris" },
    { name: "Bhel Puri", calories: 220, protein: 5, carbs: 38, fats: 6, category: "Snacks", serving: "150g (1 plate)" },
    { name: "Sev Puri", calories: 260, protein: 5, carbs: 36, fats: 10, category: "Snacks", serving: "150g (1 plate)" },
    { name: "Dahi Puri", calories: 180, protein: 5, carbs: 28, fats: 5, category: "Snacks", serving: "6 puris" },
    { name: "Aloo Tikki (1 piece)", calories: 150, protein: 3, carbs: 22, fats: 5, category: "Snacks", serving: "1 tikki (80g)" },
    { name: "Papdi Chaat", calories: 280, protein: 6, carbs: 38, fats: 11, category: "Snacks", serving: "150g (1 plate)" },
    { name: "Ragda Pattice", calories: 320, protein: 8, carbs: 48, fats: 10, category: "Snacks", serving: "200g (1 plate)" },
    { name: "Dabeli (1 bun)", calories: 240, protein: 5, carbs: 40, fats: 6, category: "Carbs", serving: "1 bun" },
    { name: "Misal Pav", calories: 350, protein: 12, carbs: 52, fats: 10, category: "Carbs", serving: "1 plate" },

    // Indian Breads
    { name: "Naan (plain)", calories: 262, protein: 8, carbs: 45, fats: 5, category: "Carbs", serving: "1 naan (90g)" },
    { name: "Butter Naan", calories: 310, protein: 8, carbs: 46, fats: 10, category: "Carbs", serving: "1 naan (90g)" },
    { name: "Garlic Naan", calories: 290, protein: 8, carbs: 44, fats: 8, category: "Carbs", serving: "1 naan (90g)" },
    { name: "Cheese Naan", calories: 380, protein: 14, carbs: 48, fats: 14, category: "Carbs", serving: "1 naan (100g)" },
    { name: "Kulcha (plain)", calories: 150, protein: 4, carbs: 26, fats: 3, category: "Carbs", serving: "1 kulcha (60g)" },
    { name: "Aloo Kulcha", calories: 220, protein: 5, carbs: 38, fats: 5, category: "Carbs", serving: "1 kulcha (90g)" },
    { name: "Bhatura (1 piece)", calories: 300, protein: 6, carbs: 42, fats: 12, category: "Carbs", serving: "1 bhatura (100g)" },
    { name: "Chole Bhature", calories: 520, protein: 16, carbs: 72, fats: 16, category: "Carbs", serving: "2 bhature + chole" },
    { name: "Tandoori Roti", calories: 120, protein: 4, carbs: 23, fats: 1, category: "Carbs", serving: "1 roti (60g)" },
    { name: "Rumali Roti", calories: 100, protein: 3, carbs: 20, fats: 1, category: "Carbs", serving: "1 roti (50g)" },
    { name: "Missi Roti", calories: 140, protein: 5, carbs: 24, fats: 2, category: "Carbs", serving: "1 roti (60g)" },

    // Indian Sweets & Desserts
    { name: "Gulab Jamun (1 piece)", calories: 150, protein: 2, carbs: 25, fats: 5, category: "Sweets", serving: "1 piece (40g)" },
    { name: "Rasgulla (1 piece)", calories: 106, protein: 2, carbs: 22, fats: 1, category: "Sweets", serving: "1 piece (50g)" },
    { name: "Jalebi (100g)", calories: 450, protein: 3, carbs: 85, fats: 10, category: "Sweets", serving: "100g (4-5 pieces)" },
    { name: "Rasmalai (1 piece)", calories: 180, protein: 5, carbs: 24, fats: 7, category: "Sweets", serving: "1 piece (80g)" },
    { name: "Kheer (Rice Pudding)", calories: 180, protein: 5, carbs: 30, fats: 4, category: "Sweets", serving: "150g (1 bowl)" },
    { name: "Gajar Halwa (Carrot Halwa)", calories: 240, protein: 4, carbs: 36, fats: 9, category: "Sweets", serving: "150g (1 bowl)" },
    { name: "Moong Dal Halwa", calories: 280, protein: 6, carbs: 38, fats: 12, category: "Sweets", serving: "150g (1 bowl)" },
    { name: "Besan Ladoo (1 piece)", calories: 130, protein: 3, carbs: 18, fats: 5, category: "Sweets", serving: "1 ladoo (30g)" },
    { name: "Motichoor Ladoo (1 piece)", calories: 140, protein: 2, carbs: 22, fats: 5, category: "Sweets", serving: "1 ladoo (35g)" },
    { name: "Barfi (1 piece)", calories: 120, protein: 3, carbs: 18, fats: 4, category: "Sweets", serving: "1 piece (30g)" },
    { name: "Mysore Pak (1 piece)", calories: 160, protein: 2, carbs: 20, fats: 8, category: "Sweets", serving: "1 piece (30g)" },
    { name: "Pedha (1 piece)", calories: 110, protein: 3, carbs: 16, fats: 4, category: "Sweets", serving: "1 piece (30g)" },
    { name: "Soan Papdi (1 piece)", calories: 140, protein: 2, carbs: 22, fats: 5, category: "Sweets", serving: "1 piece (30g)" },
    { name: "Khoya/Mawa (100g)", calories: 420, protein: 16, carbs: 26, fats: 27, category: "Sweets", serving: "100g" },

    // Packaged/Branded Foods - Haldiram's
    { name: "Haldiram's Bhujia (100g)", calories: 524, protein: 14, carbs: 40, fats: 34, category: "Snacks", serving: "100g" },
    { name: "Haldiram's Aloo Bhujia (100g)", calories: 528, protein: 12, carbs: 42, fats: 35, category: "Snacks", serving: "100g" },
    { name: "Haldiram's Sev (100g)", calories: 520, protein: 13, carbs: 44, fats: 32, category: "Snacks", serving: "100g" },
    { name: "Haldiram's Mixture (100g)", calories: 510, protein: 14, carbs: 48, fats: 30, category: "Snacks", serving: "100g" },
    { name: "Haldiram's Moong Dal (100g)", calories: 485, protein: 22, carbs: 42, fats: 24, category: "Snacks", serving: "100g" },
    { name: "Haldiram's Samosa (1 piece)", calories: 280, protein: 6, carbs: 32, fats: 14, category: "Snacks", serving: "1 samosa" },
    { name: "Haldiram's Kachori (1 piece)", calories: 220, protein: 5, carbs: 26, fats: 10, category: "Snacks", serving: "1 kachori" },

    // Packaged/Branded Foods - MTR
    { name: "MTR Masala Dosa (Ready to Eat)", calories: 180, protein: 5, carbs: 32, fats: 4, category: "Carbs", serving: "1 pack (150g)" },
    { name: "MTR Rava Idli Mix (3 idlis)", calories: 160, protein: 4, carbs: 32, fats: 2, category: "Carbs", serving: "3 idlis" },
    { name: "MTR Gulab Jamun Mix (4 pieces)", calories: 520, protein: 6, carbs: 88, fats: 16, category: "Sweets", serving: "4 pieces" },

    // Regional Specialties
    { name: "Dhokla", calories: 160, protein: 4, carbs: 32, fats: 2, category: "Carbs", serving: "150g (3-4 pieces)" },
    { name: "Khandvi (100g)", calories: 180, protein: 6, carbs: 22, fats: 8, category: "Snacks", serving: "100g (6-8 rolls)" },
    { name: "Thepla (1 piece)", calories: 100, protein: 3, carbs: 16, fats: 3, category: "Carbs", serving: "1 thepla" },
    { name: "Handvo (1 piece)", calories: 200, protein: 6, carbs: 28, fats: 7, category: "Carbs", serving: "1 piece (100g)" },
    { name: "Appam (1 piece)", calories: 90, protein: 2, carbs: 18, fats: 1, category: "Carbs", serving: "1 appam" },
    { name: "Puttu (150g)", calories: 160, protein: 4, carbs: 32, fats: 2, category: "Carbs", serving: "150g (1 serving)" },
    { name: "Pesarattu (Moong Dal Dosa)", calories: 180, protein: 8, carbs: 30, fats: 3, category: "Carbs", serving: "1 dosa" },
    { name: "Bisibelebath", calories: 280, protein: 8, carbs: 48, fats: 6, category: "Carbs", serving: "250g (1 bowl)" },
    { name: "Pulao (Veg)", calories: 280, protein: 6, carbs: 52, fats: 5, category: "Carbs", serving: "250g (1 plate)" },
    { name: "Lemon Rice", calories: 240, protein: 4, carbs: 46, fats: 4, category: "Carbs", serving: "250g (1 plate)" },
    { name: "Curd Rice", calories: 180, protein: 6, carbs: 32, fats: 3, category: "Carbs", serving: "250g (1 plate)" },
    { name: "Tamarind Rice", calories: 260, protein: 5, carbs: 50, fats: 5, category: "Carbs", serving: "250g (1 plate)" },

    // More Protein Options
    { name: "Chicken Tikka (100g)", calories: 150, protein: 24, carbs: 2, fats: 5, category: "Protein", serving: "100g (4-5 pieces)" },
    { name: "Tandoori Chicken (1 leg piece)", calories: 180, protein: 26, carbs: 2, fats: 7, category: "Protein", serving: "1 leg piece (120g)" },
    { name: "Chicken Kebab (100g)", calories: 200, protein: 22, carbs: 4, fats: 10, category: "Protein", serving: "100g (2-3 kebabs)" },
    { name: "Mutton Kebab (100g)", calories: 240, protein: 20, carbs: 3, fats: 16, category: "Protein", serving: "100g (2-3 kebabs)" },
    { name: "Fish Fry (100g)", calories: 190, protein: 22, carbs: 8, fats: 8, category: "Protein", serving: "100g (1 piece)" },
    { name: "Prawn Curry", calories: 180, protein: 24, carbs: 6, fats: 6, category: "Protein", serving: "200g (1 bowl)" },

    // Beverages & Others
    { name: "Lassi (Plain)", calories: 120, protein: 6, carbs: 18, fats: 2, category: "Dairy", serving: "200ml (1 glass)" },
    { name: "Lassi (Mango)", calories: 180, protein: 5, carbs: 32, fats: 3, category: "Dairy", serving: "200ml (1 glass)" },
    { name: "Masala Chaas/Buttermilk", calories: 50, protein: 2, carbs: 8, fats: 1, category: "Dairy", serving: "200ml (1 glass)" },
    { name: "Masala Chai (with sugar)", calories: 80, protein: 2, carbs: 14, fats: 2, category: "Beverages", serving: "200ml (1 cup)" },
    { name: "Filter Coffee (with sugar)", calories: 60, protein: 1, carbs: 12, fats: 1, category: "Beverages", serving: "150ml (1 cup)" },

    // ========== BRANDED & JUNK FOODS ==========

    // Chocolates & Candies
    { name: "KitKat (4 finger bar)", calories: 218, protein: 3, carbs: 28, fats: 11, fiber: 1, sugar: 23, sodium: 16, category: "Snacks", serving: "42g (1 bar)", brand: "Nestlé" },
    { name: "Dairy Milk Chocolate", calories: 240, protein: 3.5, carbs: 28, fats: 13, fiber: 1, sugar: 25, sodium: 50, category: "Snacks", serving: "45g (1 bar)", brand: "Cadbury" },
    { name: "5 Star Chocolate", calories: 270, protein: 3, carbs: 35, fats: 13, fiber: 0.5, sugar: 32, sodium: 45, category: "Snacks", serving: "50g (1 bar)", brand: "Cadbury" },
    { name: "Snickers Bar", calories: 250, protein: 4, carbs: 33, fats: 12, fiber: 1, sugar: 27, sodium: 120, category: "Snacks", serving: "50g (1 bar)", brand: "Mars" },
    { name: "Mars Bar", calories: 228, protein: 2, carbs: 37, fats: 9, fiber: 0.5, sugar: 31, sodium: 85, category: "Snacks", serving: "51g (1 bar)", brand: "Mars" },
    { name: "Munch Chocolate", calories: 285, protein: 4, carbs: 32, fats: 15, fiber: 1.5, sugar: 28, sodium: 40, category: "Snacks", serving: "50g (1 bar)", brand: "Nestlé" },
    { name: "Perk Chocolate", calories: 225, protein: 3, carbs: 29, fats: 11, fiber: 1, sugar: 24, sodium: 35, category: "Snacks", serving: "42g (1 bar)", brand: "Cadbury" },

    // Chips & Crisps
    { name: "Lay's Classic Salted", calories: 536, protein: 6, carbs: 53, fats: 33, fiber: 4, sugar: 1, sodium: 380, category: "Snacks", serving: "100g", brand: "Lay's" },
    { name: "Lay's Masala", calories: 534, protein: 6, carbs: 52, fats: 34, fiber: 4, sugar: 2, sodium: 420, category: "Snacks", serving: "100g", brand: "Lay's" },
    { name: "Pringles Original", calories: 536, protein: 4, carbs: 51, fats: 35, fiber: 2, sugar: 0.5, sodium: 550, category: "Snacks", serving: "100g", brand: "Pringles" },
    { name: "Pringles Sour Cream", calories: 540, protein: 4, carbs: 52, fats: 36, fiber: 2, sugar: 2.5, sodium: 520, category: "Snacks", serving: "100g", brand: "Pringles" },
    { name: "Bingo Mad Angles", calories: 516, protein: 7, carbs: 60, fats: 27, fiber: 3, sugar: 3, sodium: 440, category: "Snacks", serving: "100g", brand: "Bingo" },
    { name: "Kurkure Masala Munch", calories: 520, protein: 6, carbs: 58, fats: 29, fiber: 3.5, sugar: 4, sodium: 480, category: "Snacks", serving: "100g", brand: "Kurkure" },
    { name: "Uncle Chips Spicy", calories: 528, protein: 6, carbs: 54, fats: 32, fiber: 4, sugar: 2, sodium: 460, category: "Snacks", serving: "100g", brand: "Uncle Chips" },

    // Biscuits & Cookies
    { name: "Parle-G Biscuits", calories: 455, protein: 7, carbs: 76, fats: 13, fiber: 2, sugar: 25, sodium: 340, category: "Snacks", serving: "100g (10 biscuits)", brand: "Parle" },
    { name: "Oreo Cookies", calories: 480, protein: 5, carbs: 68, fats: 20, fiber: 3, sugar: 39, sodium: 380, category: "Snacks", serving: "100g (10 cookies)", brand: "Cadbury" },
    { name: "Good Day Butter Cookies", calories: 510, protein: 6, carbs: 66, fats: 24, fiber: 1.5, sugar: 28, sodium: 320, category: "Snacks", serving: "100g (8 cookies)", brand: "Britannia" },
    { name: "Hide & Seek Cookies", calories: 495, protein: 7, carbs: 65, fats: 23, fiber: 2, sugar: 30, sodium: 350, category: "Snacks", serving: "100g (8 cookies)", brand: "Parle" },
    { name: "Monaco Biscuits", calories: 460, protein: 9, carbs: 68, fats: 16, fiber: 2, sugar: 5, sodium: 620, category: "Snacks", serving: "100g (15 biscuits)", brand: "Parle" },
    { name: "Marie Gold Biscuits", calories: 445, protein: 8, carbs: 74, fats: 12, fiber: 2, sugar: 22, sodium: 280, category: "Snacks", serving: "100g (12 biscuits)", brand: "Britannia" },

    // Ice Cream
    { name: "Amul Vanilla Ice Cream", calories: 207, protein: 4, carbs: 24, fats: 10, fiber: 0, sugar: 22, sodium: 55, calcium: 120, category: "Sweets", serving: "100g (1 scoop)", brand: "Amul" },
    { name: "Kwality Walls Cornetto", calories: 246, protein: 3.5, carbs: 32, fats: 12, fiber: 0.5, sugar: 26, sodium: 60, category: "Sweets", serving: "100g (1 cone)", brand: "Kwality Walls" },
    { name: "Magnum Classic", calories: 310, protein: 4, carbs: 30, fats: 19, fiber: 1, sugar: 27, sodium: 45, category: "Sweets", serving: "100g (1 bar)", brand: "Kwality Walls" },

    // Soft Drinks & Beverages
    { name: "Coca-Cola", calories: 42, protein: 0, carbs: 10.6, fats: 0, fiber: 0, sugar: 10.6, sodium: 10, category: "Beverages", serving: "100ml", brand: "Coca-Cola" },
    { name: "Pepsi", calories: 41, protein: 0, carbs: 11, fats: 0, fiber: 0, sugar: 11, sodium: 10, category: "Beverages", serving: "100ml", brand: "Pepsi" },
    { name: "Sprite", calories: 38, protein: 0, carbs: 9.8, fats: 0, fiber: 0, sugar: 9.8, sodium: 15, category: "Beverages", serving: "100ml", brand: "Coca-Cola" },
    { name: "Thums Up", calories: 43, protein: 0, carbs: 11, fats: 0, fiber: 0, sugar: 11, sodium: 12, category: "Beverages", serving: "100ml", brand: "Coca-Cola" },
    { name: "Limca", calories: 44, protein: 0, carbs: 11.2, fats: 0, fiber: 0, sugar: 11.2, sodium: 12, category: "Beverages", serving: "100ml", brand: "Coca-Cola" },
    { name: "Mountain Dew", calories: 46, protein: 0, carbs: 11.6, fats: 0, fiber: 0, sugar: 11.6, sodium: 25, category: "Beverages", serving: "100ml", brand: "Pepsi" },
    { name: "Fanta Orange", calories: 45, protein: 0, carbs: 11.4, fats: 0, fiber: 0, sugar: 11.4, sodium: 8, category: "Beverages", serving: "100ml", brand: "Coca-Cola" },

    // Energy Drinks
    { name: "Red Bull", calories: 45, protein: 0, carbs: 11, fats: 0, fiber: 0, sugar: 11, sodium: 105, caffeine: 32, category: "Beverages", serving: "100ml", brand: "Red Bull" },
    { name: "Monster Energy", calories: 50, protein: 0, carbs: 13, fats: 0, fiber: 0, sugar: 11, sodium: 180, caffeine: 32, category: "Beverages", serving: "100ml", brand: "Monster" },
    { name: "Sting Energy Drink", calories: 42, protein: 0, carbs: 10.5, fats: 0, fiber: 0, sugar: 10.5, sodium: 110, caffeine: 34, category: "Beverages", serving: "100ml", brand: "Sting" },

    // Fast Food Favorites
    { name: "McDonald's Chicken Burger", calories: 360, protein: 15, carbs: 42, fats: 15, fiber: 3, sugar: 7, sodium: 720, category: "Fast Food", serving: "1 burger (150g)", brand: "McDonald's" },
    { name: "McDonald's French Fries (Medium)", calories: 340, protein: 4, carbs: 44, fats: 16, fiber: 4, sugar: 0, sodium: 190, category: "Fast Food", serving: "1 serving (117g)", brand: "McDonald's" },
    { name: "KFC Chicken Zinger", calories: 450, protein: 22, carbs: 45, fats: 21, fiber: 3, sugar: 5, sodium: 980, category: "Fast Food", serving: "1 burger (185g)", brand: "KFC" },
    { name: "Domino's Cheese Pizza (Slice)", calories: 250, protein: 11, carbs: 30, fats: 10, fiber: 2, sugar: 4, sodium: 580, category: "Fast Food", serving: "1 slice (100g)", brand: "Domino's" },
    { name: "Pizza Hut Margherita (Slice)", calories: 230, protein: 10, carbs: 28, fats: 9, fiber: 2, sugar: 3, sodium: 520, category: "Fast Food", serving: "1 slice (95g)", brand: "Pizza Hut" },

    // Indian Street Food (Packaged/Branded)
    { name: "Vada Pav (Street Style)", calories: 290, protein: 6, carbs: 42, fats: 11, fiber: 3, sugar: 3, sodium: 420, category: "Fast Food", serving: "1 vada pav", brand: "Street Food" },
    { name: "Pav Bhaji (Street Style)", calories: 380, protein: 10, carbs: 52, fats: 14, fiber: 6, sugar: 8, sodium: 680, category: "Fast Food", serving: "2 pavs + bhaji", brand: "Street Food" },
    { name: "Samosa (Big)", calories: 308, protein: 6, carbs: 36, fats: 15, fiber: 3, sugar: 2, sodium: 380, category: "Fast Food", serving: "1 samosa (125g)", brand: "Street Food" },

    // Instant Noodles
    { name: "Maggi 2-Minute Noodles", calories: 205, protein: 5, carbs: 30, fats: 7, fiber: 2, sugar: 2, sodium: 820, category: "Fast Food", serving: "1 pack (70g)", brand: "Maggi" },
    { name: "Yippee Noodles", calories: 362, protein: 8, carbs: 57, fats: 12, fiber: 2, sugar: 3, sodium: 780, category: "Fast Food", serving: "1 pack (70g)", brand: "Yippee" },
    { name: "Top Ramen Curry", calories: 379, protein: 9, carbs: 60, fats: 12, fiber: 3, sugar: 4, sodium: 890, category: "Fast Food", serving: "1 pack (75g)", brand: "Top Ramen" },

    // Packaged Juices
    { name: "Real Fruit Juice Orange", calories: 50, protein: 0.5, carbs: 12, fats: 0, fiber: 0.5, sugar: 11, sodium: 10, vitaminC: 30, category: "Beverages", serving: "100ml", brand: "Dabur" },
    { name: "Tropicana Orange Juice", calories: 45, protein: 0.7, carbs: 10, fats: 0, fiber: 0, sugar: 9, sodium: 5, vitaminC: 40, category: "Beverages", serving: "100ml", brand: "Tropicana" },
    { name: "Maaza Mango Drink", calories: 56, protein: 0, carbs: 14, fats: 0, fiber: 0, sugar: 13, sodium: 10, vitaminA: 15, category: "Beverages", serving: "100ml", brand: "Coca-Cola" },
    { name: "Frooti Mango Drink", calories: 58, protein: 0, carbs: 14.5, fats: 0, fiber: 0, sugar: 14, sodium: 12, category: "Beverages", serving: "100ml", brand: "Parle Agro" },

    // Dairy Products (Branded)
    { name: "Amul Butter (Salted)", calories: 717, protein: 0.5, carbs: 0.4, fats: 81, fiber: 0, sugar: 0.4, sodium: 625, vitaminA: 560, category: "Dairy", serving: "100g", brand: "Amul" },
    { name: "Amul Cheese Slices", calories: 287, protein: 18, carbs: 4, fats: 22, fiber: 0, sugar: 4, sodium: 620, calcium: 620, category: "Dairy", serving: "100g (5 slices)", brand: "Amul" },
    { name: "Mother Dairy Milk (Full Cream)", calories: 66, protein: 3.3, carbs: 4.9, fats: 3.6, fiber: 0, sugar: 4.9, sodium: 40, calcium: 125, category: "Dairy", serving: "100ml", brand: "Mother Dairy" },

    // Breakfast Cereals
    { name: "Kellogg's Corn Flakes", calories: 357, protein: 7, carbs: 84, fats: 0.9, fiber: 3, sugar: 8, sodium: 660, iron: 28, category: "Carbs", serving: "100g", brand: "Kellogg's" },
    { name: "Kellogg's Chocos", calories: 390, protein: 6, carbs: 83, fats: 4, fiber: 5, sugar: 36, sodium: 340, iron: 14, category: "Carbs", serving: "100g", brand: "Kellogg's" },
    { name: "Quaker Oats", calories: 389, protein: 17, carbs: 66, fats: 7, fiber: 10, sugar: 1, sodium: 5, iron: 4.5, category: "Carbs", serving: "100g (dry)", brand: "Quaker" },
];

// Search function for food database
function searchFoods(query) {
    if (!query || query.length < 2) {
        return [];
    }

    const lowercaseQuery = query.toLowerCase();
    return FoodDatabase.filter(food =>
        food.name.toLowerCase().includes(lowercaseQuery) ||
        food.category.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 15); // Return max 15 results
}

// Get food by exact name
function getFoodByName(name) {
    return FoodDatabase.find(food =>
        food.name.toLowerCase() === name.toLowerCase()
    );
}
