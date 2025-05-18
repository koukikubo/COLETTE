# Node.js公式の軽量イメージ
FROM node:18-alpine

# 作業ディレクトリ
WORKDIR /frontend

# package ファイルを先にコピー（キャッシュ利用）
COPY package.json package-lock.json ./

# 依存インストール
RUN npm install

# アプリ全体をコピー
COPY . .

# ポート公開
EXPOSE 3000

# サーバー起動（App Router 対応）
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
