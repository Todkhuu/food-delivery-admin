"use client";

import { getData } from "@/utils/data";
import { Category } from "@/utils/type";
import { useEffect, useState } from "react";
import { ContextMenus } from "./ContextMenu";
import Image from "next/image";
import { Dialogs } from "./Dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  categoryName: z.string().min(4).max(50),
});

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategory, setEditCategory] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [ids, setIds] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  const getDatas = async () => {
    const data = await getData("food_category");
    setCategories(data.data);
  };

  useEffect(() => {
    getDatas();
  }, []);

  const createData = async (category: string) => {
    const response = await fetch(`http://localhost:8000/food_category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: category }),
    });
    getDatas();
  };

  const editData = async (id: string, categoryName: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/food_category/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryName }),
        }
      );
    } catch (error) {
      console.log("error", error);
    }
    getDatas();
  };

  const deleteData = async (id: string) => {
    const response = await fetch(`http://localhost:8000/food_category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getDatas();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isEdit) {
      editData(ids, values.categoryName);
    } else {
      createData(values.categoryName);
    }
  };

  const clickEdit = (id: string) => {
    setEditCategory(true);
    setIsEdit(true);
    setIds(id);
  };

  const closeDialog = () => {
    setEditCategory(false);
  };

  const clickAdd = () => {
    setEditCategory(true);
    setIsEdit(false);
  };
  return (
    <div className="w-[100%] h-auto bg-white p-6 rounded-xl">
      <h2 className="text-[20px] font-semibold">Dishes category</h2>
      <div className="flex gap-3 mt-4">
        {categories?.map((category) => {
          return (
            <ContextMenus
              category={category}
              clickEdit={clickEdit}
              form={form}
              deleteData={deleteData}
            />
          );
        })}
        <div onClick={clickAdd}>
          <Image
            onClick={() => form.resetField("categoryName")}
            src={"/IconButton.png"}
            width={36}
            height={36}
            alt=""
          />
        </div>
        <Dialogs
          closeDialog={closeDialog}
          onSubmit={onSubmit}
          form={form}
          editCategory={editCategory}
        />
      </div>
    </div>
  );
};
export default Categories;
