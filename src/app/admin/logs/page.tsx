'use client';
import { useState, useMemo } from 'react';
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
import { Search, File, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { AuditLog } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';


export default function AdminLogsPage() {
    const firestore = useFirestore();
    const [searchTerm, setSearchTerm] = useState('');
    
    const logsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'auditLogs'), orderBy('createdAt', 'desc'));
    }, [firestore]);
    const { data: auditLogs, isLoading, error } = useCollection<AuditLog>(logsQuery);

    const filteredLogs = useMemo(() => {
        if (!auditLogs) return [];
        if (!searchTerm) return auditLogs;
        return auditLogs.filter(log => 
            log.actor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [auditLogs, searchTerm]);

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
                                placeholder="Search by actor, action, or details..."
                                className="w-full rounded-lg bg-background pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                            {isLoading && <TableRow><TableCell colSpan={5} className="text-center h-24"><Loader2 className="mx-auto h-6 w-6 animate-spin" /></TableCell></TableRow>}
                            {error && <TableRow><TableCell colSpan={5} className="text-center h-24 text-destructive">Error loading audit logs. You may not have permission.</TableCell></TableRow>}
                            {!isLoading && !error && filteredLogs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        <h3 className="font-semibold">No audit logs found.</h3>
                                        <p className="text-muted-foreground text-sm">Perform an administrative action to generate a log entry.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                            {filteredLogs?.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={log.actor.avatar} />
                                                <AvatarFallback>{log.actor.name?.charAt(0) || log.actor.email.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{log.actor.name}</span>
                                                <span className="text-xs text-muted-foreground">{log.actor.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-mono">{log.action}</Badge>
                                    </TableCell>
                                    <TableCell>{log.details}</TableCell>
                                    <TableCell className="font-mono">{log.ipAddress}</TableCell>
                                    <TableCell>{log.createdAt ? formatDistanceToNow(log.createdAt.toDate(), { addSuffix: true }) : '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
