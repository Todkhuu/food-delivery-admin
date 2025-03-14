"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Category, foodType } from "@/utils/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EditUpload from "./EditUpload";

const formSchema = z.object({
  foodName: z.string().min(4).max(100),
  price: z.coerce.number().min(0.1).max(Infinity),
  ingredients: z.string().min(4).max(100),
  image: z.string().nonempty("image"),
  category: z.string(),
});

type editType = {
  food: foodType;
  categories: Category[];
  getDatas: () => void;
};

export const EditFood = ({ food, categories, getDatas }: editType) => {
  const [file, setFile] = useState<File>();
  const [ids, setId] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: "",
      price: 0,
      ingredients: "",
      image: "",
      category: "",
    },
  });

  const editFood = async (
    foodName: string,
    price: number,
    ingredients: string,
    category: string,
    id: string
  ) => {
    const imageUrl = await handleUpload();
    if (!imageUrl) return;
    console.log("image uploaded ", imageUrl);
    const response = await fetch(`http://localhost:8000/foods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...food,
        foodName,
        image: imageUrl,
        price,
        ingredients,
        category,
      }),
    });
    getDatas();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    editFood(
      values.foodName,
      values.price,
      values.ingredients,
      values.category,
      ids
    );
  };
  const clickEdit = (id: string) => {
    setId(id);
  };

  const handleFile = (file: File) => {
    setFile(file);
  };

  const handleUpload = async () => {
    const PRESET_NAME = "food-delivery-app";
    const CLOUDINARY_NAME = "ds6kxgjh0";
    if (!file) {
      alert("please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET_NAME);
    formData.append("api_key", CLOUDINARY_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error(err);
      alert("Failed to upload file");
    }
  };

  const deleteFood = async (id: string) => {
    const response = await fetch(`http://localhost:8000/foods/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getDatas();
  };

  return (
    <div className="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center">
      <Dialog>
        <DialogTrigger
          onClick={() => {
            form.setValue("foodName", food.foodName);
            form.setValue("price", food.price);
            form.setValue("ingredients", food.ingredients);
            form.setValue("image", "uploaded");
          }}
        >
          <Image
            src={"/edit-2.png"}
            width={16}
            height={16}
            alt=""
            className="w-[16px] h-[16px]"
          />
        </DialogTrigger>
        <DialogContent className="w-[472px]">
          <DialogTitle className="text-[18px]">Dishes info</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="foodName"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-[12px] text-[#71717a]">
                      Dish name
                    </FormLabel>
                    <FormControl>
                      <Input className="w-[288px]" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-[12px] text-[#71717a]">
                      Dish category
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-[288px]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => {
                            return (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                              >
                                {category.categoryName}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-[12px] text-[#71717a]">
                      Ingredients
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-[288px]"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-[12px] text-[#71717a]">
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input className="w-[288px]" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-[12px] text-[#71717a]">
                      Food image
                    </FormLabel>
                    <FormControl>
                      <div className="w-[288px] h-[116px]">
                        <EditUpload handleFile={handleFile} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between mt-[36px]">
                <Button
                  type="button"
                  onClick={() => deleteFood(food._id)}
                  variant={"ghost"}
                  className="border-[1px] p-3"
                >
                  <Image
                    src={"/trash.png"}
                    width={16}
                    height={16}
                    alt="trash"
                  />
                </Button>
                <Button onClick={() => clickEdit(food._id)} type="submit">
                  Edit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
