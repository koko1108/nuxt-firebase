<template>
  <ClientOnly>
    <slot v-if="!authStore.user && authStore.initialAuthValueReady"></slot>
  </ClientOnly>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>
