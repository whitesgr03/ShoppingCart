import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

const Loading = () => (
	<div data-testid="loading" className="loading">
		<Icon path={mdiLoading} spin={1} size={3} />
		Loading...
	</div>
);
export default Loading;
