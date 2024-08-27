import * as React from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

export default function ImageMasonry() {
	const { data, isLoading, error } = useFetch(`/categories?populate=*`);
	console.log(data);
	return (
		<div className="categories-sec">
			{data.map(item => (
				<div key={item.id} className="category">
					<div className="circle">
						<Link
							to={`/products/${item.id}`}
							style={{ textDecoration: "none", color: "gray" }}
						>
							<img
								src={
									import.meta.env.VITE_UPLOAD_URL +
									item.attributes.category_image.data
										.attributes.url
								}
								alt={item.title}
								loading="lazy"
								style={{
									borderBottomLeftRadius: 4,
									borderBottomRightRadius: 4,
									display: "block",
									width: "100px",
									// height: "200px",
								}}
							/>
						</Link>
					</div>
					{item.attributes.category_name}
				</div>
			))}
		</div>
	);
}

const itemData = [
	{
		img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
		title: "Fern",
		category: "Men",
	},
	{
		img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
		title: "Snacks",
		category: "Women",
	},
	{
		img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
		title: "Mushrooms",
		category: "Men",
	},
	{
		img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
		title: "Tower",
		category: "Men",
	},
	{
		img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
		title: "Sea star",
		category: "Men",
	},
	{
		img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
		title: "Honey",
		category: "Men",
	},
	{
		img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
		title: "Basketball",
		category: "Men",
	},
];
