import { Stack, useColorModeValue } from '@chakra-ui/react';
import { NAV_ITEMS } from '../../constants/NavItem';
import MobileNavItem from './MobileNavItem';

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.700')}
			p={4}
			display={{ md: 'none' }}
			fontWeight={600}
			userSelect="none"
		>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

export default MobileNav;
