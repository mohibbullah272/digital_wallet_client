
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, Send, Wallet, Clock, Shield, Calendar } from 'lucide-react';
import { useUserTransactionInfoQuery, useWalletInfoQuery } from '@/redux/features/userApi/userApi';
import { Link } from 'react-router';
import { useAgentInfoQuery } from '@/redux/features/agentAPi/agentApi';

export interface Transaction {
  _id: string;
  type: string;
  amount: number;
  fee: number;
  commission: number;
  initiatedBy: string;
  status: string;
  referenceId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}









const agentOverview = () => {
  const {data:agentData}=useAgentInfoQuery(undefined)
  const {data}=useWalletInfoQuery(undefined)
  const {data:history}=useUserTransactionInfoQuery({
    page: 1,
    limit: 5,
  })
  let recentTransactions: Transaction[] = history?.data?.transactions
console.log(recentTransactions)
  let  walletBalance = data?.data
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'cash-in':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'withdraw':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'transfer':
        return <Send className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatAmount = (amount: number,) => {
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
    <div className="space-y-6 ">
   {/* Header */}
   <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-500" />
              Agent Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back, {agentData?.data?.email} </p>
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
           {walletBalance?.balance}
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
          <Link to={'/agent/CashOUt'}>
              CashOut
          </Link>
            </Button>
  <Button variant="secondary" className="h-16 bg-secondary hover:bg-secondary/90 text-secondary-foreground flex flex-col gap-2">
              <ArrowUpRight className="h-5 w-5" />
  <Link to={'/agent/add-money'}>
              Add Money
  </Link>
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
            {recentTransactions &&  recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
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
                    {formatDate(transaction.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
       <Link to={'/user/transaction'}>
       <Button variant="ghost" className="text-primary hover:text-primary/80">
              View All Transactions
            </Button>
       </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default agentOverview;