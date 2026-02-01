'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import type { PlatformSettings } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { logAudit } from '@/lib/audit-logger';


const DEFAULT_SETTINGS: PlatformSettings = {
    id: 'settings',
    sessionTimeout: 1440,
    enforce2FA: false,
    adminEmail: 'admins@example.com',
    dailySummaryReport: true,
    failedPaymentAlerts: true
}

export default function AdminSettingsPage() {
    const firestore = useFirestore();
    const { user: adminUser } = useUser();
    const settingsDocRef = useMemoFirebase(() => doc(firestore, 'platform', 'settings'), [firestore]);
    const { data: settings, isLoading, error } = useDoc<PlatformSettings>(settingsDocRef);

    const { toast } = useToast();
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [sessionTimeout, setSessionTimeout] = useState<number>(DEFAULT_SETTINGS.sessionTimeout);
    const [enforce2FA, setEnforce2FA] = useState<boolean>(DEFAULT_SETTINGS.enforce2FA);
    const [adminEmail, setAdminEmail] = useState<string>(DEFAULT_SETTINGS.adminEmail);
    const [dailySummary, setDailySummary] = useState<boolean>(DEFAULT_SETTINGS.dailySummaryReport);
    const [failedPayments, setFailedPayments] = useState<boolean>(DEFAULT_SETTINGS.failedPaymentAlerts);

    useEffect(() => {
        if (settings) {
            setSessionTimeout(settings.sessionTimeout ?? DEFAULT_SETTINGS.sessionTimeout);
            setEnforce2FA(settings.enforce2FA ?? DEFAULT_SETTINGS.enforce2FA);
            setAdminEmail(settings.adminEmail ?? DEFAULT_SETTINGS.adminEmail);
            setDailySummary(settings.dailySummaryReport ?? DEFAULT_SETTINGS.dailySummaryReport);
            setFailedPayments(settings.failedPaymentAlerts ?? DEFAULT_SETTINGS.failedPaymentAlerts);
        }
    }, [settings]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await setDoc(settingsDocRef, {
                sessionTimeout,
                enforce2FA,
                adminEmail,
                dailySummaryReport: dailySummary,
                failedPaymentAlerts: failedPayments,
            }, { merge: true });

            logAudit(firestore, adminUser, {
                action: 'settings.updated',
                details: 'Platform settings were updated.'
            });
            
            toast({ title: 'Saved!', description: 'Settings have been updated.' });
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not save settings.' });
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <Skeleton className="h-9 w-64" />
                    <Skeleton className="h-5 w-96 mt-2" />
                </div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="flex justify-between items-center"><Skeleton className="h-10 w-1/3" /><Skeleton className="h-6 w-12" /></div>
                        <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-10 w-48" /></div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-10 w-full" /></div>
                         <Separator />
                        <div className="flex justify-between items-center"><Skeleton className="h-10 w-1/3" /><Skeleton className="h-6 w-12" /></div>
                        <div className="flex justify-between items-center"><Skeleton className="h-10 w-1/3" /><Skeleton className="h-6 w-12" /></div>
                    </CardContent>
                </Card>
                 <div className="flex justify-end">
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">Admin Settings</h1>
                <p className="text-muted-foreground">Configure platform-level settings and security policies.</p>
            </div>
            
            {error && <Card className="border-destructive"><CardHeader><CardTitle className="text-destructive">Error</CardTitle><CardDescription className="text-destructive">Could not load platform settings. You may not have permission.</CardDescription></CardHeader></Card>}

            <Card>
                <CardHeader>
                    <CardTitle>Security Policies</CardTitle>
                    <CardDescription>Manage security settings for all users on the platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h3 className="font-medium">Enforce Two-Factor Authentication (2FA)</h3>
                            <p className="text-sm text-muted-foreground">
                                Require all users to set up 2FA to access their accounts.
                            </p>
                        </div>
                        <Switch id="enforce-2fa" checked={enforce2FA} onCheckedChange={setEnforce2FA} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                        <Input id="session-timeout" type="number" value={sessionTimeout} onChange={(e) => setSessionTimeout(Number(e.target.value))} className="max-w-xs" />
                        <p className="text-sm text-muted-foreground">Automatically log users out after a period of inactivity.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Admin Notifications</CardTitle>
                    <CardDescription>Configure where system alerts and reports are sent.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="space-y-2">
                        <Label htmlFor="admin-email">Primary Admin Email</Label>
                        <Input id="admin-email" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
                        <p className="text-sm text-muted-foreground">Critical system alerts will be sent to this address.</p>
                    </div>
                    <Separator />
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h3 className="font-medium">Daily Summary Report</h3>
                            <p className="text-sm text-muted-foreground">
                                Send a daily summary of platform activity to the primary admin email.
                            </p>
                        </div>
                        <Switch id="daily-summary" checked={dailySummary} onCheckedChange={setDailySummary} />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h3 className="font-medium">Failed Payment Alerts</h3>
                            <p className="text-sm text-muted-foreground">
                                Get immediate notifications for failed subscription payments.
                            </p>
                        </div>
                        <Switch id="failed-payments" checked={failedPayments} onCheckedChange={setFailedPayments} />
                    </div>
                </CardContent>
            </Card>
            
            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save All Settings
                </Button>
            </div>
        </div>
    )
}
