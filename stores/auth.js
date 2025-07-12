import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useHabitStore } from '@/stores/habits'

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const loginError = ref(null);
  const signupError = ref(null);
  const initialAuthValueReady = ref(false);

  // 監聽 Firebase Auth 狀態變化
  function setupAuthListener() {
    const { $auth } = useNuxtApp();

    if ($auth) {
      onAuthStateChanged($auth, (firebaseUser) => {
        user.value = firebaseUser || null;
        console.log("user state change:", user.value);
        initialAuthValueReady.value = true;
      });
    } else {
      console.error("Firebase Auth is not initialized");
    }
  }

  // signup
  async function signup(email, password) {
    const { $auth } = useNuxtApp();

    signupError.value = null;

    try {
      const cred = await createUserWithEmailAndPassword($auth, email, password);
      user.value = cred.user;
    } catch (error) {
      signupError.value = error.message;
    }
  }
  // logout
  async function logout() {
    const { $auth } = useNuxtApp()
      const habitStore = useHabitStore()

      await signOut($auth)
      habitStore.resetHabits()
  }

  // login
  async function login(email, password) {
    const { $auth } = useNuxtApp();

    loginError.value = null;

    try {
      const cred = await signInWithEmailAndPassword($auth, email, password);
      user.value = cred.user;
    } catch (error) {
      loginError.value = error.message;
    }
  }

  return {
    user,
    loginError,
    signupError,
    initialAuthValueReady,
    setupAuthListener,
    signup,
    logout,
    login,
  };
});
