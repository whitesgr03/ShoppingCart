import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useOutletContext } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

import { fetchResource } from "../utils/handleResource";

const Shop = () => {
	const { onAddItem, onToggleModal } = useOutletContext();
	const { pathname, key: currentKey } = useLocation();

	const isShopRoute = pathname === "/shop";

	const [products, setProducts] = useState([]);
	const [filterText, setFilterText] = useState("");

	useEffect(() => {
		const handleFetch = async () => {
			setProducts(await fetchResource());
		};
		handleFetch();
	}, []);
	return (
		<div data-testid="shop" className="shop">
			<Navbar
				isShopRoute={isShopRoute}
				filterText={filterText}
			/>
			<Outlet
				context={{ products, filterText, onAddItem, onToggleModal }}
			/>
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

const ProductInfo = () => {
	const { state } = useLocation();

	const maxOptions = 10;

	const options = Array.from({ length: maxOptions })
		.fill([])
		.map((_, i) => (
			<option key={i} value={i + 1}>
				{i + 1}
			</option>
		));

	return state ? (
		<div className="productInfo">
			<div className="image">
				<img src={state.product.url} alt={state.product.name} />
			</div>
			<div className="info">
				<div className="description">
					<h2 className="title">{state.product.name}</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Magnam itaque nisi ipsa pariatur perspiciatis nemo.
					</p>
					<p className="price">${state.product.price.toFixed(2)}</p>
				</div>

				<form
					onSubmit={e => {
						e.preventDefault();
					}}
				>
					<label htmlFor="quantity">
						Quantity
						<select name="quantity" id="quantity" defaultValue={1}>
							{options}
						</select>
					</label>
					<button className="slide" type="submit">
						Add to Cart
					</button>
				</form>
			</div>
		</div>
	) : (
		<div data-testid="productError" className="productError">
			<div className="error">
				<p>Our apologies, there has been an error.</p>
				<p>Please come back later or return to the previous page.</p>
			</div>
		</div>
	);
};

export { Shop as default, Navbar, Products, ProductInfo };
