import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

import { fetchResource } from "../utils/handleResource";

const Shop = () => {
	return (
		<div data-testid="shop" className="shop">
			<Navbar />
			<Outlet />
		</div>
	);
};

const Navbar = () => {
	return (
		<div className="navigation">
			<ul className="category">
				<li>Home /</li>
				<li>Category /</li>
				<li>Top</li>
			</ul>
			<form className="search ">
				{/* active-border */}
				<div className="search-border">
					<input type="search" placeholder="search..." />
				</div>
				<button type="submit">
					<Icon path={mdiMagnify} />
				</button>
			</form>
		</div>
	);
};

const Products = () => {
	const [products, setProducts] = useState(null);

	const handleFetch = async () => {
		setProducts(await fetchResource());
	};

	useEffect(() => {
		handleFetch();
	}, []);

	const productList = products ? (
		products.map(product => (
			<div className="item" key={product.id}>
				<Link
					className="image-link"
					to={`/shop/${product.id}`}
					state={{ product }}
				>
					<img src={product.url} alt={product.name} />
				</Link>
				<div className="info">
					<div className="title">
						<Link
							className="text-link"
							to={`/shop/${product.id}`}
							state={{ product }}
						>
							{product.name}
						</Link>
					</div>
					<div className="price">${product.price}</div>
				</div>
			</div>
		))
	) : (
		<div>{"loading..."}</div>
	);

	return (
		<div
			data-testid="items"
			className={`items ${products ? "" : "loading"}`}
		>
			{productList}
		</div>
	);
};

export { Shop as default, Navbar, Products };
