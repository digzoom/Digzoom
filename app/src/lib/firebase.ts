// Safe Firebase mock for static deployment
export const auth = {} as any;
export const googleProvider = {} as any;

export const signInWithGoogle = async () => {
  console.warn('Firebase not available in static mode');
};

export const logout = async () => {};

export const onAuthStateChanged = (_auth: any, callback: (user: any) => void) => {
  // Defer to next tick to mimic async Firebase behavior
  setTimeout(() => callback(null), 0);
  return () => {};
};

export type User = any;
