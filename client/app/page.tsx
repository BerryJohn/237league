import { redirect } from 'next/navigation';
import { defaultLocale } from '@/src/i18n';

// This page only renders when the user is at the root path
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
