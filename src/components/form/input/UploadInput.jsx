"use client";
import React, { useState, useEffect } from "react";
import { Upload, Image, Alert } from "antd";
import { Controller } from "react-hook-form";
import axios from "axios";
import { ColorRingLoader } from "@/components/loading/product/Loader";
import { PiUploadBold } from "react-icons/pi";

const UploadInput = ({
  control,
  error,
  setValue,
  defaultValue,
  userID,
  route,
}) => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(
    defaultValue
      ? {
          uid: defaultValue,
          name: defaultValue,
          url: `/uploads/${route}/${defaultValue}`,
          status: "done",
        }
      : undefined
  );

  useEffect(() => {
    if (file?.status === "done") {
      const fileName = file?.name?.split("/").pop();
      setValue("image", fileName);
    } else {
      setValue("image", "");
    }
  }, [file?.status, setValue]);

  const previewLoad = () => {
    if (file) {
      setPreviewImage(file?.url || file?.preview);
      setPreviewOpen(true);
    }
  };

  const handleFileChange = async (info) => {
    const fileName = info.file.name.split("/").pop();
    if (info.file.status === "removed") {
      setLoading(true);
      try {
        await axios.delete("/api/uploads/delete", {
          data: {
            image: fileName,
            route,
            userID,
          },
        });
        setFile(undefined);
      } catch (error) {
        setFile({
          uid: info.file.uid,
          name: info.file.name,
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    } else if (info.file.status === "done") {
      if (info.file.response && info.file.response.image) {
        setFile({
          uid: info.file.uid,
          name: info.file.response.image,
          url: `/upload/${route}/` + info.file.response.image,
          status: "done",
        });
      } else {
        setFile({
          uid: info.file.uid,
          name: fileName,
          status: "error",
        });
      }
    } else {
      setFile(info.file);
    }
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("route", route);

    axios
      .post("/api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const imgName = response.data.image;

        if (imgName) {
          onSuccess();
          setFile({
            uid: imgName,
            name: imgName,
            url: `/uploads/${route}/` + imgName,
            status: "done",
          });
        } else {
          onError(new Error("imgName not found in response"));
        }
      })
      .catch((error) => {
        onError(error);
        setFile({
          uid: file.uid,
          name: file.name,
          status: "error",
        });
      });
  };

  return (
    <div>
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <>
            {loading && <ColorRingLoader />}
            {!loading && (
              <Upload
                accept="image/*"
                customRequest={customRequest}
                className="w-full cursor-pointer"
                listType="picture"
                maxCount={1}
                {...field}
                onPreview={previewLoad}
                fileList={file ? [file] : undefined}
                onChange={handleFileChange}
              >
                <div
                  className={
                    "flex flex-col justify-center items-center gap-4 border-2 border-navbarDashboard hover:border-sidebarTheme bg-sidebarTheme hover:bg-navbarDashboard p-3 border-dashed rounded-[8px] w-full text-navbarDashboard hover:text-sidebarTheme transition-colors duration-500"
                  }
                >
                  <div>
                    <PiUploadBold size={50} />
                  </div>
                  <p className="text-sm">برای اپلود تصویر خود کلیک کنید</p>
                  <p className="text-sm">
                    تصویر شما نباید بیشتر از 8 مگابایت باشد
                  </p>
                </div>
              </Upload>
            )}
            {!loading && previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
                loading={loading}
              />
            )}
          </>
        )}
      />
      {error && (
        <Alert
          message={error}
          type="warning"
          showIcon
          className="mt-2 h-[32px] text-[12px]"
        />
      )}
    </div>
  );
};

export default UploadInput;
