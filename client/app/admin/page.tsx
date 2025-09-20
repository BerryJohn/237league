import AdminProtectedRoute from '@/components/routes/admin-protected-route';
import {
  AdminHeader,
  AdminStatsGrid,
  AdminMenuGrid,
  AdminActivityFeed,
} from './components';

export default function AdminPanel() {
  return (
    <AdminProtectedRoute>
      <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
        <AdminHeader />
        <AdminStatsGrid />
        <AdminMenuGrid />
        {/* <AdminActivityFeed /> */}
      </section>
    </AdminProtectedRoute>
  );
}
