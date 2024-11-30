import { Alert, Select } from "antd";
import { Controller } from "react-hook-form";

const SelectInput = ({
  error,
  onChange,
  newOption,
  placeholder,
  control,
  name,
}) => {
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
      {control ? (
        <div className="w-full">
          <Controller
            name={name ? name : "select"}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={placeholder ? placeholder : null}
                onChange={field.onChange}
                options={newOption ? newOption : option}
                className="w-full"
              />
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
      ) : (
        <div className="w-full">
          <Select
            placeholder={placeholder ? placeholder : null}
            onChange={onChange}
            options={newOption ? newOption : option}
            className="w-full"
          />
          {error && (
            <Alert
              message={error}
              type="warning"
              showIcon
              className="h-[32px] text-[12px]"
            />
          )}
        </div>
      )}
    </>
  );
};

export default SelectInput;
