<template>
  <nav class="bg-white shadow-md">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <!-- Mobile menu button -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            type="button"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            @click="toggleMobileMenu"
            aria-controls="mobile-menu"
            :aria-expanded="isMobileMenuOpen"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <!-- Hamburger icon -->
            <svg
              :class="{ hidden: isMobileMenuOpen, block: !isMobileMenuOpen }"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <!-- Close icon -->
            <svg
              :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Logo and desktop navigation -->
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <NuxtLink to="/">
              <h1 class="text-teal-600 text-2xl font-bold">好習慣</h1>
            </NuxtLink>
          </div>

          <!-- Desktop navigation -->
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <NuxtLink
                v-for="item in menu"
                :key="item.text"
                :to="item.to"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-teal-600 transition-colors"
                active-class="bg-teal-100 text-teal-600"
              >
                {{ item.text }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right side buttons -->
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="flex items-center space-x-2">
            <a
              class="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
              href="#"
            >
              Login
            </a>
            <a
              class="hidden sm:block rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-teal-600 transition hover:bg-gray-200"
              href="#"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
      class="sm:hidden"
      id="mobile-menu"
    >
      <div class="space-y-1 px-2 pb-3 pt-2">
        <NuxtLink
          v-for="item in menu"
          :key="item.text"
          :to="item.to"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-teal-600 transition-colors"
          active-class="bg-teal-100 text-teal-600"
          @click="closeMobileMenu"
        >
          {{ item.text }}
        </NuxtLink>

        <!-- Mobile auth buttons -->
        <div class="mt-4 space-y-2">
          <a
            class="block w-full rounded-md bg-teal-600 px-3 py-2 text-center text-base font-medium text-white hover:bg-teal-700"
            href="#"
          >
            Login
          </a>
          <a
            class="block w-full rounded-md bg-gray-100 px-3 py-2 text-center text-base font-medium text-teal-600 hover:bg-gray-200"
            href="#"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
// 選單項目
const menu = [
  {
    text: "Home",
    to: "/",
  },
  {
    text: "About",
    to: "/about",
  },
  {
    text: "Reflections",
    to: "/reflections",
  },
  {
    text: "Contact",
    to: "/contact",
  },
];

// 移動端選單狀態
const isMobileMenuOpen = ref(false);

// 切換移動端選單
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// 關閉移動端選單
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  isMobileMenuOpen.value = false;
});
</script>

<style scoped></style>
