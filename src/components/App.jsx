import "../style/app.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import { Outlet } from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Modal from "./modals/Modal";
import Error from "./Error";

import RootContext from "./RootContext";

import useFetchAllBgImages from "../hook/useFetchAllBgImages";

const Root = () => {
	const { imageUrls, error, loading } = useFetchAllBgImages();

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
