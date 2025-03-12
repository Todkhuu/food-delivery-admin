import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type categoryType = {
  editCategory: boolean;
  closeDialog: () => void;
  form: any;
  onSubmit: any;
  isEdit: boolean;
  clickAdd: () => void;
};

export const Dialogs = ({
  editCategory,
  closeDialog,
  form,
  onSubmit,
  isEdit,
  clickAdd,
}: categoryType) => {
  return (
    <>
      <div onClick={clickAdd}>
        <Image
          onClick={() => form.resetField("categoryName")}
          src={"/IconButton.png"}
          width={36}
          height={36}
          alt=""
        />
      </div>
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
    </>
  );
};
