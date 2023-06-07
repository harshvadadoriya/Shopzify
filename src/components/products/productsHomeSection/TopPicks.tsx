import {
  Badge,
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { sliderSettings } from "../../../utils/sliderSettings";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "swiper/css";
import { ProductFormValues } from "../../../interfaces/interface";
import { useGetProductDataQuery } from "../../../redux/apiSliceRedux/apiSlice";
import TextTransition from "../utils/TextTransition";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../utils/WishlistHeartAnimation.css";

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <Flex position="absolute" top="4" right="0" zIndex={1}>
      <Button onClick={() => swiper.slidePrev()}>
        <FiChevronLeft />
      </Button>
      <Button onClick={() => swiper.slideNext()} ml="2">
        <FiChevronRight />
      </Button>
    </Flex>
  );
};
const TopPicks = () => {
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const priceTextColor = useColorModeValue("gray.600", "gray.400");
  const dummyPriceTextColor = useColorModeValue("gray.400", "gray.500");
  const navigate = useNavigate();
  const toast = useToast();

  const { data, isLoading, isError } = useGetProductDataQuery();
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const TopPicksProducts = data?.productDetails.filter(
    (product) => product.displaySection === "top picks"
  );

  const handleProductClick = (product: ProductFormValues) => {
    navigate(`/products/${product._id}`, { state: { product } });
  };

  const [likedProductId, setLikedProductId] = useState("");
  const handleToggleWishlist = (productId: string) => {
    const updatedWishlistItems = wishlistItems.includes(productId)
      ? wishlistItems.filter((id) => id !== productId)
      : [...wishlistItems, productId];
    setWishlistItems(updatedWishlistItems);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlistItems));

    setLikedProductId((prevLikedProductId) =>
      prevLikedProductId === productId ? "" : productId
    );

    if (wishlistItems.includes(productId)) {
      toast({
        title: "Product removed from wishlist",
        status: "warning",
        position: "top",
        duration: 1500,
        isClosable: true,
      });
    } else {
      toast({
        title: "Product added in your wishlist",
        status: "success",
        position: "top",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const storedWishlistItems = localStorage.getItem("wishlistItems");
    if (storedWishlistItems) {
      setWishlistItems(JSON.parse(storedWishlistItems));
    }
  }, []);

  if (isLoading) {
    return <Box marginX={4}>Loading...</Box>;
  }

  if (isError) {
    return <Box marginX={4}>Error fetching products</Box>;
  }

  return (
    <>
      <Box marginX={4} position="relative">
        <TextTransition text="TOP PICKS" />
        <center>
          <Swiper {...sliderSettings}>
            <SliderButtons />
            {TopPicksProducts?.map((obj: ProductFormValues) => (
              <SwiperSlide key={obj._id}>
                <Box
                  key={obj._id}
                  className="relative max-w-md rounded-3xl p-2 mt-[5rem]"
                  border={1}
                  borderStyle="solid"
                  bgColor={cardBgColor}
                  borderColor={cardBorderColor}
                >
                  <div
                    className="overflow-x-hidden rounded-2xl relative cursor-pointer"
                    style={{ userSelect: "none" }}
                    onClick={() => handleProductClick(obj)}
                  >
                    <img
                      className="h-[15rem] rounded-2xl w-full object-cover"
                      src={obj.image}
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
                        {obj.name}
                      </p>
                      <div
                        className="flex items-center"
                        style={{ userSelect: "none" }}
                      >
                        <Text className="text-lg mt-0" color={priceTextColor}>
                          Rs. {Number(obj.discountedPrice).toLocaleString()}
                        </Text>
                        <Text
                          className="text-md mt-0 ml-2 line-through"
                          color={dummyPriceTextColor}
                        >
                          Rs. {Number(obj.originalPrice).toLocaleString()}
                        </Text>
                      </div>
                    </div>
                    <Flex
                      onClick={() => {
                        handleToggleWishlist(obj._id);
                      }}
                      className={`heart-button flex flex-col-reverse mt-[1.8rem] mr-4 group cursor-pointer h-5 ${
                        wishlistItems.includes(obj._id) ? "is-active" : ""
                      }`}
                    >
                      {wishlistItems.includes(obj._id) ? (
                        <FaHeart fill="teal" fontSize={"20px"} />
                      ) : (
                        <FaRegHeart fontSize={"20px"} fill="gray" />
                      )}
                    </Flex>
                  </div>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </center>
      </Box>
    </>
  );
};

export default TopPicks;
