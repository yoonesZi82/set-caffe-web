import Link from "next/link";
import { PiHouseLineBold } from "react-icons/pi";
const Breadcrumb = ({ route }) => {
  const text = ">";
  return (
    <div className="bg-[center] bg-[url(/image/back1.jpg)] bg-cover mb-10 px-[60px] pt-[182px]">
      <p className="text-7xl text-center text-sidebarTheme">{route}</p>
      <div className="flex justify-center items-center gap-[6px] pb-[3.8rem]">
        <Link href={"/"} className="inline-block my-[5px] text-sidebarTheme">
          <PiHouseLineBold size={16} color="#d2b48c" />
        </Link>
        <span className="inline-block my-[5px] text-sidebarTheme text-sm uppercase">
          {" "}
          {text}{" "}
        </span>
        <p className="inline-block my-[5px] text-sidebarTheme text-sm uppercase">
          {route}
        </p>
      </div>
    </div>
  );
};

export default Breadcrumb;
