export type Category = {
  _id: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
  count: number;
};

export type foodType = {
  _id?: string | any;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category?: string;
};

export type UserType = {
  _id: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: "USER" | "ADMIN";
  orderedFoods: string[];
  // ttl
  isVerified: boolean;
};

export type FoodOrderType = {
  _id: string;
  user: string;
  totalPrice: number;
  //   foodOrderItems: FoodOrderItemType[];
  status: "PENDING" | "CANCELED" | "DELIVERED";
};
