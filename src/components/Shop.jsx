import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useOutletContext } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiMagnify, mdiLoading } from "@mdi/js";

import { fetchResource } from "../utils/utils";

const Shop = () => {
	const { onAddItem, onToggleModal } = useOutletContext();
	const { pathname, key: currentKey } = useLocation();

	const isShopRoute = pathname === "/shop";

	const [products, setProducts] = useState(null);
	const [filterText, setFilterText] = useState("");
	const [previousKey, setPreviousKey] = useState(currentKey);

	useEffect(() => {
		const handleFetch = async () => {
			setProducts(await fetchResource());
		};
		handleFetch();
	}, []);

	useEffect(() => {
		const isKeyChanged = previousKey !== currentKey;

		const handleClearFilterText = () => {
			setFilterText("");
			setPreviousKey(currentKey);
		};

		isShopRoute && isKeyChanged && handleClearFilterText();
	});

	return (
		<div data-testid="shop" className="shop">
			{products ? (
				<>
					<Navbar
						isShopRoute={isShopRoute}
						filterText={filterText}
						onFilterTextChange={setFilterText}
					/>

					<Outlet
						context={{
							products,
							filterText,
							onAddItem,
							onToggleModal,
						}}
					/>
				</>
			) : (
				<div data-testid="loading" className="loading">
					<Icon path={mdiLoading} spin={1} size={3} />
					{"Loading..."}
				</div>
			)}
		</div>
	);
};

const Navbar = ({
	isShopRoute, 
	filterText,
	onFilterTextChange
}) => {
	const [active, setActive] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		onFilterTextChange(...new FormData(e.target).values());
	};

	const handleChange = e => {
		onFilterTextChange(e.target.value);
	};

	const handleActiveSearchBarBorder = () => {
		setActive(true);
	};

	const handleDeActivateSearchBarBorder = () => {
		setActive(false);
	};

	return (
		<div className="navigation" data-testid="navigation">
			<ul className="category">
				<li>
					<Link to="/shop">Shop</Link>
				</li>
				<li> / </li>
				<li>
					<Link to="/shop">Category</Link>
				</li>
			</ul>
			{isShopRoute && (
				<form
					data-testid="searchBar"
					className={`searchBar ${active ? "active-border" : ""}`}
					onFocus={handleActiveSearchBarBorder}
					onBlur={handleDeActivateSearchBarBorder}
					onSubmit={handleSubmit}
				>
					<div className="search-border">
						<input
							data-testid="search"
							type="search"
							name="search"
							placeholder="search..."
							value={filterText}
							onChange={handleChange}
						/>
					</div>
					<button type="submit">
						<Icon path={mdiMagnify} />
					</button>
				</form>
			)}
		</div>
	);
};

const Products = () => {
	const { products, filterText } = useOutletContext();

	const filterProducts =
		filterText === ""
			? products
			: products.filter(
					item =>
						item.name
							.toLowerCase()
							.indexOf(filterText.toLowerCase().trim()) !== -1
			  );

	const productList =
		products.length > 0 ? (
			filterProducts.map(product => (
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
						<div className="price">${product.price.toFixed(2)}</div>
					</div>
				</div>
			))
		) : (
			<div>{"loading..."}</div>
		);

	return (
		<div
			data-testid="products"
			className={`products ${products.length > 0 ? "" : "loading"}`}
		>
			{productList}
		</div>
	);
};

const ProductInfo = () => {
	const { state } = useLocation();

	const { onAddItem, onToggleModal } = useOutletContext();

	const maxOptions = 10;

	const options = Array.from({ length: maxOptions })
		.fill([])
		.map((_, i) => (
			<option key={i} value={i + 1}>
				{i + 1}
			</option>
		));

	const handleSubmit = e => {
		e.preventDefault();

		const formData = new FormData(e.target).entries();

		const entriesNumeric = [...formData].map(([key, value]) =>
			key === "quantity" ? [key, Number(value)] : [key, value]
		);

		const newProduct = {
			...state.product,
			...Object.fromEntries(entriesNumeric),
		};

		onAddItem(newProduct);
		onToggleModal("showAlert");
	};

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

				<form onSubmit={handleSubmit}>
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
