# 住宅ローンシミュレーション

このプロジェクトはNuxt 3を用いた住宅ローンシミュレーションアプリです。

ほとんどをAIにて生成しています。

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
| make docker-up     | Docker Composeで開発/本番起動        |
| make docker-down   | Docker Compose停止                   |
| make deploy        | Firebase Hostingへデプロイ           |

---

各コマンドは `loan-simulation-app` ディレクトリで実行してください。


`http://localhost:3000` でアプリにアクセスできます。

## Firebase Hostingへのデプロイ（GitHub Actions利用）

1. Firebaseプロジェクトを作成し、`firebase.json`と`.firebaserc`を用意してください。
2. GitHubリポジトリのSecreasに `FIREBASE_TOKEN` を登録してください。
3. `main`ブランチにpushすると、自動的にSPAビルド＆Firebase Hostingへデプロイされます。

---

## 機能
- 借入金額、借入期間、金利、返済方式（元利均等・元金均等）を入力
- 毎月の返済額、元本返済額、利息、残元金、合計返済額をリアルタイム表示
