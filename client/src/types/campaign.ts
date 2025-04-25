
export interface Campaign {
  id: number;
  name: string;
  status: 'Active' | 'Paused';
  clicks: number;
  cost: number;
  impressions: number;
}

export type StatusFilter = 'All' | 'Active' | 'Paused';

export interface SortConfig {
  key: keyof Campaign | '';
  direction: 'asc' | 'desc';
}
