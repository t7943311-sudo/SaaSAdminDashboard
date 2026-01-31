'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>
                        A dedicated space for in-depth analytics, charts, and reports.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>This is where your detailed analytics dashboard will be built.</p>
                </CardContent>
            </Card>
        </div>
    )
}
