import {
	Center,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	useColorModeValue,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { useSearchProductsQuery } from '../../redux/apiSliceRedux/apiSlice';
import { useNavigate } from 'react-router-dom';

const SearchProduct = () => {
	const inputBg = useColorModeValue('none', 'gray.600');
	const inputColor = useColorModeValue('black', 'white');
	const [searchInput, setSearchInput] = useState<string>('');
	const [isSearchRequested, setIsSearchRequested] = useState<boolean>(false);
	const [debouncedSearchInput, setDebouncedSearchInput] = useState<string>('');

	const navigate = useNavigate();

	const { data, isLoading } = useSearchProductsQuery(debouncedSearchInput, {
		skip: !isSearchRequested,
	});

	useEffect(() => {
		const delaySearch = setTimeout(() => {
			setDebouncedSearchInput(searchInput);
		}, 500);

		return () => {
			clearTimeout(delaySearch);
		};
	}, [searchInput]);

	const handleSearch = () => {
		setIsSearchRequested(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
		setIsSearchRequested(false);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	useEffect(() => {
		if (data && !isLoading) {
			navigate('/search-products', { state: { data } });
		}
	}, [data, isLoading, navigate]);

	return (
		<>
			<InputGroup maxW="md">
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
					onChange={handleInputChange}
					onKeyPress={handleKeyPress}
				/>
				<IconButton
					aria-label="Search database"
					ml={2}
					icon={<SearchIcon />}
					onClick={handleSearch}
				/>
			</InputGroup>
		</>
	);
};

export default SearchProduct;
