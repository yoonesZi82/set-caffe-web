import { PiMapPinFill } from "react-icons/pi";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-sidebarTheme p-6 text-navbarDashboard footer">
      <nav>
        <h6 className="footer-title">درباره ما</h6>
        <Link
          href={"/about-us"}
          className="text-navbarDashboard link link-hover"
        >
          درباره ما
        </Link>
        <Link
          href={"/contact-us"}
          className="text-navbarDashboard link link-hover"
        >
          تماس با ما
        </Link>
        <Link href={"/rules"} className="text-navbarDashboard link link-hover">
          قوانین
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">لینک های پر بازدید</h6>
        <Link
          href={"/login-register"}
          className="text-navbarDashboard link link-hover"
        >
          ثبت نام/ورود
        </Link>
        <Link
          href={"/category"}
          className="text-navbarDashboard link link-hover"
        >
          فروشگاه
        </Link>
        <Link
          href={"/cafe-dictionary"}
          className="text-navbarDashboard link link-hover"
        >
          دیکشنری قهوه
        </Link>
        <Link href={"/blogs"} className="text-navbarDashboard link link-hover">
          وبلاگ ها
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">ادرس مجموعه</h6>
        <ul className="flex flex-col gap-4">
          <li className="flex gap-1 text-navbarDashboard link link-hover">
            <PiMapPinFill size={20} />
            <p>
              {" "}
              تهران - خ انقلاب بین میدان فردوسی و چهار راه کالج روبروی خ ویلا
              شماره ۸۵۲
            </p>
          </li>
          <li className="flex gap-1 text-navbarDashboard link link-hover">
            <PiMapPinFill size={20} />
            <p>
              تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ فجر(جم) –
              شماره ۱۰
            </p>
          </li>
        </ul>
      </nav>
      <aside className="gap-3 grid grid-cols-2">
        <div className="w-[100px] h-[100px]">
          <img src="/image/license1.png" alt="" />
        </div>
        <div className="w-[100px] h-[100px]">
          <img src="/image/license3.png" alt="" />
        </div>
        <div className="w-[100px] h-[100px]">
          <img src="/image/license1.png" alt="" />
        </div>
        <div className="w-[100px] h-[100px]">
          <img src="/image/license3.png" alt="" />
        </div>
      </aside>
    </footer>
  );
};

export default Footer;
