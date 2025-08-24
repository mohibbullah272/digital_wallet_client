import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUpRight, DollarSign, FileText, Wallet } from 'lucide-react';
import { useUserWithdrawMoneyMutation, useWalletInfoQuery } from '@/redux/features/userApi/userApi';
import { toast } from 'sonner';

// TypeScript interfaces
interface WithdrawForm {
  amount: string;
  description: string;
}





const UserWithdraw = () => {
  const {data}=useWalletInfoQuery(undefined)
  const [userWithdrawMoney]=useUserWithdrawMoneyMutation()

  let availableBalance=data?.data?.balance
  const [form, setForm] = useState<WithdrawForm>({
    amount: '',
    description: ''
  });





  const handleInputChange = (field: keyof WithdrawForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWithdraw = async() => {
    const withdrawInfo = {
      amount : parseInt(form.amount),
      description: form.description
    }
   try {
    const res = await userWithdrawMoney(withdrawInfo).unwrap()
    setForm({
      amount: '',
      description: ''
    });
    console.log(res)
   } catch (error) {
    console.log(error)
    toast.error('something went wrong')
   }
  };

  const isValidAmount = form.amount && parseFloat(form.amount) > 0;
  const isAmountExceedsBalance = form.amount && parseFloat(form.amount) > availableBalance;





  const formatAmount = (amount: number) => {
    return `$${amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
            disabled={!isValidAmount || !!isAmountExceedsBalance}
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium"
          >

              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4" />
                Withdraw {isValidAmount && !isAmountExceedsBalance ? formatAmount(parseFloat(form.amount)) : 'Funds'}
              </div>
        
          </Button>
        </CardContent>
      </Card>

   
    </div>
  );
};

export default UserWithdraw;