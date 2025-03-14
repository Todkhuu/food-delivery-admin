import Categories from "./_components/Categories";
import { FoodsInCategory } from "./_components/FoodsInCategory";

const FoodMenu = () => {
  return (
    <div className="p-6">
      <Categories />
      <FoodsInCategory />
    </div>
  );
};
export default FoodMenu;
