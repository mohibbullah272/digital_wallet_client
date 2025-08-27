import React, { useState} from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Table components
const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <table className="w-full caption-bottom text-sm" {...props}>
    {children}
  </table>
);

const TableHeader = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="[&_tr]:border-b" {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="[&_tr:last-child]:border-0" {...props}>
    {children}
  </tbody>
);

const TableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" {...props}>
    {children}
  </tr>
);

const TableHead = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" {...props}>
    {children}
  </th>
);

const TableCell = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0" {...props}>
    {children}
  </td>
);
// Badge component
const Badge = ({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}: { 
  children: React.ReactNode; 
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
import { 
  History, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Send, 
  Filter, 
  Calendar,

  CheckCircle,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';
import type { Transaction } from './UserOverview';

import { useGetAllTransactionQuery } from '@/redux/features/adminAPi/adminApi';




interface FilterState {
  type: 'all' | 'deposit' | 'withdrawal' | 'transfer' |'cash-in'| 'cash-out'
  status: 'all' | 'completed' | 'pending' | 'processing' | 'failed';
  dateFrom: string;
  dateTo: string;

}

interface UserTransactionHistoryProps {
  transactions?: Transaction[];
  itemsPerPage?: number;
  onExport?: () => void;
}

const AdminTransactionHistory: React.FC<UserTransactionHistoryProps> = () => {
 
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    
  });
  
  const {data:history}=useGetAllTransactionQuery({
    page: 1,
    limit: 1000,
    ...filters
  })

  let paginatedTransactions: Transaction[] = history?.data?.transactions
 

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      dateFrom: '',
      dateTo: '',
     
    });
  };

  console.log(filters)
  // Helper functions
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
        case 'deposit':
            return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
          case 'withdraw':
            return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'cash-out':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'cash-in':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'transfer':
        return <Send className="h-4 w-4 text-blue-500" />;
     
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'processing':
        return <Clock className="h-3 w-3 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      default:
        return <Clock className="h-3 w-3 text-yellow-500" />;
    }
  };

  const getStatusBadgeVariant = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const formatAmount = (amount: number) => {
    const absAmount = Math.abs(amount);
    const sign = amount < 0 ? '-' : '+';
    return `${sign}$${absAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };



  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <History className="h-8 w-8 text-primary" />
          Transaction History
        </h1>
        <p className="text-muted-foreground">View and manage your complete transaction history.</p>
      </div>

      {/* Filters Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
              <CardDescription>Filter transactions by type, status, date, or search terms</CardDescription>
            </div>
     
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
      
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        

            {/* Type Filter */}
            <div className="space-y-2">
              <Label className="text-foreground">Type</Label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
              >
                <option value="all">All Types</option>
                <option value="cash-in">cash in</option>
                <option value="cash-out">cash out</option>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdraw</option>
                <option value="transfer">Send</option>
                
              </select>
            </div>


            {/* Date From */}
            <div className="space-y-2">
              <Label className="text-foreground">From Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>

            {/* Date To */}
            <div className="space-y-2">
              <Label className="text-foreground">To Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>
          </div>

   
        </CardContent>
      </Card>

      {/* Transaction Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-foreground font-medium">Transaction</TableHead>
                  <TableHead className="text-foreground font-medium">Amount</TableHead>
                  <TableHead className="text-foreground font-medium">Commission</TableHead>
                  <TableHead className="text-foreground font-medium">Status</TableHead>
                  <TableHead className="text-foreground font-medium">Date</TableHead>    
                  <TableHead className="text-foreground font-medium">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
           
        
                {  paginatedTransactions?.map((transaction) => (
                    <TableRow key={transaction._id} className="border-border hover:bg-accent/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
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
                      </TableCell>
                   
                      <TableCell>
                        <span className={`font-medium ${
                          transaction.amount >= 0 ? 'text-green-500' : 'text-foreground'
                        }`}>
                          {formatAmount(transaction.amount)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">
                          ${transaction.commission.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={getStatusBadgeVariant(transaction.status)}
                          className="flex items-center gap-1 w-fit"
                        >
                          {getStatusIcon(transaction.status)}
                          <span className="capitalize">{transaction.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">
                          {formatDate(transaction.createdAt)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs text-muted-foreground">
                          {transaction.referenceId}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

   
    </div>
  );
};

export default AdminTransactionHistory;