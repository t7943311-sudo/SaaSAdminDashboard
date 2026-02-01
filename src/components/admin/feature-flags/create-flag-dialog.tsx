'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFirestore } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface CreateFlagDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function CreateFlagDialog({ isOpen, onOpenChange }: CreateFlagDialogProps) {
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');
    const [status, setStatus] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    
    const firestore = useFirestore();
    const { toast } = useToast();

    const handleCreateFlag = async () => {
        if (!name) {
            toast({ variant: 'destructive', title: 'Error', description: 'Flag name is required.' });
            return;
        }

        setIsCreating(true);
        try {
            const flagsCollection = collection(firestore, "featureFlags");
            await addDoc(flagsCollection, {
                name,
                status,
                target: target || 'Not targeted',
                modified: serverTimestamp()
            });

            toast({ title: 'Success', description: `Feature flag "${name}" created.` });
            onOpenChange(false);
            // Reset form
            setName('');
            setTarget('');
            setStatus(false);
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error creating flag', description: error.message });
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!isCreating) onOpenChange(open);
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Feature Flag</DialogTitle>
                    <DialogDescription>
                        Define a new feature flag and its initial state.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="flag-name">Flag Name</Label>
                        <Input id="flag-name" placeholder="e.g., New Dashboard UI" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="flag-target">Targeting (Optional)</Label>
                        <Input id="flag-target" placeholder="e.g., 50% of users, internal" value={target} onChange={(e) => setTarget(e.target.value)} />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="flag-status" checked={status} onCheckedChange={setStatus} />
                        <Label htmlFor="flag-status">Enable this flag initially</Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isCreating}>Cancel</Button>
                    <Button onClick={handleCreateFlag} disabled={isCreating}>
                        {isCreating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : 'Create Flag'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

    