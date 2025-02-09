erDiagram
    %% Users テーブル
    USERS {
        bigint user_id PK
        string user_name
        string email
        string password_hash  "Google認証のためNULL許容"
        string profile_icon_url
        string profile_audio_url
        string shop_link_url
        boolean is_shop_link
        text introduction
        datetime created_at
        datetime updated_at
    }

    %% Follows(フォロー)
    FOLLOWS {
        bigint follow_id PK
        bigint follower_id FK
        bigint followee_id FK
        string follow_type "ファミリー or ウォッチ"
        text reason
        datetime created_at
    }

    %% Posts
    POSTS {
        bigint post_id PK
        bigint user_id FK
        string post_type "動画、画像、音声、テキスト"
        string title
        text text_content
        string youtube_url
        text image_urls  "BoxのURLをカンマ区切りで保存"
        string audio_url
        bigint event_id FK
        datetime created_at
        datetime updated_at
    }

    %% Comments
    COMMENTS {
        bigint comment_id PK
        bigint post_id FK
        bigint user_id FK
        text content
        datetime created_at
    }

    %% Likes
    LIKES {
        bigint like_id PK
        bigint post_id FK
        bigint user_id FK
        datetime created_at
    }

    %% Highlights
    HIGHLIGHTS {
        bigint highlight_id PK
        bigint post_id FK
        bigint user_id FK
        text highlight_reason
        datetime created_at
    }

    %% Stories
    STORIES {
        bigint story_id PK
        bigint user_id FK
        string media_url "Box, YouTube, PodBeanのいずれかのURL"
        string story_type  "動画、画像、音声"
        datetime expire_at
        datetime created_at
    }

    %% Events
    EVENTS {
        bigint event_id PK
        bigint organizer_id FK "主催者のuser_id"
        string event_name
        text content
        int capacity
        decimal price
        date recruit_start
        date recruit_end
        string location
        datetime event_start
        datetime event_end
        datetime created_at
    }

    %% EventParticipants
    EVENTPARTICIPANTS {
        bigint event_participant_id PK
        bigint event_id FK
        bigint user_id FK
        boolean is_organizer
        datetime created_at
    }
    
    %% Shops
    SHOPS {
        bigint shop_id PK
        bigint user_id FK
        string shop_name
        text description
    }
    
    %% Products
    PRODUCTS {
        bigint product_id PK
        bigint shop_id FK
        string product_name
        text description
        decimal price
        string image_url "BoxのURL"
    }
     %% Transactions (取引)
    TRANSACTIONS {
        bigint transaction_id PK
        bigint buyer_id FK
        bigint seller_id FK
        bigint product_id FK
        bigint event_id FK
        decimal amount
        string status "pending, completed, failed"
        datetime created_at
    }

    %% Notifications
    NOTIFICATIONS {
        bigint notification_id PK
        bigint user_id FK "通知を受け取るユーザー"
        string notification_type "コメント, ハイライト, 新規フォロワー, イベント参加, 商品購入"
        bigint from_user_id FK "通知元ユーザー"
        bigint post_id FK
        bigint event_id FK
        bigint product_id FK
        text message
        boolean is_read
        datetime created_at
    }
   
    %% リレーション定義
    USERS ||--|{ POSTS : "1対多"
    USERS ||--|{ FOLLOWS : "1対多(フォロワー/フォロー先)"
    USERS ||--|{ COMMENTS : "1対多"
    USERS ||--|{ LIKES : "1対多"
    USERS ||--|{ HIGHLIGHTS : "1対多"
    USERS ||--|{ STORIES : "1対多"
    USERS ||--o{ SHOPS : "1対0..1"
    USERS ||--|{ EVENTPARTICIPANTS : "1対多"
    USERS ||--|{ NOTIFICATIONS : "1対多(通知送受信)"
    USERS ||--|{ TRANSACTIONS : "1対多 (購入/販売)"
    
    POSTS ||--|{ COMMENTS : "1対多"
    POSTS ||--|{ LIKES : "1対多"
    POSTS ||--|{ HIGHLIGHTS : "1対多"
    EVENTS ||--|{ POSTS : "1対多(イベント投稿)"
    EVENTS ||--|{ EVENTPARTICIPANTS : "1対多"
    EVENTS ||--|{ TRANSACTIONS : "1対多"

    SHOPS ||--|{ PRODUCTS : "1対多"
    PRODUCTS ||--|{ TRANSACTIONS : "1対多"
    
    USERS {
        string password_hash "Google認証のためNULL許容"
    }
    FOLLOWS {
        string follow_type "ファミリー or ウォッチ"
    }
    POSTS {
       string post_type "動画、画像、音声、テキスト"
       text image_urls  "BoxのURLをカンマ区切りで保存"
    }
    STORIES {
        string media_url "Box, YouTube, PodBeanのいずれかのURL"
        string story_type  "動画、画像、音声"
    }
    EVENTS{
      bigint organizer_id FK "主催者のuser_id"
    }
    TRANSACTIONS {
        string status "pending, completed, failed"
    }
    NOTIFICATIONS {
      string notification_type "コメント, ハイライト, 新規フォロワー, イベント参加, 商品購入"
      bigint product_id FK
    }