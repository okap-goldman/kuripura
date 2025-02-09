**共通事項**

*   **データ型:**
    *   `string`: 文字列
    *   `integer`: 整数
    *   `number`: 数値 (整数または浮動小数点数)
    *   `boolean`: 真偽値 (true/false)
    *   `datetime`: 日時 (ISO 8601形式: YYYY-MM-DDTHH:mm:ssZ)
    *   `array<type>`: type型の配列
    *   `object`: オブジェクト
    *   `null`: null値
*   **パラメータの記述:**
    *   `name`: パラメータ名
    *   `type`: データ型
    *   `required`: 必須かどうか (true/false)
    *   `description`: 説明
    *   `validation`: バリデーションルール (例: `maxLength: 255`, `pattern: ^[a-zA-Z0-9]+$`, `enum: ["open", "closed"]`)
*   **HTTPステータスコード:**
    *   `200 OK`: 成功
    *   `201 Created`: 作成成功
    *   `204 No Content`: 成功 (レスポンスボディなし)
    *   `400 Bad Request`: リクエストが不正
    *   `401 Unauthorized`: 認証エラー
    *   `403 Forbidden`: 権限なし
    *   `404 Not Found`: リソースが見つからない
    *   `422 Unprocessable Entity`: バリデーションエラー
    *   `500 Internal Server Error`: サーバー内部エラー

---
### 詳細設計

#### 2.1 認証関連

*   **`POST /auth/google/login`**: Googleログイン

    *   **リクエスト:**
        ```json
        {
          "code": "string",  // Google OAuth 2.0の認証コード(required)
        }
        ```
        * バリデーション
          * code: 必須、文字列

    *   **レスポンス (200 OK):**
        ```json
        {
          "access_token": "string", // JWTアクセス トークン
          "refresh_token": "string", // JWTリフレッシュトークン
          "user": {
             "user_id": "integer",
              "user_name": "string",
              "email": "string",
              "profile_icon_url": "string",
              // 他のユーザー情報...
          }
        }
        ```

*   **`POST /auth/google/refresh`**: JWTトークン更新

    *   **リクエスト:**

        ```json
        {
          "refresh_token": "string" //JWT リフレッシュトークン(required)
        }
        ```
        * バリデーション
          * refresh_token: 必須、文字列

    *   **レスポンス (200 OK):**

        ```json
        {
          "access_token": "string" // 新しいJWT アクセストークン
        }
        ```

#### 2.2 ユーザー関連

*   **`GET /users/{user_id}`**: ユーザー情報取得

    *   **リクエスト:** なし
    *   **レスポンス (200 OK):**
        ```json
        {
          "user_id": "integer",
          "user_name": "string",
          "email": "string",
          "profile_icon_url": "string",
          "profile_audio_url": "string",
          "shop_link_url": "string",
          "is_shop_link": "boolean",
          "introduction": "string",
          "created_at": "datetime",
          "updated_at": "datetime"
        }
        ```

*   **`PUT /users/{user_id}`**: ユーザー情報更新

    *   **リクエスト:**
        ```json
        {
          "user_name": "string", //(optional)
          "profile_icon_url": "string",//(optional)
          "profile_audio_url": "string",//(optional)
          "shop_link_url": "string",//(optional)
          "is_shop_link": "boolean",//(optional)
          "introduction": "string"//(optional)
        }
        ```
        * バリデーション
          * user_name: オプショナル、文字列、最大255文字
          * profile_icon_url: オプショナル、文字列、URL形式
          * profile_audio_url: オプショナル、文字列、URL形式
          * shop_link_url: オプショナル、文字列、URL形式
          * is_shop_link: オプショナル、真偽値
          * introduction: オプショナル、文字列、最大1000文字
    *   **レスポンス (200 OK):** 更新後のユーザー情報 (上記`GET /users/{user_id}`と同じ)

*   **`GET /users/{user_id}/followers`**: フォロワー一覧取得

    *   **リクエスト:** なし

    *   **レスポンス (200 OK):**

        ```json
        {
          "followers": [
            {
              "user_id": "integer",
              "user_name": "string",
              "profile_icon_url": "string",
              "follow_type": "string", // "family" or "watch"
              "reason": "string", // フォロー理由 (familyの場合のみ)
              "created_at": "datetime"
            }
          ]
        }
        ```

*   **`GET /users/{user_id}/following`**: フォロー一覧取得
    *   **リクエスト:** なし
    *   **レスポンス (200 OK):**

        ```json
        {
          "following": [
            {
              "user_id": "integer",
              "user_name": "string",
              "profile_icon_url": "string",
              "follow_type": "string", // "family" or "watch"
              "reason": "string", // フォロー理由 (familyの場合のみ)
              "created_at": "datetime"
            }
          ]
        }
        ```

#### 2.3 フォロー関連

*   **`POST /follows`**: フォロー

    *   **リクエスト:**
        ```json
        {
          "followee_id": "integer", // フォロー対象のユーザーID (required)
          "follow_type": "string", // "family" or "watch" (required)
          "reason": "string" // フォロー理由 (familyの場合のみ、required)
        }
        ```
        * バリデーション
            * followee_id: 必須、整数
            * follow_type: 必須、文字列、"family" または "watch" のいずれか
            * reason: follow_type が "family" の場合は必須、文字列、最大1000文字

    *   **レスポンス (201 Created):**
        ```json
        {
          "follow_id": "integer",
          "follower_id": "integer",
          "followee_id": "integer",
          "follow_type": "string",
          "reason": "string",
          "created_at": "datetime"
        }
        ```

*   **`DELETE /follows/{follow_id}`**: アンフォロー

    *   **リクエスト:** なし
    *   **レスポンス (204 No Content):**

#### 2.4 投稿関連

*   **`POST /posts`**: 投稿作成

    *   **リクエスト:**
        ```json
        {
          "post_type": "string", // "video", "image", "audio", "text" (required)
          "title": "string", //(required)
          "text_content": "string", // post_type が "text" の場合 (required)
          "youtube_url": "string", // post_type が "video" の場合 (required)
          "image_urls": "array<string>", // post_type が "image" の場合 (required)
          "audio_url": "string", // post_type が "audio" の場合 (required)
          "event_id": "integer", //(optional)
           "visibility": "string" //動画の公開範囲(post_typeがvideoの場合)
        }
        ```
        * バリデーション
            * post_type: 必須、文字列、"video", "image", "audio", "text" のいずれか
            * title: 必須、文字列、最大255文字
            * text_content: post_type が "text" の場合は必須、文字列、最大10000文字
            * youtube_url: post_type が "video" の場合は必須、文字列、YouTubeのURL形式
            * image_urls: post_type が "image" の場合は必須、文字列の配列、各要素はURL形式、最大10要素
            * audio_url: post_type が "audio" の場合は必須、文字列、URL形式
            * event_id: オプショナル、整数
            * visibility: post_typeがvideoの場合必須、文字列、"public" or "unlisted"

    *   **レスポンス (201 Created):**
        ```json
        {
          "post_id": "integer",
          "user_id": "integer",
          "post_type": "string",
          "title": "string",
          "text_content": "string",
          "youtube_url": "string",
          "image_urls": "array<string>",
          "audio_url": "string",
          "event_id": "integer",
          "created_at": "datetime",
          "updated_at": "datetime"
        }
        ```

*   **`GET /posts`**: タイムライン取得

    *   **リクエスト:**
        ```json
        {
          "type": "string", // "family" or "watch" (required)
          "offset": "integer", // ページネーション用 (optional, default: 0)
          "limit": "integer" // ページネーション用 (optional, default: 20)
        }
        ```
        * バリデーション
            * type: 必須、文字列 "family" or "watch"
            * offset: オプショナル、整数 デフォルト0
            * limit: オプショナル、整数 デフォルト20 最大100

    *   **レスポンス (200 OK):**
        ```json
        {
          "posts": [
            {
              // 投稿情報 (上記POST /postsのレスポンスと同じ)
            }
          ]
        }
        ```

*   **`GET /posts/{post_id}`**: 投稿詳細取得

    *   **リクエスト:** なし
    *   **レスポンス (200 OK):** 上記`POST /posts`のレスポンスと同じ

*   **`DELETE /posts/{post_id}`**: 投稿削除
    *   **リクエスト:** なし
    *   **レスポンス (204 No Content):**

#### 2.5 コメント関連

*   **`POST /posts/{post_id}/comments`**: コメント投稿

    *   **リクエスト:**
        ```json
        {
          "content": "string" // コメント本文 (required)
        }
        ```
        * バリデーション
            * content: 必須、文字列、最大1000文字

    *   **レスポンス (201 Created):**
        ```json
        {
          "comment_id": "integer",
          "post_id": "integer",
          "user_id": "integer",
          "content": "string",
          "created_at": "datetime"
        }
        ```

*   **`GET /posts/{post_id}/comments`**: コメント一覧取得

    *   **リクエスト:**
        ```json
        {
            "offset": "integer", //(optional) default 0
            "limit": "integer" //(optional) default 20
        }
        ```        * バリデーション
            * offset: オプショナル 整数 デフォルト0
            * limit: オプショナル 整数 デフォルト20 最大100
    *   **レスポンス (200 OK):**
        ```json
        {
          "comments": [
            {
              "comment_id": "integer",
              "post_id": "integer",
              "user_id": "integer",
              "content": "string",
              "created_at": "datetime"
            }
          ]
        }
        ```
* `DELETE /posts/{post_id}/comments/{comment_id}`: コメント削除
    *   **リクエスト:** なし
    *   **レスポンス (204 No Content):**

#### 2.6 いいね関連

*   **`POST /posts/{post_id}/likes`**: いいね

    *   **リクエスト:** なし
    *   **レスポンス (201 Created):**
        ```json
        {
          "like_id": "integer",
          "post_id": "integer",
          "user_id": "integer",
          "created_at": "datetime"
        }
        ```

*   **`DELETE /posts/{post_id}/likes`**: いいね取り消し

    *   **リクエスト:** なし
    *   **レスポンス (204 No Content):**

#### 2.7 ハイライト関連

*   **`POST /posts/{post_id}/highlights`**: ハイライト

    *   **リクエスト:**
        ```json
        {
          "highlight_reason": "string" // ハイライト理由 (required)
        }
        ```        * バリデーション
            * highlight_reason: 必須、文字列、最大1000文字

    *   **レスポンス (201 Created):**
        ```json
        {
          "highlight_id": "integer",
          "post_id": "integer",
          "user_id": "integer",
          "highlight_reason": "string",
          "created_at": "datetime"
        }
        ```
*   **`GET /posts/{post_id}/highlights`**: ハイライト一覧取得
    *   **リクエスト:**
        ```json
        {
            "offset": "integer", //(optional) default 0
            "limit": "integer" //(optional) default 20
        }
        ```
        * バリデーション
            * offset: オプショナル 整数 デフォルト0
            * limit: オプショナル 整数 デフォルト20 最大100

    *   **レスポンス (200 OK):**
        ```json
        {
          "highlights": [
             {
              "highlight_id": "integer",
              "post_id": "integer",
              "user_id": "integer",
              "highlight_reason": "string",
              "created_at": "datetime"
            }
          ]
        }
        ```

#### 2.8 ストーリー関連

*   **`POST /stories`**: ストーリー作成

    *   **リクエスト:**
        ```json
        {
          "media_url": "string", // Box, YouTube, PodBeanのいずれかのURL (required)
          "story_type": "string" // "video", "image", "audio" (required)
        }
        ```
        * バリデーション
            * media_url: 必須、文字列、URL形式
            * story_type: 必須、文字列、"video", "image", "audio" のいずれか

    *   **レスポンス (201 Created):**
        ```json
        {
          "story_id": "integer",
          "user_id": "integer",
          "media_url": "string",
          "story_type": "string",
          "expire_at": "datetime",
          "created_at": "datetime"
        }
        ```

*   **`GET /stories`**: ストーリー一覧取得

    *   **リクエスト:**
        ```json
         {
          "user_id": "integer" // ユーザーID (required)
         }
        ```

    *   **レスポンス (200 OK):**
        ```json
        {
          "stories": [
            {
               "story_id": "integer",
              "user_id": "integer",
              "media_url": "string",
              "story_type": "string",
              "expire_at": "datetime",
              "created_at": "datetime"
            }
          ]
        }
        ```

#### 2.9 イベント関連

*   **`POST /events`**: イベント作成 (プレミアムユーザーのみ)

    *   **リクエスト:**
        ```json
        {
          "event_name": "string", //(required)
          "content": "text", //(required)
          "capacity": "integer", //(required)
          "price": "number", //(required)
          "recruit_start": "datetime", //(required)
          "recruit_end": "datetime", //(required)
          "location": "string", //(required)
          "event_start": "datetime",//(required)
          "event_end": "datetime",//(required)
          "organizer_id": "integer" //(required)
        }
        ```
        * バリデーション:
            * event_name: 必須、文字列、最大255文字
            * content: 必須、文字列、最大10000文字
            * capacity: 必須、整数
            * price: 必須、数値
            * recruit_start: 必須、datetime
            * recruit_end: 必須、datetime
            * location: 必須、文字列、最大255文字
            * event_start: 必須、datetime
            * event_end: 必須、datetime
            * organizer_id: 必須、整数

    *   **レスポンス (201 Created):**
        ```json
        {
          "event_id": "integer",
          "event_name": "string",
          "content": "text",
          "capacity": "integer",
          "price": "number",
          "recruit_start": "datetime",
          "recruit_end": "datetime",
          "location": "string",
          "event_start": "datetime",
          "event_end": "datetime",
          "created_at": "datetime",
          "organizer_id": "integer"
        }
        ```

*   **`GET /events`**: イベント一覧取得

    *   **リクエスト:**
        ```json
        {
          "location": "string", //(optional)
          "min_price": "number", //(optional)
          "max_price": "number", //(optional)
          "start_date": "datetime", //(optional)
          "end_date": "datetime", //(optional)
          "offset": "integer", //(optional) default 0
          "limit": "integer" //(optional) default 20
        }
        ```
        * バリデーション
            * location: オプショナル、文字列
            * min_price: オプショナル、数値
            * max_price: オプショナル、数値
            * start_date: オプショナル、datetime
            * end_date: オプショナル、datetime
            * offset: オプショナル 整数 デフォルト0
            * limit: オプショナル 整数 デフォルト20 最大100
    *   **レスポンス (200 OK):**
        ```json
        {
          "events": [
            {
              // イベント情報 (上記POST /eventsのレスポンスと同じ)
            }
          ]
        }
        ```

*   **`GET /events/{event_id}`**: イベント詳細取得

    *   **リクエスト:** なし
    *   **レスポンス (200 OK):** 上記`POST /events`のレスポンスと同じ

*   **`POST /events/{event_id}/participants`**: イベント参加

    *   **リクエスト:**
        ```json
        {
          "user_id": "integer" //(required)
          // 有料イベントの場合、StripeのセッションIDなどが必要になる可能性がある
        }
        ```
        * バリデーション
            * user_id: 必須、整数

    *   **レスポンス (201 Created):**
        ```json
        {
          "event_participant_id": "integer",
          "event_id": "integer",
          "user_id": "integer",
          "is_organizer": "boolean",
          "created_at": "datetime"
        }
        ```

*   **`DELETE /events/{event_id}/participants/{user_id}`**: イベント参加キャンセル
    *   **リクエスト:** なし
    *   **レスポンス (204 No Content):**

*   **`GET /events/{event_id}/posts`**: イベント関連投稿一覧取得

    *   **リクエスト:**
        ```json
        {
          "offset": "integer", //(optional) default 0
          "limit": "integer" //(optional) default 20
        }
        ```
        * バリデーション
            * offset: オプショナル 整数 デフォルト0
            * limit: オプショナル 整数 デフォルト20 最大100

    *   **レスポンス (200 OK):**
        ```json
        {
          "posts": [
            {
              // 投稿情報 (POST /postsのレスポンスと同じ)
            }
          ]
        }
        ```

#### 2.10 ショップ関連

*   **`POST /shops`**: ショップ作成

    *   **リクエスト:**
        ```json
        {
          "shop_name": "string", //(required)
          "description": "text" //(required)
        }
        ```
        * バリデーション
            * shop_name: 必須、文字列、最大255文字
            * description: 必須、文字列、最大10000文字

    *   **レスポンス (201 Created):**
        ```json
        {
          "shop_id": "integer",
          "user_id": "integer",
          "shop_name": "string",
          "description": "text"
        }
        ```

*   **`GET /shops/{shop_id}`**: ショップ情報取得

    *   **リクエスト:** なし
    *   **レスポンス (200 OK):** 上記`POST /shops`のレスポンスと同じ。

*   **`POST /shops/{shop_id}/products`**: 商品登録

    *   **リクエスト:**
        ```json
        {
          "product_name": "string", //(required)
          "description": "text", //(required)
          "price": "number", //(required)
          "image_url": "string" //(required)
        }
        ```
        * バリデーション
            * product_name: 必須、文字列、最大255文字
            * description: 必須、文字列、最大10000文字
            * price: 必須、数値
            * image_url: 必須、文字列、URL形式

    *   **レスポンス (201 Created):**
        ```json
        {
          "product_id": "integer",
          "shop_id": "integer",
          "product_name": "string",
          "description": "text",
          "price": "number",
          "image_url": "string"
        }
        ```

*   **`GET /shops/{shop_id}/products`**: 商品一覧取得

    *   **リクエスト:**
        ```json
        {
          "offset": "integer", //(optional) default 0
          "limit": "integer" //(optional) default 20
        }
        ```
        * バリデーション
            * offset: オプショナル 整数 デフォルト0
            * limit: オプショナル 整数 デフォルト20 最大100
    *   **レスポンス (200 OK):**
        ```json
        {
          "products": [
            {
              // 商品情報 (上記POST /shops/{shop_id}/productsのレスポンスと同じ)
            }
          ]
        }
        ```

