import {
	Box,
	Flex,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Menu,
	MenuButton,
	useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import { FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const SecondaryNavbar = () => {
	const menuBgColor = useColorModeValue('white', 'gray.700');
	const inputBg = useColorModeValue('none', 'gray.600');
	const inputColor = useColorModeValue('black', 'white');

	return (
		<Box flexGrow={1}>
			<Flex
				align="center"
				justify="space-between"
				p={4}
				bg={menuBgColor}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.600')}
				userSelect="none"
			>
				<InputGroup maxW="xs">
					<InputLeftElement
						pointerEvents="none"
						children={<SearchIcon color="gray.300" />}
					/>
					<Input
						type="text"
						placeholder="Search Products"
						borderRadius="md"
						borderWidth={1}
						color={inputColor}
						bgColor={inputBg}
						_focus={{ borderColor: 'transparent' }}
					/>
				</InputGroup>
				<Flex display={'flex'}>
					<NavLink to="/wishlist">
						<Menu>
							<MenuButton
								as={IconButton}
								size="md"
								icon={<FaRegHeart />}
								color={'white'}
								aria-label="cart"
								marginLeft={2}
								bgColor={'teal.400'}
								_hover={{
									bgColor: 'teal.300',
								}}
							/>
						</Menu>
					</NavLink>
					<Menu>
						<MenuButton
							as={IconButton}
							size="md"
							icon={<FaShoppingCart />}
							color={'white'}
							aria-label="cart"
							marginX={2}
							bgColor={'teal.400'}
							_hover={{
								bgColor: 'teal.300',
							}}
						/>
					</Menu>
					<Menu>
						<MenuButton
							as={IconButton}
							size="md"
							icon={<FaUser />}
							aria-label="account"
							color={'white'}
							zIndex={1}
							bgColor={'teal.400'}
							_hover={{
								bgColor: 'teal.300',
							}}
						/>
					</Menu>
				</Flex>
			</Flex>
		</Box>
	);
};

export default SecondaryNavbar;
