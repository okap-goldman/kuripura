FROM node:20-slim

WORKDIR /app

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# yarnの有効化とインストール
RUN corepack enable && corepack prepare yarn@4.5.1 --activate
RUN yarn set version 4.5.1

# ルートのワークスペース設定ファイルのコピー
COPY package.json .
COPY .yarnrc.yml .

# ワークスペース設定ファイルのコピー
COPY packages/shared/package.json ./packages/shared/
COPY packages/shared/src ./packages/shared/src
COPY packages/shared/tsconfig.json ./packages/shared/
COPY mobile/package.json ./mobile/

# 依存関係のインストール
RUN yarn install

# Expoのインストール (ワークスペースルートに追加)
RUN yarn workspace @kuripura/mobile add expo

WORKDIR /app/mobile

# Expoの開発サーバーポートを公開
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD ["yarn", "start"]