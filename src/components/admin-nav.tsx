"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Building,
  CreditCard,
  DollarSign,
  HeartPulse,
  Flag,
  FileText,
  LifeBuoy,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: <LayoutDashboard />, label: "Overview" },
  { href: "/admin/users", icon: <Users />, label: "Users" },
  { href: "/admin/users", icon: <Building />, label: "Workspaces" },
  { href: "/admin/billing", icon: <CreditCard />, label: "Billing" },
  { href: "/admin/subscriptions", icon: <DollarSign />, label: "Subscriptions" },
  { href: "/admin/system-health", icon: <HeartPulse />, label: "System Health" },
  { href: "/admin/feature-flags", icon: <Flag />, label: "Feature Flags" },
  { href: "/admin/logs", icon: <FileText />, label: "Logs & Audits" },
  { href: "/admin/support", icon: <LifeBuoy />, label: "Support Tools" },
  { href: "/admin/settings", icon: <Settings />, label: "Admin Settings" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="p-2">
      {navItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href) && (item.href !== '/admin' || pathname === '/admin')}
            tooltip={{ children: item.label, side: "right", align: "center" }}
          >
            <Link href={item.href}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
