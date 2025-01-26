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

# 依存関係の完全インストール
RUN yarn install --check-cache

# ワークスペース最適化
RUN yarn workspaces focus @kuripura/mobile

# Expoコアパッケージの明示的インストール
RUN yarn add expo@^48.0.21 expo-dev-client@^3.0.4

WORKDIR /app/mobile

# Expoの開発サーバーポートを公開
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 8081

# 環境変数の設定
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=localhost
ENV EXPO_DEBUG=true
ENV CI=1
ENV NODE_ENV=development

CMD ["yarn", "expo", "start", "--web", "--host", "localhost"]