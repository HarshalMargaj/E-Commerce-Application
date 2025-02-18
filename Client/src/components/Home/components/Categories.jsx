import * as React from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

export default function ImageMasonry() {
	const { data, isLoading, error } = useFetch(`/categories?populate=*`);
	return (
		<div className="p-[60px] flex-wrap gap-4 md:gap-0 flex justify-center items-center ">
			{data.map(item => (
				<div key={item.id} className="flex flex-col items-center gap-4">
					<div className="shadow-md h-[350px] w-[350px] overflow-hidden">
						<Link
							to={`/products/${item.id}`}
							className="text-gray-500"
						>
							<img
								src={
									item?.attributes?.category_image?.data?.attributes?.url.startsWith(
										"http"
									)
										? item?.attributes?.category_image?.data
												?.attributes?.url
										: import.meta.env.VITE_UPLOAD_URL +
										  item?.attributes?.category_image?.data
												?.attributes?.url
								}
								alt={
									item?.attributes?.product_name ||
									"Product Image"
								}
								loading="lazy"
								className="h-full w-full object-cover object-top"
							/>
						</Link>
					</div>
					{item.attributes.category_name}
				</div>
			))}
		</div>
	);
}
