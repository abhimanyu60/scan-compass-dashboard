
import React from 'react';
import { CheckCircle, Play, Clock, XCircle } from 'lucide-react';

interface ScanItemProps {
  hostname: string;
  status: string;
}

const ScanItem: React.FC<ScanItemProps> = ({ hostname, status }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Started':
        return <Play className="h-4 w-4 text-blue-600" />;
      case 'Yet to Start':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Started':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Yet to Start':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-3">
        {getStatusIcon(status)}
        <span className="font-medium text-gray-900">{hostname}</span>
      </div>
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(status)}`}
      >
        {status}
      </span>
    </div>
  );
};

export default ScanItem;
