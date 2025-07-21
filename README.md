# Intern Logbook

📘 インターン生向けの学び・気づきを記録できるシンプルなログブックアプリです。  
Markdown対応・タグ分類・検索・CSVエクスポートなどに対応しています。

---

## 🚀 特長

- Markdown記法でリッチに記録可能
- タグによる分類・絞り込み
- キーワード検索機能
- ローカルストレージ保存（バックエンド不要）
- CSVエクスポート対応
- 印刷用最適化スタイル

---

## 🔧 セットアップ方法

```bash
git clone https://github.com/yourname/intern-logbook.git
cd intern-logbook
npm install
npm run dev

📁 ディレクトリ構成
app/
  ├── page.tsx         // トップページ（一覧・検索・絞り込み）
  ├── new/page.tsx     // 新規作成ページ
  ├── edit/[id]/page.tsx // 編集ページ
components/
  ├── EntryCard.tsx    // ログの1件表示コンポーネント
  └── TagInput.tsx     // タグ入力補助
public/
  └── favicon.ico      // アイコンなど

