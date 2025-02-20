import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/Navbar";
export default function Layout({ children }) {
    return (
        <div className="container relative mx-auto max-w-[1200px] max-md:px-2">
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <SidebarProvider>
                    <AppSidebar />
                    <div className="relative mx-auto flex max-h-screen w-full flex-col overflow-hidden overflow-y-scroll px-0 md:px-2 lg:px-4">
                        <Navbar>
                            <SidebarTrigger />
                        </Navbar>
                        <main className="">{children}</main>
                    </div>
                </SidebarProvider>
            </ThemeProvider>
        </div>
    );
}
