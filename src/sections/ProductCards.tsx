"use client";

// styles
// import styles from "@/styles/index";

// constants
import { Product } from "@/constants/interfaces";

// compo
import ProductCard from "@/components/product-card";
import styles from "@/styles";
import { useMemo, useState } from "react";

const products: Product[] = [
  {
    id: "1",
    image:
      "https://bunny-wp-pullzone-8lgzf5kyx3.b-cdn.net/assets/uploads/2023/08/sbx20181113-21425-caramelfrapp-onwhite-corelib-srgb.png",
    title: "Frappuccino Double Caramel",
    description:
      "Double Caramel Frappuccino® blended with milk, caramel flavored syrup and ice.",
    variantOptions: [
      { name: "small", price: { value: 80, currency: "$" } },
      { name: "medium", price: { value: 100, currency: "$" } },
      { name: "large", price: { value: 120, currency: "$" } },
    ], // Available in small, medium, and large
    temperature: ["cold", "hot"], // Iced coffee is cold
    icePercentage: {
      name: "Ice",
      type: "percentage",
      options: ["20%", "50%", "70%"],
      selectedOption: "50%", // Optional
    },
    addOns: [
      {
        name: "Bobba",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 20, currency: "$" },
      },
      {
        name: "Cheese",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 20, currency: "$" },
      },
      {
        name: "Mushroom",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 10, currency: "$" },
      },
      {
        name: "Bacon",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 5, currency: "$" },
      },
      {
        name: "Onions ",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 5, currency: "$" },
      },
      {
        name: "Pepperoni",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        price: { value: 10, currency: "$" },
      },
    ],
    nonpaidAddons: [
      {
        name: "Honey",
        type: "percentage",
        options: ["20%", "50%", "70%"],
        selectedOption: "50%", // Optional
      },
    ],
    isAvailable: true,
    customisable: true,
    categories: ["coffee", "desert"],
  },
  {
    id: "2",
    image:
      "https://bunny-wp-pullzone-8lgzf5kyx3.b-cdn.net/assets/uploads/2024/11/IOA2DssM.png",
    title: "Toffee Crunch Cold Brew",
    description:
      "Our slow-steeped Cold Brew is sure to satisfy – take it up a notch with toffee syrup and crunchy toffee topping!",

    variantOptions: [
      { name: "small", price: { value: 80, currency: "$" } },
      { name: "medium", price: { value: 100, currency: "$" } },
      { name: "large", price: { value: 120, currency: "$" } },
    ],
    temperature: ["cold"], // Iced drinks are cold
    icePercentage: {
      name: "Ice",
      type: "percentage",
      options: ["20%", "50%", "70%"],
      selectedOption: "50%", // Optional
    },
    addOns: [
      {
        name: "Bobba",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 20, currency: "$" },
      },
      {
        name: "Cheese",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 20, currency: "$" },
      },
      {
        name: "Mushroom",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 10, currency: "$" },
      },
      {
        name: "Bacon",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 5, currency: "$" },
      },
      {
        name: "Onions ",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 5, currency: "$" },
      },
      {
        name: "Pepperoni",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        price: { value: 10, currency: "$" },
      },
    ],
    nonpaidAddons: [
      {
        name: "Honey",
        type: "percentage",
        options: ["20%", "50%", "70%"],
        selectedOption: "50%", // Optional
      },
    ],
    isAvailable: true,
    customisable: true,
    categories: ["coffee", "tea"],
  },
  {
    id: "3",
    image:
      "https://bunny-wp-pullzone-8lgzf5kyx3.b-cdn.net/assets/uploads/2024/11/Nlufpuc8.png",
    title: "Salted Pretzel Cocoa Frappuccino",
    description:
      "The perfect blend of ice, coffee, salty pretzel syrup and your choice of milk!",
    variantOptions: [
      { name: "small", price: { value: 80, currency: "$" } },
      { name: "medium", price: { value: 100, currency: "$" } },
      { name: "large", price: { value: 120, currency: "$" } },
    ],
    temperature: ["cold"], // Blended coffee is cold
    icePercentage: {
      name: "Ice",
      type: "percentage",
      options: ["30%", "50%", "70%"],
      selectedOption: "50%", // Optional
    },
    addOns: [
      {
        name: "Bobba",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 20, currency: "$" },
      },
      {
        name: "Cheese",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 20, currency: "$" },
      },
      {
        name: "Mushroom",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 10, currency: "$" },
      },
      {
        name: "Bacon",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 5, currency: "$" },
      },
      {
        name: "Onions ",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 5, currency: "$" },
      },
      {
        name: "Pepperoni",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        price: { value: 10, currency: "$" },
      },
    ],
    nonpaidAddons: [
      {
        name: "Honey",
        type: "percentage",
        options: ["20%", "50%", "70%"],
        selectedOption: "50%", // Optional
      },
    ],
    isAvailable: true,
    customisable: true,
    categories: ["coffee"],
  },
  {
    id: "4",
    image:
      "https://bunny-wp-pullzone-8lgzf5kyx3.b-cdn.net/assets/uploads/2023/08/sbx20190617-35881-freshlybrewedblackcoffee-onwhite-corelib-g7op-1.png",
    title: "Caramel Brewed Coffee",
    description:
      "Our iconic Pike Place blend brewed to perfection for that perfect, on-the-go cup",

    variantOptions: [
      { name: "small", price: { value: 80, currency: "$" } },
      { name: "medium", price: { value: 100, currency: "$" } },
      { name: "large", price: { value: 120, currency: "$" } },
    ],
    temperature: ["cold", "hot"], // Iced coffee is cold
    icePercentage: {
      name: "Ice",
      type: "percentage",
      options: ["10%", "25%", "50%"],
      selectedOption: "50%", // Optional
    },
    addOns: [
      {
        name: "Bobba",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 20, currency: "$" },
      },
      {
        name: "Cheese",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 20, currency: "$" },
      },
      {
        name: "Mushroom",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 10, currency: "$" },
      },
      {
        name: "Bacon",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 5, currency: "$" },
      },
      {
        name: "Onions",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional

        price: { value: 5, currency: "$" },
      },
      {
        name: "Pepperoni",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        price: { value: 10, currency: "$" },
      },
      {
        name: "Tea",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        price: { value: 10, currency: "$" },
      },
      {
        name: "Hot Sauce",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        price: { value: 10, currency: "$" },
      },
    ],
    nonpaidAddons: [
      {
        name: "Honey",
        type: "percentage",
        options: ["20%", "50%", "70%"],
        selectedOption: "50%", // Optional
      },
    ],
    isAvailable: true,
    customisable: true,
    categories: ["desert", "snacks"],
  },
];

