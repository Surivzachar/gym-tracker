// Nutritionix API Integration for comprehensive food database
// Get your free API keys at: https://developer.nutritionix.com/
//
// SETUP INSTRUCTIONS:
// 1. Go to https://developer.nutritionix.com/
// 2. Sign up for a free account (500 requests/day free tier)
// 3. Create a new application
// 4. Copy your App ID and API Key
// 5. Replace 'YOUR_APP_ID_HERE' and 'YOUR_API_KEY_HERE' below with your actual keys
// 6. Save this file and refresh the app
//
// Once configured, you'll have access to:
// - 800,000+ common foods with full nutrition data
// - 1,000,000+ branded foods (e.g., Subway, Chicken Katsu from specific restaurants)
// - Automatic portion calculations
// - Restaurant menu items
//
// Currently using local database only (380+ foods)

const NutritionixAPI = {
    // API Configuration
    // IMPORTANT: Sign up at https://developer.nutritionix.com/ to get your keys
    config: {
        appId: 'YOUR_APP_ID_HERE',  // Replace with your Nutritionix App ID
        apiKey: 'YOUR_API_KEY_HERE',  // Replace with your Nutritionix API Key
        endpoint: 'https://trackapi.nutritionix.com/v2/search/instant'
    },

    // Check if API is configured
    isConfigured() {
        return this.config.appId !== 'YOUR_APP_ID_HERE' &&
               this.config.apiKey !== 'YOUR_API_KEY_HERE';
    },

    // Search foods using Nutritionix API
    async searchAPI(query) {
        if (!this.isConfigured()) {
            console.log('Nutritionix API not configured. Using local database only.');
            return [];
        }

        if (!query || query.length < 2) {
            return [];
        }

        try {
            const response = await fetch(`${this.config.endpoint}?query=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'x-app-id': this.config.appId,
                    'x-app-key': this.config.apiKey,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();

            // Process common foods (branded foods are in data.branded)
            const commonFoods = (data.common || []).slice(0, 10).map(item => ({
                name: this.capitalizeWords(item.food_name),
                calories: Math.round(item.serving_qty * (item.nf_calories || 0)),
                protein: Math.round(item.serving_qty * (item.nf_protein || 0)),
                carbs: Math.round(item.serving_qty * (item.nf_total_carbohydrate || 0)),
                fats: Math.round(item.serving_qty * (item.nf_total_fat || 0)),
                category: this.categorizeFood(item),
                serving: `${item.serving_qty} ${item.serving_unit}`,
                source: 'api'
            }));

            // Process branded foods
            const brandedFoods = (data.branded || []).slice(0, 5).map(item => ({
                name: item.brand_name ? `${item.food_name} (${item.brand_name})` : item.food_name,
                calories: Math.round(item.nf_calories || 0),
                protein: Math.round(item.nf_protein || 0),
                carbs: Math.round(item.nf_total_carbohydrate || 0),
                fats: Math.round(item.nf_total_fat || 0),
                category: 'Branded',
                serving: item.serving_qty ? `${item.serving_qty} ${item.serving_unit}` : item.serving_size || '1 serving',
                source: 'api'
            }));

            return [...commonFoods, ...brandedFoods];

        } catch (error) {
            console.error('Nutritionix API error:', error);
            return [];
        }
    },

    // Categorize food based on macros
    categorizeFood(item) {
        const protein = item.nf_protein || 0;
        const carbs = item.nf_total_carbohydrate || 0;
        const fats = item.nf_total_fat || 0;

        if (protein > carbs && protein > fats) {
            return 'Protein';
        } else if (carbs > protein && carbs > fats) {
            return 'Carbs';
        } else if (fats > protein && fats > carbs) {
            return 'Fats';
        } else {
            return 'Mixed';
        }
    },

    // Capitalize words in food name
    capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }
};

// Enhanced food search with smart fallback
// Priority: 1. Local Database -> 2. Cached API Foods -> 3. Nutritionix API
async function smartFoodSearch(query) {
    if (!query || query.length < 2) {
        return [];
    }

    const results = {
        local: [],
        cached: [],
        api: []
    };

    // 1. Search local database first (instant, offline)
    results.local = searchFoods(query);

    // 2. Search cached API foods (instant, offline)
    results.cached = Storage.searchCachedAPIFoods(query);

    // 3. If we have good results from local/cached, return them
    if (results.local.length >= 10) {
        return results.local.slice(0, 15);
    }

    // 4. Combine local and cached
    const combined = [...results.local, ...results.cached];

    // Remove duplicates by name
    const uniqueCombined = combined.filter((food, index, self) =>
        index === self.findIndex(f => f.name === food.name)
    );

    // 5. If online and API is configured, fetch from API
    if (navigator.onLine && NutritionixAPI.isConfigured()) {
        try {
            results.api = await NutritionixAPI.searchAPI(query);

            // Cache API results for offline use
            results.api.forEach(food => {
                Storage.addToCachedAPIFoods(food);
            });

            // Combine all results
            const allResults = [...uniqueCombined, ...results.api];

            // Remove duplicates
            const uniqueResults = allResults.filter((food, index, self) =>
                index === self.findIndex(f => f.name === food.name)
            );

            return uniqueResults.slice(0, 20);
        } catch (error) {
            console.error('API search failed, returning local results:', error);
            return uniqueCombined.slice(0, 15);
        }
    }

    // 6. Return local + cached results
    return uniqueCombined.slice(0, 15);
}
