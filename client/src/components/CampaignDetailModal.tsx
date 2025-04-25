import { Campaign } from '@/types/campaign';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatNumber, formatCurrency } from '@/utils/formatters';
import StatusBadge from './StatusBadge';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar } from 'recharts';

interface CampaignDetailModalProps {
  campaign: Campaign;
  isOpen: boolean;
  onClose: () => void;
}

const CampaignDetailModal = ({ campaign, isOpen, onClose }: CampaignDetailModalProps) => {
  // Calculate some additional metrics for display
  const ctr = ((campaign.clicks / campaign.impressions) * 100).toFixed(2);
  const cpc = (campaign.cost / campaign.clicks).toFixed(2);
  
  const chartData = [
    { name: 'Clicks', value: campaign.clicks },
    { name: 'Impressions', value: campaign.impressions },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            {campaign.name} <StatusBadge status={campaign.status} />
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Campaign ID: {campaign.id}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-colors duration-200">
              <div className="text-sm text-gray-500 dark:text-gray-400">Clicks</div>
              <div className="text-2xl font-semibold">{formatNumber(campaign.clicks)}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-colors duration-200">
              <div className="text-sm text-gray-500 dark:text-gray-400">Impressions</div>
              <div className="text-2xl font-semibold">{formatNumber(campaign.impressions)}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-colors duration-200">
              <div className="text-sm text-gray-500 dark:text-gray-400">Cost</div>
              <div className="text-2xl font-semibold">{formatCurrency(campaign.cost)}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-colors duration-200">
              <div className="text-sm text-gray-500 dark:text-gray-400">CTR</div>
              <div className="text-2xl font-semibold">{ctr}%</div>
            </div>
            <div className="col-span-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-colors duration-200">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Performance Overview</div>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderColor: '#e2e8f0',
                        borderRadius: '0.375rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-colors duration-200">
            <h4 className="font-medium mb-2">Additional Information</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This campaign has a cost per click (CPC) of ${cpc} with a click-through rate (CTR) of {ctr}%. 
              {campaign.status === 'Active' 
                ? ' The campaign is currently active and running as scheduled.' 
                : ' The campaign is currently paused and not accruing additional costs.'}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDetailModal;
