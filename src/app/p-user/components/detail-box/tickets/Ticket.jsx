"use client";
import Loader from "@/components/loading/circle-loader/Loader";
import axios from "axios";
import { useEffect, useState } from "react";

const Ticket = ({ id, title, departmentID, createdAt, hasAnswer }) => {
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .post("/api/departments/find", { departmentID })
      .then((res) => res.data && setDepartment(res.data))
      .catch((err) => setError("در پیدا کردن دپارتمانت مشکلی وجود دارد"))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div
      className={
        loading || error
          ? "flex justify-center items-center w-full h-full"
          : "p-4"
      }
    >
      {loading && <Loader />}
      {error && <p className="text-lg text-navbarDashboard"> {error} </p>}
      {!loading && !error && department && (
        <div className="flex flex-col justify-center items-center gap-2 bg-navbarDashboard p-3 rounded-[6px] w-full">
          <div className="flex justify-between items-center w-full">
            <p className="text-base text-sidebarTheme"> {title} </p>
            <p className="text-sidebarTheme text-sm">
              {new Date(createdAt).toLocaleDateString("fa-IR")}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base text-sidebarTheme"> {department.title} </p>
            <p
              className={`text-sm ${
                hasAnswer ? "text-green-600" : "text-red-500"
              }`}
            >
              {" "}
              {hasAnswer ? "پاسخ داده شده" : "پاسخ داده نشده"}{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ticket;
