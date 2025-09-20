import AdminProtectedRoute from '@/components/routes/admin-protected-route';
import LeaguesHeader from './components/leagues-header';
import LeaguesTable from './components/leagues-table';

export const Leagues = () => {
  return (
    <AdminProtectedRoute>
      <section className="flex flex-col gap-8 px-16 py-8 md:py-10">
        <LeaguesHeader />
        <LeaguesTable />
      </section>
    </AdminProtectedRoute>
  );
};

export default Leagues;
