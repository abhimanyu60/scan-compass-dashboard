
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { RefreshCw, Activity } from 'lucide-react';
import JumpServerCard from '../JumpServerCard/JumpServerCard';
import { getJumpServers } from '../../providers/apiService';

interface JumpServerViewProps {
  selectedDate: Date;
}

const JumpServerView: React.FC<JumpServerViewProps> = ({ selectedDate }) => {
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

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Loading jump servers...</p>
      </div>
    );
  }

  if (jumpServers.length === 0) {
    return (
      <div className="text-center py-12">
        <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No jump servers found
        </h3>
        <p className="text-gray-500">
          No scan activity detected for the selected date range.
        </p>
      </div>
    );
  }

  return (
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
  );
};

export default JumpServerView;
