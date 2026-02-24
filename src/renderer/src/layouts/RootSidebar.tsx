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
      <Sidebar className="min-h-10">
        <SidebarHeader className="">
          111
        </SidebarHeader>
        <SidebarContent className="">
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter className=""/>
      </Sidebar>
  )
}