"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  CreditCard,
  FileText,
  LayoutGrid,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: <LayoutGrid />, label: "Dashboard" },
  { href: "/dashboard/templates", icon: <FileText />, label: "Templates" },
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
            isActive={pathname === item.href}
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
