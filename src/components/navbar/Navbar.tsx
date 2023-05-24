import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { AiFillShop } from 'react-icons/ai';

export default function Navbar() {
	const { isOpen, onToggle } = useDisclosure();
	const linkColor = useColorModeValue('gray.600', 'gray.200');

	return (
		<Box>
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

					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={'flex-end'}
					direction={'row'}
					spacing={6}
				>
					<Button
						as={'a'}
						fontSize={'sm'}
						fontWeight={600}
						variant={'link'}
						color={linkColor}
						marginLeft={'2'}
						href={'#'}
						_hover={{
							color: 'teal.400',
						}}
					>
						Sign In
					</Button>
					<Button
						as={'a'}
						fontSize={'sm'}
						fontWeight={600}
						color={'white'}
						bg={'teal.400'}
						href={'#'}
						_hover={{
							bg: 'teal.300',
						}}
					>
						Sign Up
					</Button>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
}
