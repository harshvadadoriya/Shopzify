import { useEffect } from "react";
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
  useGetProductDataQuery,
  useGetWishlistsQuery,
} from "../../../redux/apiSliceRedux/apiSlice";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";

const WishlistItem = () => {
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const priceTextColor = useColorModeValue("gray.600", "gray.400");
  const dummyPriceTextColor = useColorModeValue("gray.400", "gray.500");
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const toast = useToast();

  const { data: wishlistData } = useGetWishlistsQuery();

  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
          >
            Your Wishlist Products
          </Text>
        </Center>
        {wishlistData?.wishlist.products.length === 0 ? (
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
            {wishlistData?.wishlist.products.map((wishlistProduct) => (
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
                  onClick={() => handleProductClick(wishlistProduct._id)}
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
                        {Number(wishlistProduct.originalPrice).toLocaleString()}
                      </Text>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" colorScheme="red">
                    <FaTimes />
                  </Button>
                  {/* <Flex
										onClick={() => {
											handleToggleWishlist(wishlisedddtProduct._id);
										}}
										className={`heart-button flex flex-col-reverse mb-1 mr-4 group cursor-pointer ${
											wishlistItems.includes(wishlistProduct._id)
												? 'is-active'
												: ''
										}`}
									>
										{wishlistItems.includes(wishlistProduct._id) ? (
											<FaHeart fill="teal" fontSize={'20px'} />
										) : (
											<FaRegHeart fontSize={'20px'} fill="gray" />
										)}
									</Flex> */}
                </div>
              </Box>
            ))}
          </Flex>
        )}
      </Box>
    </>
  );
};

export default WishlistItem;
