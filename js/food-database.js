// Common foods database with nutritional information
// All values are per 100g unless specified

const FoodDatabase = [
    // Proteins
    { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6, category: "Protein" },
    { name: "Chicken Thigh", calories: 209, protein: 26, carbs: 0, fats: 11, category: "Protein" },
    { name: "Egg (1 large)", calories: 70, protein: 6, carbs: 0.5, fats: 5, category: "Protein" },
    { name: "Egg White (1 large)", calories: 17, protein: 4, carbs: 0, fats: 0, category: "Protein" },
    { name: "Salmon", calories: 208, protein: 20, carbs: 0, fats: 13, category: "Protein" },
    { name: "Tuna (canned)", calories: 132, protein: 28, carbs: 0, fats: 1, category: "Protein" },
    { name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.6, fats: 0.4, category: "Protein" },
    { name: "Cottage Cheese", calories: 98, protein: 11, carbs: 3.4, fats: 4.3, category: "Protein" },
    { name: "Whey Protein (1 scoop)", calories: 120, protein: 24, carbs: 3, fats: 1.5, category: "Protein" },
    { name: "Beef (lean)", calories: 250, protein: 26, carbs: 0, fats: 15, category: "Protein" },
    { name: "Pork Chop", calories: 242, protein: 27, carbs: 0, fats: 14, category: "Protein" },
    { name: "Turkey Breast", calories: 135, protein: 30, carbs: 0, fats: 1, category: "Protein" },
    { name: "Tofu", calories: 76, protein: 8, carbs: 1.9, fats: 4.8, category: "Protein" },
    { name: "Paneer", calories: 265, protein: 18, carbs: 3, fats: 20, category: "Protein" },

    // Carbs
    { name: "White Rice (cooked)", calories: 130, protein: 2.7, carbs: 28, fats: 0.3, category: "Carbs" },
    { name: "Brown Rice (cooked)", calories: 112, protein: 2.6, carbs: 24, fats: 0.9, category: "Carbs" },
    { name: "Basmati Rice (cooked)", calories: 121, protein: 3, carbs: 25, fats: 0.4, category: "Carbs" },
    { name: "Oats (dry)", calories: 389, protein: 17, carbs: 66, fats: 7, category: "Carbs" },
    { name: "Quinoa (cooked)", calories: 120, protein: 4.4, carbs: 21, fats: 1.9, category: "Carbs" },
    { name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fats: 0.1, category: "Carbs" },
    { name: "Potato", calories: 77, protein: 2, carbs: 17, fats: 0.1, category: "Carbs" },
    { name: "Whole Wheat Bread (1 slice)", calories: 80, protein: 4, carbs: 14, fats: 1, category: "Carbs" },
    { name: "White Bread (1 slice)", calories: 75, protein: 2.5, carbs: 14, fats: 1, category: "Carbs" },
    { name: "Pasta (cooked)", calories: 131, protein: 5, carbs: 25, fats: 1.1, category: "Carbs" },
    { name: "Roti/Chapati (1 medium)", calories: 71, protein: 2, carbs: 15, fats: 0.4, category: "Carbs" },
    { name: "Banana", calories: 89, protein: 1.1, carbs: 23, fats: 0.3, category: "Carbs" },
    { name: "Apple", calories: 52, protein: 0.3, carbs: 14, fats: 0.2, category: "Carbs" },

    // Nuts & Seeds
    { name: "Almonds", calories: 579, protein: 21, carbs: 22, fats: 50, category: "Fats" },
    { name: "Peanuts", calories: 567, protein: 26, carbs: 16, fats: 49, category: "Fats" },
    { name: "Peanut Butter (1 tbsp)", calories: 94, protein: 4, carbs: 3.5, fats: 8, category: "Fats" },
    { name: "Cashews", calories: 553, protein: 18, carbs: 30, fats: 44, category: "Fats" },
    { name: "Walnuts", calories: 654, protein: 15, carbs: 14, fats: 65, category: "Fats" },
    { name: "Chia Seeds (1 tbsp)", calories: 58, protein: 2, carbs: 5, fats: 3.7, category: "Fats" },

    // Vegetables
    { name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fats: 0.4, category: "Vegetables" },
    { name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, category: "Vegetables" },
    { name: "Tomato", calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, category: "Vegetables" },
    { name: "Cucumber", calories: 15, protein: 0.7, carbs: 3.6, fats: 0.1, category: "Vegetables" },
    { name: "Carrot", calories: 41, protein: 0.9, carbs: 10, fats: 0.2, category: "Vegetables" },
    { name: "Cauliflower", calories: 25, protein: 1.9, carbs: 5, fats: 0.3, category: "Vegetables" },

    // Dairy
    { name: "Milk (whole)", calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3, category: "Dairy" },
    { name: "Milk (skim)", calories: 34, protein: 3.4, carbs: 5, fats: 0.1, category: "Dairy" },
    { name: "Cheddar Cheese", calories: 402, protein: 25, carbs: 1.3, fats: 33, category: "Dairy" },
    { name: "Mozzarella Cheese", calories: 280, protein: 28, carbs: 2.2, fats: 17, category: "Dairy" },
    { name: "Butter (1 tbsp)", calories: 102, protein: 0.1, carbs: 0, fats: 12, category: "Dairy" },

    // Oils & Fats
    { name: "Olive Oil (1 tbsp)", calories: 119, protein: 0, carbs: 0, fats: 14, category: "Fats" },
    { name: "Coconut Oil (1 tbsp)", calories: 117, protein: 0, carbs: 0, fats: 14, category: "Fats" },
    { name: "Avocado", calories: 160, protein: 2, carbs: 9, fats: 15, category: "Fats" },

    // Indian Foods
    { name: "Dal (cooked)", calories: 116, protein: 9, carbs: 20, fats: 0.4, category: "Protein" },
    { name: "Rajma (cooked)", calories: 127, protein: 8.7, carbs: 23, fats: 0.5, category: "Protein" },
    { name: "Chole (cooked)", calories: 164, protein: 8.9, carbs: 27, fats: 2.6, category: "Protein" },
    { name: "Idli (1 medium)", calories: 39, protein: 2, carbs: 8, fats: 0.1, category: "Carbs" },
    { name: "Dosa (1 medium)", calories: 133, protein: 4, carbs: 25, fats: 2, category: "Carbs" },
    { name: "Paratha (1 medium)", calories: 268, protein: 6, carbs: 38, fats: 10, category: "Carbs" },

    // Common Meals
    { name: "Pizza (1 slice)", calories: 285, protein: 12, carbs: 36, fats: 10, category: "Mixed" },
    { name: "Burger (basic)", calories: 354, protein: 20, carbs: 30, fats: 16, category: "Mixed" },
    { name: "French Fries", calories: 312, protein: 3.4, carbs: 41, fats: 15, category: "Carbs" },
];

// Search function for food database
function searchFoods(query) {
    if (!query || query.length < 2) {
        return [];
    }

    const lowercaseQuery = query.toLowerCase();
    return FoodDatabase.filter(food =>
        food.name.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 10); // Return max 10 results
}

// Get food by exact name
function getFoodByName(name) {
    return FoodDatabase.find(food =>
        food.name.toLowerCase() === name.toLowerCase()
    );
}
