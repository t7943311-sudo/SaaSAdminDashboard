'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="max-w-lg w-full text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <Construction className="w-12 h-12 text-amber-500" />
                    </div>
                    <CardTitle>Under Construction</CardTitle>
                    <CardDescription>This admin module is coming soon.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">The admin settings panel will be available in a future update.</p>
                </CardContent>
            </Card>
        </div>
    )
}
