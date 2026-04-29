// IndexedDB-based photo storage — no 5MB localStorage limit
const PhotoStorage = {
    DB_NAME: 'gym_tracker_photo_db',
    DB_VERSION: 1,
    STORE_NAME: 'photos',
    _db: null,

    async openDB() {
        if (this._db) return this._db;
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                    const store = db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
                    store.createIndex('date', 'date', { unique: false });
                }
            };
            req.onsuccess = (e) => { this._db = e.target.result; resolve(this._db); };
            req.onerror = () => reject(req.error);
        });
    },

    async getAllPhotos() {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const req = db.transaction(this.STORE_NAME, 'readonly')
                         .objectStore(this.STORE_NAME).getAll();
            req.onsuccess = () => resolve(req.result || []);
            req.onerror = () => reject(req.error);
        });
    },

    async addPhoto(photoData) {
        const db = await this.openDB();
        const newPhoto = {
            id: Date.now() + Math.random(),
            date: new Date().toISOString(),
            image: photoData.image,
            label: photoData.label || null,
            weight: photoData.weight || null,
            notes: photoData.notes || '',
            measurements: photoData.measurements || {}
        };
        return new Promise((resolve, reject) => {
            const req = db.transaction(this.STORE_NAME, 'readwrite')
                         .objectStore(this.STORE_NAME).add(newPhoto);
            req.onsuccess = () => resolve(newPhoto);
            req.onerror = () => reject(req.error);
        });
    },

    async getPhoto(id) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const req = db.transaction(this.STORE_NAME, 'readonly')
                         .objectStore(this.STORE_NAME).get(id);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => reject(req.error);
        });
    },

    async deletePhoto(id) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const req = db.transaction(this.STORE_NAME, 'readwrite')
                         .objectStore(this.STORE_NAME).delete(id);
            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
        });
    },

    async updatePhoto(id, updates) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const store = db.transaction(this.STORE_NAME, 'readwrite').objectStore(this.STORE_NAME);
            const getReq = store.get(id);
            getReq.onsuccess = () => {
                if (!getReq.result) { resolve(false); return; }
                const putReq = store.put({ ...getReq.result, ...updates });
                putReq.onsuccess = () => resolve(true);
                putReq.onerror = () => reject(putReq.error);
            };
            getReq.onerror = () => reject(getReq.error);
        });
    },

    async clearAll() {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const req = db.transaction(this.STORE_NAME, 'readwrite')
                         .objectStore(this.STORE_NAME).clear();
            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
        });
    },

    // Migrate any photos stuck in localStorage → IndexedDB, then remove from localStorage
    async migrateFromLocalStorage() {
        const lsKey = 'gym_tracker_progress_photos';
        const raw = localStorage.getItem(lsKey);
        if (!raw) return 0;
        try {
            const photos = JSON.parse(raw);
            if (!photos || photos.length === 0) { localStorage.removeItem(lsKey); return 0; }
            const db = await this.openDB();
            const existing = await this.getAllPhotos();
            const existingIds = new Set(existing.map(p => p.id));
            let migrated = 0;
            for (const photo of photos) {
                if (!existingIds.has(photo.id)) {
                    await new Promise((res, rej) => {
                        const req = db.transaction(this.STORE_NAME, 'readwrite')
                                     .objectStore(this.STORE_NAME).put(photo);
                        req.onsuccess = () => { migrated++; res(); };
                        req.onerror = () => rej(req.error);
                    });
                }
            }
            localStorage.removeItem(lsKey);
            return migrated;
        } catch (e) {
            console.error('Photo migration error:', e);
            return 0;
        }
    }
};
