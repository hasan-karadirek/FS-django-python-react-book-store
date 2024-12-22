export const getLocalStorage = (key: string): string | null => {
    if (typeof window === "undefined") {
      return null; 
    }
    return localStorage.getItem(key);
  };
  
  export const removeLocalStorage = (key: string): null => {
    if (typeof window === "undefined") {
      return null; 
    }
    localStorage.removeItem(key);
    return null
  };
  export const setLocalStorage = (key: string, value: string): null => {
    if (typeof window === "undefined") {
        return null; 
      }
    localStorage.setItem(key, value);
    return null
  };
  export const clearLocalStorage = (): null => {
    if (typeof window === "undefined") {
        return null; 
      }
    localStorage.clear();
    return null
  };