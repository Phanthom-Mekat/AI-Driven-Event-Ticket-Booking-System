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
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// This is sample sidebar nav data.
const navData = {
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
      title: "Booked Ticket Management",
      url: "/dashboard/ticket-management",
      icon: TicketCheckIcon,
    },
    {
      title: "User Management",
      url: "/dashboard/user-management",
      icon: Users,
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  // const userRole: string = session?.user?.role;
  const userRole: string = "admin";

  // Redirect to "/" if user is not authenticated
  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

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
          {session?.user && (
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
              {userRole === "admin"
                ? navData.adminNav.map((item) => (
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
                : userRole === "user"
                ? navData.userNav.map((item) => (
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
                : null}
              {navData.commonNav.map((item) => (
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
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
