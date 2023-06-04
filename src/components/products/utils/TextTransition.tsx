import { Box, Text, useColorModeValue } from '@chakra-ui/react';

const TextTransition = (props: { text: string }) => {
	const textColor = useColorModeValue('teal.400', 'teal.200');

	const textStyles = {
		fontSize: '24px',
		fontWeight: 'bold',
		color: textColor,
	};

	return (
		<Box
			overflow="hidden"
			fontSize={25}
			fontWeight={600}
			color="teal.400"
			justifyContent="space-between"
			position="absolute"
			top={5}
			left={1}
			right={0}
			zIndex={2}
			pointerEvents="none"
			userSelect="none"
		>
			<div className="text-transition-container">
				<Text style={textStyles} className="text-transition">
					{props.text}
				</Text>
			</div>
		</Box>
	);
};

export default TextTransition;
