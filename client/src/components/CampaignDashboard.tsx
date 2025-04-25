import { useState, useEffect } from 'react';
import { Campaign, StatusFilter } from '@/types/campaign';
import { fetchCampaigns, getMockCampaigns } from '@/services/campaignService';
import { useToast } from '@/components/ui/use-toast';
import CampaignFilterBar from './CampaignFilterBar';
import CampaignTable from './CampaignTable';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import CampaignHeader from './CampaignHeader';

const CampaignDashboard = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadCampaigns = async () => {
      setIsLoading(true);
      try {
        let data: Campaign[];
        
        // Attempt to fetch from API, fall back to mock data if API is unavailable
        try {
          // Only filter by status at the API level if not "All"
          const apiStatus = statusFilter === 'All' ? undefined : statusFilter;
          data = await fetchCampaigns(apiStatus);
        } catch (error) {
          console.warn('API fetch failed, using mock data instead:', error);
          data = getMockCampaigns();
          
          // Filter mock data if needed
          if (statusFilter !== 'All') {
            data = data.filter(campaign => campaign.status === statusFilter);
          }
          
          toast({
            title: "Using demo data",
            description: "Could not connect to the campaign API. Using demo data instead.",
            variant: "default",
          });
        }
        
        setCampaigns(data);
      } catch (error) {
        console.error('Error loading campaigns:', error);
        toast({
          title: "Error",
          description: "Failed to load campaign data. Please try again later.",
          variant: "destructive",
        });
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCampaigns();
  }, [statusFilter, toast]);

  // Apply search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCampaigns(campaigns);
      return;
    }
    
    const normalizedQuery = searchQuery.toLowerCase();
    const filtered = campaigns.filter(campaign => 
      campaign.name.toLowerCase().includes(normalizedQuery)
    );
    
    setFilteredCampaigns(filtered);
  }, [campaigns, searchQuery]);

  // Calculate dashboard metrics
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const averageCost = campaigns.length > 0 
    ? campaigns.reduce((sum, campaign) => sum + campaign.cost, 0) / campaigns.length 
    : 0;

  return (
    <>
    <CampaignHeader />
    <div className="flex flex-col p-6 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Campaign Dashboard</h1>
        <p className="text-muted-foreground mt-2">Analyze and manage your marketing campaigns</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Total Campaigns</CardDescription>
            <CardTitle className="text-3xl">{totalCampaigns}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {activeCampaigns} active campaigns
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Total Clicks</CardDescription>
            <CardTitle className="text-3xl">{totalClicks.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {(totalClicks / Math.max(totalCampaigns, 1)).toFixed(0)} avg. per campaign
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Total Impressions</CardDescription>
            <CardTitle className="text-3xl">{totalImpressions.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {(totalImpressions / Math.max(totalCampaigns, 1)).toFixed(0)} avg. per campaign
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Average Cost</CardDescription>
            <CardTitle className="text-3xl">${averageCost.toFixed(2)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ${campaigns.reduce((sum, campaign) => sum + campaign.cost, 0).toFixed(2)} total spend
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-sm mb-8">
        <CardHeader className="pb-4">
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <CampaignFilterBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <div className="mt-4">
            <CampaignTable 
              campaigns={filteredCampaigns.length > 0 || searchQuery ? filteredCampaigns : campaigns} 
              isLoading={isLoading}
            />
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default CampaignDashboard;
