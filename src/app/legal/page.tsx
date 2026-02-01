import { FileText, Shield, Ban, ShieldCheck } from "lucide-react";
import Link from 'next/link';

export default function LegalCenterPage() {
  return (
    <>
      <h1 id="legal-center">Legal Center</h1>
      <p className="lead">
        Welcome to the LaunchBase Legal Center. Here you’ll find our terms of service, privacy policies, and other legal resources that govern the use of our services. We believe in transparency and have designed these documents to be as clear as possible.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link href="/legal/terms-of-service" className="group flex flex-col gap-3 rounded-lg border p-6 transition-colors hover:bg-muted/50">
            <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-lg">Terms of Service</h3>
            </div>
            <p className="text-muted-foreground">The agreement that governs your use of our services.</p>
        </Link>
        <Link href="/legal/privacy-policy" className="group flex flex-col gap-3 rounded-lg border p-6 transition-colors hover:bg-muted/50">
             <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-lg">Privacy Policy</h3>
            </div>
            <p className="text-muted-foreground">How we collect, use, and protect your data.</p>
        </Link>
        <Link href="/legal/acceptable-use" className="group flex flex-col gap-3 rounded-lg border p-6 transition-colors hover:bg-muted/50">
             <div className="flex items-center gap-3">
                <Ban className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-lg">Acceptable Use Policy</h3>
            </div>
            <p className="text-muted-foreground">Rules to prevent misuse of our services and platform.</p>
        </Link>
         <Link href="/legal/security" className="group flex flex-col gap-3 rounded-lg border p-6 transition-colors hover:bg-muted/50">
             <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-lg">Security Overview</h3>
            </div>
            <p className="text-muted-foreground">Our commitment to keeping your data safe and secure.</p>
        </Link>
      </div>

       <div className="mt-12 text-sm text-muted-foreground">
        <p>
          These documents are provided as templates and do not constitute legal advice. You should consult with a legal professional to ensure they are appropriate for your specific situation.
        </p>
       </div>
    </>
  );
}
