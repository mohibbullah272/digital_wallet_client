import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowDownLeft, DollarSign, FileText,    } from 'lucide-react';
import { useUserDepositMoneyMutation } from '@/redux/features/userApi/userApi';
import { toast } from 'sonner';

// TypeScript interfaces
interface DepositForm {
  amount: string;
  description: string;
}



interface UserDepositProps {
  onDeposit?: (data: DepositForm) => void;
  isLoading?: boolean;
}

const UserDeposit: React.FC<UserDepositProps> = () => {
  const [form, setForm] = useState<DepositForm>({
    amount: '',
    description: ''
  });

const [userDepositMoney]=useUserDepositMoneyMutation()

  const handleInputChange = (field: keyof DepositForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeposit =async () => {
    try {
  
      const depositInfo ={
       amount:parseInt(form?.amount),
       description:form?.description
      }
      const res = await userDepositMoney(depositInfo)
      toast.success(`deposit success trans_id ${res?.data?.data?.transaction?.referenceId}`)
      setForm({
        amount: '',
        description: ''
      })
     
    } catch (error:any) {
      console.log(error)
      toast.error('something went wrong try again later')
    }
  };

  const isValidAmount = form.amount && parseFloat(form.amount) > 0;



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
            disabled={!isValidAmount}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
           
           
              <div className="flex items-center gap-2">
                <ArrowDownLeft className="h-4 w-4" />
                Deposit {isValidAmount ? formatAmount(parseFloat(form.amount)) : 'Funds'}
              </div>
          
          </Button>
        </CardContent>
      </Card>

   
    </div>
  );
};

export default UserDeposit;