import React from "react";
function Form({ title, children, handleSubmit }) {
  return (
    <div className="flex justify-center items-center mx-auto my-0 w-full h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white form-box p-5 rounded-[8px] w-1/2 max-h-[500px] overflow-y-auto"
      >
        <h1 className="flex justify-center items-center font-medium text-[#808080] text-center text-sm">
          {title}
        </h1>
        <main className="flex flex-col gap-4 w-full">{children}</main>
      </form>
    </div>
  );
}

export default Form;
