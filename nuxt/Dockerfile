# Node.js公式イメージを利用
FROM node:18-alpine

WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./

# 本番環境用の依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# ビルド
RUN npm run build

EXPOSE 3000

# 本番環境用のコマンド
CMD ["npm", "run", "preview"]
