import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUpRight, DollarSign, FileText, CheckCircle, Clock, AlertCircle, Wallet } from 'lucide-react';

// TypeScript interfaces
interface WithdrawForm {
  amount: string;
  description: string;
}

interface TransactionPreview {
  amount: number;
  fee: number;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  referenceId: string;
  estimatedTime: string;
}

interface UserWithdrawProps {
  onWithdraw?: (data: WithdrawForm) => void;
  isLoading?: boolean;
  availableBalance?: number;
}

const AgentCashOut: React.FC<UserWithdrawProps> = ({
  onWithdraw,
  isLoading = false,
  availableBalance = 12847.32 // Placeholder balance
}) => {
  const [form, setForm] = useState<WithdrawForm>({
    amount: '',
    description: ''
  });

  const [showPreview, setShowPreview] = useState(false);

  // Placeholder transaction preview data
  const generatePreview = (amount: number): TransactionPreview => ({
    amount: amount,
    fee: Math.max(amount * 0.015, 1.50), // 1.5% fee with $1.50 minimum for withdrawals
    total: amount + Math.max(amount * 0.015, 1.50),
    status: 'pending',
    referenceId: `WTH-${Date.now().toString().slice(-8)}`,
    estimatedTime: '1-3 business days'
  });

  const handleInputChange = (field: keyof WithdrawForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWithdraw = () => {
    const amount = parseFloat(form.amount);
    if (amount && amount > 0 && amount <= availableBalance) {
      setShowPreview(true);
      if (onWithdraw) {
        onWithdraw(form);
      }
    }
  };

  const isValidAmount = form.amount && parseFloat(form.amount) > 0;
  const isAmountExceedsBalance = form.amount && parseFloat(form.amount) > availableBalance;
  const preview = isValidAmount ? generatePreview(parseFloat(form.amount)) : null;

  const getStatusIcon = (status: TransactionPreview['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: TransactionPreview['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'processing':
        return 'text-blue-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const formatAmount = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <ArrowUpRight className="h-8 w-8 text-red-500" />
          Withdraw Funds
        </h1>
        <p className="text-muted-foreground">Transfer money from your wallet to your bank account.</p>
      </div>

      {/* Available Balance Info */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">Available Balance</span>
            </div>
            <span className="text-2xl font-bold text-foreground">
              {formatAmount(availableBalance)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Withdraw Form Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Withdrawal Details</CardTitle>
          <CardDescription>Enter the amount and description for your withdrawal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-foreground">
              Amount *
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                min="0.01"
                max={availableBalance}
                step="0.01"
                value={form.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            {form.amount && parseFloat(form.amount) <= 0 && (
              <p className="text-sm text-red-500">Please enter a valid amount greater than $0.00</p>
            )}
            {isAmountExceedsBalance && (
              <p className="text-sm text-red-500">Amount exceeds available balance of {formatAmount(availableBalance)}</p>
            )}
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Minimum: $1.00</span>
              <button
                type="button"
                onClick={() => handleInputChange('amount', availableBalance.toString())}
                className="text-primary hover:text-primary/80 underline"
              >
                Withdraw All
              </button>
            </div>
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description (Optional)
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="description"
                type="text"
                placeholder="e.g., Emergency funds, Investment withdrawal..."
                value={form.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Withdraw Button */}
          <Button
            onClick={handleWithdraw}
            disabled={!isValidAmount || isAmountExceedsBalance || isLoading}
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 animate-spin" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4" />
                Withdraw {isValidAmount && !isAmountExceedsBalance ? formatAmount(parseFloat(form.amount)) : 'Funds'}
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Preview/Confirmation Section */}
      {preview && showPreview && !isAmountExceedsBalance && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Transaction Preview</CardTitle>
            <CardDescription>Review your withdrawal details before confirmation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Transaction Details */}
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Withdrawal Amount</span>
                <span className="font-medium text-foreground">{formatAmount(preview.amount)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Processing Fee</span>
                <span className="font-medium text-foreground">{formatAmount(preview.fee)}</span>
              </div>
              
              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Total Deduction</span>
                  <span className="font-bold text-lg text-red-500">-{formatAmount(preview.total)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Remaining Balance</span>
                  <span className="font-bold text-lg text-foreground">
                    {formatAmount(availableBalance - preview.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Status and Reference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Status</Label>
                <div className={`flex items-center gap-2 font-medium capitalize ${getStatusColor(preview.status)}`}>
                  {getStatusIcon(preview.status)}
                  {preview.status}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground">Reference ID</Label>
                <div className="font-mono text-sm text-muted-foreground bg-background px-3 py-2 rounded border border-border">
                  {preview.referenceId}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Estimated processing time: {preview.estimatedTime}
            </div>

            {form.description && (
              <div className="space-y-2">
                <Label className="text-foreground">Description</Label>
                <p className="text-muted-foreground bg-background px-3 py-2 rounded border border-border">
                  {form.description}
                </p>
              </div>
            )}

            {/* Important Notice */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium text-yellow-700 dark:text-yellow-400">Important Notice</p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300">
                    Withdrawals are processed within 1-3 business days. Once confirmed, this transaction cannot be cancelled.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowPreview(false)}
                className="flex-1 border-border hover:bg-accent"
              >
                Edit Details
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Confirm Withdrawal'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgentCashOut;