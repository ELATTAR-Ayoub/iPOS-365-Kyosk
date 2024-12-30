import { Product } from "./interfaces";

export const products: Product[] = [
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
        icon: "https://i.ibb.co/09DNKnW/Bobba.png",

        price: { value: 20, currency: "$" },
      },
      {
        name: "Cheese",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/zbHb7KQ/Cheese.png",

        price: { value: 20, currency: "$" },
      },
      {
        name: "Mushroom",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/FX1XwL1/Mushroom.png",

        price: { value: 10, currency: "$" },
      },
      {
        name: "Bacon",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/w01ytF3/Bacon.png",

        price: { value: 5, currency: "$" },
      },
      {
        name: "Onions ",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/C1Vd3MX/Onions.png",

        price: { value: 5, currency: "$" },
      },
      {
        name: "Pepperoni",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/7vcvw28/Pepperoni.png",
        price: { value: 10, currency: "$" },
      },
    ],
    nonpaidAddons: [
      {
        name: "Honey",
        type: "percentage",
        options: ["20%", "50%", "70%"],
        selectedOption: "50%", // Optional
        icon: "https://i.ibb.co/7YWh9k2/Honey.png",
      },
    ],
    isAvailable: true,
    customisable: true,
    categories: ["coffee", "desert"],
    isVegan: false,
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
        icon: "https://i.ibb.co/09DNKnW/Bobba.png",

        price: { value: 20, currency: "$" },
      },
      {
        name: "Cheese",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/zbHb7KQ/Cheese.png",

        price: { value: 20, currency: "$" },
      },
      {
        name: "Mushroom",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/FX1XwL1/Mushroom.png",

        price: { value: 10, currency: "$" },
      },
      {
        name: "Bacon",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/w01ytF3/Bacon.png",

        price: { value: 5, currency: "$" },
      },
      {
        name: "Onions ",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/C1Vd3MX/Onions.png",

        price: { value: 5, currency: "$" },
      },
      {
        name: "Pepperoni",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/7vcvw28/Pepperoni.png",
        price: { value: 10, currency: "$" },
      },
    ],
    nonpaidAddons: [
      {
        name: "Honey",
        type: "percentage",
        options: ["20%", "50%", "70%"],
        selectedOption: "50%", // Optional
        icon: "https://i.ibb.co/7YWh9k2/Honey.png",
      },
    ],
    isAvailable: true,
    customisable: true,
    categories: ["coffee", "tea"],
    isVegan: true,
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
      options: ["20%", "50%", "70%"],
      selectedOption: "50%", // Optional
    },
    addOns: [
      {
        name: "Bobba",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/09DNKnW/Bobba.png",

        price: { value: 20, currency: "$" },
      },
      {
        name: "Cheese",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/zbHb7KQ/Cheese.png",

        price: { value: 20, currency: "$" },
      },
      {
        name: "Mushroom",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/FX1XwL1/Mushroom.png",

        price: { value: 10, currency: "$" },
      },
      {
        name: "Bacon",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/w01ytF3/Bacon.png",

        price: { value: 5, currency: "$" },
      },
      {
        name: "Onions ",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/C1Vd3MX/Onions.png",

        price: { value: 5, currency: "$" },
      },
      {
        name: "Pepperoni",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/7vcvw28/Pepperoni.png",
        price: { value: 10, currency: "$" },
      },
    ],
    nonpaidAddons: [
      {
        name: "Honey",
        type: "percentage",
        options: ["20%", "50%", "70%"],
        selectedOption: "50%", // Optional
        icon: "https://i.ibb.co/7YWh9k2/Honey.png",
      },
    ],
    isAvailable: true,
    customisable: true,
    categories: ["coffee"],
    isVegan: false,
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
    ],
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
        icon: "https://i.ibb.co/09DNKnW/Bobba.png",

        price: { value: 20, currency: "$" },
      },
      {
        name: "Cheese",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/zbHb7KQ/Cheese.png",

        price: { value: 20, currency: "$" },
      },
      {
        name: "Mushroom",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/FX1XwL1/Mushroom.png",

        price: { value: 10, currency: "$" },
      },
      {
        name: "Bacon",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/w01ytF3/Bacon.png",

        price: { value: 5, currency: "$" },
      },
      {
        name: "Onions ",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/C1Vd3MX/Onions.png",

        price: { value: 5, currency: "$" },
      },
      {
        name: "Pepperoni",
        type: "quantity",
        options: ["0", "5"],
        selectedOption: 0, // Optional
        icon: "https://i.ibb.co/7vcvw28/Pepperoni.png",
        price: { value: 10, currency: "$" },
      },
    ],
    nonpaidAddons: [
      {
        name: "Honey",
        type: "percentage",
        options: ["20%", "50%"],
        selectedOption: "50%", // Optional
        icon: "https://i.ibb.co/7YWh9k2/Honey.png",
      },
    ],
    isAvailable: true,
    customisable: true,
    categories: ["desert", "snacks"],
    isVegan: true,
  },
];
