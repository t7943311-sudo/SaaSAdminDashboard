'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const notifications = [
    {
        id: 'notif-1',
        title: 'New Subscription',
        description: 'Your workspace "Acme Inc." has a new subscriber.',
        time: '5m ago',
        avatarSeed: 'sub'
    },
    {
        id: 'notif-2',
        title: 'Payment Failed',
        description: 'A payment of $29.00 for user bob@example.com failed.',
        time: '1h ago',
        avatarSeed: 'payment'
    },
    {
        id: 'notif-3',
        title: 'Feature Update',
        description: 'The new AI template generator is now live!',
        time: '1d ago',
        avatarSeed: 'feature'
    }
];

export function NotificationsPopover() {
  const { toast } = useToast();
  
  const handleMarkAllRead = () => {
    toast({
        title: "Demo Action",
        description: "In a real application, this would mark all notifications as read."
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-background"></div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between p-4">
            <h3 className="font-semibold">Notifications</h3>
            <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="text-xs text-muted-foreground">
                <CheckCheck className="mr-2 h-4 w-4"/>
                Mark all as read
            </Button>
        </div>
        <Separator />
        <div className="flex flex-col">
            {notifications.map((notif) => (
                <Link href="#" key={notif.id} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                    <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage src={`https://picsum.photos/seed/${notif.avatarSeed}/40/40`} />
                        <AvatarFallback>{notif.title.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="text-sm font-medium">{notif.title}</p>
                        <p className="text-sm text-muted-foreground">{notif.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                    </div>
                </Link>
            ))}
        </div>
        <Separator />
         <div className="p-2">
            <Button variant="link" size="sm" className="w-full text-primary" asChild>
                <Link href="#">View all notifications</Link>
            </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
