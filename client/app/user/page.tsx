import UserProtectedRoute from '@/components/routes/user-protected-route';
import { UserProfile } from './components/user-profile';

export default function UserPage() {
  return (
    <UserProtectedRoute>
      <UserProfile isOwnProfile={true} />
    </UserProtectedRoute>
  );
}
