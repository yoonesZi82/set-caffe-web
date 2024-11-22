"use client";
import { Loader } from "@/components/loading/product/Loader";
import axios from "axios";
import React, { useEffect, useState } from "react";

function DescriptionTab({ id }) {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("/api/products/recive", {
        productID: id,
      })
      .then((res) => {
        res.status === 200 && setDescription(res.data.longDescription);
      })
      .catch((err) => {
        err.status === 402
          ? setError("محصول یافت نشد")
          : setError("در پیدا کردن محصول مشکلی به وجود امد");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-10 w-full">
      {loading && <Loader />}
      {error && <p className="text-navbarDashboard text-xl">{error}</p>}
      {!loading && !error && description && (
        <p className="text-navbarDashboard">{description}</p>
      )}
    </div>
  );
}

export default DescriptionTab;
