
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { RefreshCw, Activity } from 'lucide-react';
import DatePicker from './DatePicker';
import JumpServerCard from './JumpServerCard';
import { getJumpServers } from '@/services/apiService';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Default to 7 days ago
  );
  const [jumpServers, setJumpServers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJumpServers = async (date: Date) => {
    setIsLoading(true);
    try {
      const dateString = format(date, 'yyyy-MM-dd');
      const servers = await getJumpServers(dateString);
      setJumpServers(servers);
    } catch (error) {
      console.error('Error fetching jump servers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchJumpServers(selectedDate);
    }
  }, [selectedDate]);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            </div>
            <DatePicker date={selectedDate} onDateChange={handleDateChange} />
          </div>
          <p className="mt-2 text-gray-600">
            Monitoring scan activity from {selectedDate ? format(selectedDate, 'PPP') : 'selected date'} to today
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Loading jump servers...</p>
          </div>
        ) : jumpServers.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Jump Servers ({jumpServers.length})
              </h2>
              <p className="text-gray-500 text-sm">
                Click on a server to view scan details
              </p>
            </div>
            
            <div className="grid gap-6">
              {jumpServers.map((server, index) => (
                <JumpServerCard
                  key={index}
                  jumpServerName={server}
                  startDate={format(selectedDate, 'yyyy-MM-dd')}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No jump servers found
            </h3>
            <p className="text-gray-500">
              No scan activity detected for the selected date range.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
