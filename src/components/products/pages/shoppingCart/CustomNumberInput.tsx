import React from 'react';
import { updateCartItemQuantity } from '../../../../redux/checkoutSliceRedux/checkoutSlice';
import { Box, Button } from '@chakra-ui/react';
import { useAppDispatch } from '../../../../redux/store';

interface CustomNumberInputProps {
	productId: string;
	quantity: number;
}

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
	productId,
	quantity,
}) => {
	const dispatch = useAppDispatch();

	const handleQuantityChange = (newQuantity: number) => {
		dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
		console.log(newQuantity);
	};

	const handleIncrement = () => {
		if (quantity < 10) {
			handleQuantityChange(quantity + 1);
			console.log('m m');
		}
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			handleQuantityChange(quantity - 1);
			console.log('m m');
		}
	};

	return (
		<Box className="custom-number-input rounded-md w-32" borderWidth="1px">
			<div className="flex flex-row h-10 w-full relative bg-transparent">
				<Button
					data-action="decrement"
					onClick={handleDecrement}
					className="bg-gray-100 h-full w-10 cursor-pointer outline-none"
				>
					<span className="m-auto text-2xl font-thin">−</span>
				</Button>
				<input
					type="number"
					className="focus:outline-none bg-transparent text-center w-full font-semibold text-md md:text-base cursor-default flex items-center outline-none"
					name="custom-input-number"
					value={quantity}
					readOnly
				/>
				<Button
					data-action="increment"
					onClick={handleIncrement}
					className="bg-gray-100 h-full w-10 cursor-pointer"
				>
					<span className="m-auto text-2xl font-thin">+</span>
				</Button>
			</div>
		</Box>
	);
};

export default CustomNumberInput;
