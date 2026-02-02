# Food Database API Setup Instructions

Your gym tracker app now includes smart food search with access to **2 MILLION+ foods** through multiple APIs!

## 🎯 Complete Food Database Coverage

- **Local Database**: 500+ foods (Indian, international, restaurant items)
- **Nutritionix API**: 800,000+ common foods + 1M+ branded foods
- **FatSecret API**: 1,000,000+ foods with comprehensive nutrition data
- **AI Food Scanner**: Take a photo to automatically detect nutrition info

## Features

- 🔍 **Smart Search**: Automatically searches local database (500+ foods) first, then falls back to APIs when online
- 🌐 **Comprehensive Database**: Access 2M+ foods including Indian and international cuisines
- 📸 **AI Food Scanner**: Take a photo of food to automatically detect nutrition (Nutritionix)
- 💾 **Auto-Caching**: API results are automatically cached for offline use later
- ⚡ **Recent Foods**: Quick-add from your last 20 foods
- ⭐ **Favorites**: Star your frequently eaten foods for one-click adding
- 📏 **Portion Control**: Quick portion buttons (0.5x, 1x, 1.5x, 2x, custom)

---

# Setup Guide

You can set up **one or both APIs** to maximize your food database coverage:

- **Option A**: Nutritionix only (800K foods + AI photo scanner)
- **Option B**: FatSecret only (1M+ foods)
- **Option C**: Both APIs (2M+ foods + AI scanner) ⭐ **RECOMMENDED**

---

## 📱 Option 1: Nutritionix API Setup (Recommended for AI Scanner)

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
4. Try the **📸 Scan Food Photo** button to test AI recognition
5. Or start typing a food name (try "chicken tikka" or "pizza")
6. You should see results from both your local database and Nutritionix (marked with 🌐)

### Free Plan Limits

The free Nutritionix developer plan includes:
- ✅ **500 API calls per day** (plenty for personal use!)
- ✅ Access to 800,000+ common foods database
- ✅ Access to 1,000,000+ branded foods database
- ✅ **AI photo recognition** for automatic nutrition detection
- ✅ Accurate nutrition information

> **💡 Tip:** Your app automatically caches API results, so frequently searched foods won't count against your daily limit after the first search!

---

## 🔐 Option 2: FatSecret API Setup (Additional 1M+ Foods)

### Step 1: Create a Free Account

