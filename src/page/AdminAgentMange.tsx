import { useApproveAgentMutation, useShowAgentInfoQuery, useSuspendAgentMutation } from "@/redux/features/adminAPi/adminApi";
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
import { Loader2, CheckCircle, XCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Agent {
  _id: string;
  userId: string;
  email: string;
  commissionRate: number;
  approvalStatus: "pending" | "approved" | "suspended" | "rejected";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AdminAgentMange = () => {
  const { data, isLoading, error, refetch } = useShowAgentInfoQuery(undefined);
  const [approveAgent, { isLoading: isApproving }] = useApproveAgentMutation();
  const [suspendAgent, { isLoading: isSuspending }] = useSuspendAgentMutation();

  const agents: Agent[] = data?.data?.agents || [];

  const handleApprove = async (agentId: string) => {
    try {
      await approveAgent({ agentId }).unwrap();
      refetch(); // Refresh the data
    } catch (error) {
      console.error("Failed to approve agent:", error);
    }
  };

  const handleSuspend = async (agentId: string) => {
    try {
      await suspendAgent({ agentId }).unwrap();
      refetch(); // Refresh the data
    } catch (error) {
      console.error("Failed to suspend agent:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>;
      case "rejected":
        return <Badge className="bg-gray-500">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            Failed to load agents data
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Agent Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                      No agents found.
                    </TableCell>
                  </TableRow>
                ) : (
                  agents.map((agent) => (
                    <TableRow key={agent._id}>
                      <TableCell className="font-medium">
                        {agent.email}
                      </TableCell>
                      <TableCell>{agent.commissionRate}%</TableCell>
                      <TableCell>{getStatusBadge(agent.approvalStatus)}</TableCell>
                      <TableCell>{formatDate(agent.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {agent.approvalStatus === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => handleApprove(agent._id)}
                              disabled={isApproving}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              {isApproving ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                              ) : (
                                <CheckCircle className="h-4 w-4 mr-1" />
                              )}
                              Approve
                            </Button>
                          )}
                          
                          {agent.approvalStatus === "approved" && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleSuspend(agent._id)}
                              disabled={isSuspending}
                            >
                              {isSuspending ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                              ) : (
                                <XCircle className="h-4 w-4 mr-1" />
                              )}
                              Suspend
                            </Button>
                          )}

                          {/* Dropdown for additional actions */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(agent._id)}
                              >
                                Copy Agent ID
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(agent.userId)}
                              >
                                Copy User ID
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
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
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agents.filter(a => a.approvalStatus === "approved").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agents.filter(a => a.approvalStatus === "pending").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agents.filter(a => a.approvalStatus === "suspended").length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAgentMange;