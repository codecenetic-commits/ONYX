import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtPbbsZZ8JRn0IHIL8cOkGCpcV2bExrnQ",
  authDomain: "oynx-402a0.firebaseapp.com",
  projectId: "oynx-402a0",
  storageBucket: "oynx-402a0.firebasestorage.app",
  messagingSenderId: "59477990350",
  appId: "1:59477990350:web:d145c530c50c6aab3fa99f",
  measurementId: "G-0X7G0RSMHB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics (only on client-side)
export const initializeAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
};

export default app;
