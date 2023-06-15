import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "../apiSliceRedux/apiSlice";
import { RootState } from "../store";

export interface CartProduct {
  productId: string;
  quantity: number;
  price: number;
}

export interface CartItemProps {
  item: {
    productId: string;
    discountedPrice: number;
    cartQty?: number;
  };
  onQuantityChange: (productId: string, newQuantity: number) => void;
}

interface CheckoutState {
  cartItems: CartProduct[];
  subtotal: number;
}

const initialState: CheckoutState = {
  cartItems: [],
  subtotal: 0,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        price: number;
      }>
    ) => {
      const { productId, quantity, price } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.price = price;
      } else {
        state.cartItems.push({ productId, quantity, price: 0 });
      }
    },
    calculateSubtotal: (state) => {
      state.subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    resetCheckout: () => initialState,
  },
});

export const { updateCartItemQuantity, calculateSubtotal, resetCheckout } =
  checkoutSlice.actions;

export const selectCheckout = (state: RootState) => state.checkout;
export const selectQuantity = (state: RootState) => state.checkout.cartItems;

export default checkoutSlice;

// const checkoutSlice = createSlice({
//   name: "checkout",
//   initialState,
//   reducers: {
//     updateCartItemQuantity: (
//       state,
//       action: PayloadAction<{ productId: string; quantity: number }>
//     ) => {
//       const { productId, quantity } = action.payload;
//       state.cartItems = state.cartItems.map((item) =>
//         item.productId === productId ? { ...item, quantity } : item
//       );
//     },
//     calculateSubtotal: (state) => {
//       state.subtotal = state.cartItems.reduce(
//         (total, item) => total + item.discountedPrice * item.quantity,
//         0
//       );
//     },
//   },
// });
