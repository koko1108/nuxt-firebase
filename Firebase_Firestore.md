# Firebase Firestore 教學（Nuxt 專案實例）

## 什麼是 Firestore？

Firestore 是 Google Firebase 提供的雲端 NoSQL 文件型資料庫，適合儲存結構化資料、即時同步、跨平台存取。它支援自動擴展、即時監聽、複雜查詢與安全規則。

---

## Firestore 基本結構

- **Collection（集合）**：類似資料表，儲存多個文件
- **Document（文件）**：類似資料表中的一筆資料，JSON 格式
- **Field（欄位）**：文件中的屬性

範例結構：
```
habits (Collection)
  ├── habitId1 (Document)
  │     ├── name: "運動"
  │     ├── completions: ["2025-07-10", "2025-07-11"]
  │     └── streak: 2
  ├── habitId2 (Document)
  │     └── ...
```

---

## Firestore 常用操作

### 1. 新增文件
```js
import { addDoc, collection } from 'firebase/firestore'
const { $db } = useNuxtApp()
const habit = { name: '閱讀', completions: [], streak: 0 }
const docRef = await addDoc(collection($db, 'habits'), habit)
```

### 2. 取得所有文件
```js
import { getDocs, collection } from 'firebase/firestore'
const { $db } = useNuxtApp()
const snapshot = await getDocs(collection($db, 'habits'))
const habits = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
```

### 3. 更新文件
```js
import { updateDoc, doc } from 'firebase/firestore'
const { $db } = useNuxtApp()
await updateDoc(doc($db, 'habits', habitId), { streak: 5 })
```

### 4. 刪除文件
```js
import { deleteDoc, doc } from 'firebase/firestore'
const { $db } = useNuxtApp()
await deleteDoc(doc($db, 'habits', habitId))
```

---

## Nuxt 專案中的 Firestore 實作

在 `plugins/firebase.client.js` 中初始化 Firestore：
```js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
export default defineNuxtPlugin(() => {
  // ...firebaseConfig 省略
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  return { provide: { db } }
})
```

在 Pinia Store (`stores/habits.js`) 中操作 Firestore：
```js
// 取得所有習慣
async function fetchHabits() {
  const { $db } = useNuxtApp()
  const snapshot = await getDocs(collection($db, 'habits'))
  habits.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// 新增習慣
async function addHabit(name) {
  const { $db } = useNuxtApp()
  const habit = { name, completions: [], streak: 0 }
  const docRef = await addDoc(collection($db, 'habits'), habit)
  habits.value.push({ id: docRef.id, ...habit })
}
```

---

## Firestore 安全規則

請務必在 Firebase Console 設定安全規則，避免資料被未授權存取。

範例（只允許登入用戶讀寫自己的資料）：
```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /habits/{habitId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 開發注意事項

- **資料結構設計**：盡量扁平化，避免巢狀過深
- **即時監聽**：可用 `onSnapshot` 實現資料即時更新
- **查詢優化**：善用索引與條件查詢
- **安全性**：API Key 雖可公開，但安全規則必須嚴格
- **配額限制**：注意免費方案的讀寫次數

---

## 進階資源
- [官方 Firestore 教學](https://firebase.google.com/docs/firestore)
- [Nuxt 3 官方文件](https://nuxt.com/docs)
- [Pinia 狀態管理](https://pinia.vuejs.org/)

---

如有疑問，歡迎查閱官方文件或提出 Issue！
