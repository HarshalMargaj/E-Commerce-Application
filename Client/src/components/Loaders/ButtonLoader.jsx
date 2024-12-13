import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const App = ({ color }) => {
	// Customize the Ant Design Icon
	const antIcon = <LoadingOutlined className={`${color}`} spin />;

	return (
		<div className="flex items-center justify-center">
			<Spin indicator={antIcon} />
		</div>
	);
};

export default App;
