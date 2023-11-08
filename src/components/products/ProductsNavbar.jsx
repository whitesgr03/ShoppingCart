import "../../style/products/productNavBar.css";
import { Link } from "react-router-dom";

const ProductsNavbar = () => {
	return (
		<ul className="category">
			<li>
				<Link to="/shop">Shop</Link>
			</li>
			<li> / </li>
			<li>
				<Link to="/shop">Category</Link>
			</li>
		</ul>
	);
};

export default ProductsNavbar;
