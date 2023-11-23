const preLoadImage = url =>
	new Promise(resolve => {
		const img = new Image();
		img.addEventListener("load", () => resolve(url), { once: true });
		img.src = url;
	});
	
export default preLoadImage;
