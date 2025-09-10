import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase';
import { AdminUsersIcon, AdminVerifyIcon } from '../icons';
import DashboardCard from '../DashboardCard'; // Re-using the existing card component

const AdminOverview: React.FC = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [pendingVerifications, setPendingVerifications] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore) return;

    const fetchCounts = async () => {
      try {
        const usersSnapshot = await firestore.collection('users').get();
        setUserCount(usersSnapshot.size);

        const verificationsSnapshot = await firestore.collection('onboarding').where('status', '==', 'pending').get();
        setPendingVerifications(verificationsSnapshot.size);
      } catch (error) {
        console.error("Error fetching admin overview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return <div>Loading overview...</div>;
  }

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <DashboardCard
        icon={<AdminUsersIcon className="w-6 h-6" />}
        title="Total Users"
        value={userCount.toString()}
      />
      <DashboardCard
        icon={<AdminVerifyIcon className="w-6 h-6" />}
        title="Pending Verifications"
        value={pendingVerifications.toString()}
      />
    </div>
  );
};

export default AdminOverview;