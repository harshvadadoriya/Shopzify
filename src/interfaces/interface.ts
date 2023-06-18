export interface Props {
	control?: string;
	label?: string;
	name: string;
	placeholder?: string;
	options?: { key: string; value: string }[];
	type?: string;
	className?: string;
}

export interface TextErrorProps {
	children?: React.ReactNode;
}

export interface SubNavItem {
	label: string;
	subLabel?: string;
	to: string;
}

export interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<SubNavItem>;
	to?: string;
}

export interface BannerItem {
	id: number;
	bannerImg: string;
}

export interface ProductFormValues {
	_id: string;
	image: string;
	name: string;
	discountedPrice: number;
	originalPrice: string;
	description: string;
	quantity: string;
	displaySection: string;
	gender: string;
	category: string;
}

export interface ProductResponse {
	productDetails: ProductFormValues[];
}

export interface UserRegAuthFormValues {
	name: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword?: string;
}

export type UserLoginAuthFormValues = Pick<
	UserRegAuthFormValues,
	'email' | 'password'
>;

export interface AuthState {
	isLoggedIn: boolean;
	accessToken: string;
}

// interfaces for authentication API responses
export interface LoginResponse {
	accessToken: string;
}

export interface RefreshResponse {
	token: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface SignupCredentials {
	name: string;
	email: string;
	phone: string;
	password: string;
}

export interface RefreshCredentials {
	refreshToken: string;
}

export interface WishlistProduct {
	_id: string;
	product: string;
	productId: string;
	category: string;
	description: string;
	discountedPrice: number;
	displaySection: string;
	gender: string;
	image: string;
	name: string;
	originalPrice: string;
	quantity: string;
	recordDate: Date;
}

export interface Wishlist {
	_id: string;
	userId: string;
	products: WishlistProduct[];
}

export interface WishlistRecord {
	wishlist: Wishlist;
}

export interface AddToCartProduct {
	_id: string;
	image: string;
	name: string;
	discountedPrice: number;
	productId?: string;
	originalPrice: string;
	description: string;
	gender: string;
	category: string;
	cartQty?: number;
	onClickDelete?: () => void;
}

export interface Cart {
	_id: string;
	userId: string;
	products: AddToCartProduct[];
}

export interface CartRecord {
	cart: Wishlist;
}

export interface CartProducts {
	image: string;
	name: string;
	discountedPrice: number;
	productId: string;
	cartQty: number;
	category: string;
	onClickDelete?: () => void;
}

export interface CartProduct {
	productId: string;
	quantity: number;
	discountedPrice: number;
	price: number;
	name: string;
	image: string;
}

export interface CartItemProps {
	item: {
		productId: string;
		discountedPrice: number;
		cartQty?: number;
	};
	onQuantityChange: (productId: string, newQuantity: number) => void;
}

export interface CheckoutState {
	cartItems: CartProduct[];
}

export interface AddressDetails {
	_id?: string;
	userId?: string;
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	country: string;
	postalCode: string;
	email: string;
	phone: string;
}
