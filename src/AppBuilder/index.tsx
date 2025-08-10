import { SidebarInset, SidebarProvider, SidebarTrigger } from '@shadcn/ui/sidebar';

import { Separator } from '@shadcn/ui/separator';
import { AppSidebar } from '@/AppBuilder/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toCapitalize } from '@/lib/utils';

export function AppBuilder() {
  const location = useLocation();
  const [breadcrumb, setBreadcrumb] = useState<string>('');

  useEffect(() => {
    setBreadcrumb(location.pathname.split('/').filter(Boolean)[0]);
  }, [location]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full flex flex-col">
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <span className="text-sm font-medium">{toCapitalize(breadcrumb)}</span>
          </header>
          <main className="p-2">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
