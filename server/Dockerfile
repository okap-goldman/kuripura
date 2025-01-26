FROM node:20-slim

WORKDIR /app

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    bash \
    && rm -rf /var/lib/apt/lists/*

# yarnの有効化とインストール
RUN corepack enable && corepack prepare yarn@4.5.1 --activate
RUN yarn set version 4.5.1

# NestJSのCLIをグローバルにインストール
RUN npm install -g @nestjs/cli

# ルートのワークスペース設定ファイルのコピー
COPY package.json .
COPY .yarnrc.yml .

# 共有パッケージのコピーとビルド
COPY packages/shared/package.json ./packages/shared/
COPY packages/shared/src ./packages/shared/src
COPY packages/shared/tsconfig.json ./packages/shared/
WORKDIR /app/packages/shared
RUN yarn install
RUN yarn build

# サーバーパッケージのコピーとビルド
WORKDIR /app/server
COPY server/package.json .
COPY server/tsconfig.json .
COPY server/tsconfig.build.json .
COPY server/nest-cli.json .
RUN yarn install

# ソースコードのコピー
COPY server/src ./src

# ビルドコマンドを追加
RUN yarn build

EXPOSE 4000

# 開発環境用のコマンドを設定
CMD ["yarn", "start:dev"]