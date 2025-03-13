import Avatars from "./_components/Avatar";
import Categories from "./_components/Categories";
import { FoodsInCategory } from "./_components/FoodsInCategory";

const FoodMenu = () => {
  return (
    <div className="bg-[#f4f4f5] w-[100%] h-auto p-6">
      <div className="w-full flex justify-end mb-6">
        <Avatars />
      </div>
      <Categories />
      <FoodsInCategory />
    </div>
  );
};
export default FoodMenu;
