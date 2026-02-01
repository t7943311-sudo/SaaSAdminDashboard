'use client';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, File } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Placeholder Data
const auditLogs = [
  { id: 'log_1', actor: { name: 'admin@example.com', type: 'admin', avatar: 'https://picsum.photos/seed/admin/40/40' }, action: 'user.impersonated', details: 'Impersonated user bob@example.com', ip: '123.45.67.89', timestamp: '2024-07-19T10:00:00Z' },
  { id: 'log_2', actor: { name: 'alice@example.com', type: 'user', avatar: 'https://picsum.photos/seed/alice/40/40' }, action: 'subscription.upgraded', details: 'Upgraded to Pro plan', ip: '98.76.54.32', timestamp: '2024-07-19T09:45:00Z' },
  { id: 'log_3', actor: { name: 'system', type: 'system' }, action: 'feature_flag.updated', details: 'Enabled "New Dashboard UI" for 100% of users', ip: 'N/A', timestamp: '2024-07-19T09:30:00Z' },
  { id: 'log_4', actor: { name: 'admin@example.com', type: 'admin', avatar: 'https://picsum.photos/seed/admin/40/40' }, action: 'user.suspended', details: 'Suspended user eve@example.com for ToS violation', ip: '123.45.67.89', timestamp: '2024-07-19T09:15:00Z' },
  { id: 'log_5', actor: { name: 'charlie@example.com', type: 'user', avatar: 'https://picsum.photos/seed/charlie/40/40' }, action: 'user.login_failed', details: 'Failed login attempt', ip: '11.22.33.44', timestamp: '2024-07-19T09:10:00Z' },
];

export default function AdminLogsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Audit Logs</h1>
                    <p className="text-muted-foreground">Track all administrative actions and important system events.</p>
                </div>
                <Button variant="outline">
                    <File className="mr-2 h-4 w-4" />
                    Export Logs
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search by actor, action, or IP..."
                                className="w-full rounded-lg bg-background pl-8"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Actor</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Details</TableHead>
                                <TableHead>IP Address</TableHead>
                                <TableHead>Timestamp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {auditLogs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {log.actor.type !== 'system' && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={log.actor.avatar} />
                                                    <AvatarFallback>{log.actor.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="font-medium">{log.actor.name}</span>
                                                <Badge variant="outline" className="w-fit">{log.actor.type}</Badge>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-mono">{log.action}</Badge>
                                    </TableCell>
                                    <TableCell>{log.details}</TableCell>
                                    <TableCell className="font-mono">{log.ip}</TableCell>
                                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
