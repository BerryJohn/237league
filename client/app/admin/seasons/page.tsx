import AdminProtectedRoute from '@/components/routes/admin-protected-route';
import SeasonsHeader from './components/seasons-header';
import SeasonsTable from './components/seasons-table';

export const Seasons = () => {
  return (
    <AdminProtectedRoute>
      <section className="flex flex-col gap-8 px-16 py-8 md:py-10">
        <SeasonsHeader />
        <SeasonsTable />
      </section>
    </AdminProtectedRoute>
  );
};

export default Seasons;
