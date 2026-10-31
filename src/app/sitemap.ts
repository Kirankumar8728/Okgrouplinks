import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/src/lib/rank';
import { getGroups } from '@/src/lib/groups-dal';
import { getVisibleTaxonomyCategories, PLATFORM_CANONICAL_HUBS } from '@/src/lib/taxonomy';
import { getGroupUrlPath } from '@/src/utils/helpers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Platform hub routes
  const platformRoutes: MetadataRoute.Sitemap = Object.values(PLATFORM_CANONICAL_HUBS).map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // Category hub routes
  const categoryRoutes: MetadataRoute.Sitemap = getVisibleTaxonomyCategories().map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Dynamic group detail routes
  const groupsResult = await getGroups({ limit: 500, activeOnly: true });
  const groupRoutes: MetadataRoute.Sitemap = (groupsResult.groups || []).map((group) => ({
    url: `${baseUrl}${getGroupUrlPath(group)}`,
    lastModified: new Date(group.updatedAt || group.createdAt || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...platformRoutes, ...categoryRoutes, ...groupRoutes];
}

