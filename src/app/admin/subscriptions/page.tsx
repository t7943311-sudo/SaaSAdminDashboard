'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, File } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Placeholder Data
const subscriptions = [
  { id: 'sub_1', user: { name: 'Alice', avatar: 'https://picsum.photos/seed/alice/40/40' }, workspace: 'Acme Inc.', plan: 'Pro', status: 'active', price: 29, nextBilling: '2024-08-15' },
  { id: 'sub_2', user: { name: 'Bob', avatar: 'https://picsum.photos/seed/bob/40/40' }, workspace: 'Beta Corp', plan: 'Free', status: 'active', price: 0, nextBilling: 'N/A' },
  { id: 'sub_3', user: { name: 'Charlie', avatar: 'https://picsum.photos/seed/charlie/40/40' }, workspace: 'Gamma LLC', plan: 'Pro', status: 'past_due', price: 29, nextBilling: '2024-07-15' },
  { id: 'sub_4', user: { name: 'David', avatar: 'https://picsum.photos/seed/david/40/40' }, workspace: 'David Co.', plan: 'Pro', status: 'trialing', price: 29, nextBilling: '2024-07-28' },
  { id: 'sub_5', user: { name: 'Eve', avatar: 'https://picsum.photos/seed/eve/40/40' }, workspace: 'Eve & Co.', plan: 'Enterprise', status: 'active', price: 99, nextBilling: '2024-08-01' },
];

export default function AdminSubscriptionsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Global Subscriptions</h1>
                    <p className="text-muted-foreground">View and manage all active subscriptions on the platform.</p>
                </div>
                <Button variant="outline">
                    <File className="mr-2 h-4 w-4" />
                    Export All
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search by user, workspace, or plan..."
                                className="w-full rounded-lg bg-background pl-8"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Workspace</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Price/Mo</TableHead>
                                <TableHead>Next Billing</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscriptions.map((sub) => (
                                <TableRow key={sub.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={sub.user.avatar} />
                                                <AvatarFallback>{sub.user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{sub.user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{sub.workspace}</TableCell>
                                    <TableCell>
                                        <Badge variant={sub.plan === 'Pro' ? 'default' : sub.plan === 'Enterprise' ? 'secondary' : 'outline'}>{sub.plan}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            sub.status === 'active' ? 'secondary' :
                                            sub.status === 'trialing' ? 'outline' : 'destructive'
                                        } className="capitalize">
                                            <div className={`w-2 h-2 mr-2 rounded-full ${
                                                sub.status === 'active' ? 'bg-green-500' :
                                                sub.status === 'trialing' ? 'bg-amber-500' : 'bg-red-500'
                                            }`}></div>
                                            {sub.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${sub.price.toFixed(2)}</TableCell>
                                    <TableCell>{sub.nextBilling}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View User</DropdownMenuItem>
                                                <DropdownMenuItem>View Workspace</DropdownMenuItem>
                                                <DropdownMenuItem>Comp Plan</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Force Cancel</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
