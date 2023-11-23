import "../../style/layout/footer.css";
import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";

const Footer = () => {
	return (
		<footer>
			<div>
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
			</div>
			<div className="icon">
				Icons made by
				<a
					href="https://www.flaticon.com/authors/pixel-perfect"
					title="Pixel perfect"
					target="_blank"
					rel="noreferrer"
				>
					Pixel perfect
				</a>
				<span> from </span>
				<a
					href="https://www.flaticon.com/"
					title="Flaticon"
					target="_blank"
					rel="noreferrer"
				>
					www.flaticon.com
				</a>
			</div>
		</footer>
	);
};

export default Footer;
