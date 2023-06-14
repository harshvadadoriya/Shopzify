import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartProduct {
  productId: string;
  quantity: number;
  discountedPrice: number;
}

export interface CartItemProps {
  item: {
    productId: string;
    discountedPrice: number;
    cartQty?: number;
  };
  onQuantityChange: (productId: string, newQuantity: number) => void;
}

// Define the state type
interface CheckoutState {
  cartItems: CartProduct[];
  subtotal: number;
}

// Define the initial state
const initialState: CheckoutState = {
  cartItems: [],
  subtotal: 0,
};

// Create the checkout slice
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
    },
    calculateSubtotal: (state) => {
      state.subtotal = state.cartItems.reduce(
        (total, item) => total + item.discountedPrice * item.quantity,
        0
      );
    },
  },
});

// Export actions and reducer
export const { updateCartItemQuantity, calculateSubtotal } =
  checkoutSlice.actions;

// Create a selector to access the checkout state
export const selectCheckout = (state: RootState) => state.checkout;

// Export the reducer
export default checkoutSlice;
