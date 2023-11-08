import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import Header from "./Header";
import Footer from "./Footer";
import Modal from "../components/modals/Modal";

import RootContext from "./RootContext";

import getAllProducts from "../utils/handleProducts";
import getBackgroundImageUrl from "../utils/handleBackgroundImageUrl";

const Root = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState("");
	const [backgroundImage, setBackgroundImage] = useState({
		home: null,
		contact: null,
	});
	const [products, setProducts] = useState([]);

	const location = useLocation();
	const navigate = useNavigate();

	const page =
		location.pathname.slice(1) === "" ? "home" : location.pathname.slice(1);

	const imageLoad = () => {
		setBackgroundImage({
			...backgroundImage,
			[page]: `url(${imageUrl})`,
		});

		setImageUrl("");
		setIsLoading(false);
	};

	useEffect(() => {
		let ignore = false;

		const handleBgFetch = async () => {
			setIsLoading(true);

			const result = await getBackgroundImageUrl(page);

			if (!result.success) {
				navigate("/error");
				setIsLoading(false);
				return;
			}

			result.success && setImageUrl(result.data);
		};

		backgroundImage[page] === null && handleBgFetch();

		return () => {
			ignore = true;
		};
	}, [page, backgroundImage, navigate]);

	useEffect(() => {
		const handleProductsFetch = async () => {
			setIsLoading(true);

			const result = await getAllProducts();

			if (!result.success) {
				navigate("/error");
				return;
			}

			result.success && setProducts(result.data);

			setIsLoading(false);
		};

		page === "shop" && products.length === 0 && handleProductsFetch();
	}, [page, products, navigate]);

	return (
		<RootProvider>
			<Header />

			<div data-testid="content" className={"content"}>
				{isLoading ? (
					<div data-testid="loading" className="loading">
						<img
							onLoad={imageLoad}
							src={imageUrl}
							alt="none"
							hidden
						/>
						<Icon path={mdiLoading} spin={1} size={3} />
						Loading...
					</div>
				) : (
					<Outlet
						context={{
							products,
							backgroundImage,
						}}
					/>
				)}
				<Footer />
			</div>
			<Modal />
		</RootProvider>
	);
};

export { Root as default };
