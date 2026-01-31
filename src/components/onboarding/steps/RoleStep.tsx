'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building, Code, Component, User as UserIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { User } from '@/lib/types';
import { Loader2 } from "lucide-react";


interface RoleStepProps {
  onNext: () => void;
  onUpdate: (data: { intent: User['intent'] }) => void;
  isSubmitting: boolean;
}

const roles = [
  { id: 'Founder', label: 'Founder', icon: <Building className="w-8 h-8" /> },
  { id: 'Developer', label: 'Developer', icon: <Code className="w-8 h-8" /> },
  { id: 'Product Manager', label: 'Product Manager', icon: <Component className="w-8 h-8" /> },
  { id: 'Team Member', label: 'Team Member', icon: <UserIcon className="w-8 h-8" /> },
] as const;


export function RoleStep({ onNext, onUpdate, isSubmitting }: RoleStepProps) {
  const [selectedRole, setSelectedRole] = useState<User['intent'] | null>(null);

  const handleSelectRole = (role: User['intent']) => {
    setSelectedRole(role);
    onUpdate({ intent: role });
  };

  return (
    <div className="text-left">
      <h2 className="text-2xl font-semibold mb-2">How are you planning to use LaunchBase?</h2>
      <p className="text-muted-foreground mb-6">This will help us personalize your experience.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {roles.map((role) => (
            <Card 
                key={role.id}
                onClick={() => handleSelectRole(role.id)}
                className={cn(
                    "p-6 cursor-pointer hover:border-primary transition-colors relative",
                    selectedRole === role.id && "border-primary ring-2 ring-primary"
                )}
            >
                {selectedRole === role.id && (
                    <CheckCircle className="w-5 h-5 text-primary absolute top-3 right-3" />
                )}
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    {role.icon}
                    <p className="font-semibold">{role.label}</p>
                </div>
            </Card>
        ))}
      </div>

      <Button onClick={onNext} className="w-full" disabled={!selectedRole || isSubmitting}>
        {isSubmitting ? (
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finishing up...
            </>
        ) : "Complete Setup"}
      </Button>
    </div>
  );
}
