import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, foodType } from "@/utils/type";

type selectType = {
  categories: Category[];
};

export const Selects = ({ categories }: selectType) => {
  return (
    <>
      <SelectTrigger className="w-[288px]">
        <SelectValue placeholder="ca" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => {
          return (
            <SelectItem key={category._id} value={category._id}>
              {category.categoryName}
            </SelectItem>
          );
        })}
      </SelectContent>
    </>
  );
};
