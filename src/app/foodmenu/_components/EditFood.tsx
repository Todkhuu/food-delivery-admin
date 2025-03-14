"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
import EditUpload from "./EditUpload";
import { Selects } from "./Select";
import { Select } from "@/components/ui/select";

const formSchema = z.object({
  foodName: z.string().min(4).max(100),
  price: z.coerce.number().min(0.1).max(Infinity),
  ingredients: z.string().min(4).max(400),
  image: z.string().nonempty("image"),
  category: z.string(),
});

type editType = {
  food: foodType;
  categories: Category[];
  getDatas: () => void;
};

type foodsType = {
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: string;
};

export const EditFood = ({ food, categories, getDatas }: editType) => {
  console.log(food);
  const [file, setFile] = useState<File>();
  const [ids, setId] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [image, setImage] = useState("");
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);

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

  const editFood = async (food: foodsType, id: string) => {
    let imageUrl = image;
    console.log("aa");
    if (isImageChanged) {
      imageUrl = await handleUpload();
    }
    if (!image) return;
    console.log("image uploaded ", imageUrl);
    const response = await fetch(`http://localhost:8000/foods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...food,
        image: imageUrl,
      }),
    });
    closeDialog();
    getDatas();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    editFood(values, ids);
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
    closeDialog();
    getDatas();
  };

  const closeDialog = () => {
    setEdit(false);
  };

  const clickAdd = () => {
    setEdit(true);
  };

  return (
    <div className="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center">
      <div
        onClick={() => {
          clickAdd();
          form.setValue("foodName", food.foodName);
          form.setValue("price", food.price);
          form.setValue("ingredients", food.ingredients);
          form.setValue("image", "uploaded");
          form.setValue("category", food.category?._id);
          setImage(food.image);
        }}
      >
        <Image
          src={"/edit-2.png"}
          width={16}
          height={16}
          alt=""
          className="w-[16px] h-[16px]"
        />
      </div>
      <Dialog open={edit} onOpenChange={closeDialog}>
        <DialogContent className="w-[472px]">
          <DialogTitle className="text-[18px]">Dishes info</DialogTitle>
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
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <Selects categories={categories} />
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
                        <EditUpload
                          handleFile={handleFile}
                          image={image}
                          setImage={setImage}
                          isChanged={setIsImageChanged}
                        />
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
