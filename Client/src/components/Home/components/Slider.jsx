import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import ImageOne from "../../../assets/imageone.jpg";
import ImageTwo from "../../../assets/imagetwo.jpg";
import ImageThree from "../../../assets/imagethree.jpg";
import ImageFour from "../../../assets/imagefour.jpg";
import ImageFive from "../../../assets/imagefive.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function App() {
	return (
		<>
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				className="mySwiper"
			>
				<SwiperSlide>
					<img src={ImageOne} alt="" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={ImageTwo} alt="" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={ImageThree} alt="" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={ImageFour} alt="" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={ImageFive} alt="" />
				</SwiperSlide>
			</Swiper>
		</>
	);
}
