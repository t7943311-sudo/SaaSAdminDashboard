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
import { Search, MoreVertical, PlusCircle, File, KeyRound, ShieldAlert } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, doc, deleteDoc } from "firebase/firestore";
import type { User as FirebaseUserEntity } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { RemoveUserAlert } from "@/components/dashboard/users/remove-user-alert";
import { EditRoleDialog } from "@/components/dashboard/users/edit-role-dialog";
import { AddUserDialog } from "@/components/dashboard/users/add-user-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { logAudit } from "@/lib/audit-logger";

function exportToCsv(filename: string, rows: object[]) {
    if (!rows || !rows.length) {
        return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
        keys.join(separator) +
        '\n' +
        rows.map(row => {
            return keys.map(k => {
                let cell = row[k as keyof typeof row] === null || row[k as keyof typeof row] === undefined ? '' : row[k as keyof typeof row];
                // @ts-ignore
                cell = cell instanceof Date
                    ? cell.toLocaleString()
                    // @ts-ignore
                    : cell.toString().replace(/"/g, '""');
                if (cell.search(/("|,|\n)/g) >= 0) {
                    cell = `"${cell}"`;
                }
                return cell;
            }).join(separator);
        }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export default function AdminUsersPage() {
    const firestore = useFirestore();
    const router = useRouter();
    const { toast } = useToast();
    const { user: adminUser } = useUser();
    const usersCollection = useMemoFirebase(() => collection(firestore, 'users'), [firestore]);
    const { data: users, isLoading, error } = useCollection<FirebaseUserEntity>(usersCollection);

    const [searchTerm, setSearchTerm] = useState("");
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<FirebaseUserEntity | null>(null);
    const [userToRemove, setUserToRemove] = useState<FirebaseUserEntity | null>(null);
    const [isRemoving, setIsRemoving] = useState(false);

    const filteredUsers = useMemo(() => {
        if (!users) return [];
        if (!searchTerm) return users;

        return users.filter(user => 
            (user.firstName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [users, searchTerm]);

    const handleRemoveUser = async () => {
        if (!userToRemove) return;
        setIsRemoving(true);
        try {
            await deleteDoc(doc(firestore, "users", userToRemove.id));
            logAudit(firestore, adminUser, {
              action: 'user.deleted',
              details: `Admin ${adminUser?.email} removed user ${userToRemove.email} (ID: ${userToRemove.id})`
            });
            toast({ title: "Success", description: "User removed successfully." });
            setUserToRemove(null);
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: "Failed to remove user." });
        } finally {
            setIsRemoving(false);
        }
    };

    const handleExport = () => {
      if (filteredUsers) {
          const usersToExport = filteredUsers.map(({ id, avatar, ...rest }) => rest);
          exportToCsv('all-users.csv', usersToExport as object[]);
      }
    };

    const getInitials = (firstName?: string, lastName?: string) => {
        return `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`.toUpperCase();
    }

    const getStatusClass = (status?: string) => {
        switch (status) {
            case 'Active':
                return 'bg-green-500';
            case 'Pending':
                return 'bg-amber-500';
            case 'Disabled':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    }

  return (
    <>
      <AddUserDialog isOpen={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen} />
      <RemoveUserAlert 
          isOpen={!!userToRemove}
          onOpenChange={(isOpen) => !isOpen && setUserToRemove(null)}
          user={userToRemove}
          onConfirm={handleRemoveUser}
          isRemoving={isRemoving}
      />
      <EditRoleDialog
          user={userToEdit}
          isOpen={!!userToEdit}
          onOpenChange={(isOpen) => !isOpen && setUserToEdit(null)}
      />
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
              <h1 className="text-2xl md:text-3xl font-bold">Global User Management</h1>
              <p className="text-muted-foreground">View and manage all users on the platform.</p>
          </div>
          <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport}>
                  <File className="mr-2 h-4 w-4" />
                  Export All
              </Button>
              <Button onClick={() => setIsAddUserDialogOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add User
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
                  placeholder="Search users by name or email..."
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
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell colSpan={1} className="py-4">
                          <div className="flex items-center gap-3">
                              <Skeleton className="h-10 w-10 rounded-full" />
                              <div>
                                  <Skeleton className="h-4 w-24 mb-1" />
                                  <Skeleton className="h-3 w-32" />
                              </div>
                          </div>
                        </TableCell>
                         <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                ))}
                {error && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-destructive h-24">
                      An error occurred while fetching users.
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading && !error && filteredUsers && filteredUsers.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">
                          <h3 className="font-semibold">No users found.</h3>
                          <p className="text-muted-foreground text-sm">Add your first user to get started.</p>
                          <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsAddUserDialogOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add User
                          </Button>
                        </TableCell>
                    </TableRow>
                )}
                {!isLoading && !error && filteredUsers && filteredUsers.length > 0 ? filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar || `https://picsum.photos/seed/${user.id}/40/40`} alt={`${user.firstName} ${user.lastName}`} />
                          <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                          {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Member'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={'secondary'} className="flex items-center w-fit">
                        <div className={`w-2 h-2 rounded-full mr-2 ${getStatusClass(user.status)}`}></div>
                        {user.status || 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Admin Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/admin/users/${user.id}`)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast({title: "Impersonate User (Demo)", description: "This would securely log you in as this user."})}>
                            <KeyRound className="mr-2"/> Impersonate User
                          </DropdownMenuItem>
                           <DropdownMenuItem onClick={() => setUserToEdit(user)}>
                            <ShieldAlert className="mr-2"/> Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => setUserToRemove(user)}>
                            Remove User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )) : null}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
