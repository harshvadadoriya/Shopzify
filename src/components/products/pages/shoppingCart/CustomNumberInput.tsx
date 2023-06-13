import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

const CustomNumberInput: React.FC = () => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box className="custom-number-input rounded-md w-32" borderWidth="1px">
      <div className="flex flex-row h-10 w-full relative bg-transparent">
        <Button
          data-action="decrement"
          onClick={handleDecrement}
          className="bg-gray-100 h-full w-10 rounded-l cursor-pointer outline-none"
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
          className="bg-gray-100 h-full w-10 rounded-r cursor-pointer"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </Button>
      </div>
    </Box>
  );
};

export default CustomNumberInput;
