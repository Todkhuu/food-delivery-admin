import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Payment } from "./Tables";

export const DropDown = ({ data }: { data: Payment[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="bg-[#d1d1d1] rounded-full text-[#fafafa]"
        >
          Change delivery state
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {data.map((column) => {
          return (
            <DropdownMenuCheckboxItem key={column.id} className="capitalize">
              {column.status}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
