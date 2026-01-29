import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Logo className="w-10 h-10 text-primary" />
          </div>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          No worries, we'll send you reset instructions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Send Reset Instructions
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          <Link href="/login" className="underline text-primary flex items-center justify-center gap-1">
            <ArrowLeft className="w-3 h-3"/>
            Back to login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
