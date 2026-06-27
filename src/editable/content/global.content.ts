import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Bookmarks & business directory',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Bookmarks & directory',
    primaryLinks: [
      { label: 'Collections', href: '/sbm' },
      { label: 'Directory', href: '/listing' },
      { label: 'Search', href: '/search' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start exploring', href: '/' },
      secondary: { label: 'Add a listing', href: '/create' },
    },
  },
  footer: {
    tagline: 'Curated links and a living business directory',
    description:
      'Save and discover curated links, resources and collections — and browse a directory of businesses, services and places worth knowing about.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Collections', href: '/sbm' },
          { label: 'Bookmarks', href: '/sbm' },
          { label: 'Directory', href: '/listing' },
          { label: 'Search', href: '/search' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Curated bookmarks & a living business directory.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Added',
  },
} as const
