import {LOCAL_STORAGE_KEYS} from '../../interfaces';

export class LocalStorage {
    public static set(key: LOCAL_STORAGE_KEYS, value: unknown): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('LOCAL STORAGE ERROR', error);
        }
    }

    public static get<T>(key: LOCAL_STORAGE_KEYS): T | null {
        try {
            const value = localStorage.getItem(key);

            if (value) {
                return JSON.parse(value);
            } else {
                return null;
            }
        } catch (error) {
            console.error('LOCAL STORAGE ERROR', error);
            return null;
        }
    }

    public static remove(key: LOCAL_STORAGE_KEYS) {
        localStorage.removeItem(key);
    }
}
