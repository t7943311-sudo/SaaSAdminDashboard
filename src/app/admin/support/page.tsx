'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, ShieldAlert } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';

// Placeholder Data
const supportTickets = [
    { id: 'tkt_1', user: 'alice@example.com', subject: 'Cannot update billing info', status: 'Open', priority: 'High', updated: '2m ago' },
    { id: 'tkt_2', user: 'bob@example.com', subject: 'Question about API limits', status: 'Open', priority: 'Medium', updated: '1h ago' },
    { id: 'tkt_3', user: 'charlie@example.com', subject: 'Feature request: Dark mode', status: 'Closed', priority: 'Low', updated: '1d ago' },
];

export default function AdminSupportPage() {
    const [impersonateEmail, setImpersonateEmail] = useState('');
    const [impersonateReason, setImpersonateReason] = useState('');
    const { toast } = useToast();

    const handleImpersonate = () => {
        if (!impersonateEmail || !impersonateReason) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please provide both a user email and a reason for impersonation.',
            });
            return;
        }
        toast({
            title: 'Impersonation Session (Demo)',
            description: `In a real app, this would securely start an impersonation session for ${impersonateEmail}. All actions would be audited with the reason: "${impersonateReason}".`,
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Support Tools</h1>
                    <p className="text-muted-foreground">Access tools for customer support and moderation.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <KeyRound className="w-5 h-5" />
                        Impersonate User
                    </CardTitle>
                    <CardDescription>
                        Temporarily access the application as another user for debugging and support. This action will be heavily audited.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="max-w-md space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="impersonate-email">User Email</Label>
                            <Input id="impersonate-email" type="email" placeholder="user@example.com" value={impersonateEmail} onChange={(e) => setImpersonateEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="impersonate-reason">Reason</Label>
                            <Input id="impersonate-reason" placeholder="e.g., Debugging billing issue TKT-123" value={impersonateReason} onChange={(e) => setImpersonateReason(e.target.value)} />
                        </div>
                        <div className="flex items-start gap-3 rounded-lg border border-amber-500/50 bg-amber-500/10 p-3 text-amber-200">
                             <ShieldAlert className="w-8 h-8 mt-1 text-amber-500" />
                            <div>
                                <h4 className="font-semibold text-amber-400">Warning</h4>
                                <p className="text-xs">
                                    User impersonation is a highly privileged action. All sessions will be logged with your admin identity and the reason provided.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="destructive" onClick={handleImpersonate}>
                        <KeyRound className="mr-2" /> Start Impersonation Session
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Support Tickets</CardTitle>
                    <CardDescription>An overview of recent tickets from your support system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Last Updated</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {supportTickets.map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell className="font-medium">{ticket.user}</TableCell>
                                    <TableCell>{ticket.subject}</TableCell>
                                    <TableCell>
                                        <Badge variant={ticket.status === 'Open' ? 'default' : 'outline'}>{ticket.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                         <Badge variant={
                                            ticket.priority === 'High' ? 'destructive' :
                                            ticket.priority === 'Medium' ? 'secondary' : 'outline'
                                         }>{ticket.priority}</Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{ticket.updated}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
