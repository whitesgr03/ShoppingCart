import "../style/contact.css";
import Icon from "@mdi/react";
import { mdiPhone, mdiEmailOutline, mdiMapMarker } from "@mdi/js";

import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";

import { AppContext } from "./App";

import getStorageImage from "../utils/handleStorageImage";
import handlePreLoadImage from "../utils/handlePreLoadImage";

const Contact = () => {
	const { imageUrls, setImageUrls, setAppError } = useContext(AppContext);
	const url = imageUrls["contact"];

	const navigate = useNavigate();

	const handleSubmit = e => {
		navigate("/");
		e.preventDefault();
	};

	useEffect(() => {
		let ignore = false;

		const handleFetch = async () => {
			const imageResource = "images/contact/background.jpg";
			try {
				const imageUrlsResult = await getStorageImage(imageResource);

				!ignore && (await handlePreLoadImage(imageUrlsResult));

				!ignore &&
					setImageUrls({
						...imageUrls,
						contact: imageUrlsResult,
					});

				!ignore && console.log("active");
			} catch (error) {
				setAppError("Service temporarily unavailable");
			}
		};

		!url && handleFetch();

		return () => {
			ignore = true;
		};
	}, [url, imageUrls, setImageUrls, setAppError]);

	return (
		<div className="contact">
			{!url && <Loading />}
			{url && (
				<div
					data-testid="backgroundImage"
					style={{
						backgroundImage: `url(${url})`,
					}}
				>
					<div className="blur">
						<h2 className="title">Contact Us</h2>
						<fieldset className="container">
							<legend>Get in touch</legend>
							<div className="info">
								<ul className="icons">
									<li>
										<Icon path={mdiPhone} size={1} />
									</li>
									<li>
										<Icon path={mdiEmailOutline} size={1} />
									</li>
									<li>
										<Icon path={mdiMapMarker} size={1} />
									</li>
								</ul>
								<ul className="describe">
									<li>+123-456-789</li>
									<li>gentskin@example.com</li>
									<li>123 Anywhere St.,Any City</li>
								</ul>
							</div>
							<form id="contact" onSubmit={handleSubmit}>
								<label htmlFor="name">
									Name
									<input type="text" name="name" id="name" />
								</label>
								<label htmlFor="email">
									Email
									<input
										type="text"
										name="email"
										id="email"
									/>
								</label>
								<label htmlFor="content">
									Content
									<textarea
										name="content"
										id="content"
										rows="5"
									></textarea>
								</label>
							</form>
						</fieldset>
						<div className="wrap">
							<button
								type="submit"
								form="contact"
								className="slide"
							>
								Send Message
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export { Contact as default };
