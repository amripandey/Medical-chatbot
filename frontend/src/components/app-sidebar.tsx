"use client";

import * as React from "react";
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  Plus,
  MessageSquare,
  MessageCircleMore,
  User2,
  ChevronDown,
  LogOut,
} from "lucide-react";

import { NavFavorites } from "@/components/nav-favorites";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  conversations: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20">
          <Plus className="h-4 w-4" />
          New chat
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.conversations} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-sm">
              <MessageCircleMore className="h-4 w-4" />
              Clear conversations
            </a>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-sm">
              <LogOut className="h-4 w-4" />
              Log out
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
