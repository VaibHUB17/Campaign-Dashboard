import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CampaignHeader = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <BarChart2 className="h-8 w-8 text-primary" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
              Campaign Analytics Dashboard
            </h1>
          </div>
          <div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CampaignHeader;
