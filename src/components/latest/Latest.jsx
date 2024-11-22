"use client";
import Product from "../product/Product";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "@/components/loading/product/Loader";
import GlobalBtn from "../global-button/GlobalBtn";
import { Pagination } from "antd";
import { PiHeartBold } from "react-icons/pi";

const Latest = ({ count, pagination, id, wishlist }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  // -----------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  let pageSize = 8; // show data with current (pageSize)

  if (pagination && !wishlist) {
    useEffect(() => {
      axios
        .get("/api/products/recive")
        .then((res) => {
          if (res.data) {
            const pageCount = Math.ceil(res.data.length / pageSize) * 10;
            setTotal(pageCount);
          }
          const endIndex = currentPage * pageSize;
          const startIndex = endIndex - pageSize;
          const allShowData = res.data.slice(startIndex, endIndex);
          setPaginatedProducts(allShowData);
        })
        .catch(
          (err) =>
            err && setError("در پیدا کردن محصولات سمت سرور مشکلی وجود دارد")
        )
        .finally(() => setLoading(false));
    }, [currentPage]);
  } else if (pagination && wishlist) {
    useEffect(() => {
      axios
        .post("/api/wishlist/recive", {
          userID: id,
        })
        .then((res) => {
          if (res.data) {
            const pageCount = Math.ceil(res.data.length / pageSize) * 10;
            setTotal(pageCount);
          }
          const endIndex = currentPage * pageSize;
          const startIndex = endIndex - pageSize;
          const allShowData = res.data.slice(startIndex, endIndex);
          setPaginatedProducts(allShowData);
        })
        .catch((err) => {
          setError("در پیدا کردن محصولات سمت سرور مشکلی وجود دارد");
        })
        .finally(() => setLoading(false));
    }, [currentPage]);
  } else {
    useEffect(() => {
      axios
        .post("/api/products/recive-count", {
          count,
        })
        .then((res) => {
          res.status === 200 ? setProducts(res.data) : setProducts([]);
        })
        .catch((err) => {
          err.status === 401
            ? setError("محصولی برای نمایش وجود ندارد")
            : setError("در دریافت محصولات سمت سرور مشکلی به وجود امد");
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
  }

  const changeCurrentPage = (page) => {
    setLoading(true);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  return (
    <div
      className={`desktop:px-[163px] laptop:px-[163px] mx-auto px-6 mobile:px-6 tablet:px-6 ${
        pagination ? "py-[50px]" : "py-[50px]"
      } w-full`}
    >
      {pagination && !wishlist ? (
        <section className="flex justify-start items-center">
          <div>
            <p className="text-4xl text-navbarDashboard">همه محصولات</p>
            <span className="mt-1 text-sidebarTheme">All products</span>
          </div>
        </section>
      ) : pagination && wishlist ? (
        <section className="flex justify-start items-center">
          <div>
            <p className="text-4xl text-navbarDashboard">علاقه مندی ها</p>
            <span className="mt-1 text-sidebarTheme">Wishlist products</span>
          </div>
        </section>
      ) : (
        <section className="flex flex-row-reverse justify-between items-center">
          <GlobalBtn
            title={"دیدن همه محصولات"}
            link={"/category"}
            iconName={"PiArrowLeftBold"}
            model={1}
          />
          <div>
            <p className="text-4xl text-navbarDashboard">آخرین محصولات</p>
            <span className="mt-1 text-sidebarTheme">Latest products</span>
          </div>
        </section>
      )}

      {pagination && !wishlist ? (
        <main
          data-aos="fade-up"
          className={
            paginatedProducts.length === 0 || loading || error
              ? " w-full py-5 flex justify-center items-center"
              : " pt-[50px] place-content-center gap-8 grid grid-cols-1 desktop:grid-cols-4 laptop:grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-2"
          }
        >
          {loading && <Loader />}
          {error && (
            <p className="font-medium text-2xl text-navbarDashboard">
              {" "}
              {error}{" "}
            </p>
          )}
          {pagination &&
            !loading &&
            !error &&
            paginatedProducts.length === 0 && (
              <p className="font-medium text-2xl text-navbarDashboard">
                {" "}
                محصولی برای نمایش وجود ندارد{" "}
              </p>
            )}
          {pagination &&
            !loading &&
            !error &&
            paginatedProducts.length > 0 &&
            paginatedProducts?.map((product) => {
              return <Product key={product.id} {...product} userID={id} />;
            })}
        </main>
      ) : pagination && wishlist ? (
        <main
          data-aos="fade-up"
          className={
            paginatedProducts.length === 0 || loading || error
              ? " w-full py-5 flex justify-center items-center"
              : " pt-[50px] place-content-center gap-8 grid grid-cols-1 desktop:grid-cols-4 laptop:grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-2"
          }
        >
          {loading && <Loader />}
          {error && (
            <p className="font-medium text-2xl text-navbarDashboard">
              {" "}
              {error}{" "}
            </p>
          )}
          {pagination &&
            !loading &&
            !error &&
            paginatedProducts.length === 0 && (
              <section className="flex flex-col justify-center items-center gap-3 pt-6 w-full">
                <PiHeartBold size={150} color="#4b382a" />
                <p className="text-[48px] text-navbarDashboard">
                  محصولی یافت نشد
                </p>
                <span className="block text-sidebarTheme">
                  شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.
                </span>
                <span className="block text-sidebarTheme">
                  در صفحه "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.
                </span>
                <GlobalBtn
                  title={"فروشگاه"}
                  link={"/category"}
                  model={1}
                  iconName={"PiBasketBold"}
                />
              </section>
            )}
          {pagination &&
            !loading &&
            !error &&
            paginatedProducts.length > 0 &&
            paginatedProducts?.map((favorite) => {
              const product = favorite.product;
              return <Product key={product.id} {...product} userID={id} />;
            })}
        </main>
      ) : (
        <main
          data-aos="fade-up"
          className={
            products.length === 0 || loading || error
              ? " w-full py-5 flex justify-center items-center"
              : "place-content-center gap-8 grid grid-cols-1 desktop:grid-cols-4 laptop:grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-2 pt-[50px]"
          }
        >
          {loading && <Loader />}
          {error && (
            <p className="font-medium text-2xl text-navbarDashboard">
              {" "}
              {error}{" "}
            </p>
          )}
          {!loading && !error && products.length === 0 && (
            <p className="font-medium text-2xl text-navbarDashboard">
              {" "}
              محصولی برای نمایش وجود ندارد{" "}
            </p>
          )}
          {!loading &&
            !error &&
            products.length > 0 &&
            products?.map((product) => {
              return <Product key={product.id} {...product} userID={id} />;
            })}
        </main>
      )}

      {pagination && !loading && !error && (
        <div className="flex justify-center items-center mt-10">
          <Pagination
            defaultCurrent={currentPage}
            total={total}
            onChange={(page) => changeCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default Latest;
