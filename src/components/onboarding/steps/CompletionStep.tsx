import { CheckCircle } from "lucide-react";

export function CompletionStep() {
  return (
    <div className="text-center py-8">
        <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
      <h1 className="text-3xl font-bold mb-4">You&apos;re all set!</h1>
      <p className="text-muted-foreground">
        Redirecting you to your new dashboard...
      </p>
    </div>
  );
}
