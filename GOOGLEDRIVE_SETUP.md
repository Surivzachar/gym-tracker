# Google Drive Cloud Sync Setup Guide

This guide will help you set up Google Drive cloud sync for your Gym Tracker PWA so you can access your data from any device with 15GB free storage!

## Prerequisites
- Google account (Gmail) - **FREE**
- Google Cloud Console access - **FREE**

## Step-by-Step Setup

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com

### 2. Sign In
Sign in with your Google account (Gmail)

### 3. Create a New Project
- Click on the project dropdown at the top
- Click **"NEW PROJECT"**
- Project name: `Gym Tracker PWA` (or any name you prefer)
- Click **"CREATE"**
- Wait a few seconds for the project to be created
- Make sure the new project is selected in the dropdown

### 4. Enable Google Drive API
- In the left sidebar, click **"APIs & Services"** → **"Library"**
- Search for: **"Google Drive API"**
- Click on it
- Click **"ENABLE"** button
- Wait for it to enable (a few seconds)

### 5. Configure OAuth Consent Screen
- Go to **"APIs & Services"** → **"OAuth consent screen"**
- Select: **"External"** (allows you to use it with your personal Google account)
- Click **"CREATE"**

Fill in the required fields:
- **App name:** `Gym Tracker PWA`
- **User support email:** Your email address
- **Developer contact information:** Your email address
- Click **"SAVE AND CONTINUE"**

Skip the **Scopes** page (click **"SAVE AND CONTINUE"**)

On **Test users** page:
- Click **"+ ADD USERS"**
- Add your own Gmail address
- Click **"ADD"**
- Click **"SAVE AND CONTINUE"**

Click **"BACK TO DASHBOARD"**

### 6. Create OAuth Client ID
- Go to **"APIs & Services"** → **"Credentials"**
- Click **"+ CREATE CREDENTIALS"** at the top
- Select **"OAuth client ID"**

Configure the OAuth client:

**Application type:** Select **"Web application"**

**Name:** `Gym Tracker PWA`

**Authorized JavaScript origins:**
- Click **"+ ADD URI"**
- For local testing: `http://localhost:3000`
- For production: Add your deployed URL (e.g., `https://yourdomain.com`)

**Authorized redirect URIs:**
- Click **"+ ADD URI"**
- For local testing: `http://localhost:3000`
- For production: Add your deployed URL

Click **"CREATE"**

### 7. Copy Your Client ID
You'll see a popup with your credentials:
- **Client ID:** Something like `123456789-abc123.apps.googleusercontent.com`
- Click the **copy icon** next to the Client ID
- **Keep this safe!** You'll need it in the next step

(You can always find it later in the Credentials page)

### 8. Update Your App Code
Open the file: `js/googledrive-sync.js`

Find this line (near the top, around line 7):
```javascript
CLIENT_ID: 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com',
```

Replace the entire string with your actual Client ID:
```javascript
CLIENT_ID: '123456789-abc123.apps.googleusercontent.com',
```

**Important:** Keep the quotes, just replace the text inside!

**Save the file!**

### 9. Refresh Your App
- Hard refresh your browser: **Ctrl + F5** (Windows) or **Cmd + Shift + R** (Mac)
- Or clear browser cache and reload

### 10. Connect to Google Drive
1. Open your app
2. Go to **Settings** (⚙️ icon in header)
3. Scroll to **"☁️ Google Drive Cloud Sync"** section
4. Click **"Connect to Google Drive"** button
5. Sign in with your Google account
6. Grant permissions when prompted:
   - "See and download all your Google Drive files" (only files created by this app)
7. You'll be redirected back to your app
8. Choose whether to upload your current data immediately

---

## Using Google Drive Sync

### First Time Connection
1. After connecting, enable **"Auto-sync"** toggle
2. Click **"⬆️ Upload Now"** to upload your current data
3. Your data is now in the cloud!

### Features

#### Auto-Sync (Recommended)
- Toggle **"Auto-sync enabled"** ON
- Automatically syncs every 5 minutes
- Also syncs 30 seconds after you make changes
- Set it and forget it!

#### Manual Sync
- **⬆️ Upload Now**: Manually upload your current data to Google Drive
- **⬇️ Download**: Download and restore data from Google Drive (replaces local data)

#### What Gets Synced
- All workouts and workout routines
- All food diary entries and food routines
- Journey start date
- Current in-progress workout

### Data Storage Location
Your data is stored in:
```
Google Drive (Your Account)
└── GymTrackerApp/
    └── gym-tracker-data.json
```

You can verify this by:
1. Going to https://drive.google.com
2. Looking for the **"GymTrackerApp"** folder
3. Seeing your **gym-tracker-data.json** file there

### Syncing Across Multiple Devices

**Setup on Device 1 (Phone):**
1. Complete the setup above
2. Connect to Google Drive
3. Upload your data
4. Enable auto-sync

**Setup on Device 2 (Computer/Tablet):**
1. Use the same Google account
2. Set up the Client ID (use the same one!)
3. Connect to Google Drive
4. Click "Download" to get data from Device 1
5. Enable auto-sync

