// FatSecret API Integration for comprehensive food database
// Get your free API keys at: https://platform.fatsecret.com/api/
//
// SETUP INSTRUCTIONS:
// 1. Go to https://platform.fatsecret.com/api/
// 2. Sign up for a free account
// 3. Create a new application
// 4. Copy your Client ID and Client Secret
// 5. Replace 'YOUR_CLIENT_ID_HERE' and 'YOUR_CLIENT_SECRET_HERE' below
// 6. Save this file and refresh the app
//
// Once configured, you'll have access to:
// - 1,000,000+ foods with full nutrition data
// - Indian foods, branded foods, restaurant items
// - Automatic portion calculations
// - Recipe database
//
// Currently using local database only

const FatSecretAPI = {
    // API Configuration
    config: {
        clientId: 'YOUR_CLIENT_ID_HERE',  // Replace with your FatSecret Client ID
        clientSecret: 'YOUR_CLIENT_SECRET_HERE',  // Replace with your FatSecret Client Secret
        endpoint: 'https://platform.fatsecret.com/rest/server.api',
        authEndpoint: 'https://oauth.fatsecret.com/connect/token'
    },

    accessToken: null,
    tokenExpiry: null,

    // Check if API is configured
    isConfigured() {
        return this.config.clientId !== 'YOUR_CLIENT_ID_HERE' &&
               this.config.clientSecret !== 'YOUR_CLIENT_SECRET_HERE';
    },

    // Get OAuth2 access token
    async getAccessToken() {
        // Return cached token if still valid
        if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
            return this.accessToken;
        }

        try {
            const credentials = btoa(`${this.config.clientId}:${this.config.clientSecret}`);

            const response = await fetch(this.config.authEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials&scope=basic'
            });

            if (!response.ok) {
                throw new Error(`Authentication failed: ${response.status}`);
            }

            const data = await response.json();
            this.accessToken = data.access_token;
            // Token expires in data.expires_in seconds, cache for 90% of that time
            this.tokenExpiry = Date.now() + (data.expires_in * 900);

            return this.accessToken;
        } catch (error) {
            console.error('FatSecret auth error:', error);
            throw error;
        }
    },

    // Search foods using FatSecret API
    async searchAPI(query) {
        if (!this.isConfigured()) {
            console.log('FatSecret API not configured. Using other sources.');
            return [];
        }

        if (!query || query.length < 2) {
            return [];
        }

        try {
            const token = await this.getAccessToken();

            const params = new URLSearchParams({
                method: 'foods.search',
                search_expression: query,
                format: 'json',
                max_results: '15'
            });

            const response = await fetch(`${this.config.endpoint}?${params}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();

            if (!data.foods || !data.foods.food) {
                return [];
            }

            // Parse foods
            const foods = Array.isArray(data.foods.food) ? data.foods.food : [data.foods.food];

            return foods.map(item => {
                // Parse serving info
                const servings = item.food_description || '';
                const caloriesMatch = servings.match(/Calories:\s*(\d+)kcal/);
                const proteinMatch = servings.match(/Protein:\s*([\d.]+)g/);
                const carbsMatch = servings.match(/Carbs:\s*([\d.]+)g/);
                const fatsMatch = servings.match(/Fat:\s*([\d.]+)g/);
                const servingMatch = servings.match(/Per\s+(.+?)\s+-/);

                return {
                    name: this.capitalizeWords(item.food_name),
                    calories: caloriesMatch ? parseInt(caloriesMatch[1]) : 0,
                    protein: proteinMatch ? parseFloat(proteinMatch[1]) : 0,
                    carbs: carbsMatch ? parseFloat(carbsMatch[1]) : 0,
                    fats: fatsMatch ? parseFloat(fatsMatch[1]) : 0,
                    category: this.categorizeFood({
                        protein: proteinMatch ? parseFloat(proteinMatch[1]) : 0,
                        carbs: carbsMatch ? parseFloat(carbsMatch[1]) : 0,
                        fats: fatsMatch ? parseFloat(fatsMatch[1]) : 0
                    }),
                    serving: servingMatch ? servingMatch[1] : '100g',
                    source: 'fatsecret'
                };
            }).filter(food => food.calories > 0); // Filter out foods without nutrition data

        } catch (error) {
            console.error('FatSecret API error:', error);
            return [];
        }
    },

    // Categorize food based on macros
    categorizeFood(macros) {
        const protein = macros.protein || 0;
        const carbs = macros.carbs || 0;
        const fats = macros.fats || 0;

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
