import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Category } from "@/utils/type";

type categoryType = {
  category: Category;
  clickEdit: any;
  form: any;
  deleteData: any;
};

export const ContextMenus = ({
  category,
  clickEdit,
  form,
  deleteData,
}: categoryType) => {
  return (
    <ContextMenu key={category._id}>
      <ContextMenuTrigger>
        <Button className="rounded-full" variant={"outline"} key={category._id}>
          {category.categoryName}
          <Badge className="rounded-full">{category.count}</Badge>
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent className="p-2">
        <ContextMenuItem
          className="p-0"
          onClick={() => {
            clickEdit(category._id);
            form.setValue("categoryName", category.categoryName);
          }}
        >
          <p>Edit</p>
        </ContextMenuItem>
        <ContextMenuItem
          className="p-0"
          onClick={() => deleteData(category._id)}
        >
          <p>Delete</p>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
