import Latest from "@/components/latest/Latest";
import React from "react";

function ShowProducts({ user }) {
  return (
    <div className="w-full">
      <Latest pagination={true} id={user ? user.id : null} />
    </div>
  );
}

export default ShowProducts;
