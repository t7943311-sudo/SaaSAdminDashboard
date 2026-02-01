'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
    Users,
    DollarSign,
    Building,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Placeholder data
const kpiData = {
    totalUsers: { value: '12,402', change: '+15.2%', isPositive: true },
    activeWorkspaces: { value: '1,304', change: '+5.1%', isPositive: true },
    mrr: { value: '$21,842', change: '+3.2%', isPositive: true },
    failedPayments: { value: '12', change: '-10.5%', isPositive: true },
};

const revenueData = [
  { name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 }, { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 }, { name: 'Jun', revenue: 5500 },
  { name: 'Jul', revenue: 7000 }, { name: 'Aug', revenue: 6500 },
  { name: 'Sep', revenue: 7200 }, { name: 'Oct', revenue: 8000 },
  { name: 'Nov', revenue: 7500 }, { name: 'Dec', revenue: 9000 },
];

const systemStatus = [
    { name: 'API', status: 'Healthy', latency: '15ms' },
    { name: 'Database', status: 'Healthy', latency: '2ms' },
    { name: 'Background Jobs', status: 'Healthy', latency: 'N/A' },
    { name: 'Webhook Delivery', status: 'Degraded', latency: 'N/A' },
];

const recentAdminActions = [
    { admin: 'admin@example.com', action: 'Suspended user: bob@example.com', time: '5m ago' },
    { admin: 'admin@example.com', action: 'Granted Pro plan to Acme Inc.', time: '1h ago' },
    { admin: 'support@example.com', action: 'Impersonated user: charlie@example.com', time: '2h ago' },
];

export default function AdminOverviewPage() {
    return (
        <div className="space-y-6">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Platform Overview</h1>
                    <p className="text-muted-foreground">High-level platform health and key metrics.</p>
                </div>
            </div>

            {/* KPI Strip */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.totalUsers.value}</div>
                        <p className={`text-xs ${kpiData.totalUsers.isPositive ? 'text-green-500' : 'text-red-500'}`}>{kpiData.totalUsers.change}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Workspaces</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.activeWorkspaces.value}</div>
                        <p className={`text-xs ${kpiData.activeWorkspaces.isPositive ? 'text-green-500' : 'text-red-500'}`}>{kpiData.activeWorkspaces.change}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.mrr.value}</div>
                        <p className={`text-xs ${kpiData.mrr.isPositive ? 'text-green-500' : 'text-red-500'}`}>{kpiData.mrr.change}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Failed Payments (24h)</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.failedPayments.value}</div>
                        <p className={`text-xs ${kpiData.failedPayments.isPositive ? 'text-green-500' : 'text-red-500'}`}>{kpiData.failedPayments.change}</p>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Revenue Growth</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }} />
                                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>System Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {systemStatus.map(service => (
                                    <TableRow key={service.name}>
                                        <TableCell className="font-medium">{service.name}</TableCell>
                                        <TableCell>
                                            <Badge variant={service.status === 'Healthy' ? 'secondary' : 'destructive'} className="flex items-center w-fit gap-2">
                                                {service.status === 'Healthy' ? <CheckCircle className="h-3 w-3 text-green-500" /> : <AlertCircle className="h-3 w-3 text-red-500"/>}
                                                {service.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                         </Table>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Admin Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Admin</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead className="text-right">Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentAdminActions.map((activity, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-mono text-xs">{activity.admin}</TableCell>
                                    <TableCell>{activity.action}</TableCell>
                                    <TableCell className="text-right text-muted-foreground">{activity.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
