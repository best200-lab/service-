
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import DashboardCard from '../components/DashboardCard';
import { MOCK_RECENT_ACTIVITY } from '../constants';
import { MessagesIcon, ServeIcon, DirectoryIcon, AnalyticsIcon } from '../components/icons';

const servesData = [
  { name: 'Jan', serves: 12 },
  { name: 'Feb', serves: 19 },
  { name: 'Mar', serves: 3 },
  { name: 'Apr', serves: 5 },
  { name: 'May', serves: 2 },
  { name: 'Jun', serves: 3 },
];

const Dashboard: React.FC = () => {
  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Dashboard
      </h1>

      {/* Cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          icon={<ServeIcon className="w-5 h-5" />}
          title="Pending Serves"
          value="8"
          change="+ 3 this week"
          changeType="positive"
        />
        <DashboardCard
          icon={<MessagesIcon className="w-5 h-5" />}
          title="Unread Messages"
          value="15"
          change="- 5 from yesterday"
          changeType="negative"
        />
        <DashboardCard
          icon={<DirectoryIcon className="w-5 h-5" />}
          title="Active Cases"
          value="24"
        />
        <DashboardCard
          icon={<AnalyticsIcon className="w-5 h-5" />}
          title="Acceptance Rate"
          value="92.5%"
          change="+ 1.2% this month"
          changeType="positive"
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {/* Chart */}
        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
            Serves per Month
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={servesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="serves" fill="#1e40af" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Recent Activity */}
        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
            Recent Activity
          </h4>
          <ul className="space-y-4">
            {MOCK_RECENT_ACTIVITY.map(activity => (
              <li key={activity.id} className="flex items-start">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={activity.user.avatar}
                  alt={activity.user.name}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-800 dark:text-gray-300">
                    <span className="font-semibold">{activity.user.name}</span> {activity.action} <span className="font-semibold text-primary-700 dark:text-primary-400">{activity.target}</span>.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.timestamp}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
