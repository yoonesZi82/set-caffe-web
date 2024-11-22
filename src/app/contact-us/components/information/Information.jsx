import {
  PiFactory,
  PiLink,
  PiMapPin,
  PiPhoneIncoming,
  PiTelegramLogo,
} from "react-icons/pi";
const Information = () => {
  return (
    <section>
      <span className="text-sidebarTheme text-sm">تماس با ما</span>
      <p className="mt-4 mb-8 text-[22px] text-navbarDashboard">اطلاعات تماس</p>
      <div className="flex flex-row-reverse justify-end items-center gap-[14px] text-sidebarTheme">
        <p className="my-5 text-base text-navbarDashboard">
          شرکت فنجان داغ خوارزمی (کارخانه قهوه ست )
        </p>
        <PiFactory size={30} />
      </div>
      <div className="flex flex-row-reverse justify-end items-center gap-[14px] text-sidebarTheme">
        <p className="my-5 text-base text-navbarDashboard">set-coffee.com</p>
        <PiLink size={30} />
      </div>
      <div className="flex flex-row-reverse justify-end items-center gap-[14px] text-sidebarTheme">
        <p className="my-5 text-base text-navbarDashboard">
          تهران. پاکدشت . شهرک صنعتی خوارزمی. فاز 2 . بلوار بهارستان. خیابان
          ماگنولیا بلوک آ117{" "}
        </p>
        <PiMapPin size={30} />
      </div>
      <div className="flex flex-row-reverse justify-end items-center gap-[14px] text-sidebarTheme">
        <p className="my-5 text-base text-navbarDashboard">021-36479228</p>
        <PiPhoneIncoming size={30} />
      </div>
      <div className="flex flex-row-reverse justify-end items-center gap-[14px] text-sidebarTheme">
        <p className="my-5 text-base text-navbarDashboard">
          تماس با مدیریت از طریق واتساپ و یا تلگرام : 09912209730
        </p>
        <PiTelegramLogo size={30} />
      </div>
    </section>
  );
};

export default Information;
