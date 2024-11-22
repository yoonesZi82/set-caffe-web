import React from "react";
import { Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Slider({ navigation, autoplay, children, delay, uniq }) {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      dir="rtl"
      autoplay={autoplay ? { delay, disableOnInteraction: false } : false}
      loop={true}
      navigation={navigation}
      modules={[Navigation, Autoplay]}
      className={`${uniq} mySwiper cursor-grab`}
    >
      {children}
    </Swiper>
  );
}

export default Slider;
