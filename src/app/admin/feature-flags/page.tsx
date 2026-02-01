'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { MoreVertical, PlusCircle, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Placeholder Data
const featureFlags = [
    { id: 'ff_new_dashboard', name: 'New Dashboard UI', status: true, target: '100% of users', modified: '2024-07-15' },
    { id: 'ff_ai_templates_v2', name: 'AI Templates v2 Model', status: true, target: '50% of users', modified: '2024-07-10' },
    { id: 'ff_realtime_collab', name: 'Real-time Collaboration', status: false, target: 'Internal Staff', modified: '2024-06-20' },
    { id: 'ff_workspace_analytics', name: 'Workspace Analytics', status: true, target: 'workspaces: acme, beta', modified: '2024-07-18' },
    { id: 'ff_dark_mode_v2', name: 'Dark Mode v2', status: false, target: 'No one', modified: '2024-05-01' },
];

export default function AdminFeatureFlagsPage() {
    const [flags, setFlags] = useState(featureFlags);

    const handleToggleFlag = (id: string) => {
        setFlags(prevFlags => 
            prevFlags.map(flag => 
                flag.id === id ? { ...flag, status: !flag.status } : flag
            )
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Feature Flags</h1>
                    <p className="text-muted-foreground">Manage feature rollouts and experiments across the platform.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Flag
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search flags..."
                                className="w-full rounded-lg bg-background pl-8"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Feature Flag</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Targeting</TableHead>
                                <TableHead>Last Modified</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {flags.map((flag) => (
                                <TableRow key={flag.id}>
                                    <TableCell className="font-medium">{flag.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={flag.status}
                                                onCheckedChange={() => handleToggleFlag(flag.id)}
                                                aria-label={`Toggle ${flag.name}`}
                                            />
                                            <Badge variant={flag.status ? 'secondary' : 'outline'}>
                                                {flag.status ? 'Enabled' : 'Disabled'}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-mono">{flag.target}</Badge>
                                    </TableCell>
                                    <TableCell>{flag.modified}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit Targeting</DropdownMenuItem>
                                                <DropdownMenuItem>View History</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Archive Flag</DropdownMenuItem>
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
    )
}
