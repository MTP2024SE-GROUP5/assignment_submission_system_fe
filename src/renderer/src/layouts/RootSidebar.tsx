import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import React from "react"
import {NavMain} from "@/components/features/NavMain";
import { useTranslation } from "react-i18next";

import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"
import {NavWorkspaces} from "@/components/features/NavWorkspaces";
import {NavSecondary} from "@/components/features/NavSecondary";
import {NavUser} from "@/components/features/NavUser";
import {useSidebarData} from "@/hooks/useSidebarData";
import {Badge} from "@/components/ui/badge";
import {useAuth} from "@/hooks/useAuth";
import {useUserStore} from "@/store";
import {Link} from "react-router-dom";

export function RootSidebar() {

  const {navWorkspaces, navWorkspacesCreated, navUser, isLoading} = useSidebarData();
  const {user} = useAuth();
  const userDetail = useUserStore(state => state.user)
  const { t } = useTranslation('common');

  const { i18n } = useTranslation();
  const side = i18n.dir() === 'rtl' ? 'right' : 'left';

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: t('nav.dashboard'),
        url: "/",
        icon: IconDashboard,
      },
      {
        title: t('nav.workspaces'),
        url: "/workspaces",
        icon: IconListDetails,
      },
      {
        title: t('nav.calendar'),
        url: "/calendar",
        icon: IconChartBar,
      },
    ],
    navSecondary: [
      {
        title: t('nav.settings'),
        url: "/settings",
        icon: IconSettings,
      },
      {
        title: t('nav.about'),
        url: "/about",
        icon: IconHelp,
      },
    ],
  }

  return(
      <Sidebar className="min-h-10" side={side}>
        <SidebarHeader className="mt-[24px]">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <Link to="/">
                  <span className="text-base font-semibold">{t('project.title', { defaultValue: 'SEP1 Project' })}</span>
                </Link>
              </SidebarMenuButton>
              <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                {userDetail?.role === "STUDENT"? t('roles.student') : t('roles.teacher')}
              </Badge>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavWorkspaces items={navWorkspaces} isLoading={isLoading} />
          {userDetail?.role === "TEACHER"?<NavWorkspaces items={navWorkspacesCreated} isLoading={isLoading} createdByMyself={true}/>:""}
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={navUser} isLoading={isLoading}/>
        </SidebarFooter>
      </Sidebar>
  )
}