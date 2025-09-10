
import React from 'react';
import { UserCircleIcon, CheckCircleIcon } from '../components/icons';

const Profile: React.FC = () => {
    // Mock user data for display
    const user = {
        name: 'Adebayo Adewale',
        email: 'adebayo.a@example.com',
        barNumber: 'NBA/LAG/12345',
        practiceArea: 'Litigation',
        jurisdiction: 'Lagos',
        firm: 'Adewale & Co.',
        isVerified: true,
        avatar: 'https://i.pravatar.cc/150?u=1',
        bio: 'A seasoned litigation expert with over 15 years of experience in commercial and civil disputes. Specializing in high-stakes corporate litigation and arbitration.'
    };

    return (
        <>
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                My Profile
            </h1>
            <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                    <div className="flex-shrink-0">
                        <img className="w-32 h-32 rounded-full" src={user.avatar} alt={user.name} />
                        <button className="w-full mt-2 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary-700 border border-transparent rounded-lg active:bg-primary-700 hover:bg-primary-800 focus:outline-none focus:shadow-outline-primary">
                            Change Photo
                        </button>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center justify-center md:justify-start">
                            {user.name}
                            {user.isVerified && <CheckCircleIcon className="w-6 h-6 text-blue-500 ml-2" title="Verified" />}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{user.firm}</p>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">{user.bio}</p>
                        
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <span className="font-semibold text-gray-600 dark:text-gray-400">Email:</span>
                                <p className="text-gray-800 dark:text-gray-200">{user.email}</p>
                            </div>
                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <span className="font-semibold text-gray-600 dark:text-gray-400">Bar Number:</span>
                                <p className="text-gray-800 dark:text-gray-200">{user.barNumber}</p>
                            </div>
                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <span className="font-semibold text-gray-600 dark:text-gray-400">Primary Practice Area:</span>
                                <p className="text-gray-800 dark:text-gray-200">{user.practiceArea}</p>
                            </div>
                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <span className="font-semibold text-gray-600 dark:text-gray-400">Jurisdiction:</span>
                                <p className="text-gray-800 dark:text-gray-200">{user.jurisdiction}</p>
                            </div>
                        </div>
                         <button className="mt-6 px-6 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-primary-800 border border-transparent rounded-lg active:bg-primary-800 hover:bg-primary-900 focus:outline-none focus:shadow-outline-primary">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