*   **`GET /products/{product_id}`**: 商品詳細取得

    *   **リクエスト:** なし
    *   **レスポンス (200 OK):** 上記`POST /shops/{shop_id}/products`のレスポンスと同じ。

*   **`POST /products/{product_id}/purchase`**: 商品購入 (Stripe決済)

    *   **リクエスト:**
        ```json
        {
           "user_id": "integer" //(required)
          //StripeのCheckout Session IDなどが必要になる
        }
        ```
    *   **レスポンス (201 Created):**
        ```json
        {
          "transaction_id": "integer",
          "buyer_id": "integer",
          "seller_id": "integer",
          "product_id": "integer",
          "amount": "number",
          "status": "string", // 例: "pending", "completed", "failed"
          "created_at": "datetime"
        }
        ```

#### 2.11 検索・AIチャット関連

*   **`GET /search`**: 検索

    *   **リクエスト:**
        ```json
        {
          "keyword": "string", //(required)
          "offset": "integer", //(optional) default 0
          "limit": "integer" //(optional) default 20
        }
        ```
        * バリデーション
            * keyword: 必須、文字列
            * offset: オプショナル 整数 デフォルト0
            * limit: オプショナル 整数 デフォルト20 最大100

    *   **レスポンス (200 OK):**
        ```json
        {
          "users": [
            // ユーザー情報
          ],
          "posts": [
           // 投稿情報
          ],
          "events": [
           // イベント情報
          ]
        }
        ```

*   **`POST /ai/chat`**: AIチャット (質問)

    *   **リクエスト:**
        ```json
        {
          "question": "string" //(required)
        }
        ```
        * バリデーション
            * question: 必須、文字列

    *   **レスポンス (200 OK):**
        ```json
        {
          "answer": "string"
        }
        ```

#### 2.12 通知関連

*   **`GET /notifications`**: 通知一覧取得

    *   **リクエスト:**
        ```json
        {
           "user_id": "integer" //(required)
          "offset": "integer", //(optional) default 0
          "limit": "integer" //(optional) default 20
        }
        ```
        * バリデーション
            * user_id: 必須、整数
            * offset: オプショナル 整数 デフォルト0
            * limit: オプショナル 整数 デフォルト20 最大100

    *   **レスポンス (200 OK):**
        ```json
        {
          "notifications": [
            {
              "notification_id": "integer",
              "user_id": "integer",
              "notification_type": "string",
              "from_user_id": "integer",
              "post_id": "integer",
              "event_id": "integer",
               "product_id": "integer",
              "message": "string",
              "is_read": "boolean",
              "created_at": "datetime"
            }
          ]
        }
        ```

*   **`PUT /notifications/{notification_id}/read`**: 通知既読
    * **リクエスト:** なし
    *   **レスポンス (204 No Content):**

#### 2.13 管理者機能関連
* `GET /admin/users`: ユーザー一覧取得 (管理者のみ)
  *   **リクエスト:**
        ```json
        {
          "offset": "integer", //(optional) default 0
          "limit": "integer" //(optional) default 20
        }
        ```
        * バリデーション
            * offset: オプショナル 整数 デフォルト0
            * limit: オプショナル 整数 デフォルト20 最大100
  *   **レスポンス (200 OK):**
        ```json
        {
            "users": [
            // ユーザー情報
            ]
        }
        ```
*   `PUT /admin/users/{user_id}/block`: ユーザー停止 (管理者のみ)
    * **リクエスト:** なし
    *   **レスポンス (204 No Content):**
*   `DELETE /admin/users/{user_id}`: ユーザー削除 (管理者のみ)
    * **リクエスト:** なし
    *   **レスポンス (204 No Content):**
* `GET /admin/reports`: 違反報告取得
    *   **リクエスト:**
        ```json
        {
          "offset": "integer", //(optional) default 0
          "limit": "integer" //(optional) default 20
        }
        ```
        * バリデーション
            * offset: オプショナル 整数 デフォルト0
            * limit: オプショナル 整数 デフォルト20 最大100
    *   **レスポンス (200 OK):**
        ```json
        {
            "reports":[
                {
                  "report_id": "integer",
                  "reporter_id": "integer",
                  "reported_user_id": "integer",
                  "report_type": "string",
                  "content": "text",
                  "created_at": "datetime"
                }
            ]
        }
        ```
* `PUT /admin/posts/{post_id}/moderate`: 投稿モデレーション
    * **リクエスト:** なし
    *   **レスポンス (204 No Content):**
* `PUT /admin/events/{event_id}/moderate`: イベント削除
    * **リクエスト:** なし
    *   **レスポンス (204 No Content):**
