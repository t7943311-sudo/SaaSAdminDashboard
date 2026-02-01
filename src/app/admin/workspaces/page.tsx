"use client"
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, PlusCircle, File } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import type { User as FirebaseUserEntity } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface Workspace {
  id: string;
  name: string;
  memberCount: number;
  admin?: FirebaseUserEntity;
  createdAt: FirebaseUserEntity['createdAt'];
}

export default function AdminWorkspacesPage() {
    const firestore = useFirestore();
    const router = useRouter();
    const { toast } = useToast();
    const usersCollection = useMemoFirebase(() => collection(firestore, 'users'), [firestore]);
    const { data: users, isLoading, error } = useCollection<FirebaseUserEntity>(usersCollection);

    const [searchTerm, setSearchTerm] = useState("");

    const workspaces = useMemo<Workspace[]>(() => {
        if (!users) return [];
        
        const workspacesMap = new Map<string, FirebaseUserEntity[]>();
        
        users.forEach(user => {
            const workspaceName = user.workspaceName || 'Unassigned';
            if (!workspacesMap.has(workspaceName)) {
                workspacesMap.set(workspaceName, []);
            }
            workspacesMap.get(workspaceName)!.push(user);
        });

        return Array.from(workspacesMap.entries()).map(([name, members]) => {
            const sortedMembers = members.sort((a,b) => a.createdAt?.seconds - b.createdAt?.seconds);
            return {
                id: name,
                name: name,
                memberCount: members.length,
                admin: members.find(m => m.role === 'admin') || sortedMembers[0],
                createdAt: sortedMembers[0]?.createdAt,
            }
        });
    }, [users]);

    const filteredWorkspaces = useMemo(() => {
        if (!searchTerm) return workspaces;
        return workspaces.filter(ws => ws.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [workspaces, searchTerm]);

    const handleExport = () => {
        toast({ title: "Coming Soon", description: "Workspace data export will be available in a future update." });
    };
    
    const handleAddWorkspace = () => {
        toast({ title: "Coming Soon", description: "Creating new workspaces from the admin panel will be available in a future update." });
    };

    const getInitials = (firstName?: string, lastName?: string) => {
        return `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`.toUpperCase();
    }

  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
              <h1 className="text-2xl md:text-3xl font-bold">Workspace Management</h1>
              <p className="text-muted-foreground">View and manage all workspaces on the platform.</p>
          </div>
          <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport}>
                  <File className="mr-2 h-4 w-4" />
                  Export All
              </Button>
              <Button onClick={handleAddWorkspace}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Workspace
              </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search workspaces..."
                  className="w-full rounded-lg bg-background pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workspace</TableHead>
                  <TableHead>Admin or Owner</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">Loading workspaces...</TableCell>
                    </TableRow>
                )}
                {error && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-destructive h-24">
                      An error occurred while fetching data.
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading && !error && filteredWorkspaces && filteredWorkspaces.length > 0 ? filteredWorkspaces.map((ws) => (
                  <TableRow key={ws.id}>
                    <TableCell>
                      <div className="font-medium">{ws.name}</div>
                    </TableCell>
                    <TableCell>
                      {ws.admin ? (
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={ws.admin.avatar || `https://picsum.photos/seed/${ws.admin.id}/32/32`} alt={`${ws.admin.firstName} ${ws.admin.lastName}`} />
                            <AvatarFallback>{getInitials(ws.admin.firstName, ws.admin.lastName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{ws.admin.firstName} {ws.admin.lastName}</div>
                            <div className="text-xs text-muted-foreground">{ws.admin.email}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">-</div>
                      )}
                    </TableCell>
                    <TableCell>
                       <Badge variant="secondary">{ws.memberCount} members</Badge>
                    </TableCell>
                    <TableCell>
                        <div className="text-sm text-muted-foreground">
                            {ws.createdAt ? ws.createdAt.toDate().toLocaleDateString() : '-'}
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/admin/workspaces/${encodeURIComponent(ws.id)}`)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem disabled>Edit Workspace</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" disabled>Delete Workspace</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">No workspaces found.</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  );
}
