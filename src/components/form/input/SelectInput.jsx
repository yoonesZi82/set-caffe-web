import { Alert, Select } from "antd";

const SelectInput = ({ error, onChange, newOption, placeholder }) => {
  const option = [
    {
      label: "مهم",
      value: 1,
    },
    {
      label: "عادی",
      value: 2,
    },
    {
      label: "کم اهمیت",
      value: 3,
    },
  ];
  return (
    <>
      <Select
        placeholder={
          placeholder ? placeholder : "لطفا اهمیت تیکت خود را انتخاب کنید"
        }
        onChange={onChange}
        options={newOption ? newOption : option}
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

export default SelectInput;
