import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Activity
} from 'lucide-react';

// TypeScript interfaces
interface CashSummary {
  cashIn: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  cashOut: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  commission: {
    today: number;
    thisMonth: number;
  };
}

interface RecentActivity {
  id: string;
  type: 'cash-in' | 'cash-out';
  amount: number;
  customer: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  reference: string;
}

interface AgentStats {
  totalCustomers: number;
  activeToday: number;
  completedTransactions: number;
  pendingTransactions: number;
}

interface AgentOverviewProps {
  agentName?: string;
  agentId?: string;
  cashSummary?: CashSummary;
  recentActivity?: RecentActivity[];
  stats?: AgentStats;
}

const AgentOverview: React.FC<AgentOverviewProps> = ({
  agentName = "Agent Smith",
  agentId = "AG-001234",
  cashSummary,
  recentActivity,
  stats
}) => {
  // Default data for demonstration
  const defaultCashSummary: CashSummary = {
    cashIn: {
      today: 5420.50,
      thisWeek: 28650.00,
      thisMonth: 125400.75
    },
    cashOut: {
      today: 3280.00,
      thisWeek: 18900.25,
      thisMonth: 89320.00
    },
    commission: {
      today: 186.50,
      thisMonth: 2847.30
    }
  };

  const defaultStats: AgentStats = {
    totalCustomers: 247,
    activeToday: 18,
    completedTransactions: 42,
    pendingTransactions: 3
  };

  const defaultActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'cash-in',
      amount: 500.00,
      customer: 'John Doe',
      status: 'completed',
      timestamp: '2024-08-24T14:30:00Z',
      reference: 'CI-789012'
    },
    {
      id: '2',
      type: 'cash-out',
      amount: 250.00,
      customer: 'Alice Johnson',
      status: 'completed',
      timestamp: '2024-08-24T13:45:00Z',
      reference: 'CO-345678'
    },
    {
      id: '3',
      type: 'cash-in',
      amount: 1200.00,
      customer: 'Bob Wilson',
      status: 'pending',
      timestamp: '2024-08-24T13:20:00Z',
      reference: 'CI-901234'
    },
    {
      id: '4',
      type: 'cash-out',
      amount: 800.00,
      customer: 'Carol Davis',
      status: 'completed',
      timestamp: '2024-08-24T12:15:00Z',
      reference: 'CO-567890'
    },
    {
      id: '5',
      type: 'cash-in',
      amount: 300.00,
      customer: 'David Brown',
      status: 'failed',
      timestamp: '2024-08-24T11:30:00Z',
      reference: 'CI-123456'
    }
  ];

  const summary = cashSummary || defaultCashSummary;
  const agentStats = stats || defaultStats;
  const activities = recentActivity || defaultActivity;

  // Helper functions
  const formatAmount = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  const getActivityIcon = (type: 'cash-in' | 'cash-out') => {
    return type === 'cash-in' 
      ? <ArrowDownLeft className="h-4 w-4 text-green-500" />
      : <ArrowUpRight className="h-4 w-4 text-blue-500" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 dark:bg-green-500/10';
      case 'pending': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10';
      case 'failed': return 'text-red-600 bg-red-50 dark:bg-red-500/10';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-500" />
              Agent Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back, {agentName} ({agentId})</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold text-foreground">{agentStats.totalCustomers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Today</p>
                <p className="text-2xl font-bold text-foreground">{agentStats.activeToday}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{agentStats.completedTransactions}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">{agentStats.pendingTransactions}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Summary */}
        <div className="space-y-6">
          {/* Cash In Summary */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Cash In Summary
              </CardTitle>
              <CardDescription>Money received from customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Today</p>
                  <p className="text-xl font-bold text-green-700 dark:text-green-300">
                    {formatAmount(summary.cashIn.today)}
                  </p>
                </div>
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">This Week</p>
                  <p className="text-xl font-bold text-green-700 dark:text-green-300">
                    {formatAmount(summary.cashIn.thisWeek)}
                  </p>
                </div>
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">This Month</p>
                  <p className="text-xl font-bold text-green-700 dark:text-green-300">
                    {formatAmount(summary.cashIn.thisMonth)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cash Out Summary */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-blue-500" />
                Cash Out Summary
              </CardTitle>
              <CardDescription>Money paid to customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Today</p>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                    {formatAmount(summary.cashOut.today)}
                  </p>
                </div>
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">This Week</p>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                    {formatAmount(summary.cashOut.thisWeek)}
                  </p>
                </div>
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">This Month</p>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                    {formatAmount(summary.cashOut.thisMonth)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission Summary */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-yellow-500" />
                Commission Earned
              </CardTitle>
              <CardDescription>Your earnings from transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Today</p>
                  <p className="text-xl font-bold text-yellow-700 dark:text-yellow-300">
                    {formatAmount(summary.commission.today)}
                  </p>
                </div>
                <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">This Month</p>
                  <p className="text-xl font-bold text-yellow-700 dark:text-yellow-300">
                    {formatAmount(summary.commission.thisMonth)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest transactions and customer interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-muted">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground capitalize">
                          {activity.type.replace('-', ' ')}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {getStatusIcon(activity.status)}
                          {activity.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.customer} • {activity.reference}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">
                      {formatAmount(activity.amount)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatTime(activity.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                View All Transactions →
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Net Position Summary */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Today's Net Position</CardTitle>
          <CardDescription>Summary of your cash flow position</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Cash In</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatAmount(summary.cashIn.today)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Cash Out</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatAmount(summary.cashOut.today)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Net Flow</p>
              <p className={`text-2xl font-bold ${
                summary.cashIn.today - summary.cashOut.today >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {formatAmount(summary.cashIn.today - summary.cashOut.today)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Commission</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {formatAmount(summary.commission.today)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentOverview;