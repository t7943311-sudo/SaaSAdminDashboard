"use client"
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, PlusCircle, File } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const users = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    role: "Admin",
    status: "Active",
    avatar: "https://picsum.photos/seed/u1/40/40",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    role: "Member",
    status: "Active",
    avatar: "https://picsum.photos/seed/u2/40/40",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    role: "Member",
    status: "Inactive",
    avatar: "https://picsum.photos/seed/u3/40/40",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    role: "Member",
    status: "Active",
    avatar: "https://picsum.photos/seed/u4/40/40",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    role: "Admin",
    status: "Active",
    avatar: "https://picsum.photos/seed/u5/40/40",
  },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold">Users</h1>
            <p className="text-muted-foreground">Manage all users in your application.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <File className="mr-2 h-4 w-4" />
                Export
            </Button>
            <Button>
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
                className="w-full rounded-lg bg-secondary pl-8"
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
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'secondary' : 'outline'}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      {user.status}
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
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
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
