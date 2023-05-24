import { NavItem } from '../interfaces/interface';

export const NAV_ITEMS: Array<NavItem> = [
	{
		label: 'MEN',
		children: [
			{
				label: 'Topwear',
				subLabel: 'Trending Design to inspire you',
				href: '#',
			},
			{
				label: 'Bottomwear',
				subLabel: 'Up-and-coming Designers',
				href: '#',
			},
			{
				label: 'Footwear',
				subLabel: 'Up-and-coming Designers',
				href: '#',
			},
			{
				label: 'Fashion Accessories',
				subLabel: 'Up-and-coming Designers',
				href: '#',
			},
		],
	},
	{
		label: 'WOMEN',
		children: [
			{
				label: 'Indian Wear',
				subLabel: 'Trending Design to inspire you',
				href: '#',
			},
			{
				label: 'Watches & Wearables',
				subLabel: 'Up-and-coming Designers',
				href: '#',
			},
			{
				label: 'Footwear',
				subLabel: 'Up-and-coming Designers',
				href: '#',
			},
			{
				label: 'Jewelry',
				subLabel: 'Up-and-coming Designers',
				href: '#',
			},
		],
	},
	{
		label: 'ELECTRONICS',
		href: '#',
	},
	{
		label: 'BEAUTY',
		children: [
			{
				label: 'Makeup',
				subLabel: 'Trending Design to inspire you',
				href: '#',
			},
			{
				label: 'Haircare',
				subLabel: 'Up-and-coming Designers',
				href: '#',
			},
			{
				label: 'Fragrances',
				subLabel: 'Up-and-coming Designers',
				href: '#',
			},
			{
				label: 'Appliances',
				subLabel: 'Up-and-coming Designers',
				href: '#',
			},
		],
	},
	{
		label: 'MORE',
		children: [
			{
				label: 'Home & Living',
				subLabel: 'Discover Your Perfect Home Décor',
				href: '#',
			},
		],
	},
];
