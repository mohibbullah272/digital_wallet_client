import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, DollarSign, FileText,  Search, X } from 'lucide-react';

import { toast } from 'sonner';
import { useAgentCashInMutation } from '@/redux/features/agentAPi/agentApi';


interface SendForm {
  amount: string;
  description: string;
}





const AgentSendMoney:any = () => {
  const [form, setForm] = useState<SendForm>({
    amount: '',
    description: ''
  });
  const [searchResults, setSearchResults] = useState('');
 
 
  const [agentCashIn]=useAgentCashInMutation()

  
console.log(form)

  const handleInputChange = (field: keyof SendForm, value: string) => {
      setForm(prev => ({
        ...prev,
        [field]: value
      }));
   
  };







  const handleSend = async() => {
    const sendMoneyInfo ={
      email:searchResults,
      amount:parseFloat(form.amount),
      description : form.description
    }
    try {
      const res = await agentCashIn(sendMoneyInfo).unwrap()
      console.log(res)

      toast.success(res?.message)
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
    }
  };

 







  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Send className="h-8 w-8 text-blue-500" />
     Add Money
        </h1>
        <p className="text-muted-foreground">Add Money To any Register User</p>
      </div>



      {/* Send Form Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Send Details</CardTitle>
          <CardDescription>Enter recipient details and amount to send</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recipient Search */}
          <div className="space-y-2">
            <Label  className="text-foreground">
              Recipient *
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
              onBlur={(e)=>setSearchResults(e.target.value)}
              defaultValue={searchResults}
              type="text"
                placeholder="Search by email"
           
                className="pl-10 pr-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
          
                <button
                  type="button"
                onClick={()=>setSearchResults('')}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
     
            </div>
     
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
              
              
                defaultValue={form.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
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
                defaultValue={form.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
    
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            
           
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Add Money
              </div>
          
          </Button>
        </CardContent>
      </Card>

    
    </div>
  );
};

export default AgentSendMoney;