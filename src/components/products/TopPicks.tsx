import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const TopPicks = () => {
	return (
		<>
			<Box marginX={4} paddingY={2}>
				<Text fontSize={25} fontWeight={600} color={'teal.400'}>
					Top Picks
				</Text>
			</Box>
		</>
	);
};

export default TopPicks;
