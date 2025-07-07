
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { RefreshCw, Server } from 'lucide-react';
import { getAllTargetServers } from '../../providers/apiService';
import ScanItem from '../ScanItem/ScanItem';

interface ServerListViewProps {
  selectedDate: Date;
}

interface TargetServer {
  hostname: string;
  status: string;
  jumpServer: string;
}

const ServerListView: React.FC<ServerListViewProps> = ({ selectedDate }) => {
  const [servers, setServers] = useState<TargetServer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllServers = async (date: Date) => {
    setIsLoading(true);
    try {
      const dateString = format(date, 'yyyy-MM-dd');
      const serverData = await getAllTargetServers(dateString);
      setServers(serverData);
    } catch (error) {
      console.error('Error fetching target servers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAllServers(selectedDate);
    }
  }, [selectedDate]);

  const getStatusCounts = () => {
    const counts = {
      Completed: 0,
      Started: 0,
      'Yet to Start': 0,
      Error: 0
    };
    
    servers.forEach(server => {
      if (counts.hasOwnProperty(server.status)) {
        counts[server.status as keyof typeof counts]++;
      }
    });
    
    return counts;
  };

  const statusCounts = getStatusCounts();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Loading target servers...</p>
      </div>
    );
  }

  if (servers.length === 0) {
    return (
      <div className="text-center py-12">
        <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No target servers found
        </h3>
        <p className="text-gray-500">
          No scan activity detected for the selected date.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          All Target Servers ({servers.length})
        </h2>
        <div className="flex space-x-4 text-sm">
          <span className="text-green-600">✅ {statusCounts.Completed}</span>
          <span className="text-blue-600">🟢 {statusCounts.Started}</span>
          <span className="text-yellow-600">⏳ {statusCounts['Yet to Start']}</span>
          <span className="text-red-600">❌ {statusCounts.Error}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700">
            <div>Target Server</div>
            <div>Jump Server</div>
            <div>Status</div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {servers.map((server, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Server className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{server.hostname}</span>
                </div>
                <div className="text-gray-600">{server.jumpServer}</div>
                <div>
                  <ScanItem hostname="" status={server.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServerListView;
