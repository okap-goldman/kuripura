FROM node:20-slim

WORKDIR /app

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# pnpmのインストール
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

# ワークスペース設定ファイルのコピー
COPY package.json pnpm-workspace.yaml ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/shared/src ./packages/shared/src
COPY packages/shared/tsconfig.json ./packages/shared/
COPY mobile/package.json ./mobile/

# 依存関係のインストール
RUN pnpm install

# Expoのインストール (ワークスペースルートに追加)
RUN pnpm add -w expo

WORKDIR /app/mobile

# Expoの開発サーバーポートを公開
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD ["pnpm", "start"]