import { Box, Text } from '@chakra-ui/react';
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';

const Banners = () => {
	const gridColumns = useBreakpointValue({ base: '1fr', md: 'repeat(5, 1fr)' });
	const gridRows = useBreakpointValue({
		base: 'repeat(4, 1fr)',
		md: 'repeat(2, 1fr)',
	});
	return (
		<>
			<Box marginX={4}></Box>
		</>
	);
};

export default Banners;
