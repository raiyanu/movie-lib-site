import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import { ThemeProvider } from '@/components/theme-provider';
import Navbar from './components/Navbar'
export default function Layout({ children }) {
    return (
        <div className="container mx-auto max-w-[1200px] max-md:px-2">
            <SidebarProvider>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <AppSidebar />
                    <div className="max-w-full px-2">
                        <Navbar >
                            <SidebarTrigger />
                        </Navbar>
                        <main className=''>{children}</main>
                    </div>
                </ThemeProvider>
            </SidebarProvider>
        </div >
    )
}