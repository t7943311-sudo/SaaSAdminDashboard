'use client';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { User as FirebaseUserEntity } from "@/lib/types";
import { Loader2 } from "lucide-react";

interface RemoveUserAlertProps {
    user: FirebaseUserEntity | null;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: () => void;
    isRemoving: boolean;
}

export function RemoveUserAlert({ user, isOpen, onOpenChange, onConfirm, isRemoving }: RemoveUserAlertProps) {
    if (!user) return null;
    
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently remove <span className="font-semibold">{user.firstName} {user.lastName}</span> from your records.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline" disabled={isRemoving}>Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                         <Button variant="destructive" onClick={onConfirm} disabled={isRemoving}>
                            {isRemoving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Removing...</> : "Remove User"}
                         </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
