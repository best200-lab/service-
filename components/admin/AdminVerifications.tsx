import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase';

interface VerificationRequest {
  userId: string;
  email: string;
  fullName: string;
  phone: string;
  firmName: string;
  sealUrl: string;
}

const AdminVerifications: React.FC = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore) return;
    const unsubscribe = firestore.collection('onboarding')
      .where('status', '==', 'pending')
      .onSnapshot(snapshot => {
        const requestsData = snapshot.docs.map(doc => doc.data() as VerificationRequest);
        setRequests(requestsData);
        setLoading(false);
      }, error => {
        console.error("Error fetching verification requests:", error);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (userId: string) => {
    if (!firestore) return;
    try {
        const userDocRef = firestore.collection('users').doc(userId);
        const onboardingDocRef = firestore.collection('onboarding').doc(userId);
        await firestore.runTransaction(async (transaction) => {
            transaction.update(userDocRef, { status: 'verified' });
            transaction.update(onboardingDocRef, { status: 'verified' });
        });
        alert('User approved successfully!');
    } catch (error) {
        console.error("Error approving user:", error);
        alert('Failed to approve user.');
    }
  };

  const handleReject = async (userId: string) => {
     if (!firestore) return;
    try {
        const onboardingDocRef = firestore.collection('onboarding').doc(userId);
        await onboardingDocRef.update({ status: 'rejected' });
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
              <th className="px-4 py-3">Seal</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {requests.map(req => (
              <tr key={req.userId} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{req.fullName}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{req.firmName || 'No firm'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                    <p>{req.email}</p>
                    <p>{req.phone}</p>
                </td>
                <td className="px-4 py-3 text-sm">
                    <a href={req.sealUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">View Document</a>
                </td>
                <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => handleApprove(req.userId)} className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-md active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green">
                            Approve
                        </button>
                        <button onClick={() => handleReject(req.userId)} className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red">
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