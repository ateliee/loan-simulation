# 住宅ローンシミュレーションアプリ

住宅ローンと登記費用のシミュレーションができるWebアプリケーションです。

## 機能

### 住宅ローンシミュレーション
- 借入金額、金利、返済期間から月々の返済額を計算
- 総返済額、支払利息の計算
- 返済計画表の表示
- 返済額の推移グラフ表示

### 登記費用シミュレーション
- 登録免許税の計算
  - 所有権移転登記
  - 抵当権設定登記
- 司法書士報酬の計算
  - 所有権移転登記
  - 抵当権設定登記

## 技術スタック

- Nuxt 3
- Vue 3
- TypeScript
- Vuetify 3
- ESLint
- Stylelint

## プロジェクト構成

```
nuxt/
├── components/          # コンポーネント
│   ├── loan/           # 住宅ローン関連
│   └── registration-tax/# 登記費用関連
├── pages/              # ページ
├── types/              # 型定義
├── layouts/            # レイアウト
└── plugins/            # プラグイン
```

## ライセンス

MIT

## 必要要件
- Node.js 18以上
- npm
- Docker（Docker Compose含む）
- Firebaseプロジェクト（デプロイ用）

## Makefile コマンド一覧

| コマンド           | 説明                                 |
|--------------------|--------------------------------------|
| make dev           | ローカル開発サーバー起動             |
| make build         | 本番ビルド                           |
| make preview       | 本番ビルドのプレビュー               |
| make lint          | ESLintによるコードチェック           |
| make format        | Prettierによるコード整形             |
| make test          | テスト実行（※テスト追加時に編集）    |
| make up            | Docker Composeで開発/本番起動        |
| make down          | Docker Compose停止                   |

---

`http://localhost:3000` でアプリにアクセスできます。

## Firebase Hostingへのデプロイ（GitHub Actions利用）

1. GitHubリポジトリのSecreasに `FIREBASE_TOKEN` を登録してください。
2. `main`ブランチにpushすると、自動的にSPAビルド＆Firebase Hostingへデプロイされます。

---
