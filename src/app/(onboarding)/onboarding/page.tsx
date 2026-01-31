'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { WelcomeStep } from '@/components/onboarding/steps/WelcomeStep';
import { WorkspaceStep } from '@/components/onboarding/steps/WorkspaceStep';
import { RoleStep } from '@/components/onboarding/steps/RoleStep';
import { CompletionStep } from '@/components/onboarding/steps/CompletionStep';
import type { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    workspaceName: '',
    intent: '' as User['intent'],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS + 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleUpdateFormData = (newData: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };
  
  const handleFinish = async () => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "You must be logged in to complete onboarding.",
        });
        return;
    }
    setIsSubmitting(true);
    try {
        const userDocRef = doc(firestore, 'users', user.uid);
        await updateDoc(userDocRef, {
            workspaceName: formData.workspaceName,
            intent: formData.intent,
            onboardingCompleted: true,
            updatedAt: serverTimestamp(),
        });
        handleNext(); // Move to completion step
        setTimeout(() => router.push('/dashboard'), 2000);
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Onboarding Failed",
            description: error.message || "Could not save your information.",
        });
    } finally {
        setIsSubmitting(false);
    }
  };


  const progress = (currentStep / (TOTAL_STEPS + 1)) * 100;

  return (
    <Card className="w-full max-w-xl mx-auto">
      <div className="p-6">
        <Progress value={progress} className="mb-8" />
        {currentStep === 1 && <WelcomeStep onNext={handleNext} />}
        {currentStep === 2 && (
          <WorkspaceStep
            onNext={handleNext}
            workspaceName={formData.workspaceName}
            onUpdate={handleUpdateFormData}
          />
        )}
        {currentStep === 3 && (
          <RoleStep 
            onNext={handleFinish} 
            onUpdate={handleUpdateFormData}
            isSubmitting={isSubmitting}
          />
        )}
        {currentStep === 4 && <CompletionStep />}
      </div>
    </Card>
  );
}
