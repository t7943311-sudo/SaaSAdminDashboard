'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
    Users,
    DollarSign,
    Activity,
    TrendingUp,
    Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    activeUsers: { value: '9,831', change: '+8.1%', isPositive: true },
    mrr: { value: '$21,842', change: '+3.2%', isPositive: true },
    conversionRate: { value: '3.45%', change: '-0.5%', isPositive: false },
};

const revenueData = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 5000, users: 9800 },
  { name: 'Apr', revenue: 4500, users: 3908 },
  { name: 'May', revenue: 6000, users: 4800 },
  { name: 'Jun', revenue: 5500, users: 3800 },
  { name: 'Jul', revenue: 7000, users: 4300 },
  { name: 'Aug', revenue: 6500, users: 5100 },
  { name: 'Sep', revenue: 7200, users: 5500 },
  { name: 'Oct', revenue: 8000, users: 5800 },
  { name: 'Nov', revenue: 7500, users: 6000 },
  { name: 'Dec', revenue: 9000, users: 6500 },
];

const usersByPlanData = [
    { name: 'Free', value: 8200 },
    { name: 'Pro', value: 3100 },
    { name: 'Enterprise', value: 1102 },
];

const COLORS = ['hsl(var(--muted))', 'hsl(var(--primary))', 'hsl(var(--accent))'];

const funnelData = [
    { step: 'Sign-ups', value: 10000, rate: '100%' },
    { step: 'Onboarding Completed', value: 8200, rate: '82.0%' },
    { step: 'First Action', value: 6500, rate: '65.0%' },
    { step: 'Paid Conversion', value: 345, rate: '3.45%' },
];

const recentActivities = [
    { id: 1, type: 'New Subscription', user: 'Liam Johnson', plan: 'Pro', time: '2m ago' },
    { id: 2, type: 'New Sign-up', user: 'Olivia Smith', plan: 'Free', time: '5m ago' },
    { id: 3, type: 'Cancellation', user: 'Noah Williams', plan: 'Pro', time: '1h ago' },
    { id: 4, type: 'Payment Failed', user: 'Emma Brown', plan: 'Pro', time: '3h ago' },
];


export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Analytics</h1>
                    <p className="text-muted-foreground">Get insights into your business health and performance.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="30d">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Date range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="30d">Last 30 Days</SelectItem>
                            <SelectItem value="90d">Last 90 Days</SelectItem>
                            <SelectItem value="all">All Time</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
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
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.activeUsers.value}</div>
                        <p className={`text-xs ${kpiData.activeUsers.isPositive ? 'text-green-500' : 'text-red-500'}`}>{kpiData.activeUsers.change}</p>
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
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.conversionRate.value}</div>
                        <p className={`text-xs ${kpiData.conversionRate.isPositive ? 'text-green-500' : 'text-red-500'}`}>{kpiData.conversionRate.change}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Primary Trend Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Revenue & User Growth</CardTitle>
                    <CardDescription>Overview of key growth metrics over time.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
                            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }} />
                            <Legend wrapperStyle={{fontSize: "12px"}}/>
                            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} name="Revenue" dot={false} />
                            <Line yAxisId="right" type="monotone" dataKey="users" stroke="hsl(var(--accent))" strokeWidth={2} name="New Users" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {/* Segmented Breakdown */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Users by Plan</CardTitle>
                        <CardDescription>Breakdown of users across subscription tiers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={usersByPlanData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                    {usersByPlanData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }} />
                                <Legend wrapperStyle={{fontSize: "12px"}}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Funnel Analysis */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Conversion Funnel</CardTitle>
                         <CardDescription>Key conversion steps from sign-up to paid.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {funnelData.map((item, index) => (
                            <div key={item.step} className="flex items-center gap-4">
                                <div className="w-4 h-4 text-sm text-muted-foreground">{index+1}</div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-sm font-medium">{item.step}</p>
                                        <p className="text-sm text-muted-foreground">{item.rate}</p>
                                    </div>
                                    <div className="w-full bg-secondary rounded-full h-2.5">
                                        <div className="bg-primary h-2.5 rounded-full" style={{ width: item.rate }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>A live feed of important events.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead className="text-right">Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentActivities.map((activity) => (
                                <TableRow key={activity.id}>
                                    <TableCell>
                                        <Badge variant={
                                            activity.type === 'New Subscription' ? 'default' :
                                            activity.type === 'Cancellation' ? 'destructive' : 'secondary'
                                        }>{activity.type}</Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{activity.user}</TableCell>
                                    <TableCell>{activity.plan}</TableCell>
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
