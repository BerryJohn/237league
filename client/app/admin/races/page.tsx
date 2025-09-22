import AdminProtectedRoute from '@/components/routes/admin-protected-route';
import RacesHeader from './components/races-header';
import RacesTable from './components/races-table';

export const Races = () => {
  return (
    <AdminProtectedRoute>
      <section className="flex flex-col gap-8 px-16 py-8 md:py-10">
        <RacesHeader />
        <RacesTable />
      </section>
    </AdminProtectedRoute>
  );
};

export default Races;
