import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";


import Header from "./Header";
import Footer from "./Footer";
import Modal from "../components/modals/Modal";

import RootProvider from "./RootContext";
import fetchBackgroundImageUrl from "../utils/fetchBackgroundImageUrl";

const Root = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState("");
	const [backgroundImage, setBackgroundImage] = useState({
		home: null,
		contact: null,
	});
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
		const handleFetch = async () => {
			setIsLoading(true);
			try {
				setImageUrl(await fetchBackgroundImageUrl(page));
			} catch (error) {
				console.log({
					message: "fetch image does not exist",
					state: error,
				});
				navigate("/error");
				setIsLoading(false);
			}
		};

		backgroundImage[page] === null && handleFetch();
	}, [page, backgroundImage, navigate]);

	return (
		<>
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
		</>
	);
};

export { Root as default };
