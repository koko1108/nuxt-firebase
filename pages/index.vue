<template>
  <div class="mx-auto max-w-2xl px-2 sm:px-6 lg:px-8 lg:pt-12">
    <HabitForm />
    <HabitList :habits="habitStore.habits" />
  </div>
</template>

<script setup>
import { useHabitStore } from "~/stores/habits";

const habitStore = useHabitStore();
await habitStore.fetchHabits();
</script>

<style scoped>
body {
  background: #f1f1f1;
}
</style>
