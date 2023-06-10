// import { useState, useEffect } from 'react';

// const useWishlist = (wishlistKey: string) => {
// 	const [wishlistItems, setWishlistItems] = useState<string[]>([]);

// 	useEffect(() => {
// 		const storedWishlistItems = localStorage.getItem(wishlistKey);
// 		if (storedWishlistItems) {
// 			setWishlistItems(JSON.parse(storedWishlistItems));
// 		}
// 	}, [wishlistKey]);

// 	const updateLocalStorage = (items: string[]) => {
// 		localStorage.setItem(wishlistKey, JSON.stringify(items));
// 	};

// 	const addToWishlist = (productId: string) => {
// 		setWishlistItems((prevItems) => {
// 			const updatedItems = [...prevItems, productId];
// 			updateLocalStorage(updatedItems);
// 			return updatedItems;
// 		});
// 	};

// 	const removeFromWishlist = (productId: string) => {
// 		setWishlistItems((prevItems) => {
// 			const updatedItems = prevItems.filter((item) => item !== productId);
// 			updateLocalStorage(updatedItems);
// 			return updatedItems;
// 		});
// 	};

// 	const isInWishlist = (productId: string) => {
// 		return wishlistItems.includes(productId);
// 	};

// 	return { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist };
// };

// export default useWishlist;
import { useState, useEffect } from 'react';

const useWishlist = (wishlistKey: string) => {
	const [wishlistItems, setWishlistItems] = useState<string[]>([]);

	useEffect(() => {
		const storedWishlistItems = localStorage.getItem('wishlistItems');
		if (storedWishlistItems) {
			const storedData = JSON.parse(storedWishlistItems);
			if (storedData[wishlistKey]) {
				setWishlistItems(storedData[wishlistKey]);
			}
		}
	}, [wishlistKey]);

	const updateLocalStorage = (items: string[]) => {
		const storedWishlistItems = localStorage.getItem('wishlistItems');
		if (storedWishlistItems) {
			const storedData = JSON.parse(storedWishlistItems);
			const updatedData = {
				...storedData,
				[wishlistKey]: items,
			};
			localStorage.setItem('wishlistItems', JSON.stringify(updatedData));
		} else {
			const data = {
				[wishlistKey]: items,
			};
			localStorage.setItem('wishlistItems', JSON.stringify(data));
		}
	};

	const addToWishlist = (productId: string) => {
		setWishlistItems((prevItems) => {
			const updatedItems = [...prevItems, productId];
			updateLocalStorage(updatedItems);
			return updatedItems;
		});
	};

	const removeFromWishlist = (productId: string) => {
		setWishlistItems((prevItems) => {
			const updatedItems = prevItems.filter((item) => item !== productId);
			updateLocalStorage(updatedItems);
			return updatedItems;
		});
	};

	const isInWishlist = (productId: string) => {
		return wishlistItems.includes(productId);
	};

	return { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist };
};

export default useWishlist;
