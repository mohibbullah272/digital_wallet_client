import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Mail, 
  Phone, 

  Edit,
  CheckCircle,
  AlertCircle,
  Calendar,
  Shield
} from 'lucide-react';
import { useUserInfoQuery } from '@/redux/features/authApi/AuthApi';
import { useUpdateProfileMutation } from '@/redux/features/userApi/userApi';

// TypeScript interfaces
interface ProfileMange {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user' | 'agent';
  status: 'active' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}

interface ProfileFormData {
  name: string;
  phone: string;

}



const ProfileMange = () => {
  // Default user data for placeholder
const {data:user}=useUserInfoQuery(undefined)
  const defaultUser: ProfileMange = {
    _id: 'user_12345',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-08-20')
  };

  const currentUser = user?.data || defaultUser;

  const [formData, setFormData] = useState<ProfileFormData>({
    name: currentUser.name,
    phone: currentUser?.phone || '',
  });

  const [updateProfile]=useUpdateProfileMutation()
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear messages when user starts typing
    if (successMessage) setSuccessMessage('');
    if (errorMessage) setErrorMessage('');
  };


  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'agent': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-green-500/10 text-green-500 border-green-500/20';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-500/10 text-green-500 border-green-500/20'
      : 'bg-red-500/10 text-red-500 border-red-500/20';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const handleSubmit=async()=>{
    try {
      const res =await updateProfile(formData).unwrap()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <User className="h-8 w-8 text-primary" />
          Profile Settings
        </h1>
        <p className="text-muted-foreground">Manage your personal information and account settings.</p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              <span>{successMessage}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {errorMessage && (
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span>{errorMessage}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Account Overview</CardTitle>
              <CardDescription>Your account information and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* User Avatar */}
              <div className="flex justify-center">
                <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-foreground">{currentUser.name}</h3>
                <p className="text-muted-foreground">{currentUser.email}</p>
     {currentUser?.phone && <p className="text-muted-foreground">{currentUser?.phone}</p>}
              </div>

              {/* Role and Status */}
              <div className="flex justify-center gap-2">
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors capitalize ${getRoleBadgeColor(currentUser.role)}`}>
                  <Shield className="h-3 w-3 mr-1" />
                  {currentUser.role}
                </span>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors capitalize ${getStatusBadgeColor(currentUser.status)}`}>
                  {currentUser.status === 'active' ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                  {currentUser.status}
                </span>
              </div>

              {/* Account Dates */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Member since</p>
                    <p>{formatDate(currentUser.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Edit className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Last updated</p>
                    <p>{formatDate(currentUser.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Personal Information</CardTitle>
                  <CardDescription>Update your name and phone number</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="border-border hover:bg-accent"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditingProfile ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email (Read-only) */}
              <div className="space-y-2">
                <Label className="text-foreground">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={currentUser.email}
                    disabled
                    className="pl-10 bg-muted border-border text-muted-foreground cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Email cannot be changed for security reasons</p>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label className="text-foreground">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditingProfile}
                    className={`pl-10 bg-background border-border ${!isEditingProfile ? 'text-muted-foreground' : 'text-foreground'}`}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-foreground">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditingProfile}
                    className={`pl-10 bg-background border-border ${!isEditingProfile ? 'text-muted-foreground' : 'text-foreground'}`}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Update Button */}
           <div className='flex justify-end'>
           <Button onClick={handleSubmit}>Update</Button>
           </div>
            </CardContent>
          </Card>

      
        </div>
      </div>
    </div>
  );
};

export default ProfileMange;