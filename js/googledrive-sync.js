// Google Drive Sync Module using Google Drive API v3

const GoogleDriveSync = {
    // Configuration
    CLIENT_ID: '181401543852-0alv6dsg5ie3pke4d99g9ec8b2skgnrc.apps.googleusercontent.com',
    CLIENT_SECRET: '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', // Get this from Google Cloud Console - same page as Client ID
    REDIRECT_URI: window.location.origin + window.location.pathname.replace(/\/$/, ''), // Remove trailing slash
    SCOPES: ['https://www.googleapis.com/auth/drive.file'], // Only access files created by this app
    AUTH_ENDPOINT: 'https://accounts.google.com/o/oauth2/v2/auth',
    TOKEN_ENDPOINT: 'https://oauth2.googleapis.com/token',
    DRIVE_API: 'https://www.googleapis.com/drive/v3',
    FILE_NAME: 'gym-tracker-data.json',
    FOLDER_NAME: 'GymTrackerApp',

    // Storage keys
    KEYS: {
        ACCESS_TOKEN: 'gdrive_access_token',
        REFRESH_TOKEN: 'gdrive_refresh_token',
        TOKEN_EXPIRY: 'gdrive_token_expiry',
        LAST_SYNC: 'gdrive_last_sync',
        SYNC_ENABLED: 'gdrive_sync_enabled',
        FILE_ID: 'gdrive_file_id',
        FOLDER_ID: 'gdrive_folder_id'
    },

    // Check if Google Drive is configured
    isConfigured() {
        return this.CLIENT_ID !== 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com' &&
               this.CLIENT_ID.includes('.apps.googleusercontent.com');
    },

    // Check if user is connected
    isConnected() {
        const token = localStorage.getItem(this.KEYS.ACCESS_TOKEN);
        const expiry = localStorage.getItem(this.KEYS.TOKEN_EXPIRY);
        const refreshToken = localStorage.getItem(this.KEYS.REFRESH_TOKEN);

        // Connected if we have a valid access token OR a refresh token we can use
        return (token && expiry && new Date(expiry) > new Date()) || !!refreshToken;
    },

    // Check if sync is enabled
    isSyncEnabled() {
        return localStorage.getItem(this.KEYS.SYNC_ENABLED) === 'true';
    },

    // Enable/disable sync
    setSyncEnabled(enabled) {
        localStorage.setItem(this.KEYS.SYNC_ENABLED, enabled.toString());
    },

    // Generate PKCE code verifier and challenge
    async generatePKCE() {
        const verifier = this.generateRandomString(128);
        const challenge = await this.sha256(verifier);
        const challengeBase64 = this.base64URLEncode(challenge);

        // Use localStorage instead of sessionStorage to persist across browser sessions
        localStorage.setItem('pkce_verifier', verifier);
        return challengeBase64;
    },

    generateRandomString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
        let result = '';
        const randomValues = new Uint8Array(length);
        crypto.getRandomValues(randomValues);
        for (let i = 0; i < length; i++) {
            result += chars[randomValues[i] % chars.length];
        }
        return result;
    },

    async sha256(plain) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return await crypto.subtle.digest('SHA-256', data);
    },

    base64URLEncode(buffer) {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    },

    // Initiate OAuth login
    async connect() {
        if (!this.isConfigured()) {
            throw new Error('Google Drive is not configured. Please set up your Google Cloud Client ID.');
        }

        try {
            const codeChallenge = await this.generatePKCE();
            const state = this.generateRandomString(32);
            // Use localStorage instead of sessionStorage to persist across browser sessions
            localStorage.setItem('oauth_state', state);

            const params = new URLSearchParams({
                client_id: this.CLIENT_ID,
                response_type: 'code',
                redirect_uri: this.REDIRECT_URI,
                scope: this.SCOPES.join(' '),
                state: state,
                code_challenge: codeChallenge,
                code_challenge_method: 'S256',
                access_type: 'offline',
                prompt: 'consent'
            });

            window.location.href = `${this.AUTH_ENDPOINT}?${params.toString()}`;
        } catch (error) {
            console.error('Error initiating Google Drive connection:', error);
            throw error;
        }
    },

    // Handle OAuth callback
    async handleCallback() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');
        const error = params.get('error');

        if (error) {
            console.error('OAuth error:', error);
            return { success: false, error: params.get('error_description') || error };
        }

        if (!code || !state) {
            return { success: false, error: 'No authorization code received' };
        }

        const savedState = localStorage.getItem('oauth_state');
        if (state !== savedState) {
            return { success: false, error: 'Invalid state parameter' };
        }

        const verifier = localStorage.getItem('pkce_verifier');
        if (!verifier) {
            return { success: false, error: 'PKCE verifier not found' };
        }

        try {
            const tokenData = await this.exchangeCodeForToken(code, verifier);
            this.saveTokens(tokenData);

            // Clean up localStorage after successful auth
            localStorage.removeItem('oauth_state');
            localStorage.removeItem('pkce_verifier');

            // Remove query parameters from URL
            window.history.replaceState({}, document.title, window.location.pathname);

            return { success: true };
        } catch (error) {
            console.error('Error exchanging code for token:', error);
            return { success: false, error: error.message };
        }
    },

    // Exchange authorization code for access token
    async exchangeCodeForToken(code, verifier) {
        const params = new URLSearchParams({
            client_id: this.CLIENT_ID,
            client_secret: this.CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.REDIRECT_URI,
            code_verifier: verifier
        });

        const response = await fetch(this.TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error_description || 'Failed to get access token');
        }

        return await response.json();
    },

    // Refresh access token
    async refreshAccessToken() {
        const refreshToken = localStorage.getItem(this.KEYS.REFRESH_TOKEN);
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const params = new URLSearchParams({
            client_id: this.CLIENT_ID,
            client_secret: this.CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        });

        const response = await fetch(this.TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const tokenData = await response.json();
        this.saveTokens(tokenData);
        return tokenData.access_token;
    },

    // Save tokens to local storage
    saveTokens(tokenData) {
        const expiryTime = new Date();
        expiryTime.setSeconds(expiryTime.getSeconds() + tokenData.expires_in);

        localStorage.setItem(this.KEYS.ACCESS_TOKEN, tokenData.access_token);
        localStorage.setItem(this.KEYS.TOKEN_EXPIRY, expiryTime.toISOString());

        if (tokenData.refresh_token) {
            localStorage.setItem(this.KEYS.REFRESH_TOKEN, tokenData.refresh_token);
        }
    },

    // Get valid access token
    async getAccessToken() {
        if (!this.isConnected()) {
            const refreshToken = localStorage.getItem(this.KEYS.REFRESH_TOKEN);
            if (refreshToken) {
                return await this.refreshAccessToken();
            }
            throw new Error('Not connected to Google Drive');
        }
        return localStorage.getItem(this.KEYS.ACCESS_TOKEN);
    },

    // Disconnect from Google Drive
    disconnect() {
        localStorage.removeItem(this.KEYS.ACCESS_TOKEN);
        localStorage.removeItem(this.KEYS.REFRESH_TOKEN);
        localStorage.removeItem(this.KEYS.TOKEN_EXPIRY);
        localStorage.removeItem(this.KEYS.LAST_SYNC);
        localStorage.removeItem(this.KEYS.FILE_ID);
        localStorage.removeItem(this.KEYS.FOLDER_ID);
        this.setSyncEnabled(false);
    },

    // Find or create folder
    async ensureFolderExists(token) {
        let folderId = localStorage.getItem(this.KEYS.FOLDER_ID);

        // Check if folder exists
        if (folderId) {
            try {
                const response = await fetch(`${this.DRIVE_API}/files/${folderId}?fields=id,name`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    return folderId;
                }
            } catch (error) {
                console.log('Folder not found, creating new one');
            }
        }

        // Search for folder
        const searchUrl = `${this.DRIVE_API}/files?q=name='${this.FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false&fields=files(id,name)`;
        const searchResponse = await fetch(searchUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (searchResponse.ok) {
            const searchData = await searchResponse.json();
            if (searchData.files && searchData.files.length > 0) {
                folderId = searchData.files[0].id;
                localStorage.setItem(this.KEYS.FOLDER_ID, folderId);
                return folderId;
            }
        }

        // Create folder
        const createResponse = await fetch(`${this.DRIVE_API}/files`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.FOLDER_NAME,
                mimeType: 'application/vnd.google-apps.folder'
            })
        });

        if (!createResponse.ok) {
            throw new Error('Failed to create folder');
        }

        const folderData = await createResponse.json();
        folderId = folderData.id;
        localStorage.setItem(this.KEYS.FOLDER_ID, folderId);
        return folderId;
    },

    // Find file in folder
    async findFile(token, folderId) {
        let fileId = localStorage.getItem(this.KEYS.FILE_ID);

        // Check if file exists
        if (fileId) {
            try {
                const response = await fetch(`${this.DRIVE_API}/files/${fileId}?fields=id,name`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    return fileId;
                }
            } catch (error) {
                console.log('File not found in cache');
            }
        }

        // Search for file in folder
        const searchUrl = `${this.DRIVE_API}/files?q=name='${this.FILE_NAME}' and '${folderId}' in parents and trashed=false&fields=files(id,name)`;
        const response = await fetch(searchUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        if (data.files && data.files.length > 0) {
            fileId = data.files[0].id;
            localStorage.setItem(this.KEYS.FILE_ID, fileId);
            return fileId;
        }

        return null;
    },

    // Upload data to Google Drive
    async uploadData() {
        try {
            const token = await this.getAccessToken();

            // Prepare data
            const data = {
                version: '1.0',
                syncDate: new Date().toISOString(),
                workouts: Storage.getAllWorkouts(),
                routines: Storage.getAllRoutines(),
                currentWorkout: Storage.getCurrentWorkout(),
                foodDiary: Storage.getAllFoodDays(),
                foodRoutines: Storage.getAllFoodRoutines(),
                progressPhotos: Storage.getAllProgressPhotos(),
                dailyMetrics: Storage.getAllDailyMetrics(),
                startDate: Storage.getStartDate()
            };

            const jsonString = JSON.stringify(data, null, 2);

            // Ensure folder exists
            const folderId = await this.ensureFolderExists(token);

            // Check if file exists
            const fileId = await this.findFile(token, folderId);

            let response;
            if (fileId) {
                // Update existing file
                response = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: jsonString
                });
            } else {
                // Create new file
                const metadata = {
                    name: this.FILE_NAME,
                    parents: [folderId],
                    mimeType: 'application/json'
                };

                const form = new FormData();
                form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
                form.append('file', new Blob([jsonString], { type: 'application/json' }));

                response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: form
                });

                if (response.ok) {
                    const newFile = await response.json();
                    localStorage.setItem(this.KEYS.FILE_ID, newFile.id);
                }
            }

            if (!response.ok) {
                throw new Error('Failed to upload data to Google Drive');
            }

            localStorage.setItem(this.KEYS.LAST_SYNC, new Date().toISOString());
            return { success: true, message: 'Data synced to Google Drive successfully' };
        } catch (error) {
            console.error('Error uploading to Google Drive:', error);
            throw error;
        }
    },

    // Download data from Google Drive
    async downloadData() {
        try {
            const token = await this.getAccessToken();

            // Ensure folder exists
            const folderId = await this.ensureFolderExists(token);

            // Find file
            const fileId = await this.findFile(token, folderId);

            if (!fileId) {
                return { success: false, error: 'No backup found on Google Drive' };
            }

            // Download file
            const response = await fetch(`${this.DRIVE_API}/files/${fileId}?alt=media`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to download data from Google Drive');
            }

            const data = await response.json();

            // Validate data structure
            if (!data.version || !data.syncDate) {
                throw new Error('Invalid backup file format');
            }

            return { success: true, data: data };
        } catch (error) {
            console.error('Error downloading from Google Drive:', error);
            throw error;
        }
    },

    // Get last sync time
    getLastSyncTime() {
        const lastSync = localStorage.getItem(this.KEYS.LAST_SYNC);
        if (!lastSync) return null;
        return new Date(lastSync);
    },

    // Format sync time for display
    getLastSyncTimeFormatted() {
        const lastSync = this.getLastSyncTime();
        if (!lastSync) return 'Never';

        const now = new Date();
        const diffMs = now - lastSync;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    },

    // Auto-sync if enabled
    async autoSync() {
        if (!this.isSyncEnabled() || !this.isConnected()) {
            return;
        }

        try {
            await this.uploadData();
            console.log('Auto-sync completed');
        } catch (error) {
            console.error('Auto-sync failed:', error);
        }
    }
};
