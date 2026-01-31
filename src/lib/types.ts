export type User = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: 'admin' | 'member';
    createdAt: any; 
    updatedAt: any;
};
