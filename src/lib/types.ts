import { Timestamp } from "firebase/firestore";

export type User = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: 'admin' | 'member';
    avatar?: string;
    status?: 'Active' | 'Pending' | 'Disabled';
    createdAt: any; 
    updatedAt: any;
    onboardingCompleted?: boolean;
    workspaceName?: string;
    intent?: 'Founder' | 'Developer' | 'Product Manager' | 'Team Member';
};

export type SubscriptionPlan = {
    id: string;
    name: string;
    price: number;
    priceId: string; // Stripe Price ID
    features: string[];
    isPopular?: boolean;
};

export type Subscription = {
    id: string;
    userId: string;
    planId: string;
    priceId: string;
    status: 'active' | 'trialing' | 'past_due' | 'canceled';
    currentPeriodStart: Timestamp;
    currentPeriodEnd: Timestamp;
    cancelAtPeriodEnd: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

export type Invoice = {
    id: string;
    userId: string;
    subscriptionId: string;
    date: Timestamp;
    amount: number;
    status: 'paid' | 'open' | 'void';
    invoiceUrl?: string; // Link to Stripe invoice
};

export type FeatureFlag = {
    id: string;
    name: string;
    status: boolean;
    target: string;
    modified: Timestamp;
};

export type PlatformSettings = {
    id: string;
    sessionTimeout: number;
    enforce2FA: boolean;
    adminEmail: string;
    dailySummaryReport: boolean;
    failedPaymentAlerts: boolean;
};

    