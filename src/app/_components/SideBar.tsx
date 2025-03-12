import { Calendar, Car, MenuIcon, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Food menu",
    url: "foodmenu",
    icon: MenuIcon,
  },
  {
    title: "Orders",
    url: "orders",
    icon: Car,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex gap-3 items-center">
              <Image
                src={"/headerlogo.png"}
                width={36}
                height={29}
                alt=""
                className="w-[36px] h-[29px]"
              />
              <div>
                <h2 className="text-[#09090b] text-[18px] font-semibold">
                  NomNom
                </h2>
                <p className="text-[#71717a] text-[12px]">Swift delivery</p>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-10">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link className="flex items-center" href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
