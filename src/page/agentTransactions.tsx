import React, { useState, useMemo } from 'react';
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
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';

// TypeScript interfaces
interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'send' | 'receive';
  amount: number;
  fee: number;
  status: 'completed' | 'pending' | 'processing' | 'failed';
  description: string;
  date: string;
  referenceId: string;
  recipient?: string;
  sender?: string;
}

interface FilterState {
  type: 'all' | 'deposit' | 'withdraw' | 'send' | 'receive';
  status: 'all' | 'completed' | 'pending' | 'processing' | 'failed';
  dateFrom: string;
  dateTo: string;
  search: string;
}

interface UserTransactionHistoryProps {
  transactions?: Transaction[];
  itemsPerPage?: number;
  onExport?: () => void;
}

const AgentTransactionHistory: React.FC<UserTransactionHistoryProps> = ({
  transactions = [],
  itemsPerPage = 10,
  onExport
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    search: ''
  });

  // Placeholder transaction data
  const defaultTransactions: Transaction[] = [
    {
      id: '1',
      type: 'deposit',
      amount: 1500.00,
      fee: 37.50,
      status: 'completed',
      description: 'Salary Deposit',
      date: '2024-08-20',
      referenceId: 'DEP-12345678'
    },
    {
      id: '2',
      type: 'send',
      amount: -250.00,
      fee: 2.50,
      status: 'completed',
      description: 'Rent Split Payment',
      date: '2024-08-19',
      referenceId: 'SND-23456789',
      recipient: 'Alice Johnson'
    },
    {
      id: '3',
      type: 'receive',
      amount: 75.00,
      fee: 0.00,
      status: 'completed',
      description: 'Dinner Payment',
      date: '2024-08-18',
      referenceId: 'RCV-34567890',
      sender: 'Bob Smith'
    },
    {
      id: '4',
      type: 'withdraw',
      amount: -500.00,
      fee: 7.50,
      status: 'processing',
      description: 'Emergency Fund',
      date: '2024-08-17',
      referenceId: 'WTH-45678901'
    },
    {
      id: '5',
      type: 'deposit',
      amount: 2000.00,
      fee: 50.00,
      status: 'completed',
      description: 'Investment Return',
      date: '2024-08-16',
      referenceId: 'DEP-56789012'
    },
    {
      id: '6',
      type: 'send',
      amount: -125.50,
      fee: 1.26,
      status: 'failed',
      description: 'Gift Payment',
      date: '2024-08-15',
      referenceId: 'SND-67890123',
      recipient: 'Carol Davis'
    },
    {
      id: '7',
      type: 'receive',
      amount: 300.00,
      fee: 0.00,
      status: 'completed',
      description: 'Freelance Payment',
      date: '2024-08-14',
      referenceId: 'RCV-78901234',
      sender: 'David Wilson'
    },
    {
      id: '8',
      type: 'withdraw',
      amount: -200.00,
      fee: 3.00,
      status: 'completed',
      description: 'ATM Withdrawal',
      date: '2024-08-13',
      referenceId: 'WTH-89012345'
    },
    {
      id: '9',
      type: 'deposit',
      amount: 800.00,
      fee: 20.00,
      status: 'pending',
      description: 'Tax Refund',
      date: '2024-08-12',
      referenceId: 'DEP-90123456'
    },
    {
      id: '10',
      type: 'send',
      amount: -45.75,
      fee: 0.50,
      status: 'completed',
      description: 'Coffee Payment',
      date: '2024-08-11',
      referenceId: 'SND-01234567',
      recipient: 'Emma Thompson'
    },
    {
      id: '11',
      type: 'receive',
      amount: 150.00,
      fee: 0.00,
      status: 'completed',
      description: 'Birthday Gift',
      date: '2024-08-10',
      referenceId: 'RCV-12345670',
      sender: 'Frank Miller'
    },
    {
      id: '12',
      type: 'withdraw',
      amount: -750.00,
      fee: 11.25,
      status: 'completed',
      description: 'Monthly Expenses',
      date: '2024-08-09',
      referenceId: 'WTH-23456701'
    }
  ];

  const allTransactions = transactions.length > 0 ? transactions : defaultTransactions;

  // Filter and search logic
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(transaction => {
      // Type filter
      if (filters.type !== 'all' && transaction.type !== filters.type) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && transaction.status !== filters.status) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom && transaction.date < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && transaction.date > filters.dateTo) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          transaction.description.toLowerCase().includes(searchLower) ||
          transaction.referenceId.toLowerCase().includes(searchLower) ||
          transaction.recipient?.toLowerCase().includes(searchLower) ||
          transaction.sender?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [allTransactions, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      dateFrom: '',
      dateTo: '',
      search: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all' && value !== '');

  // Helper functions
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'withdraw':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'send':
        return <Send className="h-4 w-4 text-blue-500" />;
      case 'receive':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
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

  const getTransactionDetails = (transaction: Transaction) => {
    switch (transaction.type) {
      case 'send':
        return `To: ${transaction.recipient}`;
      case 'receive':
        return `From: ${transaction.sender}`;
      default:
        return transaction.description;
    }
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
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <Label className="text-foreground">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="space-y-2">
              <Label className="text-foreground">Type</Label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
                <option value="send">Send</option>
                <option value="receive">Receive</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label className="text-foreground">Status</Label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
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

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
            </span>
            {onExport && (
              <Button variant="outline" size="sm" onClick={onExport}>
                Export CSV
              </Button>
            )}
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
                  <TableHead className="text-foreground font-medium">Details</TableHead>
                  <TableHead className="text-foreground font-medium">Amount</TableHead>
                  <TableHead className="text-foreground font-medium">Fee</TableHead>
                  <TableHead className="text-foreground font-medium">Status</TableHead>
                  <TableHead className="text-foreground font-medium">Date</TableHead>
                  <TableHead className="text-foreground font-medium">Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell  className="h-32 text-center text-muted-foreground">
                      No transactions found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="border-border hover:bg-accent/50">
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
                        <div className="text-sm text-muted-foreground">
                          {getTransactionDetails(transaction)}
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
                          ${transaction.fee.toFixed(2)}
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
                          {formatDate(transaction.date)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs text-muted-foreground">
                          {transaction.referenceId}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="border-border"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-8 h-8 p-0 border-border"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="border-border"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgentTransactionHistory;