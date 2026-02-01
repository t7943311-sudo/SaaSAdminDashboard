'use client';
import { useState, useMemo } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { MoreVertical, PlusCircle, Search, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import type { FeatureFlag } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { CreateFlagDialog } from '@/components/admin/feature-flags/create-flag-dialog';
import { logAudit } from '@/lib/audit-logger';

export default function AdminFeatureFlagsPage() {
    const firestore = useFirestore();
    const { user: adminUser } = useUser();
    const flagsCollection = useMemoFirebase(() => collection(firestore, 'featureFlags'), [firestore]);
    const { data: flags, isLoading, error } = useCollection<FeatureFlag>(flagsCollection);
    const { toast } = useToast();

    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const filteredFlags = useMemo(() => {
        if (!flags) return [];
        return flags.filter(flag => flag.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [flags, searchTerm]);

    const handleToggleFlag = async (flag: FeatureFlag, currentStatus: boolean) => {
        try {
            const flagDocRef = doc(firestore, 'featureFlags', flag.id);
            await updateDoc(flagDocRef, { 
                status: !currentStatus,
                modified: serverTimestamp()
            });
            logAudit(firestore, adminUser, {
                action: 'flag.toggled',
                details: `Toggled flag "${flag.name}" to ${!currentStatus ? 'Enabled' : 'Disabled'}.`
            });
            toast({
                title: 'Flag Updated',
                description: `The flag has been ${!currentStatus ? 'enabled' : 'disabled'}.`
            });
        } catch (e) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not update the flag.' });
        }
    };
    
    const handleDeleteFlag = async (flag: FeatureFlag) => {
        try {
            await deleteDoc(doc(firestore, 'featureFlags', flag.id));
            logAudit(firestore, adminUser, {
                action: 'flag.deleted',
                details: `Deleted flag "${flag.name}" (ID: ${flag.id}).`
            });
            toast({ title: 'Flag Archived', description: 'The feature flag has been removed.' });
        } catch (e) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not remove the flag.' });
        }
    };

    return (
        <>
            <CreateFlagDialog isOpen={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">Feature Flags</h1>
                        <p className="text-muted-foreground">Manage feature rollouts and experiments across the platform.</p>
                    </div>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Flag
                    </Button>
                </div>
                
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search flags..."
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
                                    <TableHead>Feature Flag</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Targeting</TableHead>
                                    <TableHead>Last Modified</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading && <TableRow><TableCell colSpan={5} className="text-center h-24"><Loader2 className="mx-auto h-6 w-6 animate-spin" /></TableCell></TableRow>}
                                {error && <TableRow><TableCell colSpan={5} className="text-center h-24 text-destructive">Error loading feature flags.</TableCell></TableRow>}
                                {!isLoading && !error && filteredFlags.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            <h3 className="font-semibold">No feature flags created yet.</h3>
                                            <p className="text-muted-foreground text-sm">Create your first flag to get started.</p>
                                            <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                Create Flag
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {!isLoading && filteredFlags?.map((flag) => (
                                    <TableRow key={flag.id}>
                                        <TableCell className="font-medium">{flag.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={flag.status}
                                                    onCheckedChange={() => handleToggleFlag(flag, flag.status)}
                                                    aria-label={`Toggle ${flag.name}`}
                                                />
                                                <Badge variant={flag.status ? 'secondary' : 'outline'}>
                                                    {flag.status ? 'Enabled' : 'Disabled'}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-mono">{flag.target}</Badge>
                                        </TableCell>
                                        <TableCell>{flag.modified ? formatDistanceToNow(flag.modified.toDate(), { addSuffix: true }) : '-'}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Edit Targeting</DropdownMenuItem>
                                                    <DropdownMenuItem>View History</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteFlag(flag)}>Archive Flag</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
