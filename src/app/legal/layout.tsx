import { DocsHeader } from '@/components/docs/docs-header';
import { LegalNav } from '@/components/legal-nav';
import { PageTOC } from '@/components/docs/page-toc';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader sectionTitle="Legal" />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
          <div className="relative h-full overflow-y-auto py-6 pr-6 lg:py-8">
            <LegalNav />
          </div>
        </aside>
        <div className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_220px]">
          <main className="w-full">
            <div className="prose prose-sm md:prose-base prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h1:font-bold prose-h1:tracking-tight prose-h2:border-b prose-h2:pb-4 prose-h2:mt-12 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-p:text-muted-foreground prose-lead:text-foreground prose-strong:text-foreground prose-pre:bg-muted prose-code:bg-primary/10 prose-code:text-primary prose-code:p-1 prose-code:rounded-md prose-code:font-medium">
              {children}
            </div>
          </main>
          <PageTOC />
        </div>
      </div>
    </div>
  );
}
