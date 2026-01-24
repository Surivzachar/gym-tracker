# Nutritionix API Setup Instructions

Your gym tracker app now includes smart food search with access to millions of foods through the Nutritionix API!

## Features

- 🔍 **Smart Search**: Automatically searches local database (340+ foods) first, then falls back to Nutritionix API when online
- 🌐 **Comprehensive Database**: Access millions of foods including Indian and international cuisines
- 💾 **Auto-Caching**: API results are automatically cached for offline use later
- ⚡ **Recent Foods**: Quick-add from your last 20 foods
- ⭐ **Favorites**: Star your frequently eaten foods for one-click adding
- 📏 **Portion Control**: Quick portion buttons (0.5x, 1x, 1.5x, 2x, custom)

## How to Get Free Nutritionix API Access

### Step 1: Create a Free Account

1. Go to [https://developer.nutritionix.com/](https://developer.nutritionix.com/)
2. Click **"Sign Up"** in the top right
3. Fill in your details:
   - Email address
   - Password
   - Name
   - Company/Project name (you can use "Personal Gym Tracker")
4. Click **"Create Account"**

### Step 2: Verify Your Email

1. Check your email inbox for a verification email from Nutritionix
2. Click the verification link
3. Log in to your Nutritionix account

### Step 3: Get Your API Keys

1. Once logged in, you'll be taken to your **Dashboard**
2. You'll see your API credentials:
   - **Application ID** (looks like: `12345678`)
   - **API Key** (looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)
3. Copy both values - you'll need them in the next step

### Step 4: Add API Keys to Your App

1. Open the file: **`js/nutritionix-api.js`** in your gym tracker folder
2. Find these lines at the top (around line 6-7):
   ```javascript
   appId: 'YOUR_APP_ID_HERE',  // Replace with your Nutritionix App ID
   apiKey: 'YOUR_API_KEY_HERE',  // Replace with your Nutritionix API Key
   ```
3. Replace `YOUR_APP_ID_HERE` with your Application ID
4. Replace `YOUR_API_KEY_HERE` with your API Key
5. Save the file

**Example:**
```javascript
config: {
    appId: '12345678',  // Your actual App ID
    apiKey: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',  // Your actual API Key
    endpoint: 'https://trackapi.nutritionix.com/v2/search/instant'
},
```

### Step 5: Test It Out!

1. Refresh your gym tracker app (or clear cache and reload)
2. Go to the **Food** tab
3. Click **"+ Add"** on any meal
4. Start typing a food name (try "chicken tikka" or "pizza")
5. You should see results from both your local database and Nutritionix (marked with 🌐)

## Free Plan Limits

The free Nutritionix developer plan includes:
- ✅ **500 API calls per day** (plenty for personal use!)
- ✅ Access to common foods database
- ✅ Access to branded foods database
- ✅ Accurate nutrition information

> **💡 Tip:** Your app automatically caches API results, so frequently searched foods won't count against your daily limit after the first search!

## How It Works

### Smart Search Priority:

1. **Local Database First** (340+ foods, instant, offline)
   - Searches your built-in food database
   - No API calls used

2. **Cached API Foods** (instant, offline)
   - Searches foods you've previously looked up via API
   - No API calls used

3. **Nutritionix API** (requires internet)
   - Only called if online and local results aren't enough
   - Results are automatically cached for future offline use

### Special Features:

- **Portion Sizes**: Click quick portion buttons when adding food (0.5x, 1x, 1.5x, 2x)
- **Recent Foods**: Your last 20 foods appear at the top for quick re-adding
- **Favorites**: Star frequently eaten foods for one-click access
- **Offline Support**: All previously searched foods work offline via cache

## Troubleshooting

### "No results found" when searching online

**Check:**
1. Are you connected to the internet?
2. Did you add your API keys correctly in `js/nutritionix-api.js`?
3. Have you exceeded your daily 500 API call limit? (Resets at midnight UTC)

### API not working

**Try:**
1. Open browser console (F12) and check for errors
2. Verify your API credentials are correct
3. Make sure there are no extra spaces in your API key/ID
4. Check if you verified your email address with Nutritionix

### Still not working?

The app will still work perfectly with the 340+ built-in foods! The API is optional for accessing additional foods online.

## Questions?

For API issues, check the [Nutritionix Developer Documentation](https://docs.nutritionix.com/)

---

**Note:** Keep your API keys private! Don't share them publicly or commit them to public repositories.
