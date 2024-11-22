"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Banner() {
  return (
    <>
      <Swiper
        rewind={true}
        autoplay={{ delay: 1500 }}
        loop={true}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="home-slider mySwiper"
      >
        <SwiperSlide>
          <img src="/image/baner1.jpg" alt="slid" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/baner2.jpg" alt="slid" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/baner3.jpg" alt="slid" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Banner;
