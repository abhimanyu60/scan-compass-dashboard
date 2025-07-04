
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Server, RefreshCw } from 'lucide-react';
import { getScansByJumpServer } from '@/services/apiService';
import ScanItem from './ScanItem';

interface JumpServerCardProps {
  jumpServerName: string;
  startDate: string;
}

interface ScanData {
  hostname: string;
  status: string;
}

const JumpServerCard: React.FC<JumpServerCardProps> = ({ 
  jumpServerName, 
  startDate 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scans, setScans] = useState<ScanData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleExpand = async () => {
    if (!isExpanded && scans.length === 0) {
      setIsLoading(true);
      try {
        const scanData = await getScansByJumpServer(jumpServerName, startDate);
        setScans(scanData);
      } catch (error) {
        console.error('Error fetching scan data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsExpanded(!isExpanded);
  };

  const getStatusCounts = () => {
    const counts = {
      Completed: 0,
      Started: 0,
      'Yet to Start': 0,
      Error: 0
    };
    
    scans.forEach(scan => {
      if (counts.hasOwnProperty(scan.status)) {
        counts[scan.status as keyof typeof counts]++;
      }
    });
    
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleExpand}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
            <Server className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {jumpServerName}
            </h3>
          </div>
          {isLoading && (
            <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />
          )}
        </div>
        
        {isExpanded && scans.length > 0 && (
          <div className="mt-3 flex space-x-4 text-sm">
            <span className="text-green-600">✅ {statusCounts.Completed}</span>
            <span className="text-blue-600">🟢 {statusCounts.Started}</span>
            <span className="text-yellow-600">⏳ {statusCounts['Yet to Start']}</span>
            <span className="text-red-600">❌ {statusCounts.Error}</span>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {isLoading ? (
            <div className="text-center py-4">
              <RefreshCw className="h-6 w-6 text-gray-400 animate-spin mx-auto mb-2" />
              <p className="text-gray-500">Loading scan data...</p>
            </div>
          ) : scans.length > 0 ? (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700 mb-3">
                Target Servers ({scans.length})
              </h4>
              {scans.map((scan, index) => (
                <ScanItem
                  key={index}
                  hostname={scan.hostname}
                  status={scan.status}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No scan data available for this jump server.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default JumpServerCard;
