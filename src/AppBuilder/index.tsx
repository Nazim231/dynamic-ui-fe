import { SidebarProvider, SidebarTrigger } from '@/shadcnComponents/ui/sidebar';
import { AppSidebar } from './sidebar';

export function AppBuilder() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
}
