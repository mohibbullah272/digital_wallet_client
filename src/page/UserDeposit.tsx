import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowDownLeft, DollarSign, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// TypeScript interfaces
interface DepositForm {
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

interface UserDepositProps {
  onDeposit?: (data: DepositForm) => void;
  isLoading?: boolean;
}

const UserDeposit: React.FC<UserDepositProps> = ({
  onDeposit,
  isLoading = false
}) => {
  const [form, setForm] = useState<DepositForm>({
    amount: '',
    description: ''
  });

  const [showPreview, setShowPreview] = useState(false);

  // Placeholder transaction preview data
  const generatePreview = (amount: number): TransactionPreview => ({
    amount: amount,
    fee: Math.max(amount * 0.025, 2.50), // 2.5% fee with $2.50 minimum
    total: amount + Math.max(amount * 0.025, 2.50),
    status: 'pending',
    referenceId: `DEP-${Date.now().toString().slice(-8)}`,
    estimatedTime: '2-5 minutes'
  });

  const handleInputChange = (field: keyof DepositForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeposit = () => {
    const amount = parseFloat(form.amount);
    if (amount && amount > 0) {
      setShowPreview(true);
      if (onDeposit) {
        onDeposit(form);
      }
    }
  };

  const isValidAmount = form.amount && parseFloat(form.amount) > 0;
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
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <ArrowDownLeft className="h-8 w-8 text-primary" />
          Deposit Funds
        </h1>
        <p className="text-muted-foreground">Add money to your wallet securely and instantly.</p>
      </div>

      {/* Deposit Form Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Deposit Details</CardTitle>
          <CardDescription>Enter the amount and description for your deposit</CardDescription>
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
                step="0.01"
                value={form.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            {form.amount && parseFloat(form.amount) <= 0 && (
              <p className="text-sm text-red-500">Please enter a valid amount greater than $0.00</p>
            )}
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
                placeholder="e.g., Salary deposit, Investment funds..."
                value={form.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Deposit Button */}
          <Button
            onClick={handleDeposit}
            disabled={!isValidAmount || isLoading}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 animate-spin" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ArrowDownLeft className="h-4 w-4" />
                Deposit {isValidAmount ? formatAmount(parseFloat(form.amount)) : 'Funds'}
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Preview/Confirmation Section */}
      {preview && showPreview && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Transaction Preview</CardTitle>
            <CardDescription>Review your deposit details before confirmation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Transaction Details */}
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Deposit Amount</span>
                <span className="font-medium text-foreground">{formatAmount(preview.amount)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Processing Fee</span>
                <span className="font-medium text-foreground">{formatAmount(preview.fee)}</span>
              </div>
              
              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Total Amount</span>
                  <span className="font-bold text-lg text-foreground">{formatAmount(preview.total)}</span>
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
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Confirm Deposit'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserDeposit;