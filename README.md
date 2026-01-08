# Suresh.aesthetics

**Track. Train. Transform.**

A complete fitness companion Progressive Web App for tracking workouts, nutrition, and progress.

## Features

### 💪 Workout Tracking
- **Strength Training**: Track sets, weight, and reps
- **Cardio Exercises**: Log duration, distance, and calories for running, cycling, walking
- **HIIT Training**: Record duration, rounds, and intensity
- **Progress History**: View your previous performance for each exercise
- **Custom Routines**: Create and save workout routines for quick access
- **Rest Timer**: Built-in timer with presets (1:00, 1:30, 2:00, 3:00 minutes)

### 🍎 Nutrition Tracking
- **Daily Food Log**: Track meals across breakfast, lunch, dinner, and snacks
- **Smart Food Search**: Database of 60+ common foods with auto-fill nutrition info
- **Macro Tracking**: Monitor calories, protein, carbs, and fats
- **Food History**: Review past days' nutrition

### 📊 Additional Features
- **Offline Support**: Works completely offline with local storage
- **Mobile-First**: Optimized for mobile devices
- **PWA**: Install on your phone's home screen like a native app
- **Progress Tracking**: View workout history and improvements over time

## How to Use

### Running the App

1. **Simple HTTP Server** (Recommended):
   ```bash
   cd gym-tracker
   npx serve
   ```
   Then open http://localhost:3000 in your browser

2. **Python Server**:
   ```bash
   cd gym-tracker
   python -m http.server 8000
   ```
   Then open http://localhost:8000 in your browser

3. **Live Server** (VS Code Extension):
   - Install "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

### Installing on Your Phone

1. Open the app in your mobile browser (Chrome for Android, Safari for iOS)
2. For Android Chrome: Tap the three dots menu → "Install app" or "Add to Home screen"
3. For iOS Safari: Tap the Share button → "Add to Home Screen"

### Using the App

#### Tracking a Workout
1. Click "**+ Add Exercise**" button
2. Enter exercise name (e.g., "Bench Press")
3. Add sets with weight and reps
4. Click "**+ Add Set**" to add more sets
5. Click "**Save Exercise**"
6. Repeat for all exercises in your workout
7. Click "**Finish Workout**" when done

#### Using the Rest Timer
1. Click the timer icon (⏱️) in the header
2. Select a preset time or use the default 1:30
3. Click "**Start**" to begin countdown
4. Click "**Pause**" to pause
5. Click "**Reset**" to reset to default

#### Creating a Routine
1. Add exercises to your current workout
2. Go to the "**Routines**" tab
3. Click "**+ New Routine**"
4. Enter a name for your routine (e.g., "Push Day")
5. Click "**Save Routine**"

#### Loading a Routine
1. Click "**Load Routine**" in the Workout tab
2. Select the routine you want to load
3. The exercises will be loaded into your current workout

#### Viewing History
1. Go to the "**History**" tab
2. View all your completed workouts
3. See date, exercises, and total sets for each workout
4. Delete old workouts if needed

## Technical Details

- **No Build Tools Required**: Pure vanilla JavaScript, HTML, and CSS
- **Storage**: Uses localStorage for data persistence
- **Offline**: Service worker caches all files for offline use
- **Responsive**: Mobile-first design with breakpoints for tablets and desktop
- **Browser Support**: Modern browsers with ES6 support

## Data Storage

All data is stored locally in your browser's localStorage:
- Current workout in progress
- Completed workout history
- Saved routines

**Note**: Data is device-specific and won't sync across devices. To backup your data, use your browser's developer tools to export localStorage.

## Customization

You can customize the app by editing:
- `css/styles.css` - Styling and colors
- `js/app.js` - Application logic and features
- `js/storage.js` - Data storage methods
- `manifest.json` - PWA settings and theme colors

## License

Free to use and modify as needed.
