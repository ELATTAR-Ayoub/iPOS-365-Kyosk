"use client";

import { DineInIcon } from "@/components/icons/dine-in-icon";
import { TakeOutIcon } from "@/components/icons/take-out";
// styles
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import styles from "@/styles";

// Redux
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLuggage } from "@/store/cart";

// Icons

// components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Languages = [
  {
    name: "Chinese traditional 漢語",
    country: "taiwan",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Flag_of_the_Republic_of_China.svg/220px-Flag_of_the_Republic_of_China.svg.png",
  },
  {
    name: "English",
    country: "United Kingdom",
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/220px-Flag_of_the_United_Kingdom.svg.png",
  },
  {
    name: "French française ",
    country: "France",
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/220px-Flag_of_France.svg.png",
  },
  {
    name: "Korean 한국어",
    country: "Korea",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/220px-Flag_of_South_Korea.svg.png",
  },
  {
    name: "Japanese 日本語",
    country: "Japan",
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/220px-Flag_of_Japan.svg.png",
  },
];

const Menu = () => {
  // values
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section
      className={` relative ${styles.flexCenter} relative w-full h-full gap-32 overflow-hidden `}
    >
      <div
        className={` ${styles.flexCenter} flex-col w-1/2 sm:w-1/3 py-28 sm:py-36 gap-5 text-sm md:text-xl`}
      >
        <Button
          variant={"secondary"}
          onClick={() => {
            dispatch(setLuggage({ luggage: "DineIn" }));
            navigate("/menu");
          }}
          className=" w-80 h-80 border [&_svg]:size-20 sm:[&_svg]:size-24 "
        >
          <DineInIcon size={96} />
        </Button>
        <p className={` ${styles.H2} lg:text-4xl`}>內用</p>
      </div>
      <div
        className={` ${styles.flexCenter} flex-col w-1/2 sm:w-1/3 py-28 sm:py-36 gap-5 text-sm md:text-xl`}
      >
        <Button
          variant={"secondary"}
          onClick={() => {
            dispatch(setLuggage({ luggage: "TakeOut" }));
            navigate("/menu");
          }}
          className=" w-80 h-80 border [&_svg]:size-20 sm:[&_svg]:size-24 "
        >
          <TakeOutIcon size={96} />
        </Button>

        <p className={` ${styles.H2} lg:text-4xl`}>外帶</p>
      </div>

      {/* Language selector */}
      <div
        className={`${styles.flexCenter} flex-col gap-4 lg:gap-9 w-full fixed bottom-20 z-10`}
      >
        <h4 className={` ${styles.H2} font-bold text-[#704332]`}>Language</h4>

        <RadioGroup
          className={`${styles.flexCenter} gap-6 w-full`}
          value={"English"}
          onValueChange={(value) => {
            console.log(value);
          }}
        >
          {Languages.map((Language, index) => (
            <Label
              key={index}
              htmlFor={Language.name}
              className={`border-2 [&:has([data-state=checked])]:border-accent [&:has([data-state=checked])]:shadow-lg p-1
  cursor-pointer transition-colors rounded-full overflow-hidden w-10 h-10 lg:w-16 lg:h-16`}
            >
              <RadioGroupItem
                value={Language.name}
                id={Language.name}
                className="sr-only"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full h-full object-cover rounded-full">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={Language.icon}
                      alt={Language.name}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{Language.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
          ))}
        </RadioGroup>
      </div>
    </section>
  );
};

export default Menu;
