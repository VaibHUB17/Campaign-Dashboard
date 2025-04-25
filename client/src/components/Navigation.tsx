import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, BarChart2, PieChart, LineChart, Home, Settings, LayoutDashboard, TrendingUp, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger
} from './ui/sidebar';
import { Separator } from './ui/separator';

export default function Navigation({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar side="left" variant="floating">
          <SidebarHeader>
            <div className="flex items-center px-2">
              <BarChart2 className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-lg font-semibold">DataVinci</h1>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Home">
                  <Link to="/" className="w-full">
                    <Home className="mr-2" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard" isActive>
                  <Link to="/dashboard" className="w-full">
                    <LayoutDashboard className="mr-2" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Campaigns">
                  <Link to="/campaigns" className="w-full">
                    <LineChart className="mr-2" />
                    <span>Campaigns</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Analytics">
                  <Link to="/analytics" className="w-full">
                    <PieChart className="mr-2" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Performance">
                  <Link to="/performance" className="w-full">
                    <TrendingUp className="mr-2" />
                    <span>Performance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            
            <Separator className="my-4" />
            
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link to="/settings" className="w-full">
                    <Settings className="mr-2" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Help">
                  <Link to="/help" className="w-full">
                    <HelpCircle className="mr-2" />
                    <span>Help</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="border-t p-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme}
              className="w-full flex items-center justify-center"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1">
          <SidebarTrigger className="absolute top-4 left-4 z-50 md:hidden" />
          <div className="h-full">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}