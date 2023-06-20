import {
	Box,
	Container,
	Link,
	SimpleGrid,
	Stack,
	Text,
	Flex,
	Tag,
	useColorModeValue,
	useBreakpointValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillShop } from 'react-icons/ai';

const Logo = (props: any) => {
	return (
		<Flex display={'flex'} alignItems={'center'} fontSize={'2xl'}>
			<Text fontSize={24}>
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
	);
};

const ListHeader = ({ children }: { children: ReactNode }) => {
	return (
		<Text fontWeight={'500'} fontSize={'lg'} mb={2}>
			{children}
		</Text>
	);
};

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<Box
			bg={useColorModeValue('gray.50', 'gray.900')}
			color={useColorModeValue('gray.700', 'gray.200')}
			mt={'2rem'}
		>
			<Container as={Stack} maxW={'6xl'} py={10}>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
					<Stack align={'flex-start'}>
						<ListHeader>Product</ListHeader>
						<Link href={'#'}>Overview</Link>
						<Stack direction={'row'} align={'center'} spacing={2}>
							<Link href={'#'}>Features</Link>
							<Tag
								size={'sm'}
								bg={useColorModeValue('teal.400', 'teal.700')}
								ml={2}
								color={'white'}
							>
								New
							</Tag>
						</Stack>
						<NavLink to="/">Tutorials</NavLink>
						<NavLink to="/">Pricing</NavLink>
						<NavLink to="/">Releases</NavLink>
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Company</ListHeader>
						<NavLink to="/">About Us</NavLink>
						<NavLink to="/">Press</NavLink>
						<NavLink to="/">Careers</NavLink>
						<NavLink to="/">Contact Us</NavLink>
						<NavLink to="/">Partners</NavLink>
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Legal</ListHeader>
						<NavLink to="/">Cookies Policy</NavLink>
						<NavLink to="/">Privacy Policy</NavLink>
						<NavLink to="/">Terms of Service</NavLink>
						<NavLink to="/">Law Enforcement</NavLink>
						<NavLink to="/">Status</NavLink>
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Follow Us</ListHeader>
						<NavLink to="/">FaceBook</NavLink>
						<NavLink to="/">Instagram</NavLink>
						<NavLink to="/">Twitter</NavLink>
						<NavLink to="/">LinkedIn</NavLink>
						<NavLink to="/">GitHub</NavLink>
					</Stack>
				</SimpleGrid>
			</Container>
			<Box py={10}>
				<Flex
					align={'center'}
					_before={{
						content: '""',
						borderBottom: '1px solid',
						borderColor: useColorModeValue('gray.200', 'gray.700'),
						flexGrow: 1,
						mr: 8,
					}}
					_after={{
						content: '""',
						borderBottom: '1px solid',
						borderColor: useColorModeValue('gray.200', 'gray.700'),
						flexGrow: 1,
						ml: 8,
					}}
				>
					<Logo />
				</Flex>
				<Text pt={6} fontSize={'sm'} textAlign={'center'}>
					© {year} Shopzify. All rights reserved
				</Text>
			</Box>
		</Box>
	);
};

export default Footer;
