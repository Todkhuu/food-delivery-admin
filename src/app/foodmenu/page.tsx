"use client";
import { getData } from "@/utils/data";
import Avatars from "./_components/Avatar";
import Categories from "./_components/Categories";
import { useEffect, useState } from "react";
import { foodType } from "@/utils/type";

const FoodMenu = () => {
  const [foods, setFoods] = useState<foodType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("foods");
      setFoods(data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#f4f4f5] w-[100%] h-auto p-6">
      <div className="w-full flex justify-end mb-6">
        <Avatars />
      </div>
      <Categories />
    </div>
  );
};
export default FoodMenu;
