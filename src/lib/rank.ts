import { Metadata } from 'next';
import { Group } from '@/src/types';

export const SITE_NAME = 'Group Links';
export const SITE_TAGLINE = 'Social Community & Group Link Hub';

export function getSiteUrl(): string {
  const raw =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
    'https://grouplinks.app';

  let cleaned = raw.trim();
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = `https://${cleaned}`;
  }
  return cleaned.replace(/\/+$/, '');
}

export function buildCanonicalUrl(pathnameOrUrl: string = ''): string {
  const siteUrl = getSiteUrl();
  if (!pathnameOrUrl || pathnameOrUrl === '/') return siteUrl;
  const path = pathnameOrUrl.startsWith('/') ? pathnameOrUrl : `/${pathnameOrUrl}`;
  return `${siteUrl}${path}`;
}

export function generateWebSiteJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Group Links',
    url: siteUrl,
    description: 'Discover, share, and join active WhatsApp, Telegram, Discord, and social communities.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Group Links',
    url: siteUrl,
    logo: `${siteUrl}/assets/aistudio/app__1__c063602f.webp`,
    sameAs: ['https://twitter.com/grouplinks'],
  };
}

export function generateBreadcrumbsJsonLd(items: { name: string; url: string }[]) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: (items || []).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
    })),
  };
}

export function generateCollectionPageJsonLd(title: string, description: string, pathname: string, groups: Group[] = []) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: `${siteUrl}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: (groups || []).map((g, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: g.title,
        url: `${siteUrl}/group/${g.slug || g.id}`,
      })),
    },
  };
}

export function generateGroupJsonLd(group: Group) {
  const siteUrl = getSiteUrl();
  if (!group) return {};
  return {
    '@context': 'https://schema.org',
    '@type': 'SocialMediaPosting',
    headline: group.title,
    articleBody: group.description,
    image: group.imageUrl,
    url: `${siteUrl}/group/${group.slug || group.id}`,
    datePublished: group.publishedAt || group.createdAt,
    author: {
      '@type': 'Organization',
      name: group.platform,
    },
  };
}

export function buildPageMetadata(props: {
  title: string;
  description: string;
  pathname?: string;
  keywords?: string[];
  imageUrl?: string;
  noIndex?: boolean;
}): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = buildCanonicalUrl(props.pathname || '');
  const image = props.imageUrl || `${siteUrl}/assets/aistudio/app__1__c063602f.webp`;

  return {
    title: props.title,
    description: props.description,
    keywords: props.keywords,
    robots: props.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    alternates: {
      canonical,
    },
    openGraph: {
      title: props.title,
      description: props.description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: props.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: props.title,
      description: props.description,
      images: [image],
    },
  };
}
