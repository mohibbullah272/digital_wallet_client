import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardInfoQuery } from "@/redux/features/adminAPi/adminApi";
import { useEffect } from "react";

interface DashboardStats {
  totalUsers: number;
  totalAgents: number;
  totalTransactions: number;
  transactionVolume: number;
}

interface StatCard {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

function AdminOverview() {
  const { data, isLoading, error } = useDashboardInfoQuery(undefined);
  
  // Debug: log the actual data structure
  useEffect(() => {
    console.log('Dashboard data:', data);
    console.log('Data type:', Array.isArray(data) ? 'Array' : typeof data);
    if (Array.isArray(data)) {
      console.log('Array length:', data.length);
      console.log('First item:', data[0]);
    }
  }, [data]);

  // Get the first item from the array if data is an array
  const dashboardData = Array.isArray(data) ? data[0] : data;
  
  // Check if data exists and has the expected structure
  const hasData = dashboardData && typeof dashboardData === 'object';
  
  // Transform the backend data into the format needed for the cards
  const stats: StatCard[] = hasData ? [
    {
      title: "Total Users",
      value: dashboardData.totalUsers?.toLocaleString() || '0',
      description: "Registered users",
    },
    {
      title: "Total Agents",
      value: dashboardData.totalAgents?.toLocaleString() || '0',
      description: "Active agents",
    },
    {
      title: "Total Transactions",
      value: dashboardData.totalTransactions?.toLocaleString() || '0',
      description: "All transactions",
    },
    {
      title: "Transaction Volume",
      value: `$${dashboardData.transactionVolume?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) || '0.00'}`,
      description: "Total volume",
    }
  ] : [];

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <Card key={index} className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
              </CardTitle>
              <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold h-8 w-16 bg-muted rounded animate-pulse mb-2"></div>
              <div className="text-xs h-3 w-24 bg-muted rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="grid grid-cols-1">
        <Card className="bg-card text-card-foreground border-destructive">
          <CardContent className="pt-6">
            <div className="text-center text-destructive">
              Failed to load dashboard data
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If no data after loading is complete
  if (!hasData) {
    return (
      <div className="grid grid-cols-1">
        <Card className="bg-card text-card-foreground">
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              No dashboard data available
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon && <div className="h-4 w-4 text-muted-foreground">{stat.icon}</div>}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.description && (
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AdminOverview;