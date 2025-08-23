import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, Send, Wallet, Clock } from 'lucide-react';

// TypeScript interfaces
interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'send';
  amount: number;
  date: string;
  description: string;
}

interface WalletBalance {
  total: number;
  currency: string;
  change: number;
  changePercent: number;
}

interface UserOverviewProps {
  walletBalance?: WalletBalance;
  recentTransactions?: Transaction[];
}

// Placeholder data
const defaultWalletBalance: WalletBalance = {
  total: 12847.32,
  currency: 'USD',
  change: 342.18,
  changePercent: 2.74
};

const defaultTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    amount: 500.00,
    date: '2024-01-15',
    description: 'Bank Transfer'
  },
  {
    id: '2',
    type: 'send',
    amount: -125.50,
    date: '2024-01-14',
    description: 'Payment to Alice'
  },
  {
    id: '3',
    type: 'withdraw',
    amount: -200.00,
    date: '2024-01-13',
    description: 'ATM Withdrawal'
  },
  {
    id: '4',
    type: 'deposit',
    amount: 1200.00,
    date: '2024-01-12',
    description: 'Salary Deposit'
  },
  {
    id: '5',
    type: 'send',
    amount: -75.25,
    date: '2024-01-11',
    description: 'Coffee Shop Payment'
  }
];

const UserOverview: React.FC<UserOverviewProps> = ({
  walletBalance = defaultWalletBalance,
  recentTransactions = defaultTransactions
}) => {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'withdraw':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'send':
        return <Send className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatAmount = (amount: number, currency: string = 'BDT') => {
    const absAmount = Math.abs(amount);
    const sign = amount < 0 ? '-' : '+';
    return `${amount < 0 ? sign : ''}$${absAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your account overview.</p>
      </div>

      {/* Wallet Balance Card */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Wallet Balance
            </CardTitle>
            <CardDescription>Your total available balance</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-foreground">
              ${walletBalance.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className={`flex items-center text-sm ${walletBalance.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              <ArrowUpRight className={`h-4 w-4 mr-1 ${walletBalance.change < 0 ? 'rotate-180' : ''}`} />
              {formatAmount(walletBalance.change)} ({walletBalance.changePercent}%) this month
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
          <CardDescription>Manage your funds with these quick actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col gap-2">
              <ArrowDownLeft className="h-5 w-5" />
              Deposit
            </Button>
            <Button variant="secondary" className="h-16 bg-secondary hover:bg-secondary/90 text-secondary-foreground flex flex-col gap-2">
              <ArrowUpRight className="h-5 w-5" />
              Withdraw
            </Button>
            <Button variant="outline" className="h-16 border-border hover:bg-accent flex flex-col gap-2">
              <Send className="h-5 w-5" />
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Transactions</CardTitle>
          <CardDescription>Your latest account activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-muted">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground capitalize">
                      {transaction.type}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.description}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${transaction.amount >= 0 ? 'text-green-500' : 'text-foreground'}`}>
                    {formatAmount(transaction.amount)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(transaction.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserOverview;