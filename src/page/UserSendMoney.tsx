import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, DollarSign, FileText, CheckCircle, Clock, AlertCircle, Wallet, Search, User, Mail, Phone, X } from 'lucide-react';

// TypeScript interfaces
interface SendForm {
  recipient: string;
  amount: string;
  description: string;
}

interface RecipientUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface TransactionPreview {
  amount: number;
  fee: number;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  referenceId: string;
  estimatedTime: string;
  recipient: RecipientUser;
}

interface UserSendProps {
  onSend?: (data: SendForm & { recipientId: string }) => void;
  isLoading?: boolean;
  availableBalance?: number;
}

const UserSendMoney: React.FC<UserSendProps> = ({
  onSend,
  isLoading = false,
  availableBalance = 12847.32 // Placeholder balance
}) => {
  const [form, setForm] = useState<SendForm>({
    recipient: '',
    amount: '',
    description: ''
  });

  const [selectedRecipient, setSelectedRecipient] = useState<RecipientUser | null>(null);
  const [searchResults, setSearchResults] = useState<RecipientUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Placeholder recipient data
  const mockRecipients: RecipientUser[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      phone: '+1 (555) 123-4567'
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob.smith@email.com',
      phone: '+1 (555) 987-6543'
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol.davis@email.com',
      phone: '+1 (555) 456-7890'
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 321-9876'
    }
  ];

  // Simulate search functionality
  const handleRecipientSearch = (query: string) => {
    setForm(prev => ({ ...prev, recipient: query }));
    
    if (query.length > 2) {
      setIsSearching(true);
      // Simulate API delay
      setTimeout(() => {
        const filtered = mockRecipients.filter(user =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.phone.includes(query)
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
      setSelectedRecipient(null);
    }
  };

  const handleRecipientSelect = (recipient: RecipientUser) => {
    setSelectedRecipient(recipient);
    setForm(prev => ({ ...prev, recipient: recipient.email }));
    setSearchResults([]);
  };

  const clearRecipient = () => {
    setSelectedRecipient(null);
    setForm(prev => ({ ...prev, recipient: '' }));
    setSearchResults([]);
  };

  // Placeholder transaction preview data
  const generatePreview = (amount: number, recipient: RecipientUser): TransactionPreview => ({
    amount: amount,
    fee: Math.max(amount * 0.01, 0.50), // 1% fee with $0.50 minimum for sends
    total: amount + Math.max(amount * 0.01, 0.50),
    status: 'pending',
    referenceId: `SND-${Date.now().toString().slice(-8)}`,
    estimatedTime: 'Instant',
    recipient: recipient
  });

  const handleInputChange = (field: keyof SendForm, value: string) => {
    if (field === 'recipient') {
      handleRecipientSearch(value);
    } else {
      setForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSend = () => {
    const amount = parseFloat(form.amount);
    if (amount && amount > 0 && amount <= availableBalance && selectedRecipient) {
      setShowPreview(true);
      if (onSend) {
        onSend({ ...form, recipientId: selectedRecipient.id });
      }
    }
  };

  const isValidAmount = form.amount && parseFloat(form.amount) > 0;
  const isAmountExceedsBalance = form.amount && parseFloat(form.amount) > availableBalance;
  const canSend = isValidAmount && !isAmountExceedsBalance && selectedRecipient;
  const preview = canSend ? generatePreview(parseFloat(form.amount), selectedRecipient) : null;

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
          <Send className="h-8 w-8 text-blue-500" />
          Send Money
        </h1>
        <p className="text-muted-foreground">Send money to friends and family instantly.</p>
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

      {/* Send Form Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Send Details</CardTitle>
          <CardDescription>Enter recipient details and amount to send</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recipient Search */}
          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-foreground">
              Recipient *
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="recipient"
                type="text"
                placeholder="Search by name, email, or phone number"
                value={form.recipient}
                onChange={(e) => handleInputChange('recipient', e.target.value)}
                className="pl-10 pr-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
              {selectedRecipient && (
                <button
                  type="button"
                  onClick={clearRecipient}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Selected Recipient Display */}
            {selectedRecipient && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{selectedRecipient.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {selectedRecipient.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {selectedRecipient.phone}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && !selectedRecipient && (
              <div className="border border-border rounded-lg bg-background max-h-48 overflow-y-auto">
                {searchResults.map((recipient) => (
                  <button
                    key={recipient.id}
                    type="button"
                    onClick={() => handleRecipientSelect(recipient)}
                    className="w-full p-3 text-left hover:bg-accent border-b border-border last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{recipient.name}</p>
                        <p className="text-sm text-muted-foreground">{recipient.email}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Search State Messages */}
            {isSearching && (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 animate-spin" />
                Searching for users...
              </p>
            )}

            {form.recipient.length > 2 && searchResults.length === 0 && !isSearching && !selectedRecipient && (
              <p className="text-sm text-muted-foreground">No users found matching your search.</p>
            )}
          </div>

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
              <span>Minimum: $0.01</span>
              <span>Maximum: {formatAmount(availableBalance)}</span>
            </div>
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Message (Optional)
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="description"
                type="text"
                placeholder="e.g., Dinner split, Rent payment, Gift..."
                value={form.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!canSend || isLoading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 animate-spin" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send {isValidAmount && !isAmountExceedsBalance ? formatAmount(parseFloat(form.amount)) : 'Money'}
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
            <CardDescription>Review your payment details before confirmation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Recipient Info */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Sending to: {preview.recipient.name}</p>
                  <p className="text-sm text-muted-foreground">{preview.recipient.email}</p>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Send Amount</span>
                <span className="font-medium text-foreground">{formatAmount(preview.amount)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Processing Fee</span>
                <span className="font-medium text-foreground">{formatAmount(preview.fee)}</span>
              </div>
              
              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Total Deduction</span>
                  <span className="font-bold text-lg text-blue-600">-{formatAmount(preview.total)}</span>
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
              Delivery time: {preview.estimatedTime}
            </div>

            {form.description && (
              <div className="space-y-2">
                <Label className="text-foreground">Message</Label>
                <p className="text-muted-foreground bg-background px-3 py-2 rounded border border-border">
                  {form.description}
                </p>
              </div>
            )}

            {/* Success Notice */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium text-green-700 dark:text-green-400">Instant Transfer</p>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    This payment will be delivered instantly to {preview.recipient.name}'s account.
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
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Confirm Payment'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserSendMoney;