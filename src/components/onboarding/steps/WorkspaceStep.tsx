'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface WorkspaceStepProps {
  workspaceName: string;
  onUpdate: (data: { workspaceName: string }) => void;
  onNext: () => void;
}

export function WorkspaceStep({ workspaceName, onUpdate, onNext }: WorkspaceStepProps) {
    const [name, setName] = useState(workspaceName);

    const handleContinue = () => {
        if(name.trim().length > 2) {
            onUpdate({ workspaceName: name });
            onNext();
        }
    }

  return (
    <div className="text-left">
      <h2 className="text-2xl font-semibold mb-2">Create your workspace</h2>
      <p className="text-muted-foreground mb-6">This is the name of your company or project.</p>
      
      <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="workspace-name">Workspace Name</Label>
            <Input 
                id="workspace-name" 
                placeholder="e.g., Acme Inc."
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <Button onClick={handleContinue} className="w-full" disabled={name.trim().length <= 2}>
          Continue
        </Button>
      </div>
    </div>
  );
}
