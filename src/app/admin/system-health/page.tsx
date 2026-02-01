'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Placeholder Data
const services = [
    { name: 'Web Application', status: 'Healthy', details: 'All systems operational.' },
    { name: 'API Services', status: 'Healthy', details: '99.98% uptime. p95 latency: 45ms.' },
    { name: 'Firestore Database', status: 'Healthy', details: 'Normal operation. Low latency.' },
    { name: 'Authentication Service', status: 'Healthy', details: 'User sign-ins are normal.' },
    { name: 'AI Generation API', status: 'Degraded', details: 'Increased latency on image models.' },
    { name: 'Background Job Processor', status: 'Healthy', details: 'Queue at 0 jobs.' },
    { name: 'Webhook Delivery', status: 'Failing', details: 'High failure rate for endpoint example.com.' },
    { name: 'Global DNS', status: 'Healthy', details: 'Resolving correctly worldwide.' },
];

const incidents = [
    { id: 'inc_1', title: 'Increased Latency on Image Generation', status: 'Monitoring', updated: '5m ago' },
    { id: 'inc_2', title: 'Webhook Delivery Failures', status: 'Investigating', updated: '20m ago' },
    { id: 'inc_3', title: 'Brief Database Unavailability [Resolved]', status: 'Resolved', updated: '2h ago' },
];

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Healthy':
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        case 'Degraded':
            return <AlertTriangle className="h-5 w-5 text-amber-500" />;
        case 'Failing':
            return <XCircle className="h-5 w-5 text-red-500" />;
        default:
            return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
}

export default function AdminSystemHealthPage() {
    const uptimePercentage = 99.96;
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">System Health</h1>
                    <p className="text-muted-foreground">Monitor the status and performance of all platform services.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Overall Status</CardTitle>
                    <CardDescription>Uptime and incidents over the last 90 days.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col justify-between rounded-lg border p-4">
                        <div>
                            <div className="text-sm text-muted-foreground">Overall Uptime</div>
                            <div className="text-3xl font-bold text-green-500">{uptimePercentage}%</div>
                        </div>
                        <div className="mt-4">
                             <Progress value={uptimePercentage} />
                             <p className="text-xs text-muted-foreground mt-2">Target: 99.9%</p>
                        </div>
                    </div>
                     <div className="rounded-lg border p-4">
                        <div className="text-sm text-muted-foreground mb-2">Recent Incidents</div>
                        <div className="space-y-3">
                            {incidents.map(incident => (
                                <div key={incident.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{incident.title}</p>
                                        <p className="text-xs text-muted-foreground">{incident.updated}</p>
                                    </div>
                                    <Badge variant={incident.status === 'Resolved' ? 'secondary' : 'default'} className={incident.status === 'Investigating' ? 'bg-amber-500' : ''}>
                                        {incident.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                     </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Service Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.map(service => (
                                <TableRow key={service.name}>
                                    <TableCell className="font-medium">{service.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(service.status)}
                                            <span className="font-semibold">{service.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{service.details}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
