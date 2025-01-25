FROM node:20-slim

# pnpmのグローバルバイナリディレクトリを設定
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    bash \
    && rm -rf /var/lib/apt/lists/*

# pnpmのインストールとセットアップ
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate
RUN pnpm setup

# ワークスペース設定ファイルのコピー
COPY package.json pnpm-workspace.yaml ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/shared/src ./packages/shared/src
COPY packages/shared/tsconfig.json ./packages/shared/
COPY server/package.json ./server/

# 依存関係のインストール
RUN pnpm install

# Nest CLIのインストール
RUN pnpm add -g @nestjs/cli

# ソースコードのコピー
COPY server/src ./server/src
COPY server/tsconfig.json ./server/
COPY server/tsconfig.build.json ./server/
COPY server/nest-cli.json ./server/

WORKDIR /app/server

# 開発環境用のコマンドを設定
CMD ["pnpm", "start:dev"]