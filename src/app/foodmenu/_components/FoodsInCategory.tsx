"use client";
import { getData } from "@/utils/data";
import { useEffect, useState } from "react";
import { Category, foodType } from "@/utils/type";
import { AddFood } from "./AddFood";
import { AddedFoods } from "./AddedFoods";

export const FoodsInCategory = () => {
  const [foods, setFoods] = useState<foodType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const data = await getData("food_category");
    setCategories(data.data);
  };
  //   useEffect(() => {}, []);

  const getDatas = async () => {
    const data = await getData("foods");
    setFoods(data.data);
  };

  useEffect(() => {
    getDatas();
    getCategories();
  }, []);

  return (
    <>
      {categories.map((category: Category) => {
        return (
          <div
            key={category._id}
            className="h-auto bg-white mt-6 rounded-xl p-5"
          >
            <h2 className="text-[20px] font-semibold mb-4">
              {category.categoryName} ({category.count})
            </h2>
            <div className="h-auto flex flex-wrap gap-4">
              <AddFood category={category} getDatas={getDatas} />
              <AddedFoods
                category={category}
                foods={foods}
                categories={categories}
                getDatas={getDatas}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
