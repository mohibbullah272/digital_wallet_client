import { useAllUsersQuery, useAllWalletsQuery, useBlockWalletsMutation, useUnblockWalletsMutation } from "@/redux/features/adminAPi/adminApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock, Unlock, MoreHorizontal, User, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "blocked" | "suspended";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Wallet {
  _id: string;
  userId: string;
  email: string;
  balance: number;
  status: "active" | "blocked";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AdminUserManage = () => {
  const { data: userData, isLoading: usersLoading, error: usersError, refetch: refetchUsers } = useAllUsersQuery(undefined);
  const { data: walletData, isLoading: walletsLoading, error: walletsError, refetch: refetchWallets } = useAllWalletsQuery(undefined);
  
  const [blockWallets, { isLoading: isBlocking }] = useBlockWalletsMutation();
  const [unblockWallets, { isLoading: isUnblocking }] = useUnblockWalletsMutation();

  const users: User[] = userData?.data?.users || [];
  const wallets: Wallet[] = walletData?.data?.wallets || [];

  // Combine user and wallet data
  const userWallets = users.map(user => {
    const userWallet = wallets.find(wallet => wallet.userId === user._id);
    return {
      user,
      wallet: userWallet
    };
  });

  const handleBlockWallet = async (walletId: string) => {
    try {
      await blockWallets({ walletId }).unwrap();
      refetchWallets(); // Refresh wallet data
      refetchUsers(); // Refresh user data
    } catch (error) {
      console.error("Failed to block wallet:", error);
    }
  };

  const handleUnblockWallet = async (walletId: string) => {
    try {
      await unblockWallets({ walletId }).unwrap();
      refetchWallets(); // Refresh wallet data
      refetchUsers(); // Refresh user data
    } catch (error) {
      console.error("Failed to unblock wallet:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "blocked":
        return <Badge className="bg-red-500">Blocked</Badge>;
      case "suspended":
        return <Badge className="bg-yellow-500">Suspended</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(balance);
  };

  if (usersLoading || walletsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (usersError || walletsError) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            Failed to load users or wallets data
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User & Wallet Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>User Status</TableHead>
                  <TableHead>Wallet Balance</TableHead>
                  <TableHead>Wallet Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Wallet Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userWallets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-24">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  userWallets.map(({ user, wallet }) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        {wallet ? (
                          <div className="flex items-center">
                            <Wallet className="h-4 w-4 mr-2 text-green-500" />
                            {formatBalance(wallet.balance)}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No wallet</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {wallet ? getStatusBadge(wallet.status) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>
                        {wallet ? (
                          <div className="flex items-center space-x-2">
                            {wallet.status === "active" ? (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleBlockWallet(wallet._id)}
                                disabled={isBlocking}
                              >
                                {isBlocking ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                ) : (
                                  <Lock className="h-4 w-4 mr-1" />
                                )}
                                Block Wallet
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleUnblockWallet(wallet._id)}
                                disabled={isUnblocking}
                              >
                                {isUnblocking ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                ) : (
                                  <Unlock className="h-4 w-4 mr-1" />
                                )}
                                Unblock Wallet
                              </Button>
                            )}

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => navigator.clipboard.writeText(user._id)}
                                >
                                  Copy User ID
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => navigator.clipboard.writeText(wallet._id)}
                                >
                                  Copy Wallet ID
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => navigator.clipboard.writeText(wallet.balance.toString())}
                                >
                                  Copy Balance
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No actions</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Wallets</CardTitle>
            <Wallet className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {wallets.filter(w => w.status === "active").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Wallets</CardTitle>
            <Lock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {wallets.filter(w => w.status === "blocked").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBalance(wallets.reduce((total, wallet) => total + wallet.balance, 0))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUserManage;