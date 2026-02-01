'use client';

import { useParams, useRouter } from 'next/navigation';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { User as FirebaseUserEntity } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Mail, User as UserIcon, Shield, Calendar, Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;

  const firestore = useFirestore();
  const userDocRef = useMemoFirebase(() => {
    if (!userId) return null;
    return doc(firestore, 'users', userId);
  }, [firestore, userId]);

  const { data: user, isLoading, error } = useDoc<FirebaseUserEntity>(userDocRef);

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

  const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode }) => (
    <div className="flex items-start gap-4">
        <div className="text-muted-foreground">{icon}</div>
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    </div>
  );

  return (
    <div className="space-y-6">
       <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-6">
            {isLoading ? (
              <Skeleton className="h-24 w-24 rounded-full" />
            ) : (
              <Avatar className="h-24 w-24 border">
                <AvatarImage src={user?.avatar || `https://picsum.photos/seed/${user?.id}/100/100`} alt={`${user?.firstName} ${user?.lastName}`} />
                <AvatarFallback className="text-3xl">{getInitials(user?.firstName, user?.lastName)}</AvatarFallback>
              </Avatar>
            )}
            <div className="space-y-1">
              {isLoading ? (
                <>
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-5 w-64" />
                </>
              ) : (
                <>
                  <CardTitle className="text-3xl">{user?.firstName} {user?.lastName}</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">{user?.email}</CardDescription>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-6">
            {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ) : error ? (
                 <p className="text-destructive">Error loading user details.</p>
            ) : user ? (
                 <div className="grid gap-6 md:grid-cols-2">
                    <DetailItem icon={<UserIcon />} label="First Name" value={user.firstName || '-'} />
                    <DetailItem icon={<UserIcon />} label="Last Name" value={user.lastName || '-'} />
                    <DetailItem icon={<Mail />} label="Email" value={user.email} />
                    <DetailItem icon={<Shield />} label="Role" value={<Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{((user.role || 'member').charAt(0).toUpperCase() + (user.role || 'member').slice(1))}</Badge>} />
                    <DetailItem icon={<Activity />} label="Status" value={
                        <Badge variant={'secondary'} className="flex items-center w-fit">
                            <div className={`w-2 h-2 rounded-full mr-2 ${getStatusClass(user.status)}`}></div>
                            {user.status || 'Pending'}
                        </Badge>
                    }/>
                    <DetailItem icon={<Calendar />} label="Created At" value={user.createdAt?.toDate().toLocaleDateString() || '-'} />
                </div>
            ) : (
                <p>User not found.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}