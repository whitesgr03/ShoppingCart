import "../style/app.css";

import { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Modal from "./modals/Modal";
import Error from "./Error";


import Loading from "./Loading";


import { initialAuth } from "../firebase-config";

import preLoadImage from "../utils/handlePreLoadImage";
import getStorageImage from "../utils/handleStorageImage";
import { getUserCart } from "../utils/handleUserCart";

import {
	handleCheckUser,
	handleRegisterUser,
} from "../utils/handleUserAccount";


const Root = () => {
	const [imageUrls, setImageUrls] = useState(null);
	const [error, setError] = useState(null);

	return (
		<RootContext>
			<div className="app">
				<Header />

				<div data-testid="content" className={"content"}>
					{loading && (
						<div data-testid="loading" className="loading">
							<Icon path={mdiLoading} spin={1} size={3} />
							Loading...
						</div>
					)}
					{error && <Error message={error} />}
					{!loading && !error && (
						<Outlet
							context={{
								imageUrls,
							}}
						/>
					)}
					<Footer />
				</div>
				<Modal />
			</div>
		</RootContext>
	);
};

export default Root;
