"use client";
import { Alert, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const DepartmentSelect = ({ error, onChange }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    async function fetchDepartments() {
      await axios
        .get("/api/departments/recive")
        .then((res) => setDepartments(res.data))
        .catch((err) => console.log(err));
    }
    fetchDepartments();
  }, []);

  return (
    <>
      <Select
        placeholder="لطفا دپارتمان مورد نظر را انتخاب کنید"
        onChange={onChange}
        options={departments.map((dept) => ({
          label: dept.title,
          value: dept.id,
        }))}
      />
      {error && (
        <Alert
          message={error}
          type="warning"
          showIcon
          className="h-[32px] text-[12px]"
        />
      )}
    </>
  );
};

export default DepartmentSelect;
