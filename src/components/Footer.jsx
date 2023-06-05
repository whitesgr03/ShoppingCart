import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";

const Footer = () => {
	return (
		<footer>
			<a
				href="https://github.com/whitesgr03/ShoppingCart"
				target="_blank"
				rel="noreferrer"
			>
				&copy; 2023 - GentSkin
			</a>
			<a
				href="https://github.com/whitesgr03/ShoppingCart"
				target="_blank"
				rel="noreferrer"
			>
				<Icon path={mdiGithub}></Icon>
			</a>
		</footer>
	);
};

export default Footer;
