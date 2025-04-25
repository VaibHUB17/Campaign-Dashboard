
import { Campaign } from '@/types/campaign';

interface StatusBadgeProps {
  status: Campaign['status'];
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span className={status === 'Active' ? 'status-badge-active' : 'status-badge-paused'}>
      {status}
    </span>
  );
};

export default StatusBadge;
