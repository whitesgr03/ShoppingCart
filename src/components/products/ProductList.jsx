import "../../style/products/productList.css";

import { Link, useOutletContext } from "react-router-dom";

const ProductList = () => {
	const { products, searchParams } = useOutletContext();
	const filterText = searchParams.get("search");

	const filterProducts = filterText
		? products.filter(
				item =>
					item.name
						.toLowerCase()
						.indexOf(filterText.toLowerCase().trim()) !== -1
		  )
		: products;

	return (
		<div data-testid="products" className="products">
			{filterProducts.map(product => (
				<div className="item" key={product.id}>
					<Link
						className="image-link"
						to={`/shop/${product.id}`}
						state={{
							product,
							prevPath: location.pathname,
						}}
					>
						<img src={product.url} alt={product.name} />
					</Link>
					<div className="info">
						<div className="title">
							<Link
								className="text-link"
								to={`/shop/${product.id}`}
								state={{ product, prevPath: location.pathname }}
							>
								{product.name}
							</Link>
						</div>
						<div className="price">${product.price.toFixed(2)}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProductList;
