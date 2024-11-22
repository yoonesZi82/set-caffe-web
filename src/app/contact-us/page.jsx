import Information from "./components/information/Information";
import Breadcrumb from "@/components/breadcrump/Breadcrump";
import Link from "next/link";
import MapPart from "./components/map-part/MapPart";
import { checkToken } from "@/utils/checkToken";
import HomeLayout from "@/components/layouts/HomeLayout";
import FormContact from "./components/form/Form";

const page = async () => {
  const user = await checkToken();

  return (
    <HomeLayout isLogin={user ? user : false}>
      <Breadcrumb route={"تماس با ما"} />
      <div className="desktop:px-[163px] laptop:px-[163px] px-6 mobile:px-6 tablet:px-6 pt-[50px] pb-[50px]">
        <div className="text-right mx-auto mb-16 px-[15px] w-full max-w-[1222px] text-black">
          <main className="flex desktop:flex-row laptop:flex-row flex-col mobile:flex-col tablet:flex-col gap-[25px]">
            <section>
              <MapPart position={[35.72021225108499, 51.42222691580869]}>
                <span> فروشگاه ما </span>
                <h4> ادرس فروشگاه ست کافی (شعبه جم)</h4>
                <p>
                  {" "}
                  تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ فجر(جم)
                  – شماره ۱۰{" "}
                </p>
                <p> 021-88305827 </p>
                <Link href={"/about-us"} className="text-sm underline">
                  {" "}
                  درباره فروشگاه{" "}
                </Link>
              </MapPart>
            </section>
            <section>
              <MapPart position={[35.72021225108499, 51.42222691580869]}>
                <span> فروشگاه ما </span>
                <h4> ادرس فروشگاه ست کافی (شعبه جم)</h4>
                <p>
                  {" "}
                  تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ فجر(جم)
                  – شماره ۱۰{" "}
                </p>
                <p> 021-88305827 </p>
                <Link href={"/about-us"} className="text-sm underline">
                  {" "}
                  درباره فروشگاه{" "}
                </Link>
              </MapPart>
            </section>
          </main>
        </div>
        <div className="text-right mx-auto mb-16 px-[15px] w-full max-w-[1222px] text-black">
          <div className="flex desktop:flex-row laptop:flex-row flex-col mobile:flex-col tablet:flex-col justify-between gap-10">
            <FormContact user={user} />
            <Information />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default page;
