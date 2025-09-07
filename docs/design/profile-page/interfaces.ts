// プロフィールページ TypeScript インターフェース定義

// ============================================
// コア エンティティ定義
// ============================================

/**
 * プロフィール情報
 */
export interface Profile {
  readonly id: string;
  readonly name: {
    readonly ja: string;
    readonly en: string;
  };
  readonly title: {
    readonly ja: string;
    readonly en: string;
  };
  readonly description: {
    readonly ja: string;
    readonly en: string;
  };
  readonly profileImage: ImageAsset;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

/**
 * プロジェクト/成果物情報
 */
export interface Project {
  readonly id: string;
  readonly title: {
    readonly ja: string;
    readonly en: string;
  };
  readonly description: {
    readonly ja: string;
    readonly en: string;
  };
  readonly technologies: readonly Technology[];
  readonly images: readonly ImageAsset[];
  readonly links: {
    readonly github?: string;
    readonly demo?: string;
    readonly detail: string; // サブディレクトリページ
  };
  readonly featured: boolean; // トップページ表示優先度
  readonly createdAt: Date;
  readonly publishedAt: Date;
}

/**
 * SNSリンク情報
 */
export interface SocialLink {
  readonly platform: SocialPlatform;
  readonly url: string;
  readonly username: string;
  readonly displayName: {
    readonly ja: string;
    readonly en: string;
  };
  readonly icon: IconAsset;
  readonly isActive: boolean;
}

/**
 * 使用技術情報
 */
export interface Technology {
  readonly name: string;
  readonly category: TechnologyCategory;
  readonly icon?: IconAsset;
  readonly url?: string; // 公式サイト等
}

/**
 * 画像アセット
 */
export interface ImageAsset {
  readonly src: string;
  readonly alt: {
    readonly ja: string;
    readonly en: string;
  };
  readonly width: number;
  readonly height: number;
  readonly format: ImageFormat;
  readonly sizes?: readonly ResponsiveImage[];
}

/**
 * レスポンシブ画像
 */
export interface ResponsiveImage {
  readonly src: string;
  readonly width: number;
  readonly mediaQuery: string; // e.g., "(max-width: 768px)"
}

/**
 * アイコンアセット
 */
export interface IconAsset {
  readonly src: string;
  readonly alt: string;
  readonly size: IconSize;
  readonly format: 'svg' | 'png' | 'webp';
}

// ============================================
// ページコンテンツ構造
// ============================================

/**
 * ページ全体のコンテンツ構造
 */
export interface PageContent {
  readonly meta: PageMeta;
  readonly profile: Profile;
  readonly projects: readonly Project[];
  readonly socialLinks: readonly SocialLink[];
  readonly sections: readonly PageSection[];
}

/**
 * ページメタデータ
 */
export interface PageMeta {
  readonly title: {
    readonly ja: string;
    readonly en: string;
  };
  readonly description: {
    readonly ja: string;
    readonly en: string;
  };
  readonly keywords: readonly string[];
  readonly ogImage: ImageAsset;
  readonly canonicalUrl: string;
  readonly lang: Language;
}

/**
 * ページセクション
 */
export interface PageSection {
  readonly id: SectionId;
  readonly title: {
    readonly ja: string;
    readonly en: string;
  };
  readonly order: number;
  readonly isVisible: boolean;
  readonly scrollTarget: string; // CSS selector
}

// ============================================
// ユーザーインタラクション
// ============================================

/**
 * スクロール位置情報
 */
export interface ScrollPosition {
  readonly x: number;
  readonly y: number;
  readonly percentage: number; // 0-100
  readonly currentSection: SectionId;
}

/**
 * ナビゲーションアクション
 */
export interface NavigationAction {
  readonly type: NavigationType;
  readonly target: string;
  readonly timestamp: Date;
  readonly source: 'scroll' | 'click' | 'keyboard';
}

/**
 * 外部リンククリック情報
 */
export interface ExternalLinkClick {
  readonly url: string;
  readonly platform: SocialPlatform | 'github' | 'other';
  readonly timestamp: Date;
  readonly referrer: string;
}

// ============================================
// レスポンシブデザイン
// ============================================

/**
 * ビューポート情報
 */
export interface Viewport {
  readonly width: number;
  readonly height: number;
  readonly deviceType: DeviceType;
  readonly orientation: 'portrait' | 'landscape';
  readonly pixelRatio: number;
}

/**
 * ブレークポイント設定
 */
export interface BreakpointConfig {
  readonly mobile: number;    // 768px
  readonly tablet: number;    // 1024px  
  readonly desktop: number;   // 1200px
  readonly wide: number;      // 1440px
}

// ============================================
// パフォーマンス監視
// ============================================

/**
 * パフォーマンスメトリクス
 */
export interface PerformanceMetrics {
  readonly firstContentfulPaint: number;
  readonly largestContentfulPaint: number;
  readonly cumulativeLayoutShift: number;
  readonly totalBlockingTime: number;
  readonly timeToInteractive: number;
  readonly timestamp: Date;
}

/**
 * リソース読み込み情報
 */
export interface ResourceLoadInfo {
  readonly type: ResourceType;
  readonly url: string;
  readonly size: number; // bytes
  readonly loadTime: number; // ms
  readonly fromCache: boolean;
  readonly timestamp: Date;
}

// ============================================
// エラーハンドリング
// ============================================

/**
 * アプリケーションエラー
 */
export interface AppError {
  readonly code: ErrorCode;
  readonly message: {
    readonly ja: string;
    readonly en: string;
  };
  readonly details?: unknown;
  readonly timestamp: Date;
  readonly stack?: string;
}

/**
 * ネットワークエラー
 */
export interface NetworkError extends AppError {
  readonly statusCode: number;
  readonly url: string;
  readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

// ============================================
// Enum / Union Types
// ============================================

export type SocialPlatform = 'note' | 'zenn' | 'twitter' | 'github';

export type TechnologyCategory = 
  | 'frontend' 
  | 'backend' 
  | 'database' 
  | 'cloud' 
  | 'tool' 
  | 'language';

export type ImageFormat = 'webp' | 'jpg' | 'png' | 'svg';

export type IconSize = 'small' | 'medium' | 'large';

export type Language = 'ja' | 'en';

export type SectionId = 
  | 'header' 
  | 'profile' 
  | 'projects' 
  | 'social' 
  | 'contact';

export type NavigationType = 
  | 'scroll' 
  | 'section-jump' 
  | 'external-link' 
  | 'project-detail';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export type ResourceType = 
  | 'html' 
  | 'css' 
  | 'javascript' 
  | 'image' 
  | 'font';

export type ErrorCode = 
  | 'NETWORK_ERROR'
  | 'RESOURCE_NOT_FOUND' 
  | 'PARSE_ERROR'
  | 'RUNTIME_ERROR'
  | 'UNKNOWN_ERROR';

// ============================================
// Utility Types
// ============================================

/**
 * 部分的に必須のフィールドを指定
 */
export type PartiallyRequired<T, K extends keyof T> = 
  Omit<T, K> & Required<Pick<T, K>>;

/**
 * 深い readonly 型
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * 多言語対応文字列型
 */
export type LocalizedString = {
  readonly ja: string;
  readonly en: string;
};

// ============================================
// 設定・定数
// ============================================

/**
 * アプリケーション設定
 */
export interface AppConfig {
  readonly site: {
    readonly name: LocalizedString;
    readonly url: string;
    readonly domain: string;
  };
  readonly features: {
    readonly smoothScroll: boolean;
    readonly lazyLoading: boolean;
    readonly analytics: boolean;
  };
  readonly performance: {
    readonly maxImageSize: number; // MB
    readonly cacheExpiry: number;  // seconds
  };
  readonly breakpoints: BreakpointConfig;
}