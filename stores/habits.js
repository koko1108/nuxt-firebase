import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { format, differenceInDays } from "date-fns";

export const useHabitStore = defineStore("habitStore", () => {
  // State (使用 ref)
  const habits = ref([]);

  // Getters (使用 computed)
  const habitsCount = computed(() => habits.value.length);
  const completedHabitsToday = computed(() => {
    const today = new Date().toDateString();
    return habits.value.filter((habit) =>
      habit.completions.some(
        (completion) => new Date(completion).toDateString() === today
      )
    );
  });

  // Actions (普通函數)
  // fetching all habits
  async function fetchHabits() {
    const { $db, $auth } = useNuxtApp();

    try {
      const habitsQuery = query(
        collection($db, "habits"),
        where("userId", "==", $auth.currentUser.uid)
      );

      const snapshot = await getDocs(habitsQuery);
      habits.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching habits:", error);
      // 可以選擇拋出錯誤或設置預設值
      habits.value = [];
    }
  }

  // adding new habits
  async function addHabit(name) {
    const { $db, $auth } = useNuxtApp();

    const habit = {
      name,
      completions: [],
      streak: 0,
      userId: $auth.currentUser.uid, // 確保習慣與當前用戶相關聯
    };

    try {
      // add habit in firebase
      const docRef = await addDoc(collection($db, "habits"), habit);

      // add habit to pinia store
      habits.value.push({ id: docRef.id, ...habit });
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  }

  // updating habits
  async function updateHabit(habitId, updatedData) {
    const { $db } = useNuxtApp();

    try {
      // update in firebase
      const habitRef = doc($db, "habits", habitId);
      await updateDoc(habitRef, updatedData);

      // update in pinia store
      const index = habits.value.findIndex((habit) => habit.id === habitId);
      if (index !== -1) {
        habits.value[index] = { ...habits.value[index], ...updatedData };
      }
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  }

  // deleting habits
  async function deleteHabit(habitId) {
    const { $db } = useNuxtApp();

    try {
      // delete from firebase
      await deleteDoc(doc($db, "habits", habitId));

      // remove from pinia store
      habits.value = habits.value.filter((habit) => habit.id !== habitId);
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  }

  // completing a daily habit
  async function toggleCompletion(habit) {
    const today = format(new Date(), "yyyy-MM-dd");

    try {
      if (habit.completions.includes(today)) {
        habit.completions = habit.completions.filter((date) => date !== today);
      } else {
        habit.completions.push(today);
      }

      habit.streak = this.calculateStreak(habit.completions);

      updateHabit(habit.id, {
        completions: habit.completions,
        streak: habit.streak,
      });
    } catch (error) {
      console.error("Error completing habit:", error);
    }
  }

  // calculate habit streak
  function calculateStreak(completions) {
    if (!completions || completions.length === 0) return 0;

    const sortedDates = completions.sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    let currentDate = new Date();
    const today = new Date();

    for (const date of sortedDates) {
      const diff = differenceInDays(today, new Date(date));

      if (diff > 1) {
        break;
      }

      streak += 1;
      currentDate = new Date(date);
    }

    return streak;
  }

  function resetHabits() {
    habits.value = [];
  }

  // 返回需要暴露的內容
  return {
    // state
    habits,

    // getters
    habitsCount,
    completedHabitsToday,

    // actions
    fetchHabits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    calculateStreak,
    resetHabits,
  };
});
