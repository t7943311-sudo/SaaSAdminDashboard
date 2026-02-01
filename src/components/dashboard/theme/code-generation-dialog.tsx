'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

interface CodeGenerationDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    cssCode: string;
}

export function CodeGenerationDialog({ isOpen, onOpenChange, cssCode }: CodeGenerationDialogProps) {
    const { toast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(cssCode);
        toast({
            title: "Copied to clipboard!",
            description: "You can now paste this code into your globals.css file."
        });
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Your Generated Theme CSS</DialogTitle>
                    <DialogDescription>
                        Copy this code and replace the entire content of your <code className="font-mono bg-muted px-1 py-0.5 rounded">src/app/globals.css</code> file to apply your new theme.
                    </DialogDescription>
                </DialogHeader>
                <div className="relative">
                    <pre className="bg-secondary p-4 rounded-md text-xs overflow-x-auto max-h-[50vh]">
                        <code>{cssCode}</code>
                    </pre>
                    <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
