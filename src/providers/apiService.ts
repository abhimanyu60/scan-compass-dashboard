
// Mock API service for demonstration
// In a real application, these would be actual API calls

const MOCK_JUMP_SERVERS = [
  'jumpserver-prod-01',
  'jumpserver-prod-02', 
  'jumpserver-staging-01',
  'jumpserver-dev-01',
  'jumpserver-backup-01'
];

const MOCK_SCAN_DATA: Record<string, Array<{hostname: string, status: string}>> = {
  'jumpserver-prod-01': [
    { hostname: 'web-server-01', status: 'Completed' },
    { hostname: 'web-server-02', status: 'Started' },
    { hostname: 'api-server-01', status: 'Completed' },
    { hostname: 'db-server-01', status: 'Yet to Start' },
    { hostname: 'cache-server-01', status: 'Error' }
  ],
  'jumpserver-prod-02': [
    { hostname: 'web-server-03', status: 'Completed' },
    { hostname: 'web-server-04', status: 'Completed' },
    { hostname: 'api-server-02', status: 'Started' },
    { hostname: 'monitoring-server', status: 'Yet to Start' }
  ],
  'jumpserver-staging-01': [
    { hostname: 'staging-web-01', status: 'Completed' },
    { hostname: 'staging-api-01', status: 'Error' },
    { hostname: 'staging-db-01', status: 'Started' }
  ],
  'jumpserver-dev-01': [
    { hostname: 'dev-web-01', status: 'Completed' },
    { hostname: 'dev-api-01', status: 'Completed' },
    { hostname: 'test-server-01', status: 'Yet to Start' }
  ],
  'jumpserver-backup-01': [
    { hostname: 'backup-storage-01', status: 'Started' },
    { hostname: 'backup-storage-02', status: 'Completed' },
    { hostname: 'archive-server-01', status: 'Yet to Start' }
  ]
};

export const getJumpServers = async (date: string): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log(`Fetching jump servers for date: ${date}`);
  return MOCK_JUMP_SERVERS;
};

export const getScansByJumpServer = async (
  jumpServerName: string, 
  date: string
): Promise<Array<{hostname: string, status: string}>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log(`Fetching scans for ${jumpServerName} since ${date}`);
  return MOCK_SCAN_DATA[jumpServerName] || [];
};

export const getAllTargetServers = async (date: string): Promise<Array<{
  hostname: string;
  status: string;
  jumpServer: string;
}>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  console.log(`Fetching all target servers for date: ${date}`);
  
  const allServers: Array<{hostname: string, status: string, jumpServer: string}> = [];
  
  Object.entries(MOCK_SCAN_DATA).forEach(([jumpServer, servers]) => {
    servers.forEach(server => {
      allServers.push({
        hostname: server.hostname,
        status: server.status,
        jumpServer: jumpServer
      });
    });
  });
  
  return allServers;
};
