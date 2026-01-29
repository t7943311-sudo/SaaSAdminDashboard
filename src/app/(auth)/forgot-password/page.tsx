'use client';

import Link from "next/link";
import { useState, FormEvent } from "react";
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
import { useAuth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const auth = useAuth();
  const { toast } = useToast();

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your inbox for instructions to reset your password.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

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
        <form onSubmit={handleResetPassword} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Send Reset Instructions
          </Button>
        </form>
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
