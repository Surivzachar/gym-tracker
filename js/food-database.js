// Common foods database with nutritional information
// All values are per serving unless specified

const FoodDatabase = [
    // Proteins
    { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6, category: "Protein", serving: "100g" },
    { name: "Chicken Thigh", calories: 209, protein: 26, carbs: 0, fats: 11, category: "Protein", serving: "100g" },
    { name: "Egg (1 large)", calories: 70, protein: 6, carbs: 0.5, fats: 5, category: "Protein", serving: "1 egg" },
    { name: "Egg White (1 large)", calories: 17, protein: 4, carbs: 0, fats: 0, category: "Protein", serving: "1 egg white" },
    { name: "Salmon", calories: 208, protein: 20, carbs: 0, fats: 13, category: "Protein", serving: "100g" },
    { name: "Tuna (canned)", calories: 132, protein: 28, carbs: 0, fats: 1, category: "Protein", serving: "100g" },
    { name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.6, fats: 0.4, category: "Protein", serving: "100g" },
    { name: "Cottage Cheese", calories: 98, protein: 11, carbs: 3.4, fats: 4.3, category: "Protein", serving: "100g" },
    { name: "Whey Protein (1 scoop)", calories: 120, protein: 24, carbs: 3, fats: 1.5, category: "Protein", serving: "1 scoop (30g)" },
    { name: "ISO Whey Protein (1 scoop)", calories: 120, protein: 30, carbs: 2, fats: 1, category: "Protein", serving: "1 scoop (30g)" },
    { name: "Beef (lean)", calories: 250, protein: 26, carbs: 0, fats: 15, category: "Protein", serving: "100g" },
    { name: "Pork Chop", calories: 242, protein: 27, carbs: 0, fats: 14, category: "Protein", serving: "100g" },
    { name: "Turkey Breast", calories: 135, protein: 30, carbs: 0, fats: 1, category: "Protein", serving: "100g" },
    { name: "Tofu", calories: 76, protein: 8, carbs: 1.9, fats: 4.8, category: "Protein", serving: "100g" },

    // Paneer Dishes
    {
        name: "Paneer (raw)",
        calories: 265, protein: 18, carbs: 3, fats: 20,
        category: "Protein",
        serving: "100g",
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
    { name: "White Rice (cooked)", calories: 130, protein: 2.7, carbs: 28, fats: 0.3, category: "Carbs", serving: "100g" },
    { name: "Brown Rice (cooked)", calories: 112, protein: 2.6, carbs: 24, fats: 0.9, category: "Carbs", serving: "100g" },
    { name: "Basmati Rice (cooked)", calories: 121, protein: 3, carbs: 25, fats: 0.4, category: "Carbs", serving: "100g" },
    { name: "Oats (dry)", calories: 389, protein: 17, carbs: 66, fats: 7, category: "Carbs", serving: "100g" },
    { name: "Quinoa (cooked)", calories: 120, protein: 4.4, carbs: 21, fats: 1.9, category: "Carbs", serving: "100g" },
    { name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fats: 0.1, category: "Carbs", serving: "100g" },
    { name: "Potato", calories: 77, protein: 2, carbs: 17, fats: 0.1, category: "Carbs", serving: "100g" },
    { name: "Whole Wheat Bread (1 slice)", calories: 80, protein: 4, carbs: 14, fats: 1, category: "Carbs", serving: "1 slice" },
    { name: "Multigrain Bread (1 thin slice)", calories: 90, protein: 4, carbs: 17, fats: 1.5, category: "Carbs", serving: "1 thin slice" },
    { name: "White Bread (1 slice)", calories: 75, protein: 2.5, carbs: 14, fats: 1, category: "Carbs", serving: "1 slice" },
    { name: "Pasta (cooked)", calories: 131, protein: 5, carbs: 25, fats: 1.1, category: "Carbs", serving: "100g" },
    {
        name: "Roti/Chapati (1 medium)",
        calories: 71, protein: 2, carbs: 15, fats: 0.4,
        category: "Carbs",
        serving: "1 roti (30g)",
        recipe: "Ingredients (for 1 roti):\n• Whole wheat flour - 30g\n• Water - 15ml\n• Salt - pinch\n\nPreparation:\n1. Knead flour with water into soft dough\n2. Roll into thin circle (6-7 inches)\n3. Cook on hot tawa (1 min each side)\n4. Optional: apply 1/2 tsp ghee"
    },
    {
        name: "Paratha (1 medium)",
        calories: 268, protein: 6, carbs: 38, fats: 10,
        category: "Carbs",
        serving: "1 paratha (80g)",
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
    { name: "Milk (whole)", calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3, category: "Dairy", serving: "100ml" },
    { name: "Milk (skim)", calories: 34, protein: 3.4, carbs: 5, fats: 0.1, category: "Dairy", serving: "100ml" },
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

    // Common Meals
    { name: "Pizza (1 slice)", calories: 285, protein: 12, carbs: 36, fats: 10, category: "Mixed", serving: "1 slice" },
    { name: "Burger (basic)", calories: 354, protein: 20, carbs: 30, fats: 16, category: "Mixed", serving: "1 burger" },
    { name: "French Fries", calories: 312, protein: 3.4, carbs: 41, fats: 15, category: "Carbs", serving: "100g" },

    // Additional Items for Diet Plan
    { name: "Honey (1 tbsp)", calories: 64, protein: 0.1, carbs: 17, fats: 0, category: "Carbs", serving: "1 tbsp (21g)" },
    { name: "Rice Cake (1 cake)", calories: 35, protein: 0.7, carbs: 7.3, fats: 0.3, category: "Carbs", serving: "1 rice cake (9g)" },
    { name: "Herbal Tea", calories: 2, protein: 0, carbs: 0.4, fats: 0, category: "Beverages", serving: "1 cup" },
    { name: "Black Tea/Coffee", calories: 2, protein: 0.3, carbs: 0, fats: 0, category: "Beverages", serving: "1 cup" },
    { name: "Mixed Vegetables (cooked)", calories: 65, protein: 2.5, carbs: 13, fats: 0.5, category: "Vegetables", serving: "1 cup (150g)" },
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
