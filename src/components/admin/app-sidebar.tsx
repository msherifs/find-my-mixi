"use client";

import * as React from "react";
import { Cat, UsersRound } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AdminNavMain } from "./nav-main";
import { AdminNavUser } from "./nav-user";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  items: [
    {
      name: "Users",
      url: "/admin/users",
      icon: UsersRound,
    },
    {
      name: "Cat Requests",
      url: "/admin/cat-requests",
      icon: Cat,
    },
  ],
};

export function AdminAppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { firstName: string; lastName: string };
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <AdminNavMain items={data.items} />
      </SidebarContent>
      <SidebarFooter>
        <AdminNavUser
          user={{
            name: `${user.firstName} ${user.lastName}`,
            email: "",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
