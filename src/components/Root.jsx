import { Outlet } from "react-router-dom";

function Root() {
	return (
		<>
			<div className="content">
				<Outlet />
			</div>
		</>
	);
}

export default Root;
