import { CartProduct } from "@/constants/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// State type
interface cartConfig {
  products: CartProduct[];
  luggage: string;
  paymentType: string;
}

// Initial state
const initialState: cartConfig = {
  products: [],
  luggage: "",
  paymentType: "",
};

const cartConfigSlice = createSlice({
  name: "cartConfig",
  initialState,
  reducers: {
    // Action to update the entire cartConfig state
    setProducts(state, action) {
      state.products = action.payload;
    },

    setLuggage(state, action) {
      state.luggage = action.payload;
    },

    setProductQuantity: (
      state,
      action: PayloadAction<{
        variantId: string;
        change: "increase" | "decrease";
      }>
    ) => {
      const { variantId, change } = action.payload;
      const product = state.products.find((p) => p.cartUID === variantId);

      if (product) {
        if (change === "increase") {
          product.quantity += 1;
        } else if (change === "decrease") {
          if (product.quantity > 1) {
            product.quantity -= 1;
          } else {
            // If quantity becomes zero, remove the product from the cart
            state.products = state.products.filter(
              (p) => p.cartUID !== variantId
            );
          }
        }
      }
    },

    addProduct: (state, action: PayloadAction<{ product: CartProduct }>) => {
      const { product: newProduct } = action.payload;
      const existingProduct = state.products.find(
        (p) => p.cartUID === newProduct.cartUID
      );

      if (existingProduct) {
        // If the product already exists, increase its quantity
        existingProduct.quantity += 1;
      } else {
        // If the product is not in the cart, add it
        state.products.push(newProduct);
      }
    },

    editProduct: (
      state,
      action: PayloadAction<{ variantId: string; newProduct: CartProduct }>
    ) => {
      const { variantId, newProduct } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product.cartUID === variantId
      );

      if (productIndex !== -1) {
        // If the product is found, replace it with the new product details
        state.products[productIndex] = newProduct;
      }
    },

    deleteProduct: (state, action: PayloadAction<string>) => {
      const varianttId = action.payload;
      state.products = state.products.filter(
        (product) => product.cartUID !== varianttId
      );
    },

    deleteAllProducts(state) {
      state.products = [];
    },
  },
});

export const {
  setLuggage,
  setProducts,
  setProductQuantity,
  addProduct,
  editProduct,
  deleteProduct,
  deleteAllProducts,
} = cartConfigSlice.actions;
export default cartConfigSlice.reducer;
