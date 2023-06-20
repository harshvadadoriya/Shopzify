import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  CheckoutState,
  CartProduct,
  AddressDetails,
} from "../../interfaces/interface";

interface Summary {
  totalMrp: number;
  taxCharge: number;
  shippingCharge: number;
  totalAmount: number;
}

const initialState: CheckoutState = {
  cartItems: [],
  summary: {
    totalMrp: 0,
    taxCharge: 0,
    shippingCharge: 0,
    totalAmount: 0,
  },
  address: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    state: "",
    postalCode: "",
    email: "",
    phone: "",
  },
};

const calculateSummary = (cartItems: CartProduct[]): Summary => {
  const totalMrp = cartItems.reduce(
    (totalAmount, item) => totalAmount + item.price,
    0
  );

  const taxRate = 0.05; // Assuming tax rate of 5%
  const taxCharge = totalMrp * taxRate;
  const shippingCharge = 40;
  const totalAmount = totalMrp + taxCharge + shippingCharge;

  return {
    totalMrp,
    taxCharge,
    shippingCharge,
    totalAmount,
  };
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartProduct>) => {
      const { productId } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId
      );

      if (!existingItem) {
        const existingItemWithId = state.cartItems.find(
          (item) => item._id === action.payload._id
        );

        if (!existingItemWithId) {
          state.cartItems.push(action.payload);
          state.summary = calculateSummary(state.cartItems);
        }
      }
    },
    removeCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      state.summary = calculateSummary(state.cartItems);
    },
    updateCartItemQuantity: (state, action: PayloadAction<CartProduct>) => {
      const { productId, quantity, discountedPrice, price, image, name } =
        action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.price = price;
        existingItem.discountedPrice = discountedPrice;
        existingItem.image = image;
        existingItem.name = name;
      } else {
        state.cartItems.push({
          productId,
          quantity,
          discountedPrice,
          price: 0,
          image,
          name,
        });
      }
      state.summary = calculateSummary(state.cartItems);
    },
    updateCartItems: (state, action: PayloadAction<CartProduct[]>) => {
      state.cartItems = action.payload;
      state.summary = calculateSummary(state.cartItems);
    },
    updateAddress: (state, action: PayloadAction<AddressDetails>) => {
      state.address = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const {
  addCart,
  removeCart,
  updateCartItemQuantity,
  updateCartItems,
  updateAddress,
  resetCheckout,
} = checkoutSlice.actions;

export const selectCheckout = (state: RootState) => state.checkout;
export const selectQuantity = (state: RootState) => state.checkout.cartItems;
export const selectSummary = (state: RootState) => state.checkout.summary;

export default checkoutSlice;
