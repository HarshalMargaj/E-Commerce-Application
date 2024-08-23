import React, { useState, useEffect } from "react";
import makeRequest from "../makeRequest";

const useFetch = url => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = await makeRequest.get(url);
				setData(response.data.data);
			} catch (err) {
				setError(true);
			}
			setIsLoading(false);
		};

		fetchData();
	}, [url]);

	return { data, isLoading, error };
};

export default useFetch;
