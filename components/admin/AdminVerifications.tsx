import React, { useState, useEffect } from 'react';
// FIX: Import Database type for strongly typed payloads
import { supabase, type Database } from '../../supabase';

interface VerificationRequest {
  user_id: string;
  email: string;
  full_name: string;
  phone: string;
  firm_name: string;
  enrolment_number: string;
}

const AdminVerifications: React.FC = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;
    
    const fetchRequests = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('onboarding')
            .select('*')
            .eq('status', 'pending');
        if (error) {
            console.error("Error fetching verification requests:", error);
        } else {
            setRequests(data as VerificationRequest[]);
        }
        setLoading(false);
    };

    fetchRequests();
    
    const channel = supabase.channel('public:onboarding')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'onboarding' }, (payload) => {
        console.log('Change received!', payload)
        fetchRequests();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleApprove = async (userId: string) => {
    if (!supabase) return;
    try {
        // FIX: Explicitly type payload to match Supabase schema and resolve 'never' type error.
        const profileUpdate: Database['public']['Tables']['profiles']['Update'] = { status: 'verified' };
        const { error: profileError } = await supabase
            .from('profiles')
            .update(profileUpdate)
            .eq('id', userId);
        if (profileError) throw profileError;

        // FIX: Explicitly type payload to match Supabase schema and resolve 'never' type error.
        const onboardingUpdate: Database['public']['Tables']['onboarding']['Update'] = { status: 'verified' };
        const { error: onboardingError } = await supabase
            .from('onboarding')
            .update(onboardingUpdate)
            .eq('user_id', userId);
        if (onboardingError) throw onboardingError;

        alert('User approved successfully!');
    } catch (error) {
        console.error("Error approving user:", error);
        alert('Failed to approve user.');
    }
  };

  const handleReject = async (userId: string) => {
     if (!supabase) return;
    try {
        // FIX: Explicitly type payload to match Supabase schema and resolve 'never' type error.
        const rejectedUpdate: Database['public']['Tables']['onboarding']['Update'] = { status: 'rejected' };
        const { error } = await supabase
          .from('onboarding')
          .update(rejectedUpdate)
          .eq('user_id', userId);
        if (error) throw error;
        alert('User rejected.');
    } catch (error) {
        console.error("Error rejecting user:", error);
        alert('Failed to reject user.');
    }
  };


  if (loading) {
    return <div>Loading verification requests...</div>;
  }
  
  if(requests.length === 0) {
      return <p className="text-gray-500">No pending verification requests.</p>
  }

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="px-4 py-3">Applicant</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Enrolment No.</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {requests.map(req => (
              <tr key={req.user_id} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{req.full_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{req.firm_name || 'No firm'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                    <p>{req.email}</p>
                    <p>{req.phone}</p>
                </td>
                <td className="px-4 py-3 text-sm">
                    {req.enrolment_number}
                </td>
                <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => handleApprove(req.user_id)} className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-md active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green">
                            Approve
                        </button>
                        <button onClick={() => handleReject(req.user_id)} className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red">
                            Reject
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVerifications;