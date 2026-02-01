'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">Admin Settings</h1>
                <p className="text-muted-foreground">Configure platform-level settings and security policies.</p>
            </div>

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
                        <Switch id="enforce-2fa" onClick={() => toast({ title: 'Feature coming soon!' })} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                        <Input id="session-timeout" type="number" defaultValue={1440} className="max-w-xs" />
                        <p className="text-sm text-muted-foreground">Automatically log users out after a period of inactivity.</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => toast({ title: 'Saved!', description: 'Security policies have been updated.' })}>Save Policies</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Admin Notifications</CardTitle>
                    <CardDescription>Configure where system alerts and reports are sent.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="space-y-2">
                        <Label htmlFor="admin-email">Primary Admin Email</Label>
                        <Input id="admin-email" type="email" defaultValue="admins@example.com" />
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
                        <Switch id="daily-summary" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h3 className="font-medium">Failed Payment Alerts</h3>
                            <p className="text-sm text-muted-foreground">
                                Get immediate notifications for failed subscription payments.
                            </p>
                        </div>
                        <Switch id="failed-payments" defaultChecked />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => toast({ title: 'Saved!', description: 'Notification settings have been updated.' })}>Save Notification Settings</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
