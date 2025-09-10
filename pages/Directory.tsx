
import React, { useState, useMemo } from 'react';
import { MOCK_USERS } from '../constants';
import { User, PracticeArea, Jurisdiction } from '../types';
import { CheckCircleIcon } from '../components/icons';

const UserCard: React.FC<{ user: User }> = ({ user }) => (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 text-center">
        <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mb-4" />
        <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 flex items-center">
            {user.name}
            {user.isVerified && <CheckCircleIcon className="w-5 h-5 text-blue-500 ml-2" title="Verified" />}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.firm}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{user.practiceArea}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{user.jurisdiction}</p>
        <button className="mt-4 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary-700 border border-transparent rounded-lg active:bg-primary-700 hover:bg-primary-800 focus:outline-none focus:shadow-outline-primary">
            Message
        </button>
    </div>
);

const Directory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [practiceAreaFilter, setPracticeAreaFilter] = useState('');
    const [jurisdictionFilter, setJurisdictionFilter] = useState('');

    const filteredUsers = useMemo(() => {
        return MOCK_USERS.filter(user =>
            (searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (practiceAreaFilter === '' || user.practiceArea === practiceAreaFilter) &&
            (jurisdictionFilter === '' || user.jurisdiction === jurisdictionFilter)
        );
    }, [searchTerm, practiceAreaFilter, jurisdictionFilter]);

    return (
        <>
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Lawyer Directory
            </h1>
            <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <select
                        value={practiceAreaFilter}
                        onChange={(e) => setPracticeAreaFilter(e.target.value)}
                        className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="">All Practice Areas</option>
                        {Object.values(PracticeArea).map(area => <option key={area} value={area}>{area}</option>)}
                    </select>
                    <select
                        value={jurisdictionFilter}
                        onChange={(e) => setJurisdictionFilter(e.target.value)}
                        className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="">All Jurisdictions</option>
                        {Object.values(Jurisdiction).map(juri => <option key={juri} value={juri}>{juri}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid gap-6 my-8 md:grid-cols-2 xl:grid-cols-3">
                {filteredUsers.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
             {filteredUsers.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">No lawyers found matching your criteria.</p>
                </div>
            )}
        </>
    );
};

export default Directory;
