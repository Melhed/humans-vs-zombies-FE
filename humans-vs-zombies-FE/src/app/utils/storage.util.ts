export class StorageUtil{
    public static storageSave<T>(key: string, value: T): void {
        console.log("Saving user");
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    public static storageRead<T>(key: string): T | undefined {
        const storedValue = sessionStorage.getItem(key);
        try {
            console.log("Trying to read user");
            if(storedValue) {
                console.log("User read");
                return JSON.parse(storedValue) as T;
            }
            return undefined;
        } catch (error) {
            console.log("Unable to read user");
            sessionStorage.removeItem(key);
            return undefined;
        }
    }
}