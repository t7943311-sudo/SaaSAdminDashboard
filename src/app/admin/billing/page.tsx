'use client';
import {
  Card,
  CardContent,
  CardDescription,
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
  Legend,
} from "recharts";
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    Users,
    Download,
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
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Placeholder Data
const kpiData = {
    mrr: { value: '$21,842', change: '+3.2%', isPositive: true },
    activeSubscriptions: { value: '1,421', change: '+21', isPositive: true },
    netRevenue: { value: '$19,230', change: '+1.8%', isPositive: true },
    churnRate: { value: '1.2%', change: '-0.2%', isPositive: true },
};

const revenueData = [
    { name: 'Jan', mrr: 15000, net: 14000 },
    { name: 'Feb', mrr: 16000, net: 15000 },
    { name: 'Mar', mrr: 18000, net: 17000 },
    { name: 'Apr', mrr: 17500, net: 16500 },
    { name: 'May', mrr: 19000, net: 18000 },
    { name: 'Jun', mrr: 21000, net: 19500 },
    { name: 'Jul', mrr: 21842, net: 19230 },
];

const recentTransactions = [
    { id: 'txn_1', user: { name: 'Acme Inc.', avatar: 'https://picsum.photos/seed/acme/40/40' }, type: 'Payment', amount: '$99.00', status: 'Paid', date: '1m ago' },
    { id: 'txn_2', user: { name: 'Beta Corp', avatar: 'https://picsum.photos/seed/beta/40/40' }, type: 'Payment', amount: '$29.00', status: 'Paid', date: '5m ago' },
    { id: 'txn_3', user: { name: 'Gamma LLC', avatar: 'https://picsum.photos/seed/gamma/40/40' }, type: 'Refund', amount: '$29.00', status: 'Refunded', date: '1h ago' },
    { id: 'txn_4', user: { name: 'Delta Co.', avatar: 'https://picsum.photos/seed/delta/40/40' }, type: 'Payment', amount: '$29.00', status: 'Failed', date: '2h ago' },
];

export default function AdminBillingPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Global Billing</h1>
                    <p className="text-muted-foreground">Monitor platform-wide revenue and billing metrics.</p>
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
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Data
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                        <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.activeSubscriptions.value}</div>
                        <p className={`text-xs ${kpiData.activeSubscriptions.isPositive ? 'text-green-500' : 'text-red-500'}`}>{kpiData.activeSubscriptions.change}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.netRevenue.value}</div>
                        <p className={`text-xs ${kpiData.netRevenue.isPositive ? 'text-green-500' : 'text-red-500'}`}>{kpiData.netRevenue.change}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Churn Rate (Net)</CardTitle>
                        <TrendingDown className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.churnRate.value}</div>
                        <p className={`text-xs ${kpiData.churnRate.isPositive ? 'text-green-500' : 'text-red-500'}`}>{kpiData.churnRate.change}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                    <CardDescription>MRR vs. Net Revenue (after fees & refunds)</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }} />
                            <Legend />
                            <Line type="monotone" dataKey="mrr" name="MRR" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="net" name="Net Revenue" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>A log of recent payments, refunds, and failed charges.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentTransactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={tx.user.avatar} alt={tx.user.name} />
                                                <AvatarFallback>{tx.user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{tx.user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{tx.type}</TableCell>
                                    <TableCell>{tx.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            tx.status === 'Paid' ? 'secondary' : 
                                            tx.status === 'Refunded' ? 'outline' : 'destructive'
                                        }>{tx.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-muted-foreground">{tx.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
