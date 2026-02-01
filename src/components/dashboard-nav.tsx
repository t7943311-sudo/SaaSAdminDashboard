"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  BarChart2,
  Bot,
  CreditCard,
  LayoutGrid,
  Settings,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: <LayoutGrid />, label: "Dashboard" },
  { href: "/dashboard/analytics", icon: <BarChart2 />, label: "Analytics" },
  { href: "/dashboard/templates", icon: <Bot />, label: "Templates" },
  { href: "/dashboard/users", icon: <Users />, label: "Users & Teams" },
  { href: "/dashboard/billing", icon: <CreditCard />, label: "Billing" },
  { href: "/dashboard/settings", icon: <Settings />, label: "Settings" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="p-2">
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
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
