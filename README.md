# 🎯 Nuxt Firebase 習慣追蹤器

一個使用 Nuxt 3 和 Firebase 構建的現代化習慣追蹤應用，幫助用戶建立和維持良好的日常習慣。

## ✨ 特色功能

- 📝 **添加習慣** - 輕鬆創建新的習慣目標
- ✅ **完成追蹤** - 記錄每日習慣完成情況
- 🔥 **連續天數計算** - 自動統計習慣連續執行天數
- 📊 **進度可視化** - 直觀顯示習慣執行狀況
- ☁️ **雲端同步** - 使用 Firebase Firestore 實現數據同步
- 📱 **響應式設計** - 支持手機、平板和桌面設備

## 🛠️ 技術棧

- **前端框架**: [Nuxt 3](https://nuxt.com/) - Vue.js 全棧框架
- **資料庫**: [Firebase Firestore](https://firebase.google.com/docs/firestore) - NoSQL 雲端資料庫
- **狀態管理**: [Pinia](https://pinia.vuejs.org/) - Vue 狀態管理庫
- **樣式框架**: [Tailwind CSS](https://tailwindcss.com/) - 實用優先的 CSS 框架
- **圖標**: [Nuxt Icon](https://nuxt.com/modules/icon) - 圖標庫

## 📋 先決條件

- Node.js 18+ 
- npm / pnpm / yarn / bun
- Firebase 專案 (需要 Firestore 啟用)

## 🚀 快速開始

### 1. 克隆專案

```bash
git clone <your-repo-url>
cd nuxt-firebase
```

### 2. 安裝依賴

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 3. Firebase 設定

1. 在 [Firebase Console](https://console.firebase.google.com/) 創建新專案
2. 啟用 Firestore 資料庫
3. 在專案設定中獲取 Web 應用配置
4. 在 `.env` 檔案中填入你的 Firebase 配置:

```env
NUXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NUXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NUXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. 啟動開發伺服器

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

應用將在 `http://localhost:3000` 運行。

## 📁 專案結構

```
nuxt-firebase/
├── assets/                 # 靜態資源
│   └── css/
│       └── tailwind.css    # Tailwind CSS 配置
├── components/             # Vue 組件
│   ├── AppHeader.vue       # 應用標題組件
│   ├── HabitForm.vue       # 習慣添加表單
│   └── HabitList.vue       # 習慣列表顯示
├── layouts/                # 布局模板
│   └── default.vue         # 預設布局
├── pages/                  # 頁面路由
│   └── index.vue           # 首頁
├── plugins/                # 插件
│   └── firebase.client.js  # Firebase 客戶端配置
├── stores/                 # Pinia 狀態管理
│   └── habits.js           # 習慣資料狀態
├── .env                    # 環境變數 (不提交到 Git)
├── nuxt.config.ts          # Nuxt 配置
└── package.json            # 專案依賴
```

## 🎨 主要組件說明

### HabitForm.vue
負責新增習慣的表單組件，包含輸入驗證和提交邏輯。

### HabitList.vue  
顯示所有習慣的列表組件，提供完成、編輯、刪除功能。

### habits.js (Store)
使用 Pinia 管理習慣資料狀態，包含：
- 獲取習慣列表
- 新增習慣
- 更新習慣
- 刪除習慣  
- 標記習慣完成
- 計算連續天數

## 📚 相關資源

- [Nuxt 3 文檔](https://nuxt.com/docs)
- [Firebase 文檔](https://firebase.google.com/docs)
- [Pinia 文檔](https://pinia.vuejs.org/)
- [Tailwind CSS 文檔](https://tailwindcss.com/docs)
