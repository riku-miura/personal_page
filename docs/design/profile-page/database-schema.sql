-- プロフィールページ データベーススキーマ設計
-- 注意: 現在は静的サイトのため、データベースは使用しない
-- 将来的な動的機能追加（CMS、アナリティクス、コンタクトフォーム）を想定した設計

-- ============================================
-- プロフィール・基本情報テーブル
-- ============================================

-- プロフィール情報
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ja VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    title_ja VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    description_ja TEXT NOT NULL,
    description_en TEXT NOT NULL,
    profile_image_url VARCHAR(500),
    email VARCHAR(255),
    location_ja VARCHAR(100),
    location_en VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- プロジェクト・成果物関連テーブル
-- ============================================

-- プロジェクト情報
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) NOT NULL UNIQUE, -- URL用（例: "portfolio-site"）
    title_ja VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    description_ja TEXT NOT NULL,
    description_en TEXT NOT NULL,
    full_description_ja TEXT,
    full_description_en TEXT,
    github_url VARCHAR(500),
    demo_url VARCHAR(500),
    detail_page_url VARCHAR(500), -- サブディレクトリページ
    is_featured BOOLEAN DEFAULT FALSE, -- トップページ表示優先度
    is_published BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 技術・スキル情報
CREATE TABLE technologies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL, -- frontend, backend, database, cloud, tool, language
    icon_url VARCHAR(500),
    official_url VARCHAR(500),
    display_color VARCHAR(7), -- HEX color code
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- プロジェクトと技術の関連テーブル
CREATE TABLE project_technologies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    technology_id UUID NOT NULL REFERENCES technologies(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, technology_id)
);

-- プロジェクト画像
CREATE TABLE project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text_ja VARCHAR(200),
    alt_text_en VARCHAR(200),
    width INTEGER,
    height INTEGER,
    image_type VARCHAR(20), -- thumbnail, screenshot, diagram
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SNS・外部リンク関連テーブル
-- ============================================

-- SNSリンク情報
CREATE TABLE social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform VARCHAR(50) NOT NULL, -- note, zenn, twitter, github, linkedin
    url VARCHAR(500) NOT NULL,
    username VARCHAR(100),
    display_name_ja VARCHAR(100) NOT NULL,
    display_name_en VARCHAR(100) NOT NULL,
    icon_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- コンタクト・問い合わせ関連テーブル
-- ============================================

-- コンタクトフォーム送信履歴
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(300) NOT NULL,
    message TEXT NOT NULL,
    language VARCHAR(10) DEFAULT 'ja', -- ja, en
    ip_address INET,
    user_agent TEXT,
    referrer VARCHAR(500),
    status VARCHAR(20) DEFAULT 'received', -- received, processing, replied, spam
    replied_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- アナリティクス・統計関連テーブル
-- ============================================

-- ページビュー統計
CREATE TABLE pageviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_path VARCHAR(500) NOT NULL,
    referrer VARCHAR(500),
    user_agent TEXT,
    ip_address INET,
    country_code VARCHAR(10),
    device_type VARCHAR(20), -- mobile, tablet, desktop
    browser VARCHAR(50),
    os VARCHAR(50),
    viewport_width INTEGER,
    viewport_height INTEGER,
    session_id UUID,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ユーザーインタラクション統計
CREATE TABLE user_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID,
    interaction_type VARCHAR(50) NOT NULL, -- scroll, click, external_link
    target_element VARCHAR(200), -- セクション名、リンクURL等
    target_value VARCHAR(500), -- クリック先URL等
    page_path VARCHAR(500) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 外部リンククリック統計
CREATE TABLE external_link_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url VARCHAR(500) NOT NULL,
    platform VARCHAR(50), -- github, note, zenn, twitter, other
    source_page VARCHAR(500) NOT NULL,
    referrer VARCHAR(500),
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- システム管理関連テーブル
-- ============================================

-- サイト設定
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE, -- 公開APIで取得可能か
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- コンテンツ更新履歴
CREATE TABLE content_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type VARCHAR(50) NOT NULL, -- profile, project, social_link
    content_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL, -- create, update, delete, publish
    changed_fields JSONB,
    old_values JSONB,
    new_values JSONB,
    updated_by VARCHAR(100), -- 更新者（将来の管理機能用）
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- インデックス設定
-- ============================================

-- パフォーマンス最適化用インデックス
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_featured ON projects(is_featured, is_published);
CREATE INDEX idx_projects_published_at ON projects(published_at DESC) WHERE is_published = TRUE;
CREATE INDEX idx_project_technologies_project_id ON project_technologies(project_id);
CREATE INDEX idx_project_images_project_id ON project_images(project_id, sort_order);
CREATE INDEX idx_social_links_active ON social_links(is_active, sort_order);

