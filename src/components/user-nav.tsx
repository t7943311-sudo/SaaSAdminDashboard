"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, User as UserIcon, Shield } from "lucide-react";
import { useAuth, useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { signOut } from 'firebase/auth';
import type { User as UserType } from '@/lib/types';
import { doc } from "firebase/firestore";

export function UserNav() {
  const { user } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile } = useDoc<UserType>(userDocRef);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };
  
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            {user?.photoURL && <AvatarImage src={user.photoURL} alt="User Avatar" />}
            <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.displayName || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || ''}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
             <Link href="/dashboard/settings">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
             </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
             <Link href="/dashboard/billing">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
             </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {userProfile?.role === 'admin' && (
          <>
            <DropdownMenuSeparator />
             <DropdownMenuItem asChild>
               <Link href="/admin">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
               </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
