# Food Database API Setup Guide

Your gym tracker app includes smart food search with access to **1 MILLION+ foods** through the FatSecret API!

## 🎯 Complete Food Database Coverage

- **Local Database**: 500+ foods (Indian, international, restaurant items) ✅ **No setup needed!**
- **FatSecret API**: 1,000,000+ foods with comprehensive nutrition data ⭐ **Recommended**
- **Nutritionix API**: 1,800,000+ foods (optional - requires commercial trial access)

## 🌟 **Recommended: FatSecret API** (Free & Easy!)

FatSecret offers **free unlimited API access** for personal use - perfect for fitness tracking apps!

---

# 🔐 FatSecret API Setup (Recommended)

### Why FatSecret?
- ✅ **100% FREE** for personal use
- ✅ **Unlimited API calls**
- ✅ **1,000,000+ foods** including Indian cuisine
- ✅ **Easy signup** - no approval needed
- ✅ **Branded foods & restaurant items**

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
2. **Copy both values** - you'll need them in the next step

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
4. Start typing a food name (try "paneer butter masala" or "chicken biryani")
5. You should see results from FatSecret along with your local database

### What You Get:
- ✅ **Unlimited searches** for personal use
- ✅ Access to 1,000,000+ foods
- ✅ Indian foods, branded foods, restaurant items
- ✅ Recipe database
- ✅ Accurate nutrition information
- ✅ Automatic caching for offline use

> **💡 Note:** FatSecret uses OAuth2 authentication, which is handled automatically by the app!

---

# 📱 Optional: Nutritionix API

**⚠️ Note:** Nutritionix changed their policy - they no longer offer free access for personal use. You now need to request a commercial trial and may not be approved for personal projects.

**Only set this up if:**
- You have a commercial/research/enterprise use case
- You successfully got trial access from Nutritionix
- You want additional food coverage beyond FatSecret

### If You Have Nutritionix Access:

1. Go to [https://developer.nutritionix.com/](https://developer.nutritionix.com/)
2. Log in to your approved account
3. Get your **App ID** and **API Key**
4. Open **`js/nutritionix-api.js`**
5. Replace on lines 24-25:
   ```javascript
   appId: '12345678',  // Your Nutritionix App ID
   apiKey: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',  // Your Nutritionix API Key
   ```

**Benefits if configured:**
- Additional 1.8M+ foods
- Nutritionix's food database alongside FatSecret

---

# 🔄 How The Search Works

### Smart Search Priority:

1. **Local Database First** (500+ foods, instant, offline)
   - Your built-in food database
   - Indian foods, international foods, restaurant items
   - No API calls needed ✅

2. **Cached API Foods** (instant, offline)
   - Previously searched foods
   - Works offline after first search ✅

3. **FatSecret API** (requires internet) ⭐ **Primary online source**
   - 1,000,000+ foods
   - Free unlimited access
   - Indian cuisine coverage
   - Results automatically cached

4. **Nutritionix API** (optional, requires internet)
   - 1,800,000+ additional foods
   - Only if you have commercial trial access
   - Results automatically cached

### Special Features:

- **🔍 Multi-Source Search**: Searches local + FatSecret simultaneously
- **📏 Portion Sizes**: Quick buttons for 0.5x, 1x, 1.5x, 2x portions
- **⚡ Recent Foods**: Your last 20 foods for quick re-adding
- **⭐ Favorites**: Star frequently eaten foods
- **💾 Offline Support**: All searched foods cached for offline use
- **🇮🇳 Indian Foods**: Extensive Indian cuisine in local database

---

# 🐛 Troubleshooting

### "No results found" when searching online

**Check:**
1. Are you connected to the internet?
2. Did you configure FatSecret API keys in `js/fatsecret-api.js`?
3. Are your Client ID and Secret correct?

### API not working

**Try:**
1. Open browser console (F12) and check for errors
2. Verify your API credentials are correct
3. Make sure there are no extra spaces in your keys
4. For FatSecret: Confirm you created an application and got keys

### Still not working?

The app works perfectly with the **500+ built-in foods**! The API is optional for accessing additional foods online.

---

# 📊 Database Coverage Summary

| Source | Foods | Setup | Status |
|--------|-------|-------|--------|
| **Local Database** | 500+ | None needed | ✅ Ready |
| **FatSecret API** | 1M+ | Easy (5 min) | ⭐ Recommended |
| **Nutritionix API** | 1.8M+ | Hard (trial request) | ⚠️ Optional |
| **Total Possible** | **2M+** | With all APIs | 🎯 Maximum coverage |

---

# 🎯 Recommendation

**For most users:** Just set up **FatSecret API** (5 minute setup)

This gives you:
- ✅ 500+ local foods (works offline)
- ✅ 1,000,000+ FatSecret foods (free unlimited searches)
- ✅ Total: **1+ million foods** - more than enough!

**Skip Nutritionix** unless you:
- Have a commercial/research project
- Got approved for trial access
- Really need those extra 800k foods

---

# 📝 Quick Start Guide

**Just want to get started fast?**

1. **Try without any API first** - You have 500+ foods built-in!
2. **Want more foods?** Set up FatSecret (takes 5 minutes)
3. **Already have Nutritionix access?** Configure it as bonus

The app works great with just the local database and FatSecret! 🎉

---

**Questions?** Check the [FatSecret API Documentation](https://platform.fatsecret.com/api/Default.aspx?screen=rapiref2)

---

**Note:** Keep your API keys private! Don't share them publicly or commit them to public repositories.