**Daily Use:**
- Make changes on any device
- Auto-sync handles the rest
- Manually download if you want to force-pull latest data

### Tips & Best Practices

✅ **Enable Auto-Sync** - Easiest way to keep devices in sync
✅ **First Device** - Upload data from your primary device first
✅ **New Device** - Download data on first use
✅ **Multiple Devices** - Use the same Client ID on all devices
✅ **Manual Override** - Download always replaces local data
✅ **Backup** - Your data stays on Google Drive even if you lose your device

---

## Troubleshooting

### "Not Configured" Message
**Problem:** The app shows "Setup Required"

**Solution:**
- Make sure you updated the CLIENT_ID in `js/googledrive-sync.js`
- The Client ID should end with `.apps.googleusercontent.com`
- Hard refresh the app (Ctrl + F5)

### Connection Fails
**Problem:** Can't connect to Google Drive

**Solutions:**
- Check that redirect URI in Google Cloud Console matches your app's URL
- Make sure Google Drive API is enabled
- Verify OAuth consent screen is configured
- Try using an Incognito/Private window
- Clear browser cache and cookies

### "Access Blocked" Error
**Problem:** Google says "This app isn't verified"

**Solution:**
- This is normal for personal projects!
- Click **"Advanced"** → **"Go to Gym Tracker PWA (unsafe)"**
- This only appears because it's a personal app, not published to Google
- Your data is safe!

### Sync Fails
**Problem:** Upload/Download fails

**Solutions:**
- Check your internet connection
- Make sure you have Google Drive storage space (check quota at drive.google.com)
- Try disconnecting and reconnecting
- Check browser console for specific errors (F12)

### Token Expired
**Problem:** "Not connected" after some time

**Solution:**
- The app should automatically refresh tokens
- If it doesn't work, just disconnect and reconnect
- Auto-sync will resume

### Different Data on Different Devices
**Problem:** Devices show different data

**Solution:**
- Choose which device has the correct data
- On that device: Click "Upload Now"
- On other devices: Click "Download"
- This will sync everything

---

## Security & Privacy

### Is My Data Safe?
✅ **YES!** Here's why:

- **Your Google Drive only** - Stored in YOUR personal Google Drive account
- **You control access** - Only you can see your data
- **OAuth 2.0 PKCE** - Industry-standard secure authentication
- **Limited scope** - App can only access files it creates, not your other Drive files
- **No server** - Direct browser-to-Google Drive communication
- **Client-side only** - No backend server storing your credentials
- **Open source code** - You can review all the code

### What Can the App Access?
- Only files in the `GymTrackerApp` folder it creates
- Cannot see your other Google Drive files
- Cannot access your Gmail, Calendar, or other Google services
- Scope: `https://www.googleapis.com/auth/drive.file` (most restrictive)

### Client ID Security
- Client ID is public - this is normal and secure for web apps
- No client secret needed (more secure for PWAs)
- OAuth PKCE flow prevents token interception

---

## Deployment Notes

### For Production/Custom Domain
When you deploy your app to a custom domain:

1. **Update Authorized URIs** in Google Cloud Console:
   - Go to APIs & Services → Credentials
   - Edit your OAuth client ID
   - Add your production domain to:
     - Authorized JavaScript origins: `https://yourdomain.com`
     - Authorized redirect URIs: `https://yourdomain.com`
   - Click "SAVE"

2. **No code changes needed!**
   - The same Client ID works for multiple domains
   - Just add each domain to the authorized list

### Multiple Environments
You can add multiple URIs for different environments:
- Development: `http://localhost:3000`
- Staging: `https://staging.yourdomain.com`
- Production: `https://yourdomain.com`

All use the same Client ID!

---

## FAQ

**Q: Does this cost money?**
A: No! Completely free. Google Cloud and Google Drive are free for personal use.

**Q: How much storage do I get?**
A: 15GB free with every Google account. Your gym tracker data is tiny (~100KB), so you'll never run out.

**Q: Can I use multiple Google accounts?**
A: Yes, but each account stores separate data. Stick to one account for consistency.

**Q: What if I delete the GymTrackerApp folder from Google Drive?**
A: You'll lose your cloud backup, but local data remains. Just upload again to recreate the backup.

**Q: Can others access my data?**
A: No! Only you can access your Google Drive. The app only reads/writes to your account.

**Q: Do I need to publish the app?**
A: No! It works fine as a personal app in "testing" mode.

**Q: Will this work on iPhone/iPad?**
A: Yes! Works in Safari and as a PWA on iOS.

---

## Need Help?

**Resources:**
- Google Cloud Console: https://console.cloud.google.com
- Google Drive API Docs: https://developers.google.com/drive/api/guides/about-sdk
- OAuth 2.0 for Web Apps: https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow

**Common Links:**
- View your Google Drive: https://drive.google.com
- Google Cloud Console: https://console.cloud.google.com
- API Library: https://console.cloud.google.com/apis/library
- Credentials: https://console.cloud.google.com/apis/credentials

---

**Once set up, your gym tracker data syncs seamlessly across all your devices! 🎉**

**Enjoy 15GB of free cloud storage for your fitness journey! 💪**
