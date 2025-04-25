
import { useState } from 'react';
import { StatusFilter } from '@/types/campaign';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CampaignFilterBarProps {
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CampaignFilterBar = ({
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
}: CampaignFilterBarProps) => {
  const handleStatusChange = (value: string) => {
    setStatusFilter(value as StatusFilter);
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-4 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-64">
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Campaigns</SelectItem>
                <SelectItem value="Active">Active Campaigns</SelectItem>
                <SelectItem value="Paused">Paused Campaigns</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignFilterBar;
