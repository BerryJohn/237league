import { title, typography } from '@/components/primitives';
import { NewsCard } from '@/components/news-card';
import { NewsArticle } from '@/types';

// Mock news data for demonstration
const mockNewsData = [
  {
    id: '1',
    title: 'Season 3 Championship Results: Historic Battle at Le Mans',
    excerpt:
      'After 24 grueling hours of racing, the Season 3 championship concluded with one of the closest finishes in 237League history. Read about the dramatic final laps that decided the championship.',
    content: '',
    imageUrl: '/brand/logo.png', // Using existing logo as placeholder
    author: {
      id: 'pueblooo237',
      name: 'Pueblooo237',
      avatar: '/brand/logo.png',
    },
    category: 'race-results' as const,
    tags: ['championship', 'le-mans', 'season-3'],
    publishedAt: new Date('2025-09-10T14:30:00Z'),
    updatedAt: new Date('2025-09-10T14:30:00Z'),
    isPublished: true,
    isFeatured: true,
    viewCount: 1247,
  },
  {
    id: '2',
    title: 'New Track Addition: Silverstone Circuit Coming to 237League',
    excerpt:
      'Get ready for high-speed action on the legendary British circuit. Silverstone will be added to our rotation starting next month with updated physics and weather systems.',
    content: '',
    imageUrl: '/brand/logo.png',
    author: {
      id: 'admin',
      name: '237League Team',
      avatar: '/brand/logo.png',
    },
    category: 'announcements' as const,
    tags: ['silverstone', 'new-track', 'update'],
    publishedAt: new Date('2025-09-08T10:00:00Z'),
    updatedAt: new Date('2025-09-08T10:00:00Z'),
    isPublished: true,
    isFeatured: false,
    viewCount: 892,
  },
  {
    id: '3',
    title: 'Driver Spotlight: Rookie Sensation Takes Podium',
    excerpt:
      'Meet our newest rising star who went from last place in their debut race to a stunning podium finish in just three events. An inspiring journey of determination and skill.',
    content: '',
    imageUrl: '/brand/logo.png',
    author: {
      id: 'reporter1',
      name: 'Racing Reporter',
      avatar: '/brand/logo.png',
    },
    category: 'driver-spotlight' as const,
    tags: ['rookie', 'podium', 'inspiration'],
    publishedAt: new Date('2025-09-05T16:45:00Z'),
    updatedAt: new Date('2025-09-05T16:45:00Z'),
    isPublished: true,
    isFeatured: false,
    viewCount: 567,
  },
  {
    id: '4',
    title: 'Technical Update: Enhanced Damage Model Coming Soon',
    excerpt:
      'Our development team has been working on a more realistic damage model that will affect car performance. Learn about the upcoming changes and how they will impact racing strategy.',
    content: '',
    imageUrl: '/brand/logo.png',
    author: {
      id: 'dev-team',
      name: 'Development Team',
      avatar: '/brand/logo.png',
    },
    category: 'technical' as const,
    tags: ['damage-model', 'realism', 'update'],
    publishedAt: new Date('2025-09-02T12:00:00Z'),
    updatedAt: new Date('2025-09-02T12:00:00Z'),
    isPublished: true,
    isFeatured: false,
    viewCount: 423,
  },
  {
    id: '5',
    title: 'Community Event: Charity Race for Local Hospital',
    excerpt:
      "Join us for a special charity event where all donations will go to supporting our local children's hospital. Racing for a cause has never been more meaningful.",
    content: '',
    imageUrl: '/brand/logo.png',
    author: {
      id: 'community',
      name: 'Community Manager',
      avatar: '/brand/logo.png',
    },
    category: 'general' as const,
    tags: ['charity', 'community', 'special-event'],
    publishedAt: new Date('2025-08-28T09:30:00Z'),
    updatedAt: new Date('2025-08-28T09:30:00Z'),
    isPublished: true,
    isFeatured: false,
    viewCount: 734,
  },
];

export default function NewsPage() {
  const featuredNews = mockNewsData.filter((article) => article.isFeatured);
  const regularNews = mockNewsData.filter((article) => !article.isFeatured);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className={title({ size: 'lg' })}>237League News</h1>
        <p
          className={typography({
            class: 'mt-4 text-foreground-600 max-w-2xl mx-auto',
          })}
        >
          Stay updated with the latest news, race results, driver spotlights,
          and announcements from the 237League community.
        </p>
      </div>

      {/* Featured News Section */}
      {featuredNews.length > 0 && (
        <div className="mb-16">
          <h2
            className={typography({
              size: 'xl',
              weight: 'semibold',
              class: 'mb-8',
            })}
          >
            Featured Stories
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.map((article) => (
              <NewsCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        </div>
      )}

      {/* Regular News Grid */}
      <div className="mb-8">
        <h2
          className={typography({
            size: 'xl',
            weight: 'semibold',
            class: 'mb-8',
          })}
        >
          Latest News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {regularNews.map((article) => (
            <NewsCard key={article.id} article={article} variant="regular" />
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center">
        <button className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
          Load More Articles
        </button>
      </div>
    </div>
  );
}
