'use client';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Subscription } from "@/lib/types";
import { Loader2 } from "lucide-react";

interface CancelSubscriptionDialogProps {
    subscription: Subscription;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: () => void;
    isCancelling: boolean;
}

export function CancelSubscriptionDialog({ subscription, isOpen, onOpenChange, onConfirm, isCancelling }: CancelSubscriptionDialogProps) {
    if (!subscription) return null;
    
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your subscription will remain active until the end of the current billing period on {new Date(subscription.currentPeriodEnd.seconds * 1000).toLocaleDateString()}. You can reactivate it anytime before then.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline" disabled={isCancelling}>Keep Subscription</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                         <Button variant="destructive" onClick={onConfirm} disabled={isCancelling}>
                            {isCancelling ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cancelling...</> : "Cancel Subscription"}
                         </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
