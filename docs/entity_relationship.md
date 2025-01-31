erDiagram
    %% Users テーブル
    USERS {
        bigint user_id PK
        string user_name
        string email
        string password_hash
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
        string follow_type
        text reason
        datetime created_at
    }

    %% Posts
    POSTS {
        bigint post_id PK
        bigint user_id FK
        string post_type
        string title
        text text_content
        string youtube_url
        text image_urls
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
        string media_url
        string story_type
        datetime expire_at
        datetime created_at
    }

    %% Events
    EVENTS {
        bigint event_id PK
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

    %% Notifications
    NOTIFICATIONS {
        bigint notification_id PK
        bigint user_id
        string notification_type
        bigint from_user_id
        bigint post_id
        bigint event_id
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
    USERS ||--|{ EVENTPARTICIPANTS : "1対多"
    USERS ||--|{ NOTIFICATIONS : "1対多(通知送受信)"
    
    POSTS ||--|{ COMMENTS : "1対多"
    POSTS ||--|{ LIKES : "1対多"
    POSTS ||--|{ HIGHLIGHTS : "1対多"
    EVENTS ||--|{ POSTS : "1対多(イベント投稿)"
    EVENTS ||--|{ EVENTPARTICIPANTS : "1対多"