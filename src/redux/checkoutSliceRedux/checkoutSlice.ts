import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CheckoutState, CartProduct } from '../../interfaces/interface';

const initialState: CheckoutState = {
	cartItems: [],
};

const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		addCart: (state, action: PayloadAction<CartProduct>) => {
			state.cartItems.push(action.payload);
		},
		removeCart: (state, action: PayloadAction<string>) => {
			state.cartItems = state.cartItems.filter(
				(item) => item.productId !== action.payload
			);
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
		},
		updateCartItems: (state, action: PayloadAction<CartProduct[]>) => {
			state.cartItems = action.payload;
		},
		resetCheckout: () => initialState,
	},
});

export const {
	addCart,
	removeCart,
	updateCartItemQuantity,
	updateCartItems,
	resetCheckout,
} = checkoutSlice.actions;

export const selectCheckout = (state: RootState) => state.checkout;
export const selectQuantity = (state: RootState) => state.checkout.cartItems;

export default checkoutSlice;
