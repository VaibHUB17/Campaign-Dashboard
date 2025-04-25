
import { Campaign } from '../types/campaign';

const API_URL = 'http://localhost:8000/campaigns';

export const fetchCampaigns = async (status?: 'Active' | 'Paused'): Promise<Campaign[]> => {
  try {
    const url = status ? `${API_URL}?status=${status}` : API_URL;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

// For local development/testing, we'll create mock data
export const getMockCampaigns = (): Campaign[] => {
  return [
    { id: 1, name: "Summer Sale", status: "Active", clicks: 150, cost: 45.99, impressions: 1000 },
    { id: 2, name: "Black Friday", status: "Paused", clicks: 320, cost: 89.50, impressions: 2500 },
    { id: 3, name: "Holiday Special", status: "Active", clicks: 210, cost: 65.75, impressions: 1800 },
    { id: 4, name: "New Year Promotion", status: "Active", clicks: 180, cost: 55.25, impressions: 1500 },
    { id: 5, name: "Valentine's Day", status: "Paused", clicks: 95, cost: 30.50, impressions: 800 },
    { id: 6, name: "Spring Collection", status: "Active", clicks: 250, cost: 75.80, impressions: 2200 },
    { id: 7, name: "Back to School", status: "Paused", clicks: 310, cost: 92.40, impressions: 2600 },
    { id: 8, name: "Labor Day Sale", status: "Active", clicks: 200, cost: 60.15, impressions: 1750 },
    { id: 9, name: "Cyber Monday", status: "Paused", clicks: 350, cost: 105.30, impressions: 3000 },
    { id: 10, name: "End of Year", status: "Active", clicks: 280, cost: 85.20, impressions: 2400 }
  ];
};
