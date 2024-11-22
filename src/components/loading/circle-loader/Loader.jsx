import React from "react";

function Loader() {
  return (
    <div class="flex flex-row gap-2">
      <div class="bg-navbarDashboard rounded-full w-4 h-4 animate-bounce [animation-delay:-0.1s]"></div>
      <div class="bg-navbarDashboard rounded-full w-4 h-4 animate-bounce [animation-delay:-0.2s]"></div>
      <div class="bg-navbarDashboard rounded-full w-4 h-4 animate-bounce [animation-delay:-0.3s]"></div>
    </div>
  );
}

export default Loader;
