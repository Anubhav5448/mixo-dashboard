interface Campaign {
  id: string;
  name: string;
  brand_id: string;
  status: string;
  budget: number;
  daily_budget: number;
  platforms: string[];
  created_at: string;
}

interface CampaignChartProps {
  campaigns: Campaign[];
}

function CampaignChart({ campaigns }: CampaignChartProps) {
  const statusCounts = campaigns.reduce((acc, campaign) => {
    acc[campaign.status] = (acc[campaign.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const platformCounts = campaigns.reduce((acc, campaign) => {
    campaign.platforms.forEach((platform) => {
      acc[platform] = (acc[platform] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'paused':
        return '#f59e0b';
      case 'completed':
        return '#6b7280';
      default:
        return '#9ca3af';
    }
  };

  const getPlatformColor = (index: number) => {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6'];
    return colors[index % colors.length];
  };

  const maxStatusCount = Math.max(...Object.values(statusCounts));
  const maxPlatformCount = Math.max(...Object.values(platformCounts));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Campaigns by Status</h3>
        <div className="space-y-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 capitalize">{status}</span>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full"
                  style={{
                    width: `${(count / maxStatusCount) * 100}%`,
                    backgroundColor: getStatusColor(status),
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Campaigns by Platform</h3>
        <div className="space-y-4">
          {Object.entries(platformCounts).map(([platform, count], index) => (
            <div key={platform}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 capitalize">{platform}</span>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full"
                  style={{
                    width: `${(count / maxPlatformCount) * 100}%`,
                    backgroundColor: getPlatformColor(index),
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Distribution</h3>
        <div className="space-y-4">
          {campaigns.slice(0, 5).map((campaign) => {
            const maxBudget = Math.max(...campaigns.map((c) => c.budget));
            return (
              <div key={campaign.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 truncate" title={campaign.name}>
                    {campaign.name.length > 25 ? campaign.name.substring(0, 25) + '...' : campaign.name}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    ${campaign.budget.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-blue-600"
                    style={{
                      width: `${(campaign.budget / maxBudget) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Campaign Statistics</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Campaigns</span>
            <span className="text-lg font-bold text-gray-900">{campaigns.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Active Campaigns</span>
            <span className="text-lg font-bold text-green-600">
              {statusCounts.active || 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Paused Campaigns</span>
            <span className="text-lg font-bold text-yellow-600">
              {statusCounts.paused || 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Completed Campaigns</span>
            <span className="text-lg font-bold text-gray-600">
              {statusCounts.completed || 0}
            </span>
          </div>
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Budget per Campaign</span>
              <span className="text-lg font-bold text-blue-600">
                ${campaigns.length > 0
                  ? Math.round(
                      campaigns.reduce((sum, c) => sum + c.budget, 0) / campaigns.length
                    ).toLocaleString()
                  : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignChart;
