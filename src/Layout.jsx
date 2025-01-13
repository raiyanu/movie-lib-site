

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import Card from "./section/card";
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from './components/Navbar'
export default function Layout({ children }) {
    return (
        <div className="container mx-auto max-w-[1200px] max-md:px-2">
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <SidebarProvider>
                    <AppSidebar />
                    <div className="w-full px-2">
                        <Navbar >
                            <SidebarTrigger />
                        </Navbar>
                        <main className='px-2'>{children}</main>
                    </div>
                </SidebarProvider>
            </ThemeProvider>
        </div >
    )
}