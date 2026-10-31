export type Platform =
  | 'whatsapp'
  | 'telegram'
  | 'discord'
  | 'facebook'
  | 'instagram'
  | 'reddit'
  | 'signal'
  | 'snapchat'
  | 'other';

export type Category =
  | 'Tech & Programming'
  | 'Business & Startups'
  | 'Crypto & Web3'
  | 'Gaming & Esports'
  | 'Education & Study'
  | 'Entertainment & Movies'
  | 'Humor & Memes'
  | 'Music & Audio'
  | 'Fitness & Health'
  | 'Jobs & Career'
  | 'Buy & Sell'
  | 'Adult / 18+'
  | 'Community & General';

export type Language =
  | 'English'
  | 'Spanish'
  | 'Hindi'
  | 'Arabic'
  | 'Portuguese'
  | 'French'
  | 'German'
  | 'Russian'
  | 'Indonesian'
  | 'All / Multilingual';

export type Region =
  | 'Global'
  | 'United States'
  | 'India'
  | 'United Kingdom'
  | 'Brazil'
  | 'Germany'
  | 'France'
  | 'Canada'
  | 'Australia'
  | 'United Arab Emirates';

export interface GroupComment {
  id: string;
  groupId: string;
  name: string;
  comment: string;
  createdAt: string;
}

export interface Group {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: Platform;
  category: Category;
  language: Language;
  region: Region;
  customTags: string[];
  imageUrl: string;
  bannerUrl?: string;
  memberCount: number;
  growthRate: number;
  clicks: number;
  upvotes: number;
  shares: number;
  bookmarks: number;
  rating: number;
  ratingCount: number;
  comments: GroupComment[];
  verified: boolean;
  featured: boolean;
  isNsfw: boolean;
  isActive: boolean;
  is_active?: boolean;
  safetyScore: number;
  rankScore: number;
  rankGrade: 'A+' | 'A' | 'B' | 'C';
  rankKeywords: string[];
  slug: string;
  metaDescription?: string;
  authorName?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt?: string;
  lastActive: string;
  rulesSummary?: string;
}

export interface NetworkStats {
  totalGroups: number;
  verifiedGroups: number;
  activeMembers: number;
  dailyJoins: number;
}
