import * as React from "react";
import {
  CalendarClock,
  ChartColumnIncreasing,
  CheckCheck,
  CheckCircle,
  GalleryVerticalEnd,
  Settings2,
  Ticket,
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

// This is sample sidebar nav data.
const data = {
  adminNav: [
    {
      title: "Revenue & Analytics",
      url: "/dashboard",
      icon: ChartColumnIncreasing,
    },
    {
      title: "Event Management",
      url: "/dashboard/event-management",
      icon: CalendarClock,
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
  const isAdmin = true;
  return (
    <Sidebar variant='floating' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <GalleryVerticalEnd className='size-6' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='font-semibold'>
                    AI-Driven Ticket Booking System
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='gap-2'>
            {isAdmin
              ? data.adminNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className='font-medium text-[16px]'>
                        <item.icon className='size-6' />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              : data.userNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className='font-medium'>
                        <item.icon className='size-6' />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            {data.commonNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className='font-medium'>
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
