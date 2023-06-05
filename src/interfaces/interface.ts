export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export interface BannerItem {
  id: number;
  bannerImg: string;
}

export interface ProductFormValues {
  _id: string;
  image: string | undefined;
  name: string;
  discountedPrice: string;
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
  "email" | "password"
>;
