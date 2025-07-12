import { useAuthStore } from '@/stores/auth'

const PROTECTED_ROUTES = ['/']
const GUEST_ONLY_ROUTES = ['/login', '/signup']

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  const router = useRouter()

  // 設置身份驗證監聽器
  authStore.setupAuthListener()

  // 根據當前路由和用戶狀態重定向用戶
  const redirectUser = () => {
    const { path } = router.currentRoute.value

    // 如果用戶已經登錄，並且訪問的是僅限訪客的路由，則重定向到首頁
    if (authStore.user) {
      if (GUEST_ONLY_ROUTES.includes(path)) {
        router.push('/')
      }
    }

    // 如果用戶未登錄，並且訪問的是受保護的路由，則重定向到登錄頁面
    if (!authStore.user) {
      if (PROTECTED_ROUTES.includes(path)) {
        router.push('/login')
      }
    }
  }

  // 監聽路由變化以重定向用戶
  watch(() => authStore.user, () => redirectUser())

})