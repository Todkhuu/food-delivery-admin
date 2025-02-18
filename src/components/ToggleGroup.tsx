import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";

const menus = [
  {
    icon: "/DashboardIcon.png",
    text: "Food menu",
    color: "bg-secondary-foreground",
  },
  {
    icon: "/TruckIcon.png",
    text: "Orders",
    color: "bg-secondary-foreground",
  },
  {
    icon: "/SettingsIcon.png",
    text: "Settings",
    color: "bg-secondary-foreground",
  },
];

export function ToggleGroupDemo() {
  return (
    <ToggleGroup type="single" className="mt-[40px] flex flex-col items-start">
      {menus.map((menu) => {
        return (
          <ToggleGroupItem
            value={menu.text}
            className="w-[165px] h-[40px] rounded-full px-[24px] flex justify-start focus:bg-secondary-foreground focus:text-secondary"
          >
            <Image src={menu.icon} width={22} height={22} alt="" className="" />
            <p>{menu.text}</p>
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
