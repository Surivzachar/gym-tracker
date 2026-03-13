// Food Search Module
// Handles searching across multiple food sources:
// - Custom foods (user-saved)
// - Local database (570+ foods)
// - Cached API results (offline access)
// - FatSecret API (1M+ foods when configured)
//
// Nutritionix API integration removed - not configured and not needed
// FatSecret provides similar functionality for free

// Enhanced food search with smart fallback
// Priority: 1. Custom Foods -> 2. Local Database -> 3. Cached API Foods -> 4. FatSecret API
async function smartFoodSearch(query) {
    if (!query || query.length < 2) {
        return [];
    }

    const results = {
        custom: [],
        local: [],
        cached: [],
        fatsecret: []
    };

    // 1. Search custom foods first (user's saved foods - highest priority)
    results.custom = Storage.searchCustomFoods(query);

    // 2. Search local database (instant, offline)
    results.local = searchFoods(query);

    // 3. Search cached API foods (instant, offline)
    results.cached = Storage.searchCachedAPIFoods(query);

    // 4. If we have good results from custom/local/cached, return them
    if (results.custom.length + results.local.length >= 10) {
        const combined = [...results.custom, ...results.local, ...results.cached];
        return combined.slice(0, 15);
    }

    // 5. Combine custom, local and cached
    const combined = [...results.custom, ...results.local, ...results.cached];

    // Remove duplicates by name
    const uniqueCombined = combined.filter((food, index, self) =>
        index === self.findIndex(f => f.name === food.name)
    );

    // 6. If online, fetch from FatSecret API (free for personal use)
    if (navigator.onLine) {
        try {
            // Query FatSecret API first (free for personal use)
            if (typeof FatSecretAPI !== 'undefined' && FatSecretAPI.isConfigured()) {
                results.fatsecret = await FatSecretAPI.searchAPI(query);

                // Cache API results for offline use
                results.fatsecret.forEach(food => {
                    Storage.addToCachedAPIFoods(food);
                });
            }

            // Combine all results (Custom foods appear first, then local, then FatSecret)
            const allResults = [...uniqueCombined, ...results.fatsecret];

            // Remove duplicates by name
            const uniqueResults = allResults.filter((food, index, self) =>
                index === self.findIndex(f => f.name === food.name)
            );

            return uniqueResults.slice(0, 25);
        } catch (error) {
            console.error('API search failed, returning local results:', error);
            return uniqueCombined.slice(0, 15);
        }
    }

    // 7. Return custom + local + cached results when offline
    return uniqueCombined.slice(0, 15);
}
