import pruduct1 from "../images/product/Cotton Twill Cap.png";
import pruduct2 from "../images/product/Embroidery Faded Cap.png";
import pruduct3 from "../images/product/Leather Sports Bag.png";
import pruduct4 from "../images/product/Linen Resort Shirt.png";
import pruduct5 from "../images/product/Oversized Fit Printed Mesh T-shirt.png";
import pruduct6 from "../images/product/Regular Fit Printed T-shirt.png";
import pruduct7 from "../images/product/Relaxed Fit Printed T-shirt.png";
import pruduct8 from "../images/product/STWD Backpack.png";
import pruduct9 from "../images/product/Skinny Jeans.png";
import pruduct10 from "../images/product/Slim Fit Cotton Chinos.png";
import pruduct11 from "../images/product/Slim-Fit Jeans.png";
import pruduct12 from "../images/product/Straight Regular Jeans.png";

const fetchResource = async () => {
	const defaultPrice = [19.9, 29.9];
	const defaultResources = [
		pruduct1,
		pruduct2,
		pruduct3,
		pruduct4,
		pruduct5,
		pruduct6,
		pruduct7,
		pruduct8,
		pruduct9,
		pruduct10,
		pruduct11,
		pruduct12,
	];

	return defaultResources.map((url, i) => {
		const name = url.match(/(?<=\/)[A-Z][^.]+/g)[0];
		return {
			id: btoa(name),
			name: name,
			url,
			price: defaultPrice[i % 2],
		};
	});
};

export { fetchResource };
