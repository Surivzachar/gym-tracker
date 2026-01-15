# Suresh.aesthetics Fitness Tracker 💪

**Track. Train. Transform.**

A comprehensive Progressive Web App (PWA) for complete fitness tracking - workouts, nutrition, body measurements, daily metrics, and progress photos with Google Drive cloud sync.

🌐 **Live Demo**: [https://coruscating-croissant-c9c56a.netlify.app/](https://coruscating-croissant-c9c56a.netlify.app/)

---

## ✨ Features Overview

### 📊 **Dashboard** (New!)
Your complete daily overview in one place - inspired by Healthifyme
- **🔥 Workout Calories Burnt** - Track total calories from exercises
- **👟 Steps Counter** - Daily step tracking (Goal: 10,000 steps)
- **💧 Water Intake** - Track glasses of water (Goal: 8 glasses/day, 250ml each)
- **😴 Sleep Hours** - Log your sleep duration
- **🍽️ Food Summary** - Today's calories, protein, carbs, and fats at a glance
- **💪 Workout Summary** - Quick overview of today's exercises

### 💪 **Workout Tracking**
- **Strength Training**: Track sets, weight (kg), and reps with progress history
- **Cardio Exercises**: Log duration, distance, pace, and calories for running, cycling, walking, swimming
- **HIIT Training**: Record duration, rounds, intensity, and calories
- **Progress History**: View previous performance for each exercise
- **Custom Routines**: Create and save workout routines for quick access
- **Load Routines**: One-click loading of saved workout templates
- **Rest Timer**: Built-in timer with presets (1:00, 1:30, 2:00, 3:00 minutes)
- **Daily Quote**: Motivational fitness quotes to keep you inspired

### 🍎 **Nutrition Tracking**
- **Daily Food Log**: Track meals across breakfast, lunch, dinner, and snacks
- **Extensive Food Database**: 135+ foods including 55+ Indian dishes with preparation recipes
- **Recipe Instructions**: Detailed ingredient quantities and preparation steps for Indian cuisine
- **Smart Food Search**: Quick search with auto-fill nutrition information
- **Macro Tracking**: Monitor calories, protein, carbs, and fats
- **Daily Totals**: See your complete daily nutrition summary
- **Food History**: Review past days' nutrition with calendar picker
- **Food Routines**: Save and reuse common meals for faster logging

### 📸 **Progress Photos**
Track your body transformation visually
- **Photo Upload**: Take photos with camera or upload from gallery
- **Upload Date Tracking**: Full date display on each photo
- **Time Indicators**: Shows "Today", "Yesterday", "X days/weeks/months ago"
- **Progress Frequency**: Displays days between consecutive photos
- **Body Measurements**: Optional chest, waist, arms, thighs (in cm)
- **Weight Tracking**: Log weight with each photo
- **Notes**: Add personal notes about how you're feeling
- **Gallery View**: Beautiful grid layout of all your progress photos
- **Before/After Comparison**: Easy visual comparison of transformation

### ☁️ **Google Drive Cloud Sync**
Keep your data safe and synced across devices
- **OAuth 2.0 PKCE Authentication**: Secure login flow
- **Automatic Syncing**: Auto-sync every 5 minutes + 30 seconds after changes
- **Manual Sync**: Upload/Download on demand
- **Cross-Device**: Access your data from any device
- **15GB Free Storage**: Leverage your Google Drive storage
- **Complete Backup**: Syncs workouts, food, photos, daily metrics, routines
- **Privacy**: Data stored in YOUR Google Drive only

### 📅 **Date History Viewer**
- Click the calendar icon to view records for any specific date
- See workouts and food logged on that day
- Navigate through your fitness journey

### 📱 **Progressive Web App (PWA)**
- **Install on Home Screen**: Works like a native app
- **Offline Support**: Full functionality without internet
- **Fast & Lightweight**: Optimized performance
- **Mobile-First Design**: Responsive layout for all screen sizes
- **Push Notifications**: Rest timer notifications

---

## 🚀 Quick Start

### Option 1: Use Live Demo
Simply visit [https://coruscating-croissant-c9c56a.netlify.app/](https://coruscating-croissant-c9c56a.netlify.app/) and start using immediately!

### Option 2: Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Surivzachar/gym-tracker.git
   cd gym-tracker
   ```

2. **Start a local server:**

   Using npx (recommended):
   ```bash
   npx http-server -p 3000
   ```

   Or using Python:
   ```bash
   python -m http.server 3000
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Installing as PWA on Mobile

**Android (Chrome):**
1. Open the app in Chrome
2. Tap the menu (⋮) → "Install app" or "Add to Home screen"
3. Confirm installation

**iOS (Safari):**
1. Open the app in Safari
2. Tap the Share button (⎘)
3. Select "Add to Home Screen"
4. Tap "Add"

---

## 🔧 Google Drive Setup (Optional but Recommended)

To enable cloud sync and backup your data:

1. **Go to Google Cloud Console**: https://console.cloud.google.com
2. **Create a new project**: "Gym Tracker PWA"
3. **Enable Google Drive API**: In APIs & Services → Library
4. **Create OAuth Consent Screen**: Select "External", add your email
5. **Create OAuth Client ID**:
   - Type: Web application
   - Authorized JavaScript origins: Your app URL
   - Authorized redirect URIs: Your app URL
6. **Copy Client ID and Secret**
7. **Update the app**:
   - Open `js/googledrive-sync.js`
   - Replace `CLIENT_ID` and `CLIENT_SECRET` with your credentials
8. **Refresh and connect** in Settings → Google Drive

📖 **Detailed Guide**: See [GOOGLEDRIVE_SETUP.md](GOOGLEDRIVE_SETUP.md) for step-by-step instructions

---

## 📖 How to Use

### Dashboard
- **Default view** when you open the app
- **Click any stat card** to update that metric
- View all today's activities at a glance

### Tracking Steps
1. Click the **👟 Steps** card on Dashboard
2. Enter your step count
3. Click **Save Steps**

### Tracking Water
1. Click the **💧 Water** card on Dashboard
2. Use **+1 Glass** button for quick add, OR
3. Enter total glasses manually
4. Click **Save Water**

### Tracking Sleep
1. Click the **😴 Sleep** card on Dashboard
2. Enter hours (decimals supported, e.g., 7.5)
3. Click **Save Sleep**

### Logging a Workout
1. Go to **Workout** tab
2. Click **+ Add Exercise**
3. Enter exercise details:
   - Name (e.g., "Bench Press")
   - Type (Strength/Cardio/HIIT)
   - Sets, weight, reps for strength
   - Duration, distance for cardio
4. Click **+ Add Set** for more sets
5. Click **Save Exercise**
6. Repeat for all exercises
7. Click **Finish Workout** when done

### Creating a Workout Routine
1. Add exercises to your current workout
2. Go to **Routines** tab
3. Click **+ New Routine**
4. Enter routine name (e.g., "Push Day")
5. Click **Save Routine**

### Tracking Food
1. Go to **Food** tab
2. Click **+ Add Food** button for any meal
3. Search for food or enter custom
4. For items with recipes: View preparation instructions
5. Adjust quantity if needed
6. Click **Save Food**
7. View **Daily Totals** at the bottom

### Taking Progress Photos
1. Go to **Photos** tab
2. Click **📸 Add Progress Photo**
3. Take photo or upload from gallery
4. Add optional details:
   - Weight (kg)
   - Body measurements (cm)
   - Personal notes
5. Click **Save Photo**
6. View photo timeline with dates and progress frequency

### Viewing History by Date
1. Click the **📅 Calendar** button in header
2. Select any date
3. View workouts and food logged that day

---

## 🎨 Customization

### Styling
- **Colors & Theme**: Edit `css/styles.css`
- **Logo**: Replace `logo.png`, `icon-192.png`, `icon-512.png`
- **App Name**: Update `manifest.json`

### Food Database
- **Add Foods**: Edit `js/food-database.js`
- **Add Recipes**: Include `recipe` field with preparation instructions

### Features
- **Workout Types**: Modify `js/app.js`
- **Storage Methods**: Edit `js/storage.js`
- **Timer Presets**: Update timer presets in `js/app.js`

---

## 📊 Data Storage

### Local Storage
All data is stored in your browser's localStorage:
- Workouts and workout history
- Food diary and food routines
- Progress photos (base64 encoded)
- Daily metrics (steps, water, sleep, calories)
- Saved workout routines
- Journey start date

### Google Drive (When Connected)
Synced to your Google Drive in `GymTrackerApp` folder:
- All local data is backed up
- File: `gym-tracker-data.json`
- Auto-sync every 5 minutes + after changes
- Manual sync available anytime

### Export/Import
- **Export**: Settings → Export Data (downloads JSON file)
- **Import**: Settings → Import Data (restores from JSON file)
- Perfect for device migration or backup

---

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Storage**: localStorage + Google Drive API v3
- **Authentication**: OAuth 2.0 PKCE flow
- **PWA**: Service Worker for offline support
- **Hosting**: Netlify (auto-deployment from GitHub)
- **No Framework**: Zero dependencies, pure web standards

### Browser Support
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Optimized

---

## 📁 Project Structure

```
gym-tracker/
├── index.html              # Main app HTML
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── css/
│   └── styles.css          # All styling
├── js/
│   ├── app.js              # Main app logic
│   ├── storage.js          # Data storage methods
│   ├── googledrive-sync.js # Google Drive integration
│   ├── food-database.js    # Food items with recipes
│   └── quotes.js           # Motivational quotes
├── icons/
│   ├── logo.png            # App logo
│   ├── icon-192.png        # PWA icon 192x192
│   └── icon-512.png        # PWA icon 512x512
└── GOOGLEDRIVE_SETUP.md    # Detailed setup guide
```

---

## 🌟 Key Highlights

✅ **Complete Fitness Solution** - Workouts, nutrition, photos, daily metrics all in one
✅ **Offline-First** - Works without internet connection
✅ **Privacy-Focused** - Your data stays in YOUR Google Drive
✅ **No Sign-up Required** - Start tracking immediately
✅ **Cross-Platform** - Works on Android, iOS, Desktop
✅ **Zero Cost** - Completely free to use
✅ **Open Source** - Customize as you need
✅ **Indian Food Database** - 55+ Indian dishes with recipes
✅ **Visual Progress** - Photo timeline with measurements

---

## 🎯 Roadmap / Future Features

- [ ] Charts and graphs for progress visualization
- [ ] Export photos as PDF report
- [ ] Body weight graph over time
- [ ] Workout calendar view
- [ ] Exercise video tutorials
- [ ] Meal planning feature
- [ ] Integration with fitness trackers
- [ ] Social sharing of achievements

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

## 📄 License

This project is free to use and modify for personal purposes.

---

## 💬 Support

If you find this app helpful, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs via Issues
- 💡 Suggesting features
- 📣 Sharing with friends

---

## 📸 Screenshots

### Dashboard
Complete daily overview with all metrics in one place

### Workout Tracking
Comprehensive exercise logging with progress history

### Food Tracking
Extensive database with Indian cuisine and recipes

### Progress Photos
Visual transformation tracking with measurements

### Google Drive Sync
Automatic cloud backup and cross-device sync

---

**Made with ❤️ for fitness enthusiasts**

**Track. Train. Transform. 💪**
