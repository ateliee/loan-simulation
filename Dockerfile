# Node.js公式イメージを利用
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# SPAビルド
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
