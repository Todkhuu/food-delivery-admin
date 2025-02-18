import { ToggleGroupDemo } from "@/components/ToggleGroup";
import Image from "next/image";

export const LeftConatiner = () => (
  <div className="bg-[#f4f4f5]">
    <div className="w-[205px] h-[100vh] bg-[#fff] py-[36px] px-[20px]">
      <div className="flex gap-3 items-center">
        <Image
          src={"/headerlogo.png"}
          width={36}
          height={29}
          alt=""
          className="w-[36px] h-[29px]"
        />
        <div>
          <h2 className="text-[#09090b] text-[18px] font-semibold">NomNom</h2>
          <p className="text-[#71717a] text-[12px]">Swift delivery</p>
        </div>
      </div>
      <ToggleGroupDemo />
    </div>
  </div>
);