-- アナリティクス用インデックス
CREATE INDEX idx_pageviews_timestamp ON pageviews(timestamp DESC);
CREATE INDEX idx_pageviews_page_path ON pageviews(page_path, timestamp DESC);
CREATE INDEX idx_user_interactions_session ON user_interactions(session_id, timestamp);
CREATE INDEX idx_external_links_platform ON external_link_clicks(platform, timestamp DESC);

-- 管理用インデックス
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status, created_at DESC);
CREATE INDEX idx_content_history_content ON content_history(content_type, content_id, timestamp DESC);

-- ============================================
-- データ保持ポリシー用関数
-- ============================================

-- 古いアナリティクスデータを削除（12ヶ月経過後）
CREATE OR REPLACE FUNCTION cleanup_old_analytics() 
RETURNS void AS $$
BEGIN
    DELETE FROM pageviews WHERE timestamp < NOW() - INTERVAL '12 months';
    DELETE FROM user_interactions WHERE timestamp < NOW() - INTERVAL '12 months';
    DELETE FROM external_link_clicks WHERE timestamp < NOW() - INTERVAL '12 months';
END;
$$ LANGUAGE plpgsql;

-- 定期実行用（cron等で月次実行）
-- SELECT cleanup_old_analytics();

-- ============================================
-- サンプルデータ（開発用）
-- ============================================

-- プロフィール情報サンプル
INSERT INTO profiles (
    name_ja, name_en, 
    title_ja, title_en,
    description_ja, description_en,
    email, location_ja, location_en
) VALUES (
    '三浦陸', 'Riku Miura',
    'Webデベロッパー', 'Web Developer', 
    'フロントエンドを中心とした開発を行っています', 'Frontend-focused web development',
    'contact@rikumiura.com', '東京', 'Tokyo'
);

-- 技術情報サンプル
INSERT INTO technologies (name, category, display_color) VALUES 
('HTML5', 'frontend', '#E34F26'),
('CSS3', 'frontend', '#1572B6'),
('JavaScript', 'frontend', '#F7DF1E'),
('TypeScript', 'frontend', '#3178C6'),
('React', 'frontend', '#61DAFB'),
('Next.js', 'frontend', '#000000'),
('Node.js', 'backend', '#339933'),
('AWS', 'cloud', '#FF9900'),
('PostgreSQL', 'database', '#336791'),
('Git', 'tool', '#F05032');

-- SNSリンクサンプル
INSERT INTO social_links (platform, url, username, display_name_ja, display_name_en, sort_order) VALUES
('note', 'https://note.com/riku_miura', 'riku_miura', 'note', 'note', 1),
('zenn', 'https://zenn.dev/riku_miura', 'riku_miura', 'Zenn', 'Zenn', 2),
('twitter', 'https://twitter.com/riku_miura', 'riku_miura', 'X', 'X', 3),
('github', 'https://github.com/riku-miura', 'riku-miura', 'GitHub', 'GitHub', 4);

-- サイト設定サンプル
INSERT INTO site_settings (setting_key, setting_value, description, is_public) VALUES
('site_name_ja', 'Riku Miura', 'サイト名（日本語）', TRUE),
('site_name_en', 'Riku Miura', 'Site name (English)', TRUE),
('site_description_ja', '三浦陸のプロフィールサイト', 'サイト説明（日本語）', TRUE),
('site_description_en', 'Profile site of Riku Miura', 'Site description (English)', TRUE),
('contact_email', 'contact@rikumiura.com', '問い合わせメールアドレス', FALSE),
('analytics_enabled', 'true', 'アナリティクス機能の有効/無効', FALSE);

-- ============================================
-- ビュー定義（よく使用するクエリ）
-- ============================================

-- 公開中のプロジェクト一覧（フィーチャー順）
CREATE VIEW published_projects AS
SELECT 
    p.*,
    array_agg(t.name ORDER BY t.name) AS technologies,
    COUNT(pi.id) AS image_count
FROM projects p
LEFT JOIN project_technologies pt ON p.id = pt.project_id
LEFT JOIN technologies t ON pt.technology_id = t.id
LEFT JOIN project_images pi ON p.id = pi.project_id
WHERE p.is_published = TRUE
GROUP BY p.id
ORDER BY p.is_featured DESC, p.sort_order, p.published_at DESC;

-- アクティブなSNSリンク一覧
CREATE VIEW active_social_links AS
SELECT *
FROM social_links 
WHERE is_active = TRUE
ORDER BY sort_order;

-- 月別ページビュー統計
CREATE VIEW monthly_pageviews AS
SELECT 
    date_trunc('month', timestamp) AS month,
    page_path,
    COUNT(*) AS views,
    COUNT(DISTINCT ip_address) AS unique_visitors
FROM pageviews
GROUP BY date_trunc('month', timestamp), page_path
ORDER BY month DESC, views DESC;