import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { DashboardNav } from "@/components/dashboard-nav";
import { UserNav } from "@/components/user-nav";
import { Logo } from "@/components/logo";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <div className="flex flex-col h-full">
            <div className="p-4 flex items-center gap-2">
                <Logo className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-bold group-data-[collapsible=icon]:hidden">Stellar</h1>
            </div>
            <DashboardNav />
        </div>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col h-full">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4">
            <SidebarTrigger className="md:hidden" />
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              <UserNav />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
