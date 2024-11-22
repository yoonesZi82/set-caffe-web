"use client";
import { Alert, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const SubDepartmentSelect = ({ departmentId, error, onChange }) => {
  const [subDepartments, setSubDepartments] = useState([]);

  useEffect(() => {
    if (departmentId) {
      async function fetchSubDepartments() {
        await axios
          .post("/api/departments/sub/get-sub", { departmentID: departmentId })
          .then((res) => {
            setSubDepartments(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      fetchSubDepartments();
    }
  }, [departmentId]);

  return (
    <>
      <Select
        placeholder="لطفا واحد فروش را انتخاب کنید"
        onChange={onChange} // اضافه کردن onChange
        options={subDepartments.map((subDept) => ({
          label: subDept.title,
          value: subDept.id,
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

export default SubDepartmentSelect;
