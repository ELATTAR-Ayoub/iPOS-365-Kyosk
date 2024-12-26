import { CartProduct } from "@/constants/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// State type
interface cartConfig {
  products: CartProduct[];
}

// Initial state
const initialState: cartConfig = {
  products: [],
};

const cartConfigSlice = createSlice({
  name: "cartConfig",
  initialState,
  reducers: {
    // Action to update the entire cartConfig state
    setProducts(state, action) {
      state.products = action.payload;
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
  setProducts,
  setProductQuantity,
  addProduct,
  deleteProduct,
  deleteAllProducts,
} = cartConfigSlice.actions;
export default cartConfigSlice.reducer;
