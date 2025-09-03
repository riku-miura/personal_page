# プロフィールページ　要件
## 概要
- 三浦陸のプロフィールをまとめた静的ページです
- 成果物、リンクが表示されます
- 1ページのみで下にスクロールしていくと項目が移り変わるようなイメージです
### ページのスクロールイメージ
- タイトルとスクロールリンク
- 成果物
    - Githubへのリンクと成果物の個別ページへのリンクが表示される
- SNS
    - note、zenn、Xへのリンクが表示される
## デザインイメージ
- ミニマルフラットデザイン
- 背景は白で、文字は黒
- Use "Inter" for English text and "Noto Sans JP" for Japanese text, minimal flat design, few colors, clean typography, large whitespace.
- モダンな感じのページにしたい
## 技術
- AWSの利用を想定する
    - S3：静的コンテンツ配置
    - CloudFront：CDN配信 & HTTPS化
    - Route53：DNS管理
        - ドメインは「rikumiura.com」を取得中
- サブディレクトリ方式
    - 成果物の個別ページは「rikumiura.com/xxx」に配置される
- AWSのCLIコマンドは利用できます