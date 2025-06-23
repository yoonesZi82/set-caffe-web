import React from "react";
import { Modal, Result } from "antd";
import GlobalBtn from "@/components/global-button/GlobalBtn";
function ShowModal({
  open,
  onCancel,
  status,
  title,
  titleBtn,
  operation,
  loading,
  iconName,
}) {
  return (
    <Modal open={open} onCancel={onCancel}>
      <Result
        status={status}
        title={title}
        extra={
          <div className="flex justify-between items-center gap-5 w-full">
            <GlobalBtn
              title={titleBtn}
              model={1}
              iconName={iconName}
              onClick={operation}
              loading={loading}
            />
            <GlobalBtn
              title={"برگشت"}
              model={2}
              iconName={"PiArrowLeftBold"}
              onClick={onCancel}
            />
          </div>
        }
      />
    </Modal>
  );
}

export default ShowModal;
