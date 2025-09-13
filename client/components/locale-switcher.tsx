'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@heroui/button';
import { locales } from '@/src/i18n';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="flex gap-1">
      {locales.map((loc) => (
        <Button
          key={loc}
          size="sm"
          variant={locale === loc ? 'solid' : 'light'}
          color={locale === loc ? 'primary' : 'default'}
          onClick={() => handleLocaleChange(loc)}
          className="min-w-unit-12 text-xs font-medium"
        >
          {loc.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
