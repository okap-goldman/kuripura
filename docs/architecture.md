```mermaid
sequenceDiagram
    participant Mobile as モバイルアプリ(React Native/Expo)
    participant AuthSvc as AuthService (NestJS)
    participant UserSvc as UsersService
    participant PostSvc as PostsService
    participant DB as PostgreSQL
    participant Box as Box API
    participant FCM as Firebase Cloud Messaging

    Note over Mobile,AuthSvc: ① ユーザー登録・ログインフロー
    Mobile->>+AuthSvc: /auth/register (メール・パスワード・名前)
    AuthSvc->>+UserSvc: usersService.create() でユーザー作成
    UserSvc->>DB: INSERT INTO users(...) 新規ユーザー登録
    DB-->>UserSvc: 完了
    UserSvc-->>-AuthSvc: 新規ユーザーEntity
    AuthSvc->>AuthSvc: JWT生成(accessToken, refreshToken)
    AuthSvc->>UserSvc: updateRefreshToken(ユーザーID, refreshToken)
    UserSvc->>DB: UPDATE users SET refreshToken=...
    DB-->>UserSvc: 更新完了
    AuthSvc-->>-Mobile: {accessToken, refreshToken, user情報}

    Note over Mobile,AuthSvc: ② ログイン済みユーザーがプロフィール画像をアップロード
    Mobile->>+UserSvc: /users/profile/avatar (FormData, imageBuffer)
    UserSvc->>+Box: uploadProfileImage (Box API経由で画像を保存)
    Box-->>-UserSvc: 新規アップロードURLまたは共有リンク
    UserSvc->>DB: UPDATE users SET avatar=...
    DB-->>UserSvc: 更新完了
    UserSvc-->>-Mobile: { url: "アップロード後の画像URL" }

    Note over Mobile,PostSvc: ③ 投稿作成フロー (例: 画像を含む)
    Mobile->>+PostSvc: /posts (CreatePostDto: content, mediaType='image', authorId 等)
    PostSvc->>DB: INSERT INTO posts(...) 新規投稿レコード
    DB-->>PostSvc: 生成された投稿ID返却
    PostSvc->>+Box: files.uploadFile()
    Box-->>-PostSvc: { fileId または共有リンク 等 }
    PostSvc->>DB: UPDATE posts SET [メディアURL]
    DB-->>PostSvc: 更新完了
    PostSvc-->>-Mobile: { id: 生成された投稿ID, content, mediaURL 等 }

    Note over Mobile,FCM: ④ 通知（いいね・コメントなど）
    PostSvc->>+FCM: 「いいねされました」等の通知をFCMに送信
    FCM-->>-Mobile: プッシュ通知

    Note over Mobile,AuthSvc: ⑤ ログアウト
    Mobile->>+AuthSvc: /auth/logout (Bearerトークン)
    AuthSvc->>UserSvc: updateRefreshToken(ユーザーID, null)
    UserSvc->>DB: refreshTokenをクリア
    DB-->>UserSvc: 完了
    AuthSvc-->>-Mobile: { message: "Logged out successfully" }
```