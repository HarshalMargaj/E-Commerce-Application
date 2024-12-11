import * as React from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

export default function ImageMasonry() {
	const { data, isLoading, error } = useFetch(`/categories?populate=*`);
	return (
		<div className="p-[60px]  flex justify-between items-center ">
			{data.map(item => (
				<div key={item.id} className="flex flex-col items-center gap-4">
					<div className="flex items-center justify-center shadow-md rounded-[50%] h-[150px] w-[150px] overflow-hidden">
						<Link
							to={`/products/${item.id}`}
							className="text-gray-500"
						>
							<img
								src={
									import.meta.env.VITE_UPLOAD_URL +
									item.attributes?.category_image?.data
										?.attributes.url
								}
								alt={item.title}
								loading="lazy"
							/>
						</Link>
					</div>
					{item.attributes.category_name}
				</div>
			))}
		</div>
	);
}
