import * as React from "react";
import {
  CalendarClock,
  ChartColumnIncreasing,
  CheckCheck,
  CheckCircle,
  LayoutDashboard,
  Settings2,
  Ticket,
  TicketCheckIcon,
  User,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// This is sample sidebar nav data.
const data = {
  adminNav: [
    {
      title: "Create Event",
      url: "/dashboard/create-event",
      icon: CalendarClock,
    },
    {
      title: "Event Management",
      url: "/dashboard/event-management",
      icon: CalendarClock,
    },
    {
      title: "Ticket Management",
      url: "/dashboard/ticket-management",
      icon: TicketCheckIcon,
    },
    {
      title: "Revenue & Analytics",
      url: "/dashboard/analytics",
      icon: ChartColumnIncreasing,
    },
    {
      title: "User Management",
      url: "/dashboard/user-management",
      icon: Users,
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: CheckCheck,
    },
  ],
  userNav: [
    {
      title: "My Tickets",
      url: "/my-ticket",
      icon: Ticket,
    },
    {
      title: "Manage Tickets",
      url: "/manage-ticket",
      icon: Settings2,
    },
    {
      title: "Ticket Validation",
      url: "/ticket-validation",
      icon: CheckCircle,
    },
  ],
  commonNav: [
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isAdmin = true;

  // Check if a link is active
  const isActiveLink = (href: string) => {
    return pathname === href
      ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10"
      : "text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-100";
  };
  return (
    <Sidebar variant='floating' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/'>
                <Ticket
                  size={48}
                  className='w-8 h-8 text-[var(--color-primary)]'
                />
                <span>TicketHub</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='gap-2'>
            {/* dashboard route only */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className='hover:text-[var(--color-primary)]'
              >
                <Link
                  href='/dashboard'
                  className={`${isActiveLink(
                    "/dashboard"
                  )} ont-medium text-[16px]`}
                >
                  <LayoutDashboard className='size-6' />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {isAdmin
              ? data.adminNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className='hover:text-[var(--color-primary)]'
                    >
                      <Link
                        href={item.url}
                        className={`${isActiveLink(
                          item.url
                        )} ont-medium text-[16px]`}
                      >
                        <item.icon className='size-6' />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              : data.userNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className='hover:text-[var(--color-primary)]'
                    >
                      <Link
                        href={item.url}
                        className={`${isActiveLink(
                          item.url
                        )} ont-medium text-[16px]`}
                      >
                        <item.icon className='size-6' />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            {data.commonNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className='hover:text-[var(--color-primary)]'
                >
                  <Link
                    href={item.url}
                    className={`${isActiveLink(
                      item.url
                    )} ont-medium text-[16px]`}
                  >
                    <item.icon className='size-6' />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
