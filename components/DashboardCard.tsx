
import React from 'react';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, value, change, changeType }) => {
  const changeColor = changeType === 'positive' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <div className="p-3 mr-4 text-primary-500 bg-primary-100 rounded-full dark:text-primary-100 dark:bg-primary-500">
        {icon}
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {value}
        </p>
        {change && (
           <p className={`text-xs ${changeColor}`}>{change}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
