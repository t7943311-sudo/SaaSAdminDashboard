'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Terminal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast";

export function ComponentPreview() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 rounded-lg border bg-background p-4 md:p-6">
      <div className="flex flex-wrap items-start gap-4">
        <Button onClick={() => toast({ title: 'Primary Button Clicked' })}>Primary</Button>
        <Button variant="secondary" onClick={() => toast({ title: 'Secondary Button Clicked' })}>Secondary</Button>
        <Button variant="destructive" onClick={() => toast({ variant: 'destructive', title: 'Destructive Button Clicked' })}>Destructive</Button>
        <Button variant="outline" onClick={() => toast({ title: 'Outline Button Clicked' })}>Outline</Button>
        <Button variant="ghost" onClick={() => toast({ title: 'Ghost Button Clicked' })}>Ghost</Button>
        <Button variant="link" onClick={() => toast({ title: 'Link Button Clicked' })}>Link</Button>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the content of the card, showing how text and spacing appear inside a card component.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => toast({ title: 'Card Action Clicked', description: 'This toast demonstrates an action from a card.'})}>Card Action</Button>
          </CardFooter>
        </Card>

        <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email-preview">Email</Label>
                <Input type="email" id="email-preview" placeholder="Email" />
            </div>
             <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="plan-preview">Choose a Plan</Label>
                <Select>
                    <SelectTrigger id="plan-preview">
                        <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="pro">Pro</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="airplane-mode-preview" />
                <Label htmlFor="airplane-mode-preview">Airplane Mode</Label>
            </div>
        </div>
      </div>
      
       <div>
            <Label>Progress</Label>
            <Progress value={66} className="mt-2" />
       </div>


      <div className="flex flex-wrap items-center gap-2">
        <Badge>Default Badge</Badge>
        <Badge variant="secondary">Secondary Badge</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>

      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This is a default alert component.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>
          This is a destructive alert component.
        </AlertDescription>
      </Alert>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell><Badge variant="secondary">Active</Badge></TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
             <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell><Badge>Pending</Badge></TableCell>
              <TableCell>Member</TableCell>
            </TableRow>
          </TableBody>
        </Table>

    </div>
  );
}