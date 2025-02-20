import { Calendar, Home, Inbox, Search, Settings, ChevronUp, Heart } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link, NavLink } from "react-router";


// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
        activeIcon: Home
    },
    {
        title: "Favorite",
        url: "/Favorite",
        icon: Heart,
        activeIcon: Heart
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        activeIcon: Settings
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader >
                <div className="flex flex-wrap items-center justify-between">
                    <Link to={"/"} className="flex flex-wrap items-center gap-4 p-4">
                        <img src='/favicon.ico' height={40} width={30} alt="" srcSet="" /> M-Library
                    </Link>
                    <div className="hidden max-sm:block">
                        <SidebarHeader>
                            <SidebarTrigger />
                        </SidebarHeader>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <NavLink to={item.url}>
                                        {({ isActive }) => (
                                            <SidebarMenuButton asChild isActive={isActive}>
                                                <div className="">
                                                    {!isActive && <item.icon />}
                                                    {isActive && <item.activeIcon fill="#fff" stroke="#a9a9a9" />}
                                                    {item.title}
                                                </div>
                                            </SidebarMenuButton>
                                        )}
                                    </NavLink>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {/* <ExtraDownDropContent /> */}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

const ExtraDownDropContent = () => {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
                Other
                <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
        >
            <DropdownMenuItem>
                <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <span>Sign out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}

// Menu items.
const items_default = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]