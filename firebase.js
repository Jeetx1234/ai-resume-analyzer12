// firebase.js (Browser Compatible)
const firebaseConfig = {
  apiKey: "AIzaSyCRXLLdcucku46SUMcCZgqLKaOMeu27cnQ",
  authDomain: "ai-resume-analzer.firebaseapp.com",
  projectId: "ai-resume-analzer",
  storageBucket: "ai-resume-analzer.appspot.com",
  messagingSenderId: "615186361534",
  appId: "1:615186361534:web:e5ec53cd885b4299e642ef"
};

(async () => {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js");
  const { getStorage } = await import("https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js");
  const { getFirestore } = await import("https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js");

  const app = initializeApp(firebaseConfig);
  window.storage = getStorage(app);
  window.db = getFirestore(app);
  console.log("✅ Firebase initialized successfully");
})();

