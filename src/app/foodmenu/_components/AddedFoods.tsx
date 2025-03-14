import { Category, foodType } from "@/utils/type";
import { EditFood } from "./EditFood";

type addedFoodsType = {
  category: Category;
  foods: foodType[];
  categories: Category[];
  getDatas: () => void;
};

export const AddedFoods = ({
  category,
  foods,
  categories,
  getDatas,
}: addedFoodsType) => {
  const filtered = foods.filter((food) => food.category?._id == category._id);
  return (
    <>
      {filtered.map((food) => {
        return (
          <div
            key={food._id}
            className="w-[270px] h-[241px] border-[1px] rounded-[20px] overflow-hidden p-4 "
          >
            <div
              style={{ backgroundImage: `url(${food.image})` }}
              className="w-[100%] h-[129px] rounded-xl bg-center bg-cover flex items-end justify-end p-[20px]"
            >
              <EditFood
                food={food}
                categories={categories}
                getDatas={getDatas}
              />
            </div>
            <div className="flex justify-between mt-[20px]">
              <h2 className="text-[#ef4444] text-[14px] ">{food.foodName}</h2>
              <p className="text-[12px]">${food.price}</p>
            </div>
            <p className="text-[12px]">{food.ingredients}</p>
          </div>
        );
      })}
    </>
  );
};
