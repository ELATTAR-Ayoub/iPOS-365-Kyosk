"use client";

import { useState } from "react";

// styles
import styles from "@/styles/index";

// constants
const categories = [
  {
    title: "All Menu",
    image: "pics/Lava_logo.jpg",
  },
  {
    title: "Coffee",
    image: "https://em-content.zobj.net/source/apple/391/hot-beverage_2615.png",
  },
  {
    title: "Tea",
    image:
      "https://em-content.zobj.net/source/apple/391/teacup-without-handle_1f375.png",
  },
  {
    title: "Bubble Tea",
    image:
      "https://symbl-world.akamaized.net/i/webp/8a/9a763e9b0ff74147c8c3bdac0ab9ae.webp",
  },
  {
    title: "Dessert",
    image: "https://em-content.zobj.net/source/apple/391/shortcake_1f370.png",
  },
  {
    title: "Snacks",
    image:
      "https://em-content.zobj.net/source/apple/391/rice-cracker_1f358.png",
  },
];

const Data = {
  adURl: "pics/Ad.jpg", // Path to your video file
};

// Icons

// components
import ProductCards from "./ProductCards";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Menu = () => {
  // values
  const [selectedCategories, setSelectedCategories] = useState(
    categories[0].title.toLowerCase()
  );

  return (
    <section
      className={`${styles.flexStart} relative flex-col w-full h-full gap-3 kiosk:gap-7 overflow-hidden `}
    >
      {/* Ad board */}
      <section
        className={` w-full h-56 kiosk:h-64 aspect-[16/4] rounded-lg overflow-hidden  `}
      >
        <img
          className=" w-full h-full object-cover"
          src={Data.adURl}
          alt="Ad board image"
        />
      </section>

      {/* categories*/}
      <section className={`grid w-full  `}>
        {/* categories */}
        <RadioGroup
          className={`flex justify-start items-center gap-2 kiosk:gap-10 w-auto overflow-x-auto h-[2.7rem] md:h-[6.2rem] kiosk:h-[9.2rem]`}
          value={selectedCategories}
          onValueChange={(value) => {
            setSelectedCategories(value.toLowerCase());
            console.log(value);
          }}
        >
          {categories.map((categorie, index) => (
            <Label
              key={index}
              htmlFor={categorie.title}
              className={`buttonBaseStyle h-10 md:h-24 kiosk:h-36 md:w-20 kiosk:w-32 md:flex-col !rounded-md md:!rounded-xl bg-secondary [&:has([data-state=checked])]:bg-accent/20 [&:has([data-state=checked])]:text-primary [&:has([data-state=checked])]:border-accent/30 shadow hover:bg-accent/30 `}
            >
              <RadioGroupItem
                value={categorie.title.toLowerCase()}
                id={categorie.title}
                className="sr-only"
              />
              <div className=" h-6 md:h-8 kiosk:h-20 aspect-square">
                <img
                  className="bg-cover"
                  src={categorie.image}
                  alt={categorie.title}
                />
              </div>
              <p className="text-xs kiosk:text-base font-bold">
                {categorie.title}
              </p>
            </Label>
          ))}
        </RadioGroup>
      </section>

      {/* product cards */}

      <ProductCards selectedCategorie={selectedCategories} />
    </section>
  );
};

export default Menu;
