import { NewsArticle } from '@/types';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'featured' | 'regular';
}

export const NewsCard = ({ article, variant = 'regular' }: NewsCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'race-results':
        return 'bg-success-500 text-white';
      case 'announcements':
        return 'bg-primary-500 text-white';
      case 'driver-spotlight':
        return 'bg-warning-500 text-black';
      case 'technical':
        return 'bg-secondary-500 text-white';
      default:
        return 'bg-default-500 text-white';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: variant === 'featured' ? 'numeric' : undefined,
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  if (variant === 'featured') {
    return (
      <div className="group">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 h-full">
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            <div className="lg:w-1/3 flex-shrink-0">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-48 lg:h-full object-cover rounded-lg"
              />
            </div>
            <div className="lg:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-primary-500 text-white text-sm rounded-full">
                    Featured
                  </span>
                  <span className="text-sm text-foreground-500">
                    {article.category.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-500 transition-colors">
                  {article.title}
                </h3>
                <p className="text-foreground-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">{article.author.name}</p>
                    <p className="text-xs text-foreground-500">
                      {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-foreground-500">
                  {article.viewCount} views
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group bg-content1 rounded-xl overflow-hidden shadow-medium hover:shadow-large transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(article.category)}`}
          >
            {article.category.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-foreground-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 mb-3">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-default-100 dark:bg-default-50 text-xs text-foreground-600 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{article.author.name}</p>
              <p className="text-xs text-foreground-500">
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </div>
          <div className="text-xs text-foreground-500">
            {article.viewCount} views
          </div>
        </div>
      </div>
    </article>
  );
};
