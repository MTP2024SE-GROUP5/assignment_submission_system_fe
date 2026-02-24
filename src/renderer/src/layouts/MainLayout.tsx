import React from "react"
import {Outlet} from "react-router-dom";
import { Label } from "@/components/ui/label"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {RootSidebar} from "@/layouts/RootSidebar";

const MainLayout = () =>{
  return(
      <div className="w-full">
        <div className="titlebar h-[32px] w-full flex justify-center items-center">
          <div><Label>SEP1 Project</Label></div>
        </div>
        <div className="flex">
          <div>
            <SidebarProvider className="min-h-10">
              <RootSidebar />
            </SidebarProvider>
          </div>
          <div>
            <Outlet/>
          </div>
        </div>
      </div>
  )
}
export default MainLayout