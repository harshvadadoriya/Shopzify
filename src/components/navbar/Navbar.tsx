import {
	Box,
	Flex,
	Text,
	IconButton,
	Stack,
	Collapse,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { AiFillShop } from 'react-icons/ai';
import ColorMode from '../../colorMode/ColorMode';
import SecondaryNavbar from '../secondaryNavbar/SecondaryNavbar';
import { NavLink, useNavigate } from 'react-router-dom';
import Logout from '../pages/authentication/Logout';
import { store, useAppDispatch, useAppSelector } from '../../redux/store';
import {
	selectIsLoggedIn,
	setLoggedOut,
} from '../../redux/authSliceRedux/authSlice';
import { FaUser } from 'react-icons/fa';
import { api, useLogoutMutation } from '../../redux/apiSliceRedux/apiSlice';
import { resetCheckout } from '../../redux/checkoutSliceRedux/checkoutSlice';

const Navbar = () => {
	const { isOpen, onToggle } = useDisclosure();
	const isUserLoggedIn = useAppSelector(selectIsLoggedIn);

	// Determine if the navbar should be fixed based on the breakpoint
	const isNavbarFixed = useBreakpointValue({ base: false, md: true });

	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector(selectIsLoggedIn);
	const [logoutUser] = useLogoutMutation();
	const navigate = useNavigate();
	const logoutHandle = async () => {
		try {
			await logoutUser();
			dispatch(setLoggedOut());
			dispatch(resetCheckout());
			store.dispatch(api.util.resetApiState());
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box
			position={isNavbarFixed ? 'fixed' : 'static'}
			top={0}
			left={0}
			right={0}
			zIndex={10}
		>
			<Flex
				bg={useColorModeValue('white', 'gray.700')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.600')}
				align={'center'}
				userSelect="none"
			>
				<Flex ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
						}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
					<NavLink to="/">
						<Flex display={'flex'} alignItems={'center'}>
							<Text fontSize={18}>
								<AiFillShop />
							</Text>
							<Text
								textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
								fontFamily={'cursive'}
								color={useColorModeValue('gray.800', 'white')}
								marginX={1}
							>
								Shopzify
							</Text>
						</Flex>
					</NavLink>

					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={'flex-end'}
					direction={'row'}
					mr={3}
					// spacing={3}
				>
					<ColorMode />

					<Menu>
						<MenuButton
							boxSize={10}
							borderRadius={5}
							aria-label="account"
							zIndex={1}
							color={'white'}
							bgColor={'teal.400'}
							_hover={{
								bgColor: 'teal.300',
							}}
						>
							<FaUser className="ml-[0.7rem]" />
						</MenuButton>
						<MenuList color={useColorModeValue('gray.600', 'gray.200')}>
							<MenuItem>
								<NavLink to="/orders">Orders</NavLink>
							</MenuItem>
							{isLoggedIn ? (
								<MenuItem>
									<NavLink to="/login">
										{' '}
										<Text
											color={useColorModeValue('gray.600', 'gray.200')}
											onClick={logoutHandle}
										>
											Logout
										</Text>
									</NavLink>
								</MenuItem>
							) : (
								<MenuItem>
									<NavLink to="/signup">
										{' '}
										<Text color={useColorModeValue('gray.600', 'gray.200')}>
											Signup
										</Text>
									</NavLink>
								</MenuItem>
							)}
						</MenuList>
					</Menu>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
			<SecondaryNavbar />
		</Box>
	);
};

export default Navbar;
