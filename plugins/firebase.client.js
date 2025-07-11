// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
    measurementId: config.public.firebaseMeasurementId,
  };

  // 初始化 Firebase 應用
  const app = initializeApp(firebaseConfig);
  // 初始化 Google Analytics（用於數據分析）
  const analytics = getAnalytics(app);
  // 初始化 Firestore 資料庫（NoSQL 文件資料庫）
  const db = getFirestore(app);
  const auth = getAuth(app);

  return {
    provide: {
      firebaseApp: app,
      db,
      auth
    },
  };
});

// 在組件中
// const { $db } = useNuxtApp()
// 現在可以使用 $db 進行資料庫操作