1. Go to [https://platform.fatsecret.com/api/](https://platform.fatsecret.com/api/)
2. Click **"Sign Up"** or **"Get Started"**
3. Fill in your details:
   - Email address
   - Password
   - Name
4. Click **"Create Account"**

### Step 2: Create an Application

1. Once logged in, go to your **Dashboard**
2. Click **"Create Application"** or **"New Application"**
3. Fill in the application details:
   - **Application Name**: "Personal Gym Tracker" (or any name)
   - **Description**: "Food tracking for personal fitness app"
   - **Platform**: Select "Web Application"
4. Click **"Create"**

### Step 3: Get Your API Keys

1. After creating the application, you'll see your credentials:
   - **Client ID** (looks like: `12345678abcdef`)
   - **Client Secret** (looks like: `a1b2c3d4e5f6g7h8`)
2. Copy both values - you'll need them in the next step

### Step 4: Add API Keys to Your App

1. Open the file: **`js/fatsecret-api.js`** in your gym tracker folder
2. Find these lines at the top (around line 23-24):
   ```javascript
   clientId: 'YOUR_CLIENT_ID_HERE',  // Replace with your FatSecret Client ID
   clientSecret: 'YOUR_CLIENT_SECRET_HERE',  // Replace with your FatSecret Client Secret
   ```
3. Replace `YOUR_CLIENT_ID_HERE` with your Client ID
4. Replace `YOUR_CLIENT_SECRET_HERE` with your Client Secret
5. Save the file

**Example:**
```javascript
config: {
    clientId: '12345678abcdef',  // Your actual Client ID
    clientSecret: 'a1b2c3d4e5f6g7h8',  // Your actual Client Secret
    endpoint: 'https://platform.fatsecret.com/rest/server.api',
    authEndpoint: 'https://oauth.fatsecret.com/connect/token'
},
```

### Step 5: Test It Out!

1. Refresh your gym tracker app (or clear cache and reload)
2. Go to the **Food** tab
3. Click **"+ Add"** on any meal
4. Start typing a food name (try "paneer butter masala" or "subway sandwich")
5. You should see results from FatSecret in addition to local and Nutritionix results

### Free Plan Limits

The free FatSecret API plan includes:
- ✅ **Unlimited API calls** for personal use
- ✅ Access to 1,000,000+ foods database
- ✅ Indian foods, branded foods, restaurant items
- ✅ Recipe database
- ✅ Accurate nutrition information

> **💡 Note:** FatSecret uses OAuth2 authentication, which is handled automatically by the app!

---

## 🔄 How It Works

### Smart Search Priority:

1. **Local Database First** (500+ foods, instant, offline)
   - Searches your built-in food database
   - Indian foods, international foods, restaurant items
   - No API calls used

2. **Cached API Foods** (instant, offline)
   - Searches foods you've previously looked up via API
   - No API calls used

3. **Nutritionix API** (requires internet)
   - 800,000+ common foods + 1M+ branded foods
   - AI photo recognition for automatic nutrition detection
   - Results are automatically cached for future offline use

4. **FatSecret API** (requires internet)
   - 1,000,000+ foods including Indian cuisine
   - Additional coverage for branded and restaurant foods
   - Results are automatically cached for future offline use

### Special Features:

- **📸 AI Food Scanner**: Take a photo of your food for automatic nutrition detection (Nutritionix)
- **🔍 Multi-API Search**: Searches up to 4 sources (Local + Cache + Nutritionix + FatSecret)
- **📏 Portion Sizes**: Click quick portion buttons when adding food (0.5x, 1x, 1.5x, 2x)
- **⚡ Recent Foods**: Your last 20 foods appear at the top for quick re-adding
- **⭐ Favorites**: Star frequently eaten foods for one-click access
- **💾 Offline Support**: All previously searched foods work offline via cache
- **🇮🇳 Indian Foods**: Extensive coverage of Indian cuisine in local database

---

## 🐛 Troubleshooting

### "No results found" when searching online

**Check:**
1. Are you connected to the internet?
2. Did you add your API keys correctly?
   - Nutritionix: `js/nutritionix-api.js` (lines 24-25)
   - FatSecret: `js/fatsecret-api.js` (lines 23-24)
3. Have you exceeded your daily API limit? (Nutritionix: 500/day, resets at midnight UTC)

### AI Food Scanner not working

**Check:**
1. Did you configure Nutritionix API keys? (AI scanner requires Nutritionix)
2. Is your photo clear and well-lit?
3. Try taking the photo from directly above the food

### API not working

**Try:**
1. Open browser console (F12) and check for errors
2. Verify your API credentials are correct
3. Make sure there are no extra spaces in your API keys
4. Check if you verified your email address with the provider
5. For FatSecret: Make sure you created an application and got Client ID/Secret

### Still not working?

The app will still work perfectly with the 500+ built-in foods! The APIs are optional for accessing additional foods online.

---

## 📊 Database Coverage Summary

| Source | Foods | Coverage | Features |
|--------|-------|----------|----------|
| **Local Database** | 500+ | Indian, International, Restaurant | ✅ Offline, Fast |
| **Nutritionix** | 1.8M+ | Common, Branded, Restaurant | ✅ AI Photo Scanner |
| **FatSecret** | 1M+ | Global, Indian, Branded | ✅ Unlimited calls |
| **Total** | **2M+** | **Comprehensive** | ✅ Auto-caching |

> **💡 Recommendation**: Set up both APIs for maximum coverage! You'll have access to virtually any food you can think of.

## Questions?

For API issues, check the [Nutritionix Developer Documentation](https://docs.nutritionix.com/)

---

**Note:** Keep your API keys private! Don't share them publicly or commit them to public repositories.
