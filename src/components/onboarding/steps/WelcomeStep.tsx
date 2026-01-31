import { Button } from "@/components/ui/button";

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to LaunchBase</h1>
      <p className="text-muted-foreground mb-8">
        Let&apos;s get your account set up. It will only take a minute.
      </p>
      <Button onClick={onNext} size="lg">
        Get Started
      </Button>
    </div>
  );
}
