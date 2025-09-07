# プロフィールページ API エンドポイント設計

## 概要

静的サイトのため、従来のREST APIは存在しないが、将来的な拡張性を考慮して設計を定義する。
現在は静的ファイル配信のみ、将来的にコンタクトフォームやアナリティクス等のAPI実装を想定。

## 静的コンテンツエンドポイント

### メインページ
```
GET /
Content-Type: text/html
Status: 200

レスポンス: index.html（メインプロフィールページ）
```

### プロジェクト詳細ページ  
```
GET /projects/{project-id}/
Content-Type: text/html
Status: 200

パスパラメータ:
- project-id: プロジェクト識別子（例: "portfolio-site", "chat-app"）

レスポンス: プロジェクト詳細HTML
```

### 静的アセット
```
GET /assets/{type}/{filename}
Content-Type: image/*, text/css, application/javascript
Status: 200

パスパラメータ:
- type: css | js | images | fonts
- filename: ファイル名

レスポンス例:
- /assets/css/style.css
- /assets/js/main.js  
- /assets/images/profile.jpg
- /assets/fonts/inter.woff2
```

## 将来想定される動的APIエンドポイント

### コンタクトフォーム API
```
POST /api/contact
Content-Type: application/json

リクエストボディ:
{
  "name": "お名前",
  "email": "example@email.com", 
  "subject": "件名",
  "message": "メッセージ本文",
  "language": "ja" | "en"
}

レスポンス:
{
  "success": true,
  "message": "メッセージを送信しました",
  "id": "contact_12345"
}

エラーレスポンス:
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "入力内容に不備があります",
    "details": {
      "email": ["有効なメールアドレスを入力してください"]
    }
  }
}
```

### アナリティクス API
```
POST /api/analytics/pageview
Content-Type: application/json

リクエストボディ:
{
  "page": "/",
  "referrer": "https://google.com",
  "userAgent": "Mozilla/5.0...",
  "viewport": {
    "width": 1920,
    "height": 1080
  },
  "timestamp": "2024-01-01T00:00:00Z"
}

レスポンス:
{
  "success": true,
  "trackingId": "track_12345"
}
```

```
POST /api/analytics/interaction
Content-Type: application/json

リクエストボディ:
{
  "type": "scroll" | "click" | "external_link",
  "target": "プロジェクト1" | "GitHub" | "note",
  "section": "projects" | "social",
  "value": "https://github.com/riku-miura",
  "timestamp": "2024-01-01T00:00:00Z"
}

レスポンス:
{
  "success": true
}
```

### プロジェクト情報取得 API
```
GET /api/projects
Content-Type: application/json
Status: 200

レスポンス:
{
  "success": true,
  "data": [
    {
      "id": "portfolio-site",
      "title": {
        "ja": "ポートフォリオサイト",
        "en": "Portfolio Site"
      },
      "description": {
        "ja": "個人のプロフィールを表示するWebサイト",
        "en": "Personal profile website"
      },
      "technologies": ["HTML", "CSS", "JavaScript", "AWS"],
      "images": [
        {
          "src": "/assets/images/projects/portfolio-thumb.jpg",
          "alt": {"ja": "ポートフォリオサムネイル", "en": "Portfolio thumbnail"},
          "width": 400,
          "height": 300
        }
      ],
      "links": {
        "github": "https://github.com/riku-miura/portfolio",
        "demo": "https://rikumiura.com",
        "detail": "/projects/portfolio-site/"
      },
      "featured": true,
      "publishedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

```
GET /api/projects/{id}
Content-Type: application/json
Status: 200

パスパラメータ:
- id: プロジェクトID

レスポンス:
{
  "success": true,
  "data": {
    "id": "portfolio-site",
    "title": {...},
    "description": {...},
    "fullDescription": {
      "ja": "詳細な説明文...",
      "en": "Detailed description..."
    },
    "technologies": [...],
    "images": [...],
    "links": {...},
    "featured": true,
    "publishedAt": "2024-01-01T00:00:00Z"
  }
}

エラーレスポンス:
{
  "success": false,
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "プロジェクトが見つかりません"
  }
}
```

### プロフィール情報 API
```
GET /api/profile
Content-Type: application/json
Status: 200

レスポンス:
{
  "success": true,
  "data": {
    "name": {
      "ja": "三浦陸",
      "en": "Riku Miura"  
    },
    "title": {
      "ja": "Webデベロッパー",
      "en": "Web Developer"
    },
    "description": {
      "ja": "フロントエンドを中心とした開発を行っています",
      "en": "Frontend-focused web development"
    },
    "profileImage": {
      "src": "/assets/images/profile.jpg",
      "alt": {"ja": "プロフィール写真", "en": "Profile photo"},
      "width": 300,
      "height": 300
    },
    "socialLinks": [
      {
        "platform": "note",
        "url": "https://note.com/riku_miura",
        "username": "riku_miura",
        "displayName": {"ja": "note", "en": "note"}
      },
      {
        "platform": "zenn", 
        "url": "https://zenn.dev/riku_miura",
        "username": "riku_miura",
        "displayName": {"ja": "Zenn", "en": "Zenn"}
      },
      {
        "platform": "twitter",
        "url": "https://twitter.com/riku_miura",
        "username": "riku_miura", 
        "displayName": {"ja": "X", "en": "X"}
      }
    ]
  }
}
```

## エラーレスポンス仕様

### HTTPステータスコード
- `200` - 成功
- `400` - リクエスト不正
- `404` - リソースが見つからない
- `429` - レート制限
- `500` - サーバーエラー

### エラーレスポンス形式
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "ユーザー向けエラーメッセージ",
    "details": {} // 詳細情報（オプション）
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "requestId": "req_12345"
}
```

### エラーコード一覧
- `VALIDATION_ERROR` - 入力値検証エラー
- `PROJECT_NOT_FOUND` - プロジェクトが見つからない
- `RATE_LIMIT_EXCEEDED` - レート制限超過
- `INTERNAL_SERVER_ERROR` - サーバー内部エラー
- `SERVICE_UNAVAILABLE` - サービス利用不可

## セキュリティ考慮事項

### CORS設定
```
Access-Control-Allow-Origin: https://rikumiura.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

### レート制限
- コンタクトフォーム: 10リクエスト/分
- アナリティクス: 100リクエスト/分
- その他GET API: 1000リクエスト/分

### セキュリティヘッダー
```
Content-Security-Policy: default-src 'self'; img-src 'self' data:
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## キャッシュ戦略

### 静的コンテンツ
- HTML: 1時間
- CSS/JS: 1年（ファイル名にハッシュ値含む）
- 画像: 1ヶ月
- フォント: 1年

### API レスポンス
- プロフィール情報: 1時間
- プロジェクト一覧: 1時間  
- アナリティクス: キャッシュなし

### CloudFront設定例
```yaml
CacheBehaviors:
  - PathPattern: "/api/*"
    CachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad" # CachingDisabled
  - PathPattern: "/assets/*"  
    CachePolicyId: "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
  - PathPattern: "/"
    CachePolicyId: "b2884449-e4de-46a7-ac36-70bc7f1ddd6d" # CachingOptimizedForUncompressedObjects
```