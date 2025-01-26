FROM node:20-slim

WORKDIR /app

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# yarnの有効化とインストール
RUN corepack enable && corepack prepare yarn@4.5.1 --activate
RUN yarn set version 4.5.1

# ワークスペース設定ファイルのコピー
COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/shared/package.json ./packages/shared/
COPY mobile/package.json ./mobile/

# 依存関係のインストール
RUN yarn install

# ソースコードのコピー
COPY packages/shared/src ./packages/shared/src
COPY packages/shared/tsconfig.json ./packages/shared/
COPY mobile/src ./mobile/src
COPY mobile/tsconfig.json mobile/app.json ./mobile/

WORKDIR /app/mobile

# Expoの開発サーバーポートを公開
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

# 環境変数の設定
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=localhost

CMD ["yarn", "expo", "start", "--web"]