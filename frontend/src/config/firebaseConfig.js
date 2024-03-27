import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2Iime4MX7SxSQg78WZSYQudG3rNC3WgQ",
  authDomain: "epistemeblog-3a2f3.firebaseapp.com",
  projectId: "epistemeblog-3a2f3",
  storageBucket: "epistemeblog-3a2f3.appspot.com",
  messagingSenderId: "235229977067",
  appId: "1:235229977067:web:136dfb642f6a5a1593e1ae",
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
