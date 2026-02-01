'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser, useFirestore } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { User as FirebaseUserEntity } from "@/lib/types";
import { logAudit } from '@/lib/audit-logger';

interface EditRoleDialogProps {
    user: FirebaseUserEntity | null;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function EditRoleDialog({ user, isOpen, onOpenChange }: EditRoleDialogProps) {
    const [role, setRole] = useState<'member' | 'admin' | undefined>(user?.role);
    const [isSaving, setIsSaving] = useState(false);
    const firestore = useFirestore();
    const { user: adminUser } = useUser();
    const { toast } = useToast();

    useEffect(() => {
        setRole(user?.role);
    }, [user]);

    const handleSave = async () => {
        if (!user || !role) return;

        setIsSaving(true);
        try {
            const userDocRef = doc(firestore, 'users', user.id);
            await updateDoc(userDocRef, { role: role });
            logAudit(firestore, adminUser, {
                action: 'user.role.updated',
                details: `Changed role for ${user.email} from ${user.role} to ${role}.`
            });
            toast({ title: 'Success', description: 'User role updated.' });
            onOpenChange(false);
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to update role.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Role</DialogTitle>
                    <DialogDescription>
                        Change the role for <span className="font-semibold">{user.firstName} {user.lastName}</span>.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={role} onValueChange={(value: 'member' | 'admin') => setRole(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="member">Member</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
