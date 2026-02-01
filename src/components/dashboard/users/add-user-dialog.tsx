'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirestore } from '@/firebase';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '@/firebase/config';

interface AddUserDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function AddUserDialog({ isOpen, onOpenChange }: AddUserDialogProps) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'member' | 'admin'>('member');
    const [isAdding, setIsAdding] = useState(false);
    
    const firestore = useFirestore();
    const { toast } = useToast();

    const handleAddUser = async () => {
        if (!email || !password || !fullName) {
            toast({ variant: 'destructive', title: 'Error', description: 'All fields are required.' });
            return;
        }
        if (password.length < 6) {
            toast({ variant: 'destructive', title: 'Error', description: 'Password must be at least 6 characters long.' });
            return;
        }

        setIsAdding(true);
        const tempAppName = `temp-user-creation-${Date.now()}`;
        const tempApp = initializeApp(firebaseConfig, tempAppName);
        const tempAuth = getAuth(tempApp);

        try {
            const userCredential = await createUserWithEmailAndPassword(tempAuth, email, password);
            const newUser = userCredential.user;

            const [firstName, lastName] = fullName.split(' ').slice(0, 2);

            await setDoc(doc(firestore, "users", newUser.uid), {
                id: newUser.uid,
                email: newUser.email,
                firstName: firstName || "",
                lastName: lastName || "",
                role: role,
                status: 'Active',
                onboardingCompleted: true, // Added by admin, so onboarding is skipped
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            toast({ title: 'Success', description: `User ${fullName} created successfully.` });
            onOpenChange(false);
            // Reset form
            setFullName('');
            setEmail('');
            setPassword('');
            setRole('member');
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error creating user', description: error.message });
        } finally {
            setIsAdding(false);
            await deleteApp(tempApp);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!isAdding) onOpenChange(open);
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                        Create a new user account and add them to your workspace.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input id="full-name" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isAdding}>Cancel</Button>
                    <Button onClick={handleAddUser} disabled={isAdding}>
                        {isAdding ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...</> : 'Add User'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
