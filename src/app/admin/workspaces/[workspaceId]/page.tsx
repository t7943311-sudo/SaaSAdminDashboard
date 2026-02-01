
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { User as FirebaseUserEntity } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Building } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export default function AdminWorkspaceDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const workspaceId = decodeURIComponent(params.workspaceId as string);

  const firestore = useFirestore();
  const workspaceUsersQuery = useMemoFirebase(() => {
    if (!firestore || !workspaceId) return null;
    return query(collection(firestore, 'users'), where('workspaceName', '==', workspaceId));
  }, [firestore, workspaceId]);

  const { data: members, isLoading, error } = useCollection<FirebaseUserEntity>(workspaceUsersQuery);

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`.toUpperCase();
  };

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
    <div className="space-y-6">
       <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workspaces
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
             <div className="p-3 bg-muted rounded-lg">
                <Building className="w-8 h-8 text-muted-foreground" />
             </div>
            <div className="space-y-1">
              <CardTitle className="text-3xl">{workspaceId}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {isLoading ? 'Loading members...' : `${members?.length || 0} members`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-6">
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
                {isLoading && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">Loading members...</TableCell>
                    </TableRow>
                )}
                {error && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-destructive h-24">
                      An error occurred while fetching members.
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading && !error && members && members.length > 0 ? members.map((user) => (
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
                       <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/users/${user.id}`)}>View Details</Button>
                    </TableCell>
                  </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">No members found in this workspace.</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
