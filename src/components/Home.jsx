const Home = () => {
	return (
		<div className="home">
			<div className="carousel">
				<button type="button" className="arrow left"></button>
				<div className="content">
					<div className="container">
						<h2 className="title">Casual Summer Collection</h2>
						<button type="button">VIEW MORE</button>
					</div>
				</div>
				<button type="button" className="arrow right"></button>
			</div>
			<div className="info"></div>
			<div className="category"></div>
		</div>
	);
};

export { Home as default };
