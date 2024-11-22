"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Product from "@/components/product/Product";
import "swiper/css";
import "swiper/css/effect-cards";
import axios from "axios";
import { Loader } from "@/components/loading/product/Loader";

export default function Slider({ productID, user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .post("/api/products/other", {
        productID,
      })
      .then((res) => res.status === 200 && setProducts(res.data))
      .catch(
        (err) => err && setError("در پیدا کردن محصولات مرتبط مشکلی به وجود امد")
      )
      .finally(() => setLoading(false));
  }, [productID]);

  return (
    <>
      {loading && <Loader />}
      {error && (
        <div className="flex justify-center items-center w-full">
          <p className="text-center text-navbarDashboard"> {error} </p>
        </div>
      )}
      {!loading && !error && products.length === 0 && (
        <div className="flex justify-center items-center w-full">
          <p className="text-center text-navbarDashboard">
            {" "}
            محصولی برای نمایش وجود ندارد{" "}
          </p>
        </div>
      )}
      {!loading && !error && products.length > 0 && (
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="w-[240px]"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="rounded-[8px]">
              <Product
                id={product.id}
                name={product.name}
                price={product.price}
                img={product.img}
                userID={user.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
