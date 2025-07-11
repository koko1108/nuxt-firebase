<template>
  <div>
    <ClientOnly>
      <ul class="space-y-4">
        <li
          class="bg-white px-3 py-2 rounded-sm"
          v-for="habit in habits"
          :key="habit.id"
        >
          <div class="flex items-center justify-between mb-4">
            <p class="text-teal-500 font-bold">
              <span
                :class="{ 'line-through': habit.completions.includes(today) }"
              >
                {{ habit.name }}
              </span>
            </p>
            <button class="text-gray-800" @click="deleteHabit(habit.id)">
              Delete
            </button>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              class="mr-2 accent-teal-500"
              @change="toggleCompletion(habit)"
              :checked="habit.completions.includes(today)"
            />
            <p class="text-sm text-gray-500">I did this today.</p>
          </div>

          <p class="text-sm text-gray-500 mt-2">
            Current Streak: {{ habit.streak }} days.
          </p>
        </li>
      </ul>
      <template #fallback>
        <div class="text-center text-gray-500 py-8">
          載入中...
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { useHabitStore } from "~/stores/habits";
import { format } from "date-fns";

// props
const props = defineProps({
  habits: Array,
});

const today = format(new Date(), "yyyy-MM-dd");

const habitStore = useHabitStore();
const deleteHabit = async (id) => {
  await habitStore.deleteHabit(id);
};

const toggleCompletion = async (habit) => {
  await habitStore.toggleCompletion(habit);
};
</script>
