
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import DatePicker from '../DatePicker/DatePicker';
import ServerListView from '../ServerListView/ServerListView';
import JumpServerView from '../JumpServerView/JumpServerView';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Default to today
  const [activeTab, setActiveTab] = useState('servers');

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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="servers">All Target Servers</TabsTrigger>
            <TabsTrigger value="jumpservers">By Jump Server</TabsTrigger>
          </TabsList>
          
          <TabsContent value="servers" className="space-y-6">
            <ServerListView selectedDate={selectedDate} />
          </TabsContent>
          
          <TabsContent value="jumpservers" className="space-y-6">
            <JumpServerView selectedDate={selectedDate} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
