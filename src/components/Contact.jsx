import "../style/contact.css";
import Icon from "@mdi/react";
import { mdiPhone, mdiEmailOutline, mdiMapMarker } from "@mdi/js";

import { useOutletContext } from "react-router-dom";

const Contact = () => {
	const { imageUrls } = useOutletContext();

	const url = imageUrls.find(imageUrl => imageUrl.includes("contact"));

	return (
		<div className="contact">
			<div
				style={{
					backgroundImage: url ? `url(${url})` : " none",
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
						<form id="contact" onSubmit={e => e.preventDefault()}>
							<label htmlFor="name">
								Name
								<input type="text" name="name" id="name" />
							</label>
							<label htmlFor="email">
								Email
								<input type="text" name="email" id="email" />
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
						<button type="submit" form="contact" className="slide">
							Send Message
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export { Contact as default };
