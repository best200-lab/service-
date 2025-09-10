
import React from 'react';
import { SettingsIcon } from '../components/icons';

const Settings: React.FC = () => {
  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Settings
      </h1>
      <div className="flex flex-col items-center justify-center h-96 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <SettingsIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Settings Page Under Construction
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
          Soon you'll be able to manage your profile, notifications, security settings, and more.
        </p>
      </div>
    </>
  );
};

export default Settings;
