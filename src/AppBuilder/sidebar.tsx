import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shadcnComponents/ui/sidebar";
import { Link } from "react-router-dom";

export function AppSidebar() {
  return <Sidebar>
    <SidebarHeader className="gap-0">
      <span className="font-medium">App Builder</span>
      <span className="text-sm text-gray-400">v1.0.0</span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={'/page'}>Page</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter></SidebarFooter>
  </Sidebar>
}