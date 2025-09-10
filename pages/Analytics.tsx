
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { AnalyticsIcon } from '../components/icons';

const data = [
  { name: 'Litigation', value: 400 },
  { name: 'Corporate', value: 300 },
  { name: 'Family Law', value: 300 },
  { name: 'Real Estate', value: 200 },
];

const COLORS = ['#1e40af', '#1d4ed8', '#2563eb', '#3b82f6'];

const Analytics: React.FC = () => {
  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Analytics
      </h1>
      <div className="grid gap-6 mb-8 md:grid-cols-1">
        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
            Case Distribution by Practice Area
          </h4>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
       <div className="flex flex-col items-center justify-center h-64 p-6 mt-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <AnalyticsIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Advanced Analytics Dashboard
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
          Deeper insights into your firm's performance, case timelines, and client metrics are coming soon.
        </p>
      </div>
    </>
  );
};

export default Analytics;
