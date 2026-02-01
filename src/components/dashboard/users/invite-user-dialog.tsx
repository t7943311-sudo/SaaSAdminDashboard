'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirestore } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface InviteUserDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function InviteUserDialog({ isOpen, onOpenChange }: InviteUserDialogProps) {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'member' | 'admin'>('member');
    const [isInviting, setIsInviting] = useState(false);
    const firestore = useFirestore();
    const { toast } = useToast();

    const handleInvite = async () => {
        if (!email) {
            toast({ variant: 'destructive', title: 'Error', description: 'Email is required.' });
            return;
        }
        setIsInviting(true);
        try {
            // In a real app, this would trigger a backend function to send an invite email.
            // For this starter kit, we'll add a user with a 'Pending' status.
            const usersCollection = collection(firestore, 'users');
            await addDoc(usersCollection, {
                email,
                role,
                firstName: email.split('@')[0], // Placeholder name
                lastName: '',
                status: 'Pending',
                onboardingCompleted: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            toast({ title: 'Success', description: `Invitation sent to ${email}.` });
            onOpenChange(false);
            setEmail('');
            setRole('member');
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } finally {
            setIsInviting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite User</DialogTitle>
                    <DialogDescription>
                        Enter the email address and assign a role to invite a new user.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
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
                    <Button onClick={handleInvite} disabled={isInviting}>
                        {isInviting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : 'Send Invitation'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
