import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  useAddToWishlistMutation,
  useGetProductDataQuery,
  useGetWishlistsQuery,
} from "../../../redux/apiSliceRedux/apiSlice";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";
import {
  ProductFormValues,
  WishlistProduct,
} from "../../../interfaces/interface";

const WishlistItem = () => {
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const priceTextColor = useColorModeValue("gray.600", "gray.400");
  const dummyPriceTextColor = useColorModeValue("gray.400", "gray.500");
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const toast = useToast();
  const navigate = useNavigate();

  const { data: productData, isLoading, isError } = useGetProductDataQuery();
  const { data: wishlistData } = useGetWishlistsQuery();
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([]);

  const [addToWishlist, { isLoading: isAddingToWishlist }] =
    useAddToWishlistMutation();

  const handleToggleWishlist = (product: WishlistProduct) => {
    const updatedWishlistItems = wishlistItems.filter(
      (item) => item._id !== product._id
    );

    setWishlistItems(updatedWishlistItems);

    addToWishlist({ product, isWishList: true })
      .unwrap()
      .then((response: any) => {
        const message = response?.message || "Something went wrong";
        toast({
          title: message,
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message || "Something went wrong",
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const handleProductClick = (product: WishlistProduct) => {
    navigate(`/products/${product._id}`, { state: { product } });
  };

  useEffect(() => {
    if (wishlistData) {
      setWishlistItems(wishlistData.wishlist.products);
    }
  }, [wishlistData]);

  if (isLoading) {
    return <Box marginX={4}>Loading...</Box>;
  }

  if (isError) {
    return <Box marginX={4}>Error fetching products</Box>;
  }

  return (
    <>
      <Box marginX={4} marginTop={isScreenFixed ? "8.3rem" : "0"}>
        <Center>
          <Text
            fontWeight="bold"
            fontSize="3xl"
            my={2}
            mt={"2.5rem"}
            textAlign="center"
            color={"teal"}
          >
            Your Wishlist Products
          </Text>
        </Center>
        {wishlistItems.length === 0 ? (
          <Center flexDirection="column" mt={8}>
            <Text fontSize="lg" fontWeight="bold">
              You have no items in your Wishlist.
            </Text>
            <Flex mt={1} className="items-center">
              <Text>
                to continue shopping.{" "}
                <Text
                  as="button"
                  color="teal.500"
                  fontWeight="600"
                  onClick={() => navigate("/")}
                >
                  Click here
                </Text>
              </Text>
            </Flex>
          </Center>
        ) : (
          <Flex
            justifyContent="center"
            flexWrap="wrap"
            alignItems="left"
            mb={10}
          >
            {wishlistItems.map((wishlistProduct: WishlistProduct) => {
              const isWishlisted =
                wishlistData &&
                wishlistData.wishlist.products.some(
                  (item) => item.productId === wishlistProduct.productId
                );
              return (
                <Box
                  key={wishlistProduct._id}
                  className="relative max-w-md rounded-3xl p-2 mt-[2rem]"
                  border={1}
                  borderStyle="solid"
                  bgColor={cardBgColor}
                  borderColor={cardBorderColor}
                  mx={2}
                >
                  <div
                    className="overflow-x-hidden rounded-2xl relative cursor-pointer"
                    style={{ userSelect: "none" }}
                    onClick={() => handleProductClick(wishlistProduct)}
                  >
                    <img
                      className="h-[15rem] w-[20rem] rounded-2xl object-cover"
                      src={wishlistProduct.image}
                      alt={wishlistProduct.name}
                    />
                    <Box className="absolute left-2 top-1 rounded-full">
                      <Badge
                        rounded="full"
                        px="2"
                        fontSize="0.8em"
                        colorScheme="red"
                        color="red.500"
                        bgColor="red.100"
                      >
                        New
                      </Badge>
                    </Box>
                  </div>
                  <div className="mt-4 pl-2 mb-2 flex justify-between">
                    <div>
                      <p
                        className="text-lg font-semibold text-teal-500 mb-0 text-left"
                        style={{ userSelect: "none" }}
                      >
                        {wishlistProduct.name}
                      </p>
                      <div
                        className="flex items-center"
                        style={{ userSelect: "none" }}
                      >
                        <Text className="text-lg mt-0" color={priceTextColor}>
                          Rs.{" "}
                          {Number(
                            wishlistProduct.discountedPrice
                          ).toLocaleString()}
                        </Text>
                        <Text
                          className="text-md mt-0 ml-2 line-through"
                          color={dummyPriceTextColor}
                        >
                          Rs.{" "}
                          {Number(
                            wishlistProduct.originalPrice
                          ).toLocaleString()}
                        </Text>
                      </div>
                    </div>
                    <Flex
                      onClick={() => handleToggleWishlist(wishlistProduct)}
                      className="heart-button flex flex-col-reverse mt-[1.8rem] mr-4 group cursor-pointer h-5"
                    >
                      <FaHeart fill="teal" fontSize={"20px"} />
                    </Flex>
                  </div>
                </Box>
              );
            })}
          </Flex>
        )}
      </Box>
    </>
  );
};

export default WishlistItem;
