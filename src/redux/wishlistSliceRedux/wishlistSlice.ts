import {
	createSlice,
	createEntityAdapter,
	EntityState,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ProductFormValues } from '../../interfaces/interface';

// Create the entity adapter
const wishlistAdapter = createEntityAdapter<ProductFormValues>({
	selectId: (product) => product._id,
});

// Define the initial state using the adapter
const initialState: EntityState<ProductFormValues> =
	wishlistAdapter.getInitialState();

// Create the wishlist slice
const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {
		addToWishlist: wishlistAdapter.addOne,
		removeFromWishlist: wishlistAdapter.removeOne,
		clearWishlist: wishlistAdapter.removeAll,
	},
});

// Export the reducer and actions
export const { addToWishlist, removeFromWishlist, clearWishlist } =
	wishlistSlice.actions;

// Create selectors using the adapter
export const wishlistSelectors = wishlistAdapter.getSelectors(
	(state: RootState) => state.wishlist
);

// Export the wishlist reducer
export default wishlistSlice;
