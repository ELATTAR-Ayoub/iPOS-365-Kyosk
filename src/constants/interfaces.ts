export interface User {
  ID: string;
  docID: string;
  avatar: string;
  userName: string;
  email: string;
}

export type Price = {
  value: number; // The price value
  currency: string; // Currency code, e.g., USD, EUR
};

export type AddOnOption = {
  name: string; // The name of the add-on (e.g., "Sugar", "Cheese")
  type: "quantity"; // Type of add-on: either "percentage" or "quantity"
  options: string[]; // Options for the add-on (percentage or quantity)
  selectedOption: number; // The selected option for the add-on
  price: Price;
  // icon: string;
};

export type NonPaidAddons = {
  name: string; // The name of the add-on (e.g., "Sugar", "Cheese")
  type: "percentage"; // Type of add-on: either "percentage" or "quantity"
  options: string[]; // Options for the add-on (percentage or quantity)
  selectedOption: string | number; // The selected option for the add-on
  // icon: string;
};

// The size options can be dynamic based on the product's available sizes
export type VariantOptions = {
  name: string;
  price: Price;
};

// The size options can be dynamic based on the product's available sizes
export type TemperatureOption = "cold" | "hot";

export interface Product {
  id: string; // Unique identifier for the product
  image: string; // URL or path to the image
  title: string; // Product title
  description: string; // Product description
  variantOptions: VariantOptions[]; // Array of size options (could be small, medium, large or a subset)
  temperature: TemperatureOption[]; // Can be "cold", "hot", or both (based on the product)
  icePercentage: NonPaidAddons; // If the temperature is cold, then this value pops out
  addOns: AddOnOption[]; // Array of add-ons like sugar, ice, etc.
  nonpaidAddons: NonPaidAddons[];
  isAvailable: boolean; // Whether the product is currently available
  customisable: boolean; // Whether the product is Customisable by the client or not
  categories: string[];
  note?: string; // Whether the product is Customisable by the client or not
}

export interface CartProduct {
  id: string; // Unique identifier for the product
  cartUID: string;
  image: string; // URL or path to the image
  title: string; // Product title
  description: string; // Product description
  variantOptions: VariantOptions; // Array of size options (could be small, medium, large or a subset)
  temperature: string; // Can be "cold", "hot", or both (based on the product)
  icePercentage: NonPaidAddons; // If the temperature is cold, then this value pops out
  addOns: AddOnOption[]; // Array of add-ons like sugar, ice, etc.
  nonpaidAddons: NonPaidAddons[];
  isAvailable: boolean; // Whether the product is currently available
  customisable: boolean; // Whether the product is Customisable by the client or not
  categories: string[];
  note: string; // Whether the product is Customisable by the client or not
  quantity: number; // Whether the product is Customisable by the client or not
}
