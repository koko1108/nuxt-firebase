import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  user = ref(null);
  loginError = ref(null);
  signupError = ref(null);

  function setupAuthListener() {
    const { $auth } = useNuxtApp();

    if ($auth) {
      onAuthStateChanged($auth, (user) => {
        user.value = user || null;
        console.log("user state change:", user.value);
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
    const { $auth } = useNuxtApp();

    await signOut($auth);
    user.value = null;
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

    setupAuthListener,
    signup,
    logout,
    login,
  };
});
