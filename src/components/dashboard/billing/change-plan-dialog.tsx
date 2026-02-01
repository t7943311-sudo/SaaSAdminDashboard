'use client';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SubscriptionPlan } from "@/lib/types";
import { Loader2 } from "lucide-react";

interface ChangePlanDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: () => void;
    isChanging: boolean;
    fromPlan: SubscriptionPlan | null;
    toPlan: SubscriptionPlan | null;
}

export function ChangePlanDialog({ isOpen, onOpenChange, onConfirm, isChanging, fromPlan, toPlan }: ChangePlanDialogProps) {
    if (!fromPlan || !toPlan) return null;

    const isUpgrade = toPlan.price > fromPlan.price;
    
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Plan Change</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to {isUpgrade ? 'upgrade' : 'downgrade'} your plan from <strong>{fromPlan.name}</strong> to <strong>{toPlan.name}</strong>.
                        Your new billing cycle will start today.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline" disabled={isChanging}>Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                         <Button onClick={onConfirm} disabled={isChanging}>
                            {isChanging 
                                ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {isUpgrade ? 'Upgrading...' : 'Downgrading...'}</> 
                                : `Confirm ${isUpgrade ? 'Upgrade' : 'Downgrade'}`
                            }
                         </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
