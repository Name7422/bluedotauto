import "rc-slider/assets/index.css";
import "../public/assets/scss/app.scss";
import "swiper/css/effect-fade";
import "swiper/css/grid";
import "photoswipe/style.css";
import { Inter, Outfit } from "next/font/google";
import LayoutClient from "./LayoutClient";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], display: "swap", variable: "--font-outfit" });

export const metadata = {
  title: "Blue Dot Autos | Used Cars for Sale",
  description: "Used Cars for Sale | Best Car Deals Near You",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="body" style={{ transition: "0s" }}>
        <div id="wrapper">
          <div id="pagee" className="clearfix">
            <LayoutClient>{children}</LayoutClient>
          </div>
        </div>
      </body>
    </html>
  );
}
