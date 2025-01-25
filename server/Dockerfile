FROM node:20-slim

WORKDIR /app

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    bash \
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
COPY server/package.json ./server/

# 依存関係のインストール
RUN yarn install

# Nest CLIのインストール（dlxを使用）
RUN yarn dlx @nestjs/cli

# ソースコードのコピー
COPY server/src ./server/src
COPY server/tsconfig.json ./server/
COPY server/tsconfig.build.json ./server/
COPY server/nest-cli.json ./server/

WORKDIR /app/server

# 開発環境用のコマンドを設定
CMD ["yarn", "start:dev"]