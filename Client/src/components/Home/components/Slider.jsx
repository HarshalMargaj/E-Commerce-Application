import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import ImageOne from "../../../assets/Screenshot 2024-12-12 at 7.16.37 PM.png";
import ImageTwo from "../../../assets/Screenshot 2024-12-12 at 7.16.46 PM.png";
import ImageThree from "../../../assets/Screenshot 2024-12-12 at 7.16.55 PM.png";
// import ImageFour from "../../../assets/4028484.jpg";
// import ImageFive from "../../../assets/imagefive.jpg";
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
				{/* 
				<SwiperSlide>
					<img src={ImageFour} alt="" />
				</SwiperSlide> */}
				{/* <SwiperSlide>
					<img src={ImageFive} alt="" />
				</SwiperSlide> */}
			</Swiper>
		</>
	);
}
