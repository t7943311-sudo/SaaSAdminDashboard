'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import type { User as UserType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, MoreVertical, KeyRound, Copy, PlusCircle, Webhook, BookMarked } from 'lucide-react';
import { InviteUserDialog } from '@/components/dashboard/users/invite-user-dialog';
import { placeholderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

const teamMembers = [
    { id: 'team-member-1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 'team-member-2', name: 'Bob Williams', email: 'bob@example.com', role: 'Member' },
    { id: 'team-member-3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Member' },
];

const apiKeys = [
    { name: 'Primary Live Key', key: 'pk_live_******************', created: 'Jan 1, 2024', lastUsed: '5m ago', scope: 'Full Access', status: 'Active' },
    { name: 'Read-only Analytics Key', key: 'pk_live_******************', created: 'Feb 15, 2024', lastUsed: '2 days ago', scope: 'Read-only', status: 'Active' },
    { name: 'Old Test Key', key: 'sk_test_******************', created: 'Dec 1, 2023', lastUsed: '3 months ago', scope: 'Test Data', status: 'Revoked' },
];

const webhooks = [
    { id: 'wh_1', url: 'https://api.example.com/v1/webhooks/users', status: 'Active', events: 3, lastDelivery: '2m ago', deliveryStatus: 'Success' },
    { id: 'wh_2', url: 'https://api.another.com/notifications', status: 'Failing', events: 1, lastDelivery: '1h ago', deliveryStatus: 'Failed' },
];

const eventReferences = [
    {
        name: 'user.created',
        description: 'Fires whenever a new user is created in your application, either through sign-up or by an admin.',
        payload: `{
  "event": "user.created",
  "data": {
    "id": "usr_12345",
    "email": "new.user@example.com",
    "firstName": "John",
    "createdAt": "2024-01-01T12:00:00Z"
  }
}`
    },
    {
        name: 'subscription.updated',
        description: 'Fires when a subscription is created, upgraded, downgraded, or canceled.',
        payload: `{
  "event": "subscription.updated",
  "data": {
    "id": "sub_67890",
    "userId": "usr_12345",
    "planId": "plan_pro",
    "status": "active",
    "currentPeriodEnd": "2025-01-01T12:00:00Z"
  }
}`
    },
    {
        name: 'invoice.paid',
        description: 'Fires when an invoice has been successfully paid.',
        payload: `{
  "event": "invoice.paid",
  "data": {
    "id": "inv_abcde",
    "subscriptionId": "sub_67890",
    "amount": 2900,
    "currency": "usd",
    "paidAt": "2024-01-01T12:00:00Z"
  }
}`
    }
];

export default function SettingsPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const userDocRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserType>(userDocRef);

  // Profile State
  const [name, setName] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  
  // Workspace State
  const [workspaceName, setWorkspaceName] = useState('');
  const [isSavingWorkspace, setIsSavingWorkspace] = useState(false);

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  
  // Dialog state
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setName(`${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim());
      setWorkspaceName(userProfile.workspaceName || '');
    }
  }, [userProfile]);
  
  const handleProfileSave = async () => {
    if (!user) return;
    setIsSavingProfile(true);
    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ');
    
    try {
      await updateProfile(user, { displayName: name });
      if(userDocRef) {
          await updateDoc(userDocRef, { firstName, lastName });
      }
      toast({ title: 'Success', description: 'Your profile has been updated.' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not update profile.' });
    } finally {
      setIsSavingProfile(false);
    }
  };
  
  const handleWorkspaceSave = async () => {
    if (!userDocRef) return;
    setIsSavingWorkspace(true);
    try {
      await updateDoc(userDocRef, { workspaceName });
      toast({ title: 'Success', description: 'Workspace name updated.' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not update workspace name.' });
    } finally {
      setIsSavingWorkspace(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!user || !currentPassword || !newPassword) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please fill out all password fields.' });
      return;
    }
    if (newPassword.length < 6) {
        toast({ variant: 'destructive', title: 'Error', description: 'New password must be at least 6 characters long.' });
        return;
    }
    
    setIsUpdatingPassword(true);
    try {
        if (user.email) {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            toast({ title: 'Success', description: 'Your password has been updated.' });
            setCurrentPassword('');
            setNewPassword('');
        }
    } catch (error: any) {
        let errorMessage = 'Failed to update password.';
        if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect current password.';
        }
        toast({ variant: 'destructive', title: 'Error', description: errorMessage });
    } finally {
        setIsUpdatingPassword(false);
    }
  };

  const isLoading = isUserLoading || isProfileLoading;
  
  if (isLoading) {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-9 w-48" />
                <Skeleton className="h-5 w-80 mt-2" />
            </div>
             <div className="flex flex-col md:flex-row gap-8">
                <Skeleton className="w-full md:w-1/5 h-48" />
                <Skeleton className="w-full md:w-4/5 h-96" />
             </div>
        </div>
    )
  }

  return (
    <>
      <InviteUserDialog isOpen={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account, workspace, and application settings.</p>
        </div>
        <Tabs defaultValue="profile" orientation="vertical" className="flex flex-col md:flex-row gap-8">
          <TabsList className="flex md:flex-col items-start justify-start h-auto bg-transparent p-0 border-b md:border-r md:border-b-0 w-full md:w-1/5 shrink-0">
            <TabsTrigger value="profile" className="w-full justify-start data-[state=active]:bg-muted">Profile</TabsTrigger>
            <TabsTrigger value="account" className="w-full justify-start data-[state=active]:bg-muted">Account & Workspace</TabsTrigger>
            <TabsTrigger value="security" className="w-full justify-start data-[state=active]:bg-muted">Security</TabsTrigger>
            <TabsTrigger value="notifications" className="w-full justify-start data-[state=active]:bg-muted">Notifications</TabsTrigger>
            <TabsTrigger value="developer" className="w-full justify-start data-[state=active]:bg-muted">Developer</TabsTrigger>
            <TabsTrigger value="appearance" className="w-full justify-start data-[state=active]:bg-muted">Appearance</TabsTrigger>
          </TabsList>
          <div className="w-full">
              <TabsContent value="profile" className="mt-0">
              <Card>
                  <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                      This is how others will see you on the site.
                  </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                          <AvatarImage src={user?.photoURL || `https://picsum.photos/seed/${user?.uid}/80/80`} />
                          <AvatarFallback>{(userProfile?.firstName?.charAt(0) || '') + (userProfile?.lastName?.charAt(0) || '')}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                           <Button onClick={() => toast({ title: 'Feature coming soon!', description: 'Avatar uploads will be available in a future update.'})}>Upload Avatar</Button>
                          <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                      </div>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={user?.email || ''} disabled />
                      <p className="text-xs text-muted-foreground">You can't change your email address.</p>
                  </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleProfileSave} disabled={isSavingProfile}>
                      {isSavingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </Button>
                  </CardFooter>
              </Card>
              </TabsContent>

              <TabsContent value="account" className="mt-0 space-y-6">
                  <Card>
                      <CardHeader>
                          <CardTitle>Workspace Settings</CardTitle>
                          <CardDescription>Manage your workspace details.</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <div className="space-y-2">
                              <Label htmlFor="workspace-name">Workspace Name</Label>
                              <Input id="workspace-name" value={workspaceName} onChange={e => setWorkspaceName(e.target.value)} />
                          </div>
                      </CardContent>
                      <CardFooter>
                          <Button onClick={handleWorkspaceSave} disabled={isSavingWorkspace}>
                            {isSavingWorkspace && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Workspace
                          </Button>
                      </CardFooter>
                  </Card>
                  <Card>
                      <CardHeader>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>
                          Manage your team members and their roles. This is a demo section.
                      </CardDescription>
                      </CardHeader>
                      <CardContent>
                      <Table>
                          <TableHeader>
                          <TableRow>
                              <TableHead>Member</TableHead>
                              <TableHead>Role</TableHead>
                              <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                          </TableHeader>
                          <TableBody>
                          {teamMembers.map((member) => {
                             const avatarImage = placeholderImages.find(p => p.id === member.id);
                             return (
                              <TableRow key={member.email}>
                              <TableCell>
                                  <div className="flex items-center gap-3">
                                      <Avatar>
                                          {avatarImage && <AvatarImage src={avatarImage.imageUrl} />}
                                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                          <div className="font-medium">{member.name}</div>
                                          <div className="text-sm text-muted-foreground">{member.email}</div>
                                      </div>
                                  </div>
                              </TableCell>
                              <TableCell>
                                  <Select defaultValue={member.role} onValueChange={() => toast({ title: 'Demo Only', description: 'Changing roles is not implemented in this demo section.' })}>
                                  <SelectTrigger className="w-[120px]">
                                      <SelectValue placeholder="Select role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="Admin">Admin</SelectItem>
                                      <SelectItem value="Member">Member</SelectItem>
                                  </SelectContent>
                                  </Select>
                              </TableCell>
                              <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" onClick={() => toast({ title: 'Demo Only', description: 'Removing users is not implemented in this demo section.' })}>Remove</Button>
                              </TableCell>
                              </TableRow>
                          )})}
                          </TableBody>
                      </Table>
                      </CardContent>
                      <CardFooter className="justify-between">
                          <p className="text-sm text-muted-foreground">You have {teamMembers.length} team members.</p>
                          <Button onClick={() => setIsInviteDialogOpen(true)}>Invite Member</Button>
                      </CardFooter>
                  </Card>
                  <Card className="border-destructive/50">
                      <CardHeader>
                          <CardTitle className="text-destructive">Danger Zone</CardTitle>
                          <CardDescription>These actions are irreversible. Please proceed with caution.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                          <div className="flex items-center justify-between rounded-lg border border-border p-4">
                              <div>
                                  <h3 className="font-medium">Delete Workspace</h3>
                                  <p className="text-sm text-muted-foreground">Permanently delete your workspace and all its data.</p>
                              </div>
                              <Button variant="destructive" onClick={() => toast({variant: "destructive", title: 'Demo Only', description: 'This is a demo. Deleting a workspace is not implemented.'})}>Delete</Button>
                          </div>
                      </CardContent>
                  </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-0">
              <Card>
                  <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                      Manage your password and two-factor authentication.
                  </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                  <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                      <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
                      <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account.
                      </p>
                      </div>
                      <Switch id="2fa-toggle" onClick={() => toast({ title: 'Feature coming soon!' })} />
                  </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handlePasswordUpdate} disabled={isUpdatingPassword}>
                        {isUpdatingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Update Password
                    </Button>
                  </CardFooter>
              </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                  <Card>
                      <CardHeader>
                          <CardTitle>Notifications</CardTitle>
                          <CardDescription>Manage how you receive notifications.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                          <div className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                  <h3 className="font-medium">Email Notifications</h3>
                                  <p className="text-sm text-muted-foreground">Receive emails about your account, new features, and updates.</p>
                              </div>
                              <Switch id="email-notifications-toggle" defaultChecked/>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                  <h3 className="font-medium">In-app Notifications</h3>
                                  <p className="text-sm text-muted-foreground">Get notified about activity within the application.</p>
                              </div>
                              <Switch id="in-app-notifications-toggle" defaultChecked />
                          </div>
                      </CardContent>
                      <CardFooter>
                          <Button onClick={() => toast({title: "Saved!", description: "Your notification preferences have been saved."})}>Save Preferences</Button>
                      </CardFooter>
                  </Card>
              </TabsContent>

              <TabsContent value="developer" className="mt-0">
                  <Tabs defaultValue="api-keys" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="api-keys">API Keys</TabsTrigger>
                        <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                        <TabsTrigger value="events">Events & Logs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="api-keys" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>API Keys</CardTitle>
                                <CardDescription>Manage your API keys for programmatic access. Keys are for demo purposes only.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Key Name</TableHead>
                                            <TableHead>Key</TableHead>
                                            <TableHead>Scope</TableHead>
                                            <TableHead>Created</TableHead>
                                            <TableHead>Last Used</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {apiKeys.map((apiKey) => (
                                        <TableRow key={apiKey.key}>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${apiKey.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                {apiKey.name}
                                            </TableCell>
                                            <TableCell><code className="font-mono">{apiKey.key}</code></TableCell>
                                            <TableCell><Badge variant="secondary">{apiKey.scope}</Badge></TableCell>
                                            <TableCell>{apiKey.created}</TableCell>
                                            <TableCell>{apiKey.lastUsed}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => toast({ title: 'Feature coming soon!' })}>Edit Permissions</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive" onClick={() => toast({ title: 'Feature coming soon!' })}>Revoke Key</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="justify-between">
                                <p className="text-sm text-muted-foreground">Never share your secret keys publicly.</p>
                                <Button onClick={() => toast({ title: 'Feature coming soon!', description: 'Key generation is not yet available in this demo.' })}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Generate new key
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="webhooks" className="mt-6">
                        <Card>
                             <CardHeader>
                                <CardTitle>Webhooks</CardTitle>
                                <CardDescription>Manage webhook endpoints for receiving events from your application.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Endpoint URL</TableHead>
                                            <TableHead>Subscribed Events</TableHead>
                                            <TableHead>Last Delivery</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {webhooks.map((webhook) => (
                                            <TableRow key={webhook.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${webhook.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                        <code className="font-mono">{webhook.url}</code>
                                                    </div>
                                                </TableCell>
                                                <TableCell><Badge variant="outline">{webhook.events} events</Badge></TableCell>
                                                <TableCell className="flex items-center gap-2">
                                                    <Badge variant={webhook.deliveryStatus === 'Success' ? 'secondary' : 'destructive'}>{webhook.deliveryStatus}</Badge>
                                                    <span className="text-muted-foreground">{webhook.lastDelivery}</span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => toast({ title: 'Feature coming soon!' })}>View Deliveries</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => toast({ title: 'Feature coming soon!' })}>Edit Endpoint</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-destructive" onClick={() => toast({ title: 'Feature coming soon!' })}>Delete Endpoint</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => toast({ title: 'Feature coming soon!', description: 'Adding webhooks is not available in this demo.' })}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Webhook Endpoint
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="events" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Events Reference</CardTitle>
                                <CardDescription>A reference of all events that can be sent to your webhook endpoints.</CardDescription>
                            </CardHeader>
                            <CardContent>
                               <Accordion type="single" collapsible className="w-full">
                                {eventReferences.map((event, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger>
                                            <div className="flex items-center gap-2 font-mono text-sm">
                                                <Webhook className="h-4 w-4 text-primary" />
                                                {event.name}
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p className="mb-4 text-muted-foreground">{event.description}</p>
                                            <pre className="bg-secondary p-4 rounded-md text-xs overflow-x-auto font-mono">
                                                <code>{event.payload}</code>
                                            </pre>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                               </Accordion>
                            </CardContent>
                        </Card>
                    </TabsContent>
                  </Tabs>
              </TabsContent>

              <TabsContent value="appearance" className="mt-0">
              <Card>
                  <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                      Customize the look and feel of your dashboard.
                  </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                  <div className="space-y-2">
                      <Label>Theme</Label>
                      <p className="text-sm text-muted-foreground">
                          Light mode support is coming soon!
                      </p>
                  </div>
                  </CardContent>
              </Card>
              </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
}
