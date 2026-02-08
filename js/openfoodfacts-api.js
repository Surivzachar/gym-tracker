// Open Food Facts API Integration for Barcode Scanning
// Free API with 2M+ products worldwide
// API Docs: https://world.openfoodfacts.org/data

const OpenFoodFactsAPI = {
    baseURL: 'https://world.openfoodfacts.org/api/v2',

    /**
     * Search product by barcode
     * @param {string} barcode - Product barcode (EAN-13, UPC, etc.)
     * @returns {Promise<Object>} - Product data with nutrition
     */
    async searchByBarcode(barcode) {
        try {
            const url = `${this.baseURL}/product/${barcode}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 1 && data.product) {
                return this.parseProduct(data.product);
            } else {
                return null; // Product not found
            }
        } catch (error) {
            console.error('Open Food Facts API error:', error);
            throw new Error('Failed to fetch product data');
        }
    },

    /**
     * Parse Open Food Facts product data to our app format
     * @param {Object} product - Raw product data from API
     * @returns {Object} - Formatted food item
     */
    parseProduct(product) {
        // Get product name (prefer English, fallback to any language)
        const name = product.product_name ||
                     product.product_name_en ||
                     product.generic_name ||
                     'Unknown Product';

        // Get nutrition data per 100g (Open Food Facts standard)
        const nutriments = product.nutriments || {};

        // Extract macros (per 100g)
        const calories = Math.round(nutriments['energy-kcal_100g'] || nutriments['energy-kcal'] || 0);
        const protein = parseFloat((nutriments.proteins_100g || nutriments.proteins || 0).toFixed(1));
        const carbs = parseFloat((nutriments.carbohydrates_100g || nutriments.carbohydrates || 0).toFixed(1));
        const fats = parseFloat((nutriments.fat_100g || nutriments.fat || 0).toFixed(1));

        // Extract micronutrients (per 100g)
        const fiber = parseFloat((nutriments.fiber_100g || nutriments.fiber || 0).toFixed(1));
        const sugar = parseFloat((nutriments.sugars_100g || nutriments.sugars || 0).toFixed(1));
        const sodium = Math.round((nutriments.sodium_100g || nutriments.sodium || 0) * 1000); // Convert g to mg
        const calcium = Math.round((nutriments.calcium_100g || nutriments.calcium || 0) * 1000); // Convert g to mg
        const iron = parseFloat(((nutriments.iron_100g || nutriments.iron || 0) * 1000).toFixed(1)); // Convert g to mg
        const vitaminC = Math.round((nutriments['vitamin-c_100g'] || nutriments['vitamin-c'] || 0) * 1000); // Convert g to mg

        // Get serving size and brand
        const servingSize = product.serving_size || product.serving_quantity || '100g';
        const brand = product.brands || '';
        const category = this.getCategoryFromProduct(product);

        // Get image URL
        const imageUrl = product.image_url || product.image_front_url || '';

        // Create multiple serving options
        const servings = this.createServingOptions(
            calories, protein, carbs, fats,
            fiber, sugar, sodium, calcium, iron, vitaminC,
            servingSize
        );

        return {
            name: brand ? `${brand} - ${name}` : name,
            servings: servings,
            category: category,
            brand: brand,
            barcode: product.code,
            imageUrl: imageUrl,
            source: 'openfoodfacts',
            hasMultipleServings: true
        };
    },

    /**
     * Create multiple serving options based on 100g data
     */
    createServingOptions(calories, protein, carbs, fats, fiber, sugar, sodium, calcium, iron, vitaminC, defaultServing) {
        const servings = [];

        // Add 100g option (base from API)
        servings.push({
            type: '100g',
            calories: calories,
            protein: protein,
            carbs: carbs,
            fats: fats,
            fiber: fiber,
            sugar: sugar,
            sodium: sodium,
            calcium: calcium,
            iron: iron,
            vitaminC: vitaminC
        });

        // Add default serving size if different from 100g
        if (defaultServing && defaultServing !== '100g' && defaultServing !== '100 g') {
            // Try to extract grams from serving size (e.g., "30g", "250ml", "1 bar (42g)")
            const gramsMatch = defaultServing.match(/(\d+)\s*g/);
            if (gramsMatch) {
                const grams = parseInt(gramsMatch[1]);
                const multiplier = grams / 100;

                servings.unshift({
                    type: `1 serving (${defaultServing})`,
                    calories: Math.round(calories * multiplier),
                    protein: parseFloat((protein * multiplier).toFixed(1)),
                    carbs: parseFloat((carbs * multiplier).toFixed(1)),
                    fats: parseFloat((fats * multiplier).toFixed(1)),
                    fiber: parseFloat((fiber * multiplier).toFixed(1)),
                    sugar: parseFloat((sugar * multiplier).toFixed(1)),
                    sodium: Math.round(sodium * multiplier),
                    calcium: Math.round(calcium * multiplier),
                    iron: parseFloat((iron * multiplier).toFixed(1)),
                    vitaminC: Math.round(vitaminC * multiplier)
                });
            }
        }

        // Add common portions
        servings.push({
            type: '1 oz (28g)',
            calories: Math.round(calories * 0.28),
            protein: parseFloat((protein * 0.28).toFixed(1)),
            carbs: parseFloat((carbs * 0.28).toFixed(1)),
            fats: parseFloat((fats * 0.28).toFixed(1)),
            fiber: parseFloat((fiber * 0.28).toFixed(1)),
            sugar: parseFloat((sugar * 0.28).toFixed(1)),
            sodium: Math.round(sodium * 0.28),
            calcium: Math.round(calcium * 0.28),
            iron: parseFloat((iron * 0.28).toFixed(1)),
            vitaminC: Math.round(vitaminC * 0.28)
        });

        return servings;
    },

    /**
     * Determine food category from product data
     */
    getCategoryFromProduct(product) {
        const categories = product.categories_tags || [];

        // Map Open Food Facts categories to our categories
        if (categories.some(cat => cat.includes('meat') || cat.includes('poultry') || cat.includes('fish'))) {
            return 'Protein';
        } else if (categories.some(cat => cat.includes('dairy') || cat.includes('cheese') || cat.includes('yogurt'))) {
            return 'Dairy';
        } else if (categories.some(cat => cat.includes('bread') || cat.includes('pasta') || cat.includes('rice'))) {
            return 'Carbs';
        } else if (categories.some(cat => cat.includes('vegetable') || cat.includes('fruit'))) {
            return 'Vegetables';
        } else if (categories.some(cat => cat.includes('snack') || cat.includes('chocolate') || cat.includes('candy'))) {
            return 'Snacks';
        } else if (categories.some(cat => cat.includes('beverage') || cat.includes('drink'))) {
            return 'Beverages';
        } else {
            return 'Mixed';
        }
    },

    /**
     * Check if barcode is valid format
     */
    isValidBarcode(barcode) {
        // Remove any non-digit characters
        barcode = barcode.replace(/\D/g, '');

        // Check common barcode lengths (EAN-13, UPC-A, EAN-8, etc.)
        return barcode.length >= 8 && barcode.length <= 13;
    }
};
