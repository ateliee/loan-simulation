# 不動産関連費用計算アプリ

不動産取引に関連する各種費用を計算するためのWebアプリケーションです。ほとんどのコードをAIで生成しています。

## 機能一覧

### 1. ローンシミュレーション
- 借入金額、返済期間、金利から月々の返済額を計算
- 元金均等返済と元利均等返済の2種類の返済方式に対応
- 繰上返済シミュレーション機能
- 返済スケジュールのグラフ表示

### 2. 登録免許税計算
- 不動産の種類（住宅・店舗・事務所）に応じた税率の自動適用
- 土地と建物の価格を個別に入力可能
- 抵当権設定時の税率計算
- 消費税の計算（税率調整可能）

### 3. 仲介手数料計算
- 物件種別（住宅・店舗・事務所）に応じた手数料率の自動適用
- 物件価格から仲介手数料を計算
- 消費税の計算（税率調整可能）
- 計算過程の詳細表示

## 技術スタック

- Nuxt 3
- Vue 3
- TypeScript
- Vuetify 3
- ESLint
- Stylelint
- Firebase (Firestore)

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
| make reset         | コンテナ・ボリューム・イメージを完全に削除 |

---

`http://localhost:3000` でアプリにアクセスできます。

## Firebase Hostingへのデプロイ（GitHub Actions利用）

1. GitHubリポジトリのSecreasに `FIREBASE_TOKEN` を登録してください。
2. `main`ブランチにpushすると、自動的にSPAビルド＆Firebase Hostingへデプロイされます。

## Firebase Emulator

ローカル開発環境でFirebaseの機能をエミュレートするために、Firebase Emulatorを使用しています。

### エミュレーターの起動

```bash
make up
```

これにより、以下のサービスが起動します：
- 開発サーバー（`http://localhost:3000`）
- Firebase Emulator UI（`http://localhost:4000`）
- Firestore Emulator（`localhost:8080`）

### データの永続化

エミュレーターのデータは、コンテナを再起動すると消去されます。データを永続化する場合は、以下のコマンドを使用します：

```bash
# データのエクスポート
docker compose exec firebase firebase emulators:export ./firebase-data

# データのインポート
docker compose up -d firebase --import=./firebase-data
```

---

## コマンド

### 金利情報の取得
各銀行の最新の住宅ローン金利情報を取得します。

```bash
npm run interest-rates:update
```

出力例：
```
=== 金利情報 ===
借入タイプ: 変動金利
店頭金利: 2.875%
適用金利: 0.595%
引き下げ率: 2.28%

最終更新: 2024/3/21 15:30:45
```

---

# その他

git rebaseでcommitをまとめる

```
git commit --fixup ***
git rebase -i --autosquash HEAD~2
```
