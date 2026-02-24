import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import React from "react"

export function RootSidebar() {
  return(
      <Sidebar className="min-h-10 h-[calc(100vh-32px)] mt-8">
        <SidebarHeader className="bg-[#171717]">
          111
        </SidebarHeader>
        <SidebarContent className="bg-[#171717]">
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter className="bg-[#171717]"/>
      </Sidebar>
  )
}