// Icons

// components

interface ProductCards {
  selectedCategorie: string; // Parameter to define the category
}

const ProductCards: React.FC<ProductCards> = ({ selectedCategorie }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useMemo(() => {
    let filtered: Product[] = [];

    // filter customisable
    filtered = products.filter((product) => product.customisable === true);

    // filter selectedCategorie

    if (selectedCategorie !== "all menu") {
      filtered = filtered.filter((product) =>
        product.categories.includes(selectedCategorie)
      );
    }

    // Finish
    setFilteredProducts(filtered);
  }, [selectedCategorie]);

  return (
    <section
      className={`${styles.flexStart} relative w-full flex-wrap gap-3 pb-3 overflow-y-auto `}
    >
      <div className={`${styles.flexBetween} w-full`}>
        <h1 className={`${styles.normal} font-bold capitalize`}>
          {selectedCategorie}
        </h1>
        <p className={`${styles.Xsmall} text-muted-foreground`}>
          {filteredProducts.length}{" "}
          {selectedCategorie !== "all menu" ? selectedCategorie : "total"}{" "}
          results
        </p>
      </div>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))
      ) : (
        <div className="grid place-content-center w-full h-full">
          <p
            className={` ${styles.Xsmall} text-primary/70 w-full text-center mt-11`}
          >
            No more products under this category, please check other categories.
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductCards;
