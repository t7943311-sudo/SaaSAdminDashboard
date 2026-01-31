export type User = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: 'admin' | 'member';
    createdAt: any; 
    updatedAt: any;
    onboardingCompleted?: boolean;
    workspaceName?: string;
    intent?: 'Founder' | 'Developer' | 'Product Manager' | 'Team Member';
};
