import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Curated bookmarks & a business directory',
      description: 'Save and discover curated links, resources and collections — and browse a directory of businesses, services and places.',
      openGraphTitle: 'Curated bookmarks & a business directory',
      openGraphDescription: 'Bookmark the best links and discover great businesses, services and places — all in one curated home.',
      keywords: ['social bookmarking', 'curated links', 'collections', 'business directory', 'local discovery', 'listings'],
    },
    hero: {
      badge: 'Curated bookmarks & local discovery',
      title: ['Save the best links.', 'Discover great places.'],
      description: 'A curated home for the links worth keeping and the businesses worth knowing — bookmark resources into collections and browse a living directory of services and places.',
      primaryCta: { label: 'Browse collections', href: '/sbm' },
      secondaryCta: { label: 'Open the directory', href: '/listing' },
      searchPlaceholder: 'Search bookmarks, collections, businesses and places',
      focusLabel: 'Explore',
      featureCardBadge: 'fresh this week',
      featureCardTitle: 'The latest saves and listings shape the homepage.',
      featureCardDescription: 'New bookmarks and businesses stay front and center, so discovery always feels current.',
    },
    intro: {
      badge: 'What you can do here',
      title: 'Two ways to discover: curated collections and a real directory.',
      paragraphs: [
        'Bookmark links, tools and references into clean collections you can revisit and share, instead of losing them in a browser tab graveyard.',
        'Browse a directory of businesses, services and places with categories, ratings and the details you need to take action.',
        'Move naturally between a saved resource and a nearby business — discovery and doing, in one connected experience.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Curated bookmark collections with tags, sources and notes.',
        'A browseable business directory with categories and locations.',
        'Search across saved links and listings in one place.',
        'Fast, calm browsing built for finding the good stuff.',
      ],
      primaryLink: { label: 'Browse collections', href: '/sbm' },
      secondaryLink: { label: 'Open the directory', href: '/listing' },
    },
    cta: {
      badge: 'Add yours',
      title: 'Got a great link or a business to list?',
      description: 'Save a resource to a collection or add your business to the directory — and help others discover what you already know.',
      primaryCta: { label: 'Add a bookmark', href: '/create' },
      secondaryCta: { label: 'List a business', href: '/create' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest additions in this section.',
    },
  },
  about: {
    badge: 'Our story',
    title: 'A calmer way to save links and discover places.',
    description: `${slot4BrandConfig.siteName} brings curated bookmarking and a real business directory together, so finding a useful resource and finding a great local business feel like one experience.`,
    paragraphs: [
      'On one side, curated collections keep the best links, tools and references organized and easy to revisit — not buried in browser tabs.',
      'On the other, a living directory of businesses, services and places makes local discovery practical, with categories, locations and clear ways to take action.',
    ],
    values: [
      {
        title: 'Curated, not cluttered',
        description: 'Bookmarks live in clean collections with tags, sources and notes, so the good stuff stays findable.',
      },
      {
        title: 'A directory that helps',
        description: 'Listings carry the details that matter — category, location, contact and quick actions — for real-world decisions.',
      },
      {
        title: 'Discovery in one place',
        description: 'Search and browse across saved links and businesses together, with a fast, distraction-free rhythm.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Suggest a collection or add your business.',
    description: 'Tell us about a resource worth bookmarking, a collection idea, or a business you want listed in the directory — and we will route it the right way.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search bookmarks & listings',
      description: 'Search across curated bookmarks, collections, and the business directory in one place.',
    },
    hero: {
      badge: 'Search everything',
      title: 'Find saved links, collections and businesses faster.',
      description: 'Use keywords, categories and content types to search across bookmarks and the directory at the same time.',
      placeholder: 'Search bookmarks, collections, businesses or places',
    },
    resultsTitle: 'Latest across bookmarks & directory',
  },
  create: {
    metadata: {
      title: 'Add a bookmark or listing',
      description: 'Save a link to a collection or add a business to the directory.',
    },
    locked: {
      badge: 'Member access',
      title: 'Sign in to add bookmarks and listings.',
      description: 'Use your account to save links into collections and add businesses to the directory.',
    },
    hero: {
      badge: 'Add to the library',
      title: 'Save a link or list a business.',
      description: 'Pick what you are adding, fill in the details, and publish it to a collection or the directory.',
    },
    formTitle: 'Details',
    submitLabel: 'Publish',
    successTitle: 'Added successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Sign in to your account.',
      badge: 'Member access',
      title: 'Welcome back to your collections.',
      description: 'Sign in to keep saving links, managing collections, and adding businesses to the directory.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then sign in.',
      success: 'Signed in. Redirecting…',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your account.',
      badge: 'Join in',
      title: 'Create your account and start curating.',
      description: 'Create an account to save bookmarks into collections and add businesses to the directory.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created. Redirecting…',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested listings',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
