import "@/styles/globals.css";
import AOSInit from "@/utils/aos";
import ScrollToTop from "@/utils/scrollToTop";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ThemeProvider from "../../theme/themeProvider";
//
export const metadata = {
  title: "Set Cafe | صفحه اصلی",
  description: "cafe project",
  icons: {
    icon: "./image/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ThemeProvider>
          <AntdRegistry>
            <AOSInit />
            {children}
            <ScrollToTop />
          </AntdRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
