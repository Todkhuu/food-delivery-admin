import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type categoryType = {
  editCategory: boolean;
  closeDialog: () => void;
  form: any;
  onSubmit: any;
  isEdit: boolean;
};

export const Dialogs = ({
  editCategory,
  closeDialog,
  form,
  onSubmit,
  isEdit,
}: categoryType) => {
  return (
    <Dialog open={editCategory} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogTitle className="text-[18px]">
          {isEdit ? "Edit category" : "Add category"}
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category name</FormLabel>
                  <FormControl>
                    <Input placeholder="Type category name..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end mt-[48px]">
              <Button type="submit">
                {isEdit ? "Edit category" : "Add category"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
