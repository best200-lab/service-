import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { AdminUsersIcon, AdminVerifyIcon } from '../icons';
import DashboardCard from '../DashboardCard'; // Re-using the existing card component

const AdminOverview: React.FC = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [pendingVerifications, setPendingVerifications] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;

    const fetchCounts = async () => {
      try {
        const { count: userCount, error: userError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        if(userError) throw userError;
        setUserCount(userCount || 0);

        const { count: verificationCount, error: verificationError } = await supabase
            .from('onboarding')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');
        if(verificationError) throw verificationError;
        setPendingVerifications(verificationCount || 0);

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
