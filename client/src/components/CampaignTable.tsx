
import { useState } from 'react';
import { Campaign, SortConfig } from '@/types/campaign';
import { formatNumber, formatCurrency } from '@/utils/formatters';
import StatusBadge from './StatusBadge';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CampaignDetailModal from './CampaignDetailModal';

interface CampaignTableProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

const CampaignTable = ({ campaigns, isLoading }: CampaignTableProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: '',
    direction: 'asc',
  });
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSort = (key: keyof Campaign) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedCampaigns = () => {
    if (!sortConfig.key) return campaigns;

    const sortedData = [...campaigns].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  };

  const getSortIndicator = (key: keyof Campaign) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4" />
    );
  };

  const handleRowClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  return (
    <div className="py-6 animate-fade-in">
      <Card className="overflow-x-auto w-full bg-white dark:bg-gray-900 rounded-lg shadow transition-colors duration-200">
        <div className="min-w-full">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
              <tr>
                <th 
                  scope="col" 
                  className="table-cell-padding text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Campaign Name
                    {getSortIndicator('name')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="table-cell-padding text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {getSortIndicator('status')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="table-cell-padding text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('clicks')}
                >
                  <div className="flex items-center">
                    Clicks
                    {getSortIndicator('clicks')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="table-cell-padding text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('cost')}
                >
                  <div className="flex items-center">
                    Cost
                    {getSortIndicator('cost')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="table-cell-padding text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('impressions')}
                >
                  <div className="flex items-center">
                    Impressions
                    {getSortIndicator('impressions')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800 transition-colors duration-200">
              {isLoading ? (
                // Skeleton loading
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={`skeleton-${index}`} className="animate-pulse">
                    <td className="table-cell-padding">
                      <div className="skeleton h-4 w-24 sm:w-48"></div>
                    </td>
                    <td className="table-cell-padding">
                      <div className="skeleton h-4 w-16"></div>
                    </td>
                    <td className="table-cell-padding">
                      <div className="skeleton h-4 w-12"></div>
                    </td>
                    <td className="table-cell-padding">
                      <div className="skeleton h-4 w-16"></div>
                    </td>
                    <td className="table-cell-padding">
                      <div className="skeleton h-4 w-20"></div>
                    </td>
                  </tr>
                ))
              ) : getSortedCampaigns().length > 0 ? (
                getSortedCampaigns().map((campaign) => (
                  <tr 
                    key={campaign.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-150"
                    onClick={() => handleRowClick(campaign)}
                  >
                    <td className="table-cell-padding whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                      {campaign.name}
                    </td>
                    <td className="table-cell-padding whitespace-nowrap text-sm">
                      <StatusBadge status={campaign.status} />
                    </td>
                    <td className="table-cell-padding whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatNumber(campaign.clicks)}
                    </td>
                    <td className="table-cell-padding whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatCurrency(campaign.cost)}
                    </td>
                    <td className="table-cell-padding whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatNumber(campaign.impressions)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="table-cell-padding text-center text-sm text-gray-500 dark:text-gray-400">
                    No campaigns found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedCampaign && (
        <CampaignDetailModal
          campaign={selectedCampaign}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CampaignTable;
