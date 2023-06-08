import { Text } from '@chakra-ui/react';
import { TextErrorProps } from '../../interfaces/interface';

const TextError = (props: TextErrorProps) => {
	return (
		<Text color={'red.400'} textAlign="left">
			{props.children}
		</Text>
	);
};

export default TextError;
