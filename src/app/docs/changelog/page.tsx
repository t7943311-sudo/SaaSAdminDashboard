import { Badge } from "@/components/ui/badge";

const changelog = [
    {
        version: '1.0.0',
        date: 'July 22, 2024',
        changes: [
            { type: 'Added', description: 'Initial release of the LaunchBase SaaS Starter Kit.' },
            { type: 'Added', description: 'Core features: Authentication, Dashboard, Billing, User Management.' },
            { type: 'Added', description: 'Complete Admin Panel for platform management.' },
            { type: 'Added', description: 'Developer Documentation portal.' },
            { type: 'Added', description: 'Theme Builder for UI customization.' },
        ],
    },
    {
        version: '0.9.0',
        date: 'July 15, 2024',
        changes: [
            { type: 'Improved', description: 'Enhanced security rules for Firestore.' },
            { type: 'Fixed', description: 'Resolved minor UI inconsistencies on mobile devices.' },
        ],
    },
];

const getBadgeVariant = (type: string) => {
    switch (type) {
        case 'Added':
            return 'default';
        case 'Improved':
            return 'secondary';
        case 'Fixed':
            return 'destructive';
        default:
            return 'outline';
    }
}


export default function ChangelogPage() {
  return (
    <>
      <h1>Changelog</h1>
      <p className="lead">
        Stay up to date with the latest features, improvements, and bug fixes for LaunchBase.
      </p>
      
      <div className="mt-8 space-y-12">
        {changelog.map(log => (
            <div key={log.version}>
                <h2 id={`v${log.version}`} className="!mt-0">Version {log.version}</h2>
                <p className="text-muted-foreground !-mt-4 mb-4">{log.date}</p>
                <ul className="!list-none !p-0 space-y-2">
                    {log.changes.map((change, index) => (
                        <li key={index} className="flex items-start gap-4">
                            <Badge variant={getBadgeVariant(change.type)} className="w-20 justify-center">{change.type}</Badge>
                            <p className="!m-0">{change.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        ))}
      </div>
    </>
  );
}
