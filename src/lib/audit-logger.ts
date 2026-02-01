'use client'; // This will be called from client components.

import { addDoc, collection, serverTimestamp, Firestore } from "firebase/firestore";
import type { User as FirebaseUser } from "firebase/auth";

type LogActionDetails = {
    action: string; // e.g., "user.role.updated"
    details: string; // e.g., "Changed role of user@example.com to Admin"
};

/**
 * Logs an action to the audit trail in Firestore.
 * This is a fire-and-forget operation.
 * @param firestore - The Firestore instance.
 * @param actor - The user performing the action.
 * @param logDetails - The details of the action to log.
 */
export const logAudit = (
    firestore: Firestore,
    actor: FirebaseUser | null,
    { action, details }: LogActionDetails
) => {
    if (!actor) {
        console.warn("Audit log attempted without an actor (user).");
        return;
    }
    
    const auditLog = {
        actor: {
            id: actor.uid,
            email: actor.email || 'unknown',
            name: actor.displayName || 'Unknown User',
            avatar: actor.photoURL || '',
        },
        action,
        details,
        ipAddress: '0.0.0.0', // Placeholder, real IP would need to be captured from server-side
        createdAt: serverTimestamp(),
    };

    addDoc(collection(firestore, 'auditLogs'), auditLog).catch(err => {
        console.error("Failed to write to audit log:", err);
        // We don't want to show an error to the user for a failed audit log write.
        // It should fail silently from the user's perspective.
    });
};
