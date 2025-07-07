# Absent-Minded

一款輕量、直觀的 Next.js 筆記協作應用，結合多元登入方式與視覺化圖形流程。

---

## 產品功能與特色

- **Email Magic Link**：無密碼電子郵件登入  
- **OAuth 登入**：支援 Google、Apple、Microsoft  
- **Passkey (WebAuthn)**：一鍵無密碼登入體驗  
- **企業 SSO**：單一登入 (SSO) 流程整合  
- **MVVM 架構**：Model-View-ViewModel 分離，提升維護與測試效率  
- **流程圖編輯**：  
  - **React Flow**：互動式流程圖元件庫  
  - **Dagre 演算法**：自動佈局節點，使圖形自動排列  
  - 支援節點拖放、連線與動態更新  

---

## 系統技術與架構

- **前端**  
  - Next.js 15 (App Router) + React + TypeScript  
  - **MVVM 模式**：使用 ViewModel 層管理 UI 狀態與邏輯  
  - **React Flow**：流程圖互動元件  
  - **Dagre Algorithm**：有向圖自動佈局演算法  
  - Tailwind CSS  

- **後端 / BaaS**  
  - Supabase Authentication (Magic Link, OAuth, WebAuthn/Passkey)  
  - Supabase Database (PostgreSQL)  
  - Supabase Storage  

- **整合與部署**  
  - 環境變數管理：`.env.local`（NEXT_PUBLIC\_… 前綴）  
  - 部署平台：Vercel / Netlify（或任何支援 Next.js 的平台）